
-- Supprimer l'ancienne contrainte de devise
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_currency_check;

-- Ajouter la nouvelle contrainte avec toutes les devises supportées
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_currency_check 
CHECK (currency IN (
  'EUR', 'USD', 'GBP', 'CAD', 'CHF',
  'XOF', 'XAF', 'MAD', 'DZD', 'TND', 'EGP', 'ZAR', 'NGN', 'GHS', 'KES',
  'UGX', 'TZS', 'RWF', 'ETB', 'MZN', 'BWP', 'SZL', 'LSL', 'NAD', 'AOA',
  'MWK', 'ZMW', 'ZWL', 'MGA', 'MUR', 'SCR', 'KMF', 'DJF', 'SOS', 'ERN',
  'SLL', 'GMD', 'GNF', 'LRD', 'CVE', 'STN', 'SHP'
));
