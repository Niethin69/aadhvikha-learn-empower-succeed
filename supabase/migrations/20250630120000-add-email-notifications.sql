
-- Update the sync function to also send email notifications
CREATE OR REPLACE FUNCTION sync_to_google_sheets()
RETURNS TRIGGER AS $$
BEGIN
  -- Sync to Google Sheets (with error handling)
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
