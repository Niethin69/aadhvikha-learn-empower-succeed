
-- Remove the restrictive policies that require authentication
DROP POLICY IF EXISTS "Users can view their own applications" ON public.course_applications;
DROP POLICY IF EXISTS "Users can submit their own applications" ON public.course_applications;
DROP POLICY IF EXISTS "Only admins can read course applications" ON public.course_applications;

-- Create a policy that allows anyone to submit applications (but not read them)
CREATE POLICY "Anyone can submit applications" 
  ON public.course_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Make the storage bucket public again for document uploads
UPDATE storage.buckets 
SET public = true 
WHERE id = 'course-documents';

-- Remove restrictive storage policies
DROP POLICY IF EXISTS "Authenticated users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;

-- Create public upload policy for course documents
CREATE POLICY "Anyone can upload course documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'course-documents');

-- Create public view policy for course documents
CREATE POLICY "Anyone can view course documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'course-documents');

-- Make user_id nullable since we won't require authentication
ALTER TABLE public.course_applications ALTER COLUMN user_id DROP NOT NULL;
