
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
  'success': { fr: 'Succès', en: 'Success', es: 'Éxito', de: 'Erfolg', it: 'Successo', pt: 'Sucesso' },
  'error': { fr: 'Erreur', en: 'Error', es: 'Error', de: 'Fehler', it: 'Errore', pt: 'Erro' },
  
  // Profile specific
  'personal_information': { fr: 'Informations personnelles', en: 'Personal Information', es: 'Información Personal', de: 'Persönliche Informationen', it: 'Informazioni Personali', pt: 'Informações Pessoais' },
  'manage_basic_info_and_avatar': { fr: 'Gérez vos informations de base et votre avatar', en: 'Manage your basic information and avatar', es: 'Gestiona tu información básica y avatar', de: 'Verwalten Sie Ihre Grunddaten und Avatar', it: 'Gestisci le tue informazioni di base e avatar', pt: 'Gerencie suas informações básicas e avatar' },
  'first_name': { fr: 'Prénom', en: 'First Name', es: 'Nombre', de: 'Vorname', it: 'Nome', pt: 'Nome' },
  'last_name': { fr: 'Nom', en: 'Last Name', es: 'Apellido', de: 'Nachname', it: 'Cognome', pt: 'Sobrenome' },
  'company_name': { fr: 'Nom de l\'entreprise', en: 'Company Name', es: 'Nombre de la Empresa', de: 'Firmenname', it: 'Nome dell\'Azienda', pt: 'Nome da Empresa' },
  'biography': { fr: 'Biographie', en: 'Biography', es: 'Biografía', de: 'Biografie', it: 'Biografia', pt: 'Biografia' },
  'your_first_name': { fr: 'Votre prénom', en: 'Your first name', es: 'Tu nombre', de: 'Ihr Vorname', it: 'Il tuo nome', pt: 'Seu nome' },
  'your_last_name': { fr: 'Votre nom', en: 'Your last name', es: 'Tu apellido', de: 'Ihr Nachname', it: 'Il tuo cognome', pt: 'Seu sobrenome' },
  'your_company_name': { fr: 'Nom de votre entreprise', en: 'Your company name', es: 'Nombre de tu empresa', de: 'Ihr Firmenname', it: 'Nome della tua azienda', pt: 'Nome da sua empresa' },
  'tell_us_about_yourself': { fr: 'Parlez-nous de vous...', en: 'Tell us about yourself...', es: 'Cuéntanos sobre ti...', de: 'Erzählen Sie uns von sich...', it: 'Parlaci di te...', pt: 'Conte-nos sobre você...' },
  'change_avatar': { fr: 'Changer l\'avatar', en: 'Change Avatar', es: 'Cambiar Avatar', de: 'Avatar ändern', it: 'Cambia Avatar', pt: 'Alterar Avatar' },
  'uploading': { fr: 'Téléchargement...', en: 'Uploading...', es: 'Subiendo...', de: 'Hochladen...', it: 'Caricamento...', pt: 'Enviando...' },
  'updating': { fr: 'Mise à jour...', en: 'Updating...', es: 'Actualizando...', de: 'Aktualisierung...', it: 'Aggiornamento...', pt: 'Atualizando...' },
  'save_changes': { fr: 'Sauvegarder les modifications', en: 'Save Changes', es: 'Guardar Cambios', de: 'Änderungen speichern', it: 'Salva Modifiche', pt: 'Salvar Alterações' },
  
  // Appearance
  'appearance_preferences': { fr: 'Préférences d\'apparence', en: 'Appearance Preferences', es: 'Preferencias de Apariencia', de: 'Erscheinungseinstellungen', it: 'Preferenze Aspetto', pt: 'Preferências de Aparência' },
  'customize_app_appearance': { fr: 'Personnalisez l\'apparence de l\'application', en: 'Customize the app appearance', es: 'Personaliza la apariencia de la aplicación', de: 'App-Erscheinungsbild anpassen', it: 'Personalizza l\'aspetto dell\'app', pt: 'Personalize a aparência do aplicativo' },
  'theme': { fr: 'Thème', en: 'Theme', es: 'Tema', de: 'Thema', it: 'Tema', pt: 'Tema' },
  'select_theme': { fr: 'Sélectionner un thème', en: 'Select a theme', es: 'Seleccionar un tema', de: 'Thema auswählen', it: 'Seleziona un tema', pt: 'Selecionar um tema' },
  'light': { fr: 'Clair', en: 'Light', es: 'Claro', de: 'Hell', it: 'Chiaro', pt: 'Claro' },
  'dark': { fr: 'Sombre', en: 'Dark', es: 'Oscuro', de: 'Dunkel', it: 'Scuro', pt: 'Escuro' },
  'system': { fr: 'Système', en: 'System', es: 'Sistema', de: 'System', it: 'Sistema', pt: 'Sistema' },
  'currency': { fr: 'Devise', en: 'Currency', es: 'Moneda', de: 'Währung', it: 'Valuta', pt: 'Moeda' },
  'select_currency': { fr: 'Sélectionner une devise', en: 'Select a currency', es: 'Seleccionar una moneda', de: 'Währung auswählen', it: 'Seleziona una valuta', pt: 'Selecionar uma moeda' },
  'international_currencies': { fr: 'Devises internationales', en: 'International Currencies', es: 'Monedas Internacionales', de: 'Internationale Währungen', it: 'Valute Internazionali', pt: 'Moedas Internacionais' },
  'african_currencies': { fr: 'Devises africaines', en: 'African Currencies', es: 'Monedas Africanas', de: 'Afrikanische Währungen', it: 'Valute Africane', pt: 'Moedas Africanas' },
  
  // Regional
  'regional_preferences': { fr: 'Préférences régionales', en: 'Regional Preferences', es: 'Preferencias Regionales', de: 'Regionale Einstellungen', it: 'Preferenze Regionali', pt: 'Preferências Regionais' },
  'configure_language_and_timezone': { fr: 'Configurez votre langue et fuseau horaire', en: 'Configure your language and timezone', es: 'Configura tu idioma y zona horaria', de: 'Sprache und Zeitzone konfigurieren', it: 'Configura lingua e fuso orario', pt: 'Configure seu idioma e fuso horário' },
  'timezone': { fr: 'Fuseau horaire', en: 'Timezone', es: 'Zona Horaria', de: 'Zeitzone', it: 'Fuso Orario', pt: 'Fuso Horário' },
  'select_timezone': { fr: 'Sélectionner un fuseau horaire', en: 'Select a timezone', es: 'Seleccionar zona horaria', de: 'Zeitzone auswählen', it: 'Seleziona fuso orario', pt: 'Selecionar fuso horário' },
  'language': { fr: 'Langue', en: 'Language', es: 'Idioma', de: 'Sprache', it: 'Lingua', pt: 'Idioma' },
  'select_language': { fr: 'Sélectionner une langue', en: 'Select a language', es: 'Seleccionar un idioma', de: 'Sprache auswählen', it: 'Seleziona una lingua', pt: 'Selecionar um idioma' },
  
  // Messages
  'unable_to_load_profile': { fr: 'Impossible de charger le profil', en: 'Unable to load profile', es: 'No se pudo cargar el perfil', de: 'Profil konnte nicht geladen werden', it: 'Impossibile caricare il profilo', pt: 'Não foi possível carregar o perfil' },
  'avatar_updated_successfully': { fr: 'Avatar mis à jour avec succès', en: 'Avatar updated successfully', es: 'Avatar actualizado exitosamente', de: 'Avatar erfolgreich aktualisiert', it: 'Avatar aggiornato con successo', pt: 'Avatar atualizado com sucesso' },
  'unable_to_upload_avatar': { fr: 'Impossible de télécharger l\'avatar', en: 'Unable to upload avatar', es: 'No se pudo subir el avatar', de: 'Avatar konnte nicht hochgeladen werden', it: 'Impossibile caricare l\'avatar', pt: 'Não foi possível enviar o avatar' },
  'profile_updated_successfully': { fr: 'Profil mis à jour avec succès', en: 'Profile updated successfully', es: 'Perfil actualizado exitosamente', de: 'Profil erfolgreich aktualisiert', it: 'Profilo aggiornato con successo', pt: 'Perfil atualizado com sucesso' },
  'unable_to_update_profile': { fr: 'Impossible de mettre à jour le profil', en: 'Unable to update profile', es: 'No se pudo actualizar el perfil', de: 'Profil konnte nicht aktualisiert werden', it: 'Impossibile aggiornare il profilo', pt: 'Não foi possível atualizar o perfil' },
  'preferences_updated_successfully': { fr: 'Préférences mises à jour avec succès', en: 'Preferences updated successfully', es: 'Preferencias actualizadas exitosamente', de: 'Einstellungen erfolgreich aktualisiert', it: 'Preferenze aggiornate con successo', pt: 'Preferências atualizadas com sucesso' },
  'unable_to_update_preferences': { fr: 'Impossible de mettre à jour les préférences', en: 'Unable to update preferences', es: 'No se pudieron actualizar las preferencias', de: 'Einstellungen konnten nicht aktualisiert werden', it: 'Impossibile aggiornare le preferenze', pt: 'Não foi possível atualizar as preferências' },
  
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
  'manage_project_expenses': { fr: 'Gérez les dépenses de vos projets', en: 'Manage your project expenses', es: 'Gestiona los gastos de tus proyectos', de: 'Verwalten Sie Ihre Projektausgaben', it: 'Gestisci le spese dei tuoi progetti', pt: 'Gerencie as despesas dos seus projetos' },
  
  // Special key for current language
  'currentLanguage': { fr: 'fr', en: 'en', es: 'es', de: 'de', it: 'it', pt: 'pt' }
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
