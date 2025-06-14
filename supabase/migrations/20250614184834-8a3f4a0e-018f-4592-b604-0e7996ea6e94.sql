
-- Supprimer les anciennes politiques RLS pour les invitations
DROP POLICY IF EXISTS "Users can view invitations they sent" ON public.invitations;
DROP POLICY IF EXISTS "Users can create invitations" ON public.invitations;
DROP POLICY IF EXISTS "Users can update their invitations" ON public.invitations;

-- Créer de nouvelles politiques RLS plus permissives pour les invitations
CREATE POLICY "Users can view their company invitations" 
  ON public.invitations 
  FOR SELECT 
  USING (auth.uid() = invited_by OR auth.uid() = company_id);

CREATE POLICY "Users can create company invitations" 
  ON public.invitations 
  FOR INSERT 
  WITH CHECK (auth.uid() = invited_by AND auth.uid() = company_id);

CREATE POLICY "Users can update their company invitations" 
  ON public.invitations 
  FOR UPDATE 
  USING (auth.uid() = invited_by OR auth.uid() = company_id);

CREATE POLICY "Users can delete their company invitations" 
  ON public.invitations 
  FOR DELETE 
  USING (auth.uid() = invited_by OR auth.uid() = company_id);
