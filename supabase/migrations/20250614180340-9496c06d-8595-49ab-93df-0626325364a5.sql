
-- Étendre la table profiles pour la personnalisation
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'Europe/Paris';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'fr';

-- Créer la table pour les invitations de collaborateurs
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  invited_by UUID REFERENCES auth.users(id) NOT NULL,
  company_id UUID REFERENCES public.profiles(id) NOT NULL,
  role TEXT NOT NULL DEFAULT 'collaborator',
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table pour les collaborateurs
CREATE TABLE public.collaborators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  company_id UUID REFERENCES public.profiles(id) NOT NULL,
  role TEXT NOT NULL DEFAULT 'collaborator',
  invited_by UUID REFERENCES auth.users(id) NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, company_id)
);

-- Activer RLS sur les nouvelles tables
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les invitations
CREATE POLICY "Users can view invitations they sent" 
  ON public.invitations 
  FOR SELECT 
  USING (auth.uid() = invited_by);

CREATE POLICY "Users can create invitations" 
  ON public.invitations 
  FOR INSERT 
  WITH CHECK (auth.uid() = invited_by);

CREATE POLICY "Users can update their invitations" 
  ON public.invitations 
  FOR UPDATE 
  USING (auth.uid() = invited_by);

-- Politiques RLS pour les collaborateurs
CREATE POLICY "Users can view collaborators in their company" 
  ON public.collaborators 
  FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    company_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can add collaborators to their company" 
  ON public.collaborators 
  FOR INSERT 
  WITH CHECK (
    company_id IN (SELECT id FROM public.profiles WHERE id = auth.uid())
  );

-- Créer un bucket de stockage pour les avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Politique de stockage pour les avatars
CREATE POLICY "Users can upload their own avatar" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Avatars are publicly viewable" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar" 
  ON storage.objects 
  FOR UPDATE 
  USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
