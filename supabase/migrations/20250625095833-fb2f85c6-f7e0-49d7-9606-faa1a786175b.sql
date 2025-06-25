
-- Create a comprehensive table for course application form data
CREATE TABLE IF NOT EXISTS public.course_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'others')),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Address Information
  street TEXT NOT NULL,
  street_second TEXT,
  state TEXT NOT NULL,
  postcode TEXT NOT NULL,
  country TEXT NOT NULL,
  
  -- Additional Information
  passport_ic TEXT NOT NULL,
  document_file_name TEXT,
  document_file_url TEXT,
  
  -- Terms acceptance
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  
  -- Metadata
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  course_code TEXT DEFAULT 'MGT1800'
);

-- Enable Row Level Security
ALTER TABLE public.course_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submissions)
CREATE POLICY "Anyone can submit course applications" 
  ON public.course_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading applications (for admin purposes)
CREATE POLICY "Allow reading course applications" 
  ON public.course_applications 
  FOR SELECT 
  USING (true);
