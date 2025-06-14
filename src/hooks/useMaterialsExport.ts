
import { useToast } from "@/hooks/use-toast";

interface Material {
  id: string;
  name: string;
  category: string | null;
  unit: string | null;
  unit_price: number | null;
  stock_quantity: number | null;
  min_stock_threshold: number | null;
  supplier: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useMaterialsExport = () => {
  const { toast } = useToast();

  const exportToCSV = (materials: Material[]) => {
    const headers = [
      "Nom",
      "Catégorie",
      "Unité",
      "Prix unitaire (€)",
      "Stock",
      "Seuil minimum",
      "Fournisseur",
      "Date de création"
    ];

    const csvContent = [
      headers.join(","),
      ...materials.map(material => [
        `"${material.name}"`,
        `"${material.category || ""}"`,
        `"${material.unit || ""}"`,
        material.unit_price || 0,
        material.stock_quantity || 0,
        material.min_stock_threshold || 0,
        `"${material.supplier || ""}"`,
        material.created_at ? new Date(material.created_at).toLocaleDateString() : ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `materiaux_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (materials: Material[]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const totalValue = materials.reduce((sum, material) => {
      const value = (material.unit_price || 0) * (material.stock_quantity || 0);
      return sum + value;
    }, 0);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rapport des Matériaux</title>
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
            <h1>Rapport des Matériaux</h1>
            <p>Généré le ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="summary">
            <h3>Résumé</h3>
            <p><strong>Nombre de matériaux:</strong> ${materials.length}</p>
            <p><strong>Valeur totale du stock:</strong> ${totalValue.toLocaleString()} €</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Stock</th>
                <th>Prix unitaire (€)</th>
                <th>Valeur (€)</th>
                <th>Fournisseur</th>
              </tr>
            </thead>
            <tbody>
              ${materials.map(material => {
                const value = (material.unit_price || 0) * (material.stock_quantity || 0);
                return `
                  <tr>
                    <td>${material.name}</td>
                    <td>${material.category || '-'}</td>
                    <td>${material.stock_quantity || 0} ${material.unit || ''}</td>
                    <td>${material.unit_price?.toLocaleString() || 0}</td>
                    <td>${value.toLocaleString()}</td>
                    <td>${material.supplier || '-'}</td>
                  </tr>
                `;
              }).join('')}
              <tr class="total">
                <td colspan="4"><strong>Valeur totale</strong></td>
                <td><strong>${totalValue.toLocaleString()} €</strong></td>
                <td></td>
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

  const handleExport = (materials: Material[], options: { format: 'csv' | 'pdf' }) => {
    try {
      if (options.format === 'csv') {
        exportToCSV(materials);
        toast({
          title: "Export réussi",
          description: `${materials.length} matériau(x) exporté(s) en CSV`,
        });
      } else {
        exportToPDF(materials);
        toast({
          title: "Export réussi",
          description: `${materials.length} matériau(x) exporté(s) en PDF`,
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
