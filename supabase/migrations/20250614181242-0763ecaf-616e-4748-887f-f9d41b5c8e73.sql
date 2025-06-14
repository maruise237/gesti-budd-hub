
-- Ajouter les colonnes manquantes pour les préférences utilisateur
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'EUR' CHECK (currency IN ('EUR', 'USD', 'GBP', 'CAD', 'CHF', 'XOF', 'XAF', 'MAD', 'DZD', 'TND', 'EGP', 'ZAR', 'NGN', 'GHS', 'KES', 'UGX', 'TZS', 'RWF', 'ETB', 'MZN', 'BWP', 'SZL', 'LSL', 'NAD', 'AOA', 'MWK', 'ZMW', 'ZWL', 'MGA', 'MUR', 'SCR', 'KMF', 'DJF', 'SOS', 'ERN', 'SLL', 'GMD', 'GNF', 'LRD', 'CVE', 'STN', 'SHP'));

-- Mettre à jour la colonne language pour inclure plus d'options
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_language_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_language_check 
CHECK (language IN ('fr', 'en', 'es', 'de', 'it', 'pt'));
