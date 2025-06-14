
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCustomization } from "@/components/ProfileCustomization";
import { CollaboratorInvitations } from "@/components/CollaboratorInvitations";
import { User, Users } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">
            Gérez votre profil et votre équipe
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Mon Profil
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Équipe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileCustomization />
          </TabsContent>

          <TabsContent value="team">
            <CollaboratorInvitations />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
