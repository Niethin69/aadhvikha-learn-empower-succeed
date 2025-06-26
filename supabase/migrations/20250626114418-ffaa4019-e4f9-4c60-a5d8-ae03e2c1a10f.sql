
-- Create a storage bucket for course application documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-documents', 
  'course-documents', 
  true, 
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
);

-- Create storage policies for the bucket
CREATE POLICY "Anyone can upload course documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'course-documents');

CREATE POLICY "Anyone can view course documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'course-documents');

-- Update the course_applications table to store the file URL
ALTER TABLE public.course_applications 
ADD COLUMN IF NOT EXISTS document_file_url TEXT;
