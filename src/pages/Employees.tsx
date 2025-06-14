import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, Mail, Phone, Calendar, DollarSign, Download } from "lucide-react";
import { EmployeeDialog } from "@/components/EmployeeDialog";
import { EmployeesExportDialog } from "@/components/EmployeesExportDialog";
import { useToast } from "@/hooks/use-toast";
import { useEmployeesExport } from "@/hooks/useEmployeesExport";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  hourly_rate: number | null;
  hire_date: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { handleExport } = useEmployeesExport();

  useEffect(() => {
    if (user) {
      fetchEmployees();
    }
  }, [user]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des employés:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les employés",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) return;

    try {
      const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", employeeId);

      if (error) throw error;

      setEmployees(employees.filter(e => e.id !== employeeId));
      toast({
        title: "Succès",
        description: "Employé supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'employé",
        variant: "destructive",
      });
    }
  };

  const toggleActiveStatus = async (employee: Employee) => {
    try {
      const { error } = await supabase
        .from("employees")
        .update({ is_active: !employee.is_active })
        .eq("id", employee.id);

      if (error) throw error;

      setEmployees(employees.map(e => 
        e.id === employee.id 
          ? { ...e, is_active: !employee.is_active }
          : e
      ));

      toast({
        title: "Succès",
        description: `Employé ${!employee.is_active ? 'activé' : 'désactivé'} avec succès`,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de l'employé",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employés</h1>
              <p className="text-gray-600">
                Gérez votre équipe de construction
              </p>
            </div>
            <div className="flex gap-2">
              {employees.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setExportDialogOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              )}
              <Button 
                onClick={() => {
                  setEditingEmployee(null);
                  setDialogOpen(true);
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvel employé
              </Button>
            </div>
          </div>

          {employees.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun employé
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Commencez par ajouter votre premier employé
                  </p>
                  <Button 
                    onClick={() => {
                      setEditingEmployee(null);
                      setDialogOpen(true);
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un employé
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {employee.first_name} {employee.last_name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {employee.position || "Poste non défini"}
                        </CardDescription>
                      </div>
                      <Badge 
                        className={
                          employee.is_active 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {employee.is_active ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employee.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="truncate">{employee.email}</span>
                        </div>
                      )}
                      
                      {employee.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{employee.phone}</span>
                        </div>
                      )}
                      
                      {employee.hourly_rate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>{employee.hourly_rate} €/h</span>
                        </div>
                      )}
                      
                      {employee.hire_date && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            Embauché le {new Date(employee.hire_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingEmployee(employee);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActiveStatus(employee)}
                        className={
                          employee.is_active 
                            ? "text-red-600 hover:text-red-700" 
                            : "text-green-600 hover:text-green-700"
                        }
                      >
                        {employee.is_active ? "Désactiver" : "Activer"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <EmployeeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          employee={editingEmployee}
          onEmployeeSaved={() => {
            fetchEmployees();
            setDialogOpen(false);
            setEditingEmployee(null);
          }}
        />
        
        <EmployeesExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          employees={employees}
          onExport={handleExport}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Employees;
