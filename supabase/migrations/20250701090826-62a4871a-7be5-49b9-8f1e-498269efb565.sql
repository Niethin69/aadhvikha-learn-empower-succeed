
-- First, let's completely drop and recreate everything to ensure it's working
DROP TRIGGER IF EXISTS send_application_email_notification ON applications;
DROP TRIGGER IF EXISTS send_course_application_email_notification ON course_applications;
DROP FUNCTION IF EXISTS send_email_notification();

-- Create a simple test function first to verify triggers work
CREATE OR REPLACE FUNCTION send_email_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Simple log that should always appear
  RAISE NOTICE 'TRIGGER FIRED: Table %, Operation %, ID %', TG_TABLE_NAME, TG_OP, NEW.id;
  
  -- Try the HTTP call but don't let it fail the whole operation
  BEGIN
    PERFORM net.http_post(
      url := 'https://ksjpfxzotvedzeiekayh.supabase.co/functions/v1/send-notification-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanBmeHpvdHZlZHplaWVrYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTU1NDcsImV4cCI6MjA2NTAzMTU0N30.yNhkiWGlVny3_3GJjH6CKy7xlzhJ4VcgtjxD_kGofuY"}'::jsonb,
      body := json_build_object(
        'table', TG_TABLE_NAME,
        'data', row_to_json(NEW)
      )::text
    );
    RAISE NOTICE 'HTTP request completed successfully';
  EXCEPTION 
    WHEN OTHERS THEN
      RAISE NOTICE 'HTTP request failed: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the triggers
CREATE TRIGGER send_application_email_notification
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_notification();

CREATE TRIGGER send_course_application_email_notification
  AFTER INSERT ON course_applications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_notification();

-- Test the trigger manually by inserting a test record
INSERT INTO applications (full_name, email, phone, course) 
VALUES ('Test User', 'test@example.com', '+1234567890', 'Test Course');
