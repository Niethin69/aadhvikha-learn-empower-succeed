
-- Fix the email notification function with secure search_path
CREATE OR REPLACE FUNCTION send_email_notification()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = 'public', 'net'
LANGUAGE plpgsql
AS $$
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
$$;
