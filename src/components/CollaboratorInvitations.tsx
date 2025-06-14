
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Users, Trash2 } from "lucide-react";

interface Invitation {
  id: string;
  email: string;
  role: string;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
}

interface Collaborator {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

export const CollaboratorInvitations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [newInvitation, setNewInvitation] = useState({
    email: "",
    role: "collaborator"
  });

  useEffect(() => {
    if (user) {
      fetchInvitations();
      fetchCollaborators();
    }
  }, [user]);

  const fetchInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('invited_by', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les invitations",
        variant: "destructive",
      });
    }
  };

  const fetchCollaborators = async () => {
    try {
      const { data, error } = await supabase
        .from('collaborators')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .eq('company_id', user?.id)
        .order('joined_at', { ascending: false });

      if (error) throw error;
      setCollaborators(data || []);
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    }
  };

  const generateInviteToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Vérifier si l'email est déjà invité
      const { data: existingInvitation } = await supabase
        .from('invitations')
        .select('id')
        .eq('email', newInvitation.email)
        .eq('company_id', user?.id)
        .is('accepted_at', null)
        .single();

      if (existingInvitation) {
        toast({
          title: "Invitation déjà envoyée",
          description: "Une invitation est déjà en cours pour cette adresse email",
          variant: "destructive",
        });
        return;
      }

      const token = generateInviteToken();
      
      const { error } = await supabase
        .from('invitations')
        .insert({
          email: newInvitation.email,
          role: newInvitation.role,
          invited_by: user?.id,
          company_id: user?.id,
          token
        });

      if (error) throw error;

      toast({
        title: "Invitation envoyée",
        description: `Une invitation a été envoyée à ${newInvitation.email}`,
      });

      setNewInvitation({ email: "", role: "collaborator" });
      fetchInvitations();
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'invitation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', invitationId);

      if (error) throw error;

      toast({
        title: "Invitation supprimée",
        description: "L'invitation a été annulée",
      });

      fetchInvitations();
    } catch (error) {
      console.error('Error deleting invitation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'invitation",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (invitation: Invitation) => {
    if (invitation.accepted_at) {
      return <Badge variant="default">Acceptée</Badge>;
    }
    
    const isExpired = new Date(invitation.expires_at) < new Date();
    if (isExpired) {
      return <Badge variant="destructive">Expirée</Badge>;
    }

    return <Badge variant="secondary">En attente</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Send New Invitation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Inviter un collaborateur
          </CardTitle>
          <CardDescription>
            Invitez des membres à rejoindre votre équipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendInvitation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newInvitation.email}
                  onChange={(e) => setNewInvitation(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="collaborateur@exemple.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={newInvitation.role}
                  onValueChange={(value) => setNewInvitation(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collaborator">Collaborateur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer l'invitation"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Collaborators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Collaborateurs ({collaborators.length})
          </CardTitle>
          <CardDescription>
            Membres actuels de votre équipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          {collaborators.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Rejoint le</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborators.map((collaborator) => (
                  <TableRow key={collaborator.id}>
                    <TableCell>
                      {collaborator.profiles?.first_name && collaborator.profiles?.last_name
                        ? `${collaborator.profiles.first_name} ${collaborator.profiles.last_name}`
                        : 'Utilisateur'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={collaborator.role === 'admin' ? 'default' : 'secondary'}>
                        {collaborator.role === 'admin' ? 'Administrateur' : 'Collaborateur'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(collaborator.joined_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Aucun collaborateur pour le moment
            </p>
          )}
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      <Card>
        <CardHeader>
          <CardTitle>Invitations en cours ({invitations.length})</CardTitle>
          <CardDescription>
            Invitations envoyées en attente de réponse
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Envoyée le</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>{invitation.email}</TableCell>
                    <TableCell>
                      <Badge variant={invitation.role === 'admin' ? 'default' : 'secondary'}>
                        {invitation.role === 'admin' ? 'Administrateur' : 'Collaborateur'}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(invitation)}</TableCell>
                    <TableCell>
                      {new Date(invitation.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      {!invitation.accepted_at && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteInvitation(invitation.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Aucune invitation en cours
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
