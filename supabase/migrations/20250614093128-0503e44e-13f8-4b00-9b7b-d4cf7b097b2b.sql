
-- Enable Row Level Security for materials table
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own materials
CREATE POLICY "Users can view their own materials" 
  ON public.materials 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own materials
CREATE POLICY "Users can create their own materials" 
  ON public.materials 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own materials
CREATE POLICY "Users can update their own materials" 
  ON public.materials 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own materials
CREATE POLICY "Users can delete their own materials" 
  ON public.materials 
  FOR DELETE 
  USING (auth.uid() = user_id);
