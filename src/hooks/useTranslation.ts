
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

const translations: Translations = {
  // Navigation
  'dashboard': { fr: 'Tableau de bord', en: 'Dashboard', es: 'Panel', de: 'Dashboard', it: 'Cruscotto', pt: 'Painel' },
  'projects': { fr: 'Projets', en: 'Projects', es: 'Proyectos', de: 'Projekte', it: 'Progetti', pt: 'Projetos' },
  'employees': { fr: 'Employés', en: 'Employees', es: 'Empleados', de: 'Mitarbeiter', it: 'Dipendenti', pt: 'Funcionários' },
  'materials': { fr: 'Matériaux', en: 'Materials', es: 'Materiales', de: 'Materialien', it: 'Materiali', pt: 'Materiais' },
  'tasks': { fr: 'Tâches', en: 'Tasks', es: 'Tareas', de: 'Aufgaben', it: 'Attività', pt: 'Tarefas' },
  'time_entries': { fr: 'Temps de travail', en: 'Time Entries', es: 'Entradas de tiempo', de: 'Zeiterfassung', it: 'Ore lavorate', pt: 'Registos de tempo' },
  'expenses': { fr: 'Dépenses', en: 'Expenses', es: 'Gastos', de: 'Ausgaben', it: 'Spese', pt: 'Despesas' },
  'profile': { fr: 'Profil', en: 'Profile', es: 'Perfil', de: 'Profil', it: 'Profilo', pt: 'Perfil' },
  'my_profile': { fr: 'Mon Profil', en: 'My Profile', es: 'Mi Perfil', de: 'Mein Profil', it: 'Il Mio Profilo', pt: 'Meu Perfil' },
  'team': { fr: 'Équipe', en: 'Team', es: 'Equipo', de: 'Team', it: 'Squadra', pt: 'Equipe' },
  'manage_profile_and_team': { fr: 'Gérez votre profil et votre équipe', en: 'Manage your profile and team', es: 'Gestiona tu perfil y equipo', de: 'Verwalten Sie Ihr Profil und Team', it: 'Gestisci il tuo profilo e squadra', pt: 'Gerencie seu perfil e equipe' },
  
  // Common actions
  'add': { fr: 'Ajouter', en: 'Add', es: 'Agregar', de: 'Hinzufügen', it: 'Aggiungi', pt: 'Adicionar' },
  'edit': { fr: 'Modifier', en: 'Edit', es: 'Editar', de: 'Bearbeiten', it: 'Modifica', pt: 'Editar' },
  'delete': { fr: 'Supprimer', en: 'Delete', es: 'Eliminar', de: 'Löschen', it: 'Elimina', pt: 'Excluir' },
  'save': { fr: 'Sauvegarder', en: 'Save', es: 'Guardar', de: 'Speichern', it: 'Salva', pt: 'Salvar' },
  'cancel': { fr: 'Annuler', en: 'Cancel', es: 'Cancelar', de: 'Abbrechen', it: 'Annulla', pt: 'Cancelar' },
  'export': { fr: 'Exporter', en: 'Export', es: 'Exportar', de: 'Exportieren', it: 'Esporta', pt: 'Exportar' },
  'loading': { fr: 'Chargement...', en: 'Loading...', es: 'Cargando...', de: 'Laden...', it: 'Caricamento...', pt: 'Carregando...' },
  
  // Expenses specific
  'new_expense': { fr: 'Nouvelle dépense', en: 'New Expense', es: 'Nuevo Gasto', de: 'Neue Ausgabe', it: 'Nuova Spesa', pt: 'Nova Despesa' },
  'total_expenses': { fr: 'Total des dépenses filtrées', en: 'Total Filtered Expenses', es: 'Total de Gastos Filtrados', de: 'Gefilterte Ausgaben Gesamt', it: 'Totale Spese Filtrate', pt: 'Total de Despesas Filtradas' },
  'expense_description': { fr: 'Description', en: 'Description', es: 'Descripción', de: 'Beschreibung', it: 'Descrizione', pt: 'Descrição' },
  'amount': { fr: 'Montant', en: 'Amount', es: 'Cantidad', de: 'Betrag', it: 'Importo', pt: 'Quantia' },
  'category': { fr: 'Catégorie', en: 'Category', es: 'Categoría', de: 'Kategorie', it: 'Categoria', pt: 'Categoria' },
  'project': { fr: 'Projet', en: 'Project', es: 'Proyecto', de: 'Projekt', it: 'Progetto', pt: 'Projeto' },
  'date': { fr: 'Date', en: 'Date', es: 'Fecha', de: 'Datum', it: 'Data', pt: 'Data' },
  
  // Categories
  'materials_category': { fr: 'Matériaux', en: 'Materials', es: 'Materiales', de: 'Materialien', it: 'Materiali', pt: 'Materiais' },
  'labor_category': { fr: 'Main-d\'œuvre', en: 'Labor', es: 'Mano de obra', de: 'Arbeitskraft', it: 'Manodopera', pt: 'Mão de obra' },
  'transport_category': { fr: 'Transport', en: 'Transport', es: 'Transporte', de: 'Transport', it: 'Trasporto', pt: 'Transporte' },
  'equipment_category': { fr: 'Équipement', en: 'Equipment', es: 'Equipo', de: 'Ausrüstung', it: 'Attrezzatura', pt: 'Equipamento' },
  'permits_category': { fr: 'Permis', en: 'Permits', es: 'Permisos', de: 'Genehmigungen', it: 'Permessi', pt: 'Licenças' },
  'insurance_category': { fr: 'Assurance', en: 'Insurance', es: 'Seguro', de: 'Versicherung', it: 'Assicurazione', pt: 'Seguro' },
  'other_category': { fr: 'Autre', en: 'Other', es: 'Otro', de: 'Andere', it: 'Altro', pt: 'Outro' },

  // Additional translations
  'no_project': { fr: 'Aucun projet', en: 'No project', es: 'Sin proyecto', de: 'Kein Projekt', it: 'Nessun progetto', pt: 'Nenhum projeto' },
  'unknown_project': { fr: 'Projet inconnu', en: 'Unknown project', es: 'Proyecto desconocido', de: 'Unbekanntes Projekt', it: 'Progetto sconosciuto', pt: 'Projeto desconhecido' },
  'expense_count_text': { fr: 'Sur {count} dépense(s)', en: 'Out of {count} expense(s)', es: 'De {count} gasto(s)', de: 'Von {count} Ausgabe(n)', it: 'Su {count} spesa(e)', pt: 'De {count} despesa(s)' },

  // Chart translations
  'expenses_by_category': { fr: 'Répartition par catégorie', en: 'Expenses by Category', es: 'Gastos por Categoría', de: 'Ausgaben nach Kategorie', it: 'Spese per Categoria', pt: 'Despesas por Categoria' },
  'expenses_distribution_by_category': { fr: 'Distribution des dépenses par catégorie', en: 'Distribution of expenses by category', es: 'Distribución de gastos por categoría', de: 'Verteilung der Ausgaben nach Kategorie', it: 'Distribuzione delle spese per categoria', pt: 'Distribuição de despesas por categoria' },
  'expenses_by_project': { fr: 'Dépenses par projet', en: 'Expenses by Project', es: 'Gastos por Proyecto', de: 'Ausgaben nach Projekt', it: 'Spese per Progetto', pt: 'Despesas por Projeto' },
  'total_expenses_by_project': { fr: 'Montant total des dépenses par projet', en: 'Total amount of expenses by project', es: 'Cantidad total de gastos por proyecto', de: 'Gesamtbetrag der Ausgaben nach Projekt', it: 'Importo totale delle spese per progetto', pt: 'Montante total de despesas por projeto' },
  'monthly_expenses_evolution': { fr: 'Évolution mensuelle des dépenses', en: 'Monthly Expenses Evolution', es: 'Evolución Mensual de Gastos', de: 'Monatliche Ausgabenentwicklung', it: 'Evoluzione Mensile delle Spese', pt: 'Evolução Mensal das Despesas' },
  'expenses_trend_over_time': { fr: 'Tendance des dépenses au fil du temps', en: 'Expenses trend over time', es: 'Tendencia de gastos a lo largo del tiempo', de: 'Ausgabentrend im Zeitverlauf', it: 'Tendenza delle spese nel tempo', pt: 'Tendência das despesas ao longo do tempo' },
  'count_label': { fr: 'Nombre', en: 'Count', es: 'Cantidad', de: 'Anzahl', it: 'Conteggio', pt: 'Contagem' },

  // Messages
  'manage_project_expenses': { fr: 'Gérez les dépenses de vos projets', en: 'Manage your project expenses', es: 'Gestiona los gastos de tus proyectos', de: 'Verwalten Sie Ihre Projektausgaben', it: 'Gestisci le spese dei tuoi progetti', pt: 'Gerencie as despesas dos seus projetos' }
};

export const useTranslation = () => {
  const { preferences } = useUserPreferences();

  const t = (key: string, params?: Record<string, any>): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    let text = translation[preferences.language] || translation['fr'] || key;
    
    // Handle simple parameter substitution
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value.toString());
      });
    }
    
    return text;
  };

  return { t, currentLanguage: preferences.language };
};
