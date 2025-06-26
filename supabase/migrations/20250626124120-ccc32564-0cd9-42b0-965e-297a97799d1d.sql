
-- Remove the overly permissive RLS policy that allows anyone to read applications
DROP POLICY IF EXISTS "Allow reading course applications" ON public.course_applications;

-- Create a more restrictive policy for admins only (you'll need to implement admin roles)
CREATE POLICY "Only admins can read course applications" 
  ON public.course_applications 
  FOR SELECT 
  USING (false); -- For now, restrict all access until proper admin system is implemented

-- Make the storage bucket private instead of public
UPDATE storage.buckets 
SET public = false 
WHERE id = 'course-documents';

-- Remove the overly permissive storage policies
DROP POLICY IF EXISTS "Anyone can upload course documents" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view course documents" ON storage.objects;

-- Create more restrictive storage policies
CREATE POLICY "Authenticated users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'course-documents' AND 
    auth.uid() IS NOT NULL AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'course-documents' AND 
    auth.uid() IS NOT NULL AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Add a policy to track who submitted which application
ALTER TABLE public.course_applications ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create policy for users to only see their own applications
CREATE POLICY "Users can view their own applications" 
  ON public.course_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow users to insert their own applications
CREATE POLICY "Users can submit their own applications" 
  ON public.course_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
