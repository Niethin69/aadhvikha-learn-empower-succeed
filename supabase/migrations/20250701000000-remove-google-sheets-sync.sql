
-- Remove Google Sheets sync and keep only email notifications
CREATE OR REPLACE FUNCTION send_email_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Send email notification (with error handling)
  BEGIN
    PERFORM net.http_post(
      url := 'https://ksjpfxzotvedzeiekayh.supabase.co/functions/v1/send-notification-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanBmeHpvdHZlZHplaWVrYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTU1NDcsImV4cCI6MjA2NTAzMTU0N30.yNhkiWGlVny3_3GJjH6CKy7xlzhJ4VcgtjxD_kGofuY"}'::jsonb,
      body := json_build_object(
        'table', TG_TABLE_NAME,
        'data', row_to_json(NEW)
      )::text
    );
  EXCEPTION 
    WHEN OTHERS THEN
      -- Log the error but don't fail the main insert
      RAISE WARNING 'Email notification failed: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the old function
DROP FUNCTION IF EXISTS sync_to_google_sheets();

-- Update triggers to use the new email-only function
DROP TRIGGER IF EXISTS sync_applications_to_sheets ON applications;
CREATE TRIGGER send_application_email_notification
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_notification();

DROP TRIGGER IF EXISTS sync_course_applications_to_sheets ON course_applications;
CREATE TRIGGER send_course_application_email_notification
  AFTER INSERT ON course_applications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_notification();
