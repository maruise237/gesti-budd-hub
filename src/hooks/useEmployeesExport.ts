
import { useToast } from "@/hooks/use-toast";

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

export const useEmployeesExport = () => {
  const { toast } = useToast();

  const exportToCSV = (employees: Employee[]) => {
    const headers = [
      "Prénom",
      "Nom",
      "Email",
      "Téléphone",
      "Poste",
      "Taux horaire (€)",
      "Date d'embauche",
      "Statut",
      "Date de création"
    ];

    const csvContent = [
      headers.join(","),
      ...employees.map(employee => [
        `"${employee.first_name}"`,
        `"${employee.last_name}"`,
        `"${employee.email || ""}"`,
        `"${employee.phone || ""}"`,
        `"${employee.position || ""}"`,
        employee.hourly_rate || 0,
        employee.hire_date || "",
        employee.is_active ? "Actif" : "Inactif",
        employee.created_at ? new Date(employee.created_at).toLocaleDateString() : ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `employes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (employees: Employee[]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const activeEmployees = employees.filter(e => e.is_active).length;
    const totalMonthlyCost = employees
      .filter(e => e.is_active && e.hourly_rate)
      .reduce((sum, e) => sum + (e.hourly_rate! * 160), 0); // 160h/mois estimé

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rapport des Employés</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .active { color: green; font-weight: bold; }
            .inactive { color: red; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport des Employés</h1>
            <p>Généré le ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="summary">
            <h3>Résumé</h3>
            <p><strong>Nombre total d'employés:</strong> ${employees.length}</p>
            <p><strong>Employés actifs:</strong> ${activeEmployees}</p>
            <p><strong>Coût mensuel estimé:</strong> ${totalMonthlyCost.toLocaleString()} €</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>Poste</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Taux horaire (€)</th>
                <th>Date d'embauche</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map(employee => `
                <tr>
                  <td>${employee.first_name} ${employee.last_name}</td>
                  <td>${employee.position || '-'}</td>
                  <td>${employee.email || '-'}</td>
                  <td>${employee.phone || '-'}</td>
                  <td>${employee.hourly_rate?.toLocaleString() || '-'}</td>
                  <td>${employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : '-'}</td>
                  <td class="${employee.is_active ? 'active' : 'inactive'}">
                    ${employee.is_active ? 'Actif' : 'Inactif'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  const handleExport = (employees: Employee[], options: { format: 'csv' | 'pdf' }) => {
    try {
      if (options.format === 'csv') {
        exportToCSV(employees);
        toast({
          title: "Export réussi",
          description: `${employees.length} employé(s) exporté(s) en CSV`,
        });
      } else {
        exportToPDF(employees);
        toast({
          title: "Export réussi",
          description: `${employees.length} employé(s) exporté(s) en PDF`,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export",
        variant: "destructive",
      });
    }
  };

  return { handleExport };
};
