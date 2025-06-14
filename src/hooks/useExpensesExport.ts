
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
}

export const useExpensesExport = (projects: Project[]) => {
  const { toast } = useToast();

  const getProjectName = (projectId: string | null) => {
    if (!projectId) return "Aucun projet";
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "Projet inconnu";
  };

  const exportToCSV = (expenses: Expense[]) => {
    const headers = [
      "Description",
      "Montant (€)",
      "Catégorie", 
      "Date",
      "Projet",
      "Date de création"
    ];

    const csvContent = [
      headers.join(","),
      ...expenses.map(expense => [
        `"${expense.description}"`,
        expense.amount,
        `"${expense.category}"`,
        expense.date,
        `"${getProjectName(expense.project_id)}"`,
        new Date(expense.created_at).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `depenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (expenses: Expense[]) => {
    // Pour une implémentation PDF complète, vous pourriez utiliser une bibliothèque comme jsPDF
    // Pour l'instant, nous allons créer une page d'impression HTML
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rapport de Dépenses</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; background-color: #e8f5e8; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport de Dépenses</h1>
            <p>Généré le ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="summary">
            <h3>Résumé</h3>
            <p><strong>Nombre de dépenses:</strong> ${expenses.length}</p>
            <p><strong>Montant total:</strong> ${totalAmount.toLocaleString()} €</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Montant (€)</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Projet</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.map(expense => `
                <tr>
                  <td>${expense.description}</td>
                  <td>${expense.amount.toLocaleString()}</td>
                  <td>${expense.category}</td>
                  <td>${new Date(expense.date).toLocaleDateString()}</td>
                  <td>${getProjectName(expense.project_id)}</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td colspan="1"><strong>Total</strong></td>
                <td><strong>${totalAmount.toLocaleString()} €</strong></td>
                <td colspan="3"></td>
              </tr>
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

  const handleExport = (expenses: Expense[], options: { format: 'csv' | 'pdf' }) => {
    try {
      if (options.format === 'csv') {
        exportToCSV(expenses);
        toast({
          title: "Export réussi",
          description: `${expenses.length} dépense(s) exportée(s) en CSV`,
        });
      } else {
        exportToPDF(expenses);
        toast({
          title: "Export réussi", 
          description: `${expenses.length} dépense(s) exportée(s) en PDF`,
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
