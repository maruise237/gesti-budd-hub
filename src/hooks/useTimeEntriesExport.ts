
import { TimeEntry } from "@/types/timeEntry";
import { useToast } from "@/hooks/use-toast";

interface ExportOptions {
  format: 'csv' | 'pdf';
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  projectId?: string;
  employeeId?: string;
}

export const useTimeEntriesExport = () => {
  const { toast } = useToast();

  const exportToCSV = (entries: TimeEntry[], filename: string = 'time-entries') => {
    const headers = [
      'Date',
      'Projet',
      'Employé',
      'Heure de début',
      'Heure de fin',
      'Durée (heures)',
      'Description'
    ];

    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        new Date(entry.start_time).toLocaleDateString('fr-FR'),
        `"${entry.projects?.name || 'Non défini'}"`,
        `"${entry.employees ? `${entry.employees.first_name} ${entry.employees.last_name}` : 'Non défini'}"`,
        new Date(entry.start_time).toLocaleTimeString('fr-FR'),
        entry.end_time ? new Date(entry.end_time).toLocaleTimeString('fr-FR') : 'En cours',
        entry.hours_worked ? entry.hours_worked.toString() : '0',
        `"${entry.description || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export réussi",
      description: `${entries.length} entrées exportées en CSV`,
    });
  };

  const exportToPDF = (entries: TimeEntry[], filename: string = 'time-entries') => {
    // Pour une implémentation simple, on génère un HTML stylé qui peut être imprimé en PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rapport de temps - ${new Date().toLocaleDateString('fr-FR')}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #ea580c; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .summary { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Rapport de temps</h1>
        <div class="summary">
          <p><strong>Période:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
          <p><strong>Nombre d'entrées:</strong> ${entries.length}</p>
          <p><strong>Total heures:</strong> ${entries.reduce((sum, entry) => sum + (entry.hours_worked || 0), 0).toFixed(2)}h</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Projet</th>
              <th>Employé</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Durée</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map(entry => `
              <tr>
                <td>${new Date(entry.start_time).toLocaleDateString('fr-FR')}</td>
                <td>${entry.projects?.name || 'Non défini'}</td>
                <td>${entry.employees ? `${entry.employees.first_name} ${entry.employees.last_name}` : 'Non défini'}</td>
                <td>${new Date(entry.start_time).toLocaleTimeString('fr-FR')}</td>
                <td>${entry.end_time ? new Date(entry.end_time).toLocaleTimeString('fr-FR') : 'En cours'}</td>
                <td>${entry.hours_worked ? entry.hours_worked.toFixed(2) + 'h' : '0h'}</td>
                <td>${entry.description || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      setTimeout(() => {
        newWindow.print();
      }, 500);
    }

    toast({
      title: "Export PDF",
      description: "Une nouvelle fenêtre s'est ouverte pour l'impression en PDF",
    });
  };

  const handleExport = (entries: TimeEntry[], options: ExportOptions) => {
    const filename = `time-entries-${new Date().toISOString().split('T')[0]}`;
    
    if (options.format === 'csv') {
      exportToCSV(entries, filename);
    } else {
      exportToPDF(entries, filename);
    }
  };

  return {
    handleExport,
    exportToCSV,
    exportToPDF,
  };
};
