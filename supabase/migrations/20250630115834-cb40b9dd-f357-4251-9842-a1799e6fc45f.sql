
-- First, ensure we have the necessary extensions and schema
CREATE EXTENSION IF NOT EXISTS http;

-- Create the net schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS net;

-- Grant usage on the net schema
GRANT USAGE ON SCHEMA net TO postgres, anon, authenticated, service_role;

-- Create or replace the sync function with proper error handling
CREATE OR REPLACE FUNCTION sync_to_google_sheets()
RETURNS TRIGGER AS $$
BEGIN
  -- Only attempt sync if the required secrets are configured
  BEGIN
    PERFORM net.http_post(
      url := 'https://ksjpfxzotvedzeiekayh.supabase.co/functions/v1/sync-google-sheets',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanBmeHpvdHZlZHplaWVrYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTU1NDcsImV4cCI6MjA2NTAzMTU0N30.yNhkiWGlVny3_3GJjH6CKy7xlzhJ4VcgtjxD_kGofuY"}'::jsonb,
      body := json_build_object(
        'table', TG_TABLE_NAME,
        'operation', TG_OP,
        'data', row_to_json(NEW)
      )::text
    );
  EXCEPTION 
    WHEN OTHERS THEN
      -- Log the error but don't fail the main insert
      RAISE WARNING 'Google Sheets sync failed: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the triggers
DROP TRIGGER IF EXISTS sync_applications_to_sheets ON applications;
CREATE TRIGGER sync_applications_to_sheets
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION sync_to_google_sheets();

DROP TRIGGER IF EXISTS sync_course_applications_to_sheets ON course_applications;
CREATE TRIGGER sync_course_applications_to_sheets
  AFTER INSERT ON course_applications
  FOR EACH ROW
  EXECUTE FUNCTION sync_to_google_sheets();
