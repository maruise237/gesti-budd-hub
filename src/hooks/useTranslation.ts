
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
  'create': { fr: 'Créer', en: 'Create', es: 'Crear', de: 'Erstellen', it: 'Crea', pt: 'Criar' },
  'update': { fr: 'Mettre à jour', en: 'Update', es: 'Actualizar', de: 'Aktualisieren', it: 'Aggiorna', pt: 'Atualizar' },
  
  // Homepage specific
  'get_started': { fr: 'Commencer', en: 'Get Started', es: 'Comenzar', de: 'Loslegen', it: 'Inizia', pt: 'Começar' },
  'learn_more': { fr: 'En savoir plus', en: 'Learn More', es: 'Saber más', de: 'Mehr erfahren', it: 'Scopri di più', pt: 'Saber mais' },
  'features': { fr: 'Fonctionnalités', en: 'Features', es: 'Características', de: 'Features', it: 'Caratteristiche', pt: 'Recursos' },
  'pricing': { fr: 'Tarifs', en: 'Pricing', es: 'Precios', de: 'Preise', it: 'Prezzi', pt: 'Preços' },
  'testimonials': { fr: 'Témoignages', en: 'Testimonials', es: 'Testimonios', de: 'Referenzen', it: 'Testimonianze', pt: 'Testemunhos' },
  'login': { fr: 'Connexion', en: 'Login', es: 'Iniciar sesión', de: 'Anmelden', it: 'Accedi', pt: 'Entrar' },
  'sign_up': { fr: 'S\'inscrire', en: 'Sign Up', es: 'Registrarse', de: 'Registrieren', it: 'Registrati', pt: 'Cadastrar' },
  'logout': { fr: 'Déconnexion', en: 'Logout', es: 'Cerrar sesión', de: 'Abmelden', it: 'Esci', pt: 'Sair' },
  
  // Hero section
  'hero_title': { fr: 'Gérez vos projets de construction avec efficacité', en: 'Manage your construction projects efficiently', es: 'Gestiona tus proyectos de construcción de manera eficiente', de: 'Verwalten Sie Ihre Bauprojekte effizient', it: 'Gestisci i tuoi progetti di costruzione in modo efficiente', pt: 'Gerencie seus projetos de construção com eficiência' },
  'hero_subtitle': { fr: 'Une solution complète pour planifier, suivre et optimiser tous vos chantiers', en: 'A complete solution to plan, track and optimize all your construction sites', es: 'Una solución completa para planificar, rastrear y optimizar todos tus sitios de construcción', de: 'Eine komplette Lösung zur Planung, Verfolgung und Optimierung aller Ihrer Baustellen', it: 'Una soluzione completa per pianificare, tracciare e ottimizzare tutti i tuoi cantieri', pt: 'Uma solução completa para planejar, rastrear e otimizar todos os seus canteiros de obras' },
  
  // Stats section
  'projects_managed': { fr: 'Projets gérés', en: 'Projects Managed', es: 'Proyectos Gestionados', de: 'Verwaltete Projekte', it: 'Progetti Gestiti', pt: 'Projetos Gerenciados' },
  'hours_tracked': { fr: 'Heures suivies', en: 'Hours Tracked', es: 'Horas Rastreadas', de: 'Verfolgte Stunden', it: 'Ore Tracciate', pt: 'Horas Rastreadas' },
  'satisfied_clients': { fr: 'Clients satisfaits', en: 'Satisfied Clients', es: 'Clientes Satisfechos', de: 'Zufriedene Kunden', it: 'Clienti Soddisfatti', pt: 'Clientes Satisfeitos' },
  'cost_savings': { fr: 'Économies réalisées', en: 'Cost Savings', es: 'Ahorros en Costos', de: 'Kosteneinsparungen', it: 'Risparmi sui Costi', pt: 'Economia de Custos' },
  
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
  'description': { fr: 'Description', en: 'Description', es: 'Descripción', de: 'Beschreibung', it: 'Descrizione', pt: 'Descrição' },
  
  // Employee specific
  'new_employee': { fr: 'Nouvel employé', en: 'New Employee', es: 'Nuevo Empleado', de: 'Neuer Mitarbeiter', it: 'Nuovo Dipendente', pt: 'Novo Funcionário' },
  'edit_employee': { fr: 'Modifier l\'employé', en: 'Edit Employee', es: 'Editar Empleado', de: 'Mitarbeiter bearbeiten', it: 'Modifica Dipendente', pt: 'Editar Funcionário' },
  'employee_created_successfully': { fr: 'Employé créé avec succès', en: 'Employee created successfully', es: 'Empleado creado exitosamente', de: 'Mitarbeiter erfolgreich erstellt', it: 'Dipendente creato con successo', pt: 'Funcionário criado com sucesso' },
  'employee_updated_successfully': { fr: 'Employé modifié avec succès', en: 'Employee updated successfully', es: 'Empleado actualizado exitosamente', de: 'Mitarbeiter erfolgreich aktualisiert', it: 'Dipendente aggiornato con successo', pt: 'Funcionário atualizado com sucesso' },
  'unable_to_save_employee': { fr: 'Impossible de sauvegarder l\'employé', en: 'Unable to save employee', es: 'No se pudo guardar el empleado', de: 'Mitarbeiter konnte nicht gespeichert werden', it: 'Impossibile salvare il dipendente', pt: 'Não foi possível salvar o funcionário' },
  'position': { fr: 'Poste', en: 'Position', es: 'Puesto', de: 'Position', it: 'Posizione', pt: 'Cargo' },
  'email': { fr: 'Email', en: 'Email', es: 'Email', de: 'E-Mail', it: 'Email', pt: 'Email' },
  'phone': { fr: 'Téléphone', en: 'Phone', es: 'Teléfono', de: 'Telefon', it: 'Telefono', pt: 'Telefone' },
  'hourly_rate': { fr: 'Taux horaire', en: 'Hourly Rate', es: 'Tarifa por Hora', de: 'Stundensatz', it: 'Tariffa Oraria', pt: 'Taxa Horária' },
  'hire_date': { fr: 'Date d\'embauche', en: 'Hire Date', es: 'Fecha de Contratación', de: 'Einstellungsdatum', it: 'Data di Assunzione', pt: 'Data de Contratação' },
  'required_field': { fr: 'Champ obligatoire', en: 'Required field', es: 'Campo obligatorio', de: 'Pflichtfeld', it: 'Campo obbligatorio', pt: 'Campo obrigatório' },
  'saving': { fr: 'Sauvegarde...', en: 'Saving...', es: 'Guardando...', de: 'Speichern...', it: 'Salvataggio...', pt: 'Salvando...' },
  
  // Categories
  'materials_category': { fr: 'Matériaux', en: 'Materials', es: 'Materiales', de: 'Materialien', it: 'Materiali', pt: 'Materiais' },
  'labor_category': { fr: 'Main-d\'œuvre', en: 'Labor', es: 'Mano de obra', de: 'Arbeitskraft', it: 'Manodopera', pt: 'Mão de obra' },
  'transport_category': { fr: 'Transport', en: 'Transport', es: 'Transporte', de: 'Transport', it: 'Trasporto', pt: 'Transporte' },
  'equipment_category': { fr: 'Équipement', en: 'Equipment', es: 'Equipo', de: 'Ausrüst', it: 'Attrezzatura', pt: 'Equipamento' },
  'permits_category': { fr: 'Permis', en: 'Permits', es: 'Permisos', de: 'Genehmigungen', it: 'Permessi', pt: 'Licenças' },
  'insurance_category': { fr: 'Assurance', en: 'Insurance', es: 'Seguro', de: 'Versicherung', it: 'Assicurazione', pt: 'Seguro' },
  'other_category': { fr: 'Autre', en: 'Other', es: 'Otro', de: 'Andere', it: 'Altro', pt: 'Outro' },

  // Additional translations
  'no_project': { fr: 'Aucun projet', en: 'No project', es: 'Sin proyecto', de: 'Kein Projekt', it: 'Nessun progetto', pt: 'Nenhum projeto' },
  'unknown_project': { fr: 'Projet inconnu', en: 'Unknown project', es: 'Proyecto desconocido', de: 'Unbekanntes Projekt', it: 'Progetto sconosciuto', pt: 'Projeto desconhecido' },
  'expense_count_text': { fr: 'Sur {count} dépense(s)', en: 'Out of {count} expense(s)', es: 'De {count} gasto(s)', de: 'Von {count} Ausgabe(n)', it: 'Su {count} spesa(e)', pt: 'De {count} despesa(s)' },
  'select_category': { fr: 'Sélectionner la catégorie', en: 'Select category', es: 'Seleccionar categoría', de: 'Kategorie auswählen', it: 'Seleziona categoria', pt: 'Selecionar categoria' },
  'select_project': { fr: 'Sélectionner un projet', en: 'Select a project', es: 'Seleccionar un proyecto', de: 'Projekt auswählen', it: 'Seleziona un progetto', pt: 'Selecionar um projeto' },
  'expense_description_placeholder': { fr: 'Description de la dépense', en: 'Expense description', es: 'Descripción del gasto', de: 'Ausgabenbeschreibung', it: 'Descrizione della spesa', pt: 'Descrição da despesa' },
  'receipt_url': { fr: 'URL du reçu (optionnel)', en: 'Receipt URL (optional)', es: 'URL del recibo (opcional)', de: 'Beleg-URL (optional)', it: 'URL ricevuta (opzionale)', pt: 'URL do recibo (opcional)' },
  'receipt_url_placeholder': { fr: 'https://example.com/receipt.pdf', en: 'https://example.com/receipt.pdf', es: 'https://example.com/receipt.pdf', de: 'https://example.com/receipt.pdf', it: 'https://example.com/receipt.pdf', pt: 'https://example.com/receipt.pdf' },

  // Time entries
  'new_time_entry': { fr: 'Nouvelle entrée de temps', en: 'New Time Entry', es: 'Nueva Entrada de Tiempo', de: 'Neuer Zeiteintrag', it: 'Nuova Voce Tempo', pt: 'Nova Entrada de Tempo' },
  'edit_time_entry': { fr: 'Modifier l\'entrée de temps', en: 'Edit Time Entry', es: 'Editar Entrada de Tiempo', de: 'Zeiteintrag bearbeiten', it: 'Modifica Voce Tempo', pt: 'Editar Entrada de Tempo' },
  'start_time': { fr: 'Heure de début', en: 'Start Time', es: 'Hora de Inicio', de: 'Startzeit', it: 'Ora di Inizio', pt: 'Hora de Início' },
  'end_time': { fr: 'Heure de fin', en: 'End Time', es: 'Hora de Fin', de: 'Endzeit', it: 'Ora di Fine', pt: 'Hora de Fim' },
  'hours_worked': { fr: 'Heures travaillées', en: 'Hours Worked', es: 'Horas Trabajadas', de: 'Arbeitsstunden', it: 'Ore Lavorate',  pt: 'Horas Trabalhadas' },
  'start_time_required': { fr: 'L\'heure de début est requise', en: 'Start time is required', es: 'La hora de inicio es obligatoria', de: 'Startzeit ist erforderlich', it: 'L\'ora di inizio è obbligatoria', pt: 'A hora de início é obrigatória' },
  'project_required': { fr: 'Le projet est requis', en: 'Project is required', es: 'El proyecto es obligatorio', de: 'Projekt ist erforderlich', it: 'Il progetto è obbligatorio', pt: 'O projeto é obrigatório' },
  'employee_required': { fr: 'L\'employé est requis', en: 'Employee is required', es: 'El empleado es obligatorio', de: 'Mitarbeiter ist erforderlich', it: 'Il dipendente è obbligatorio', pt: 'O funcionário é obrigatório' },
  'select_employee': { fr: 'Sélectionner un employé', en: 'Select an employee', es: 'Seleccionar un empleado', de: 'Mitarbeiter auswählen', it: 'Seleziona un dipendente', pt: 'Selecionar um funcionário' },
  'work_description_placeholder': { fr: 'Description du travail effectué', en: 'Description of work performed', es: 'Descripción del trabajo realizado', de: 'Beschreibung der geleisteten Arbeit', it: 'Descrizione del lavoro svolto', pt: 'Descrição do trabalho realizado' },
  'hours_example': { fr: 'Ex: 8.5', en: 'Ex: 8.5', es: 'Ej: 8.5', de: 'z.B.: 8.5', it: 'Es: 8.5', pt: 'Ex: 8.5' },
  'employee': { fr: 'Employé', en: 'Employee', es: 'Empleado', de: 'Mitarbeiter', it: 'Dipendente', pt: 'Funcionário' },
  'position_placeholder': { fr: 'ex: Maçon, Électricien, Chef de chantier...', en: 'ex: Mason, Electrician, Site Manager...', es: 'ej: Albañil, Electricista, Jefe de obra...', de: 'z.B.: Maurer, Elektriker, Bauleiter...', it: 'es: Muratore, Elettricista, Capo cantiere...', pt: 'ex: Pedreiro, Eletricista, Chefe de obra...' },
  'email_placeholder': { fr: 'email@exemple.com', en: 'email@example.com', es: 'email@ejemplo.com', de: 'email@beispiel.com', it: 'email@esempio.com', pt: 'email@exemplo.com' },
  'phone_placeholder': { fr: '06 12 34 56 78', en: '06 12 34 56 78', es: '06 12 34 56 78', de: '06 12 34 56 78', it: '06 12 34 56 78', pt: '06 12 34 56 78' },
  'hourly_rate_placeholder': { fr: '25.00', en: '25.00', es: '25.00', de: '25.00', it: '25.00', pt: '25.00' },
  'modify': { fr: 'Modifier', en: 'Modify', es: 'Modificar', de: 'Ändern', it: 'Modifica', pt: 'Modificar' },
  'add_employee_team_description': { fr: 'Ajoutez un nouvel employé à votre équipe', en: 'Add a new employee to your team', es: 'Agregar un nuevo empleado a tu equipo', de: 'Neuen Mitarbeiter zu Ihrem Team hinzufügen', it: 'Aggiungi un nuovo dipendente al tuo team', pt: 'Adicionar um novo funcionário à sua equipe' },
  'edit_employee_info_description': { fr: 'Modifiez les informations de l\'employé', en: 'Edit employee information', es: 'Editar información del empleado', de: 'Mitarbeiterinformationen bearbeiten', it: 'Modifica informazioni dipendente', pt: 'Editar informações do funcionário' },

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
