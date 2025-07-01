
-- First, let's check if the triggers exist and recreate them properly
DROP TRIGGER IF EXISTS send_application_email_notification ON applications;
DROP TRIGGER IF EXISTS send_course_application_email_notification ON course_applications;

-- Recreate the email notification function with better error handling
CREATE OR REPLACE FUNCTION send_email_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Log that the trigger was fired
  RAISE LOG 'Email notification trigger fired for table: %', TG_TABLE_NAME;
  
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
    RAISE LOG 'Email notification HTTP request sent successfully';
  EXCEPTION 
    WHEN OTHERS THEN
      -- Log the error but don't fail the main insert
      RAISE WARNING 'Email notification failed: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate triggers for both tables
CREATE TRIGGER send_application_email_notification
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_notification();

CREATE TRIGGER send_course_application_email_notification
  AFTER INSERT ON course_applications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_notification();
