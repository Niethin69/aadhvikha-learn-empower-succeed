
-- Test that the http extension is working by making a simple request
-- This will help us verify that the triggers can now successfully call the edge function
DO $$
BEGIN
  -- Test the HTTP extension
  PERFORM net.http_post(
    url := 'https://ksjpfxzotvedzeiekayh.supabase.co/functions/v1/send-notification-email',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanBmeHpvdHZlZHplaWVrYXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTU1NDcsImV4cCI6MjA2NTAzMTU0N30.yNhkiWGlVny3_3GJjH6CKy7xlzhJ4VcgtjxD_kGofuY"}'::jsonb,
    body := json_build_object(
      'table', 'test',
      'data', json_build_object('test', 'value')
    )::text
  );
  
  RAISE NOTICE 'HTTP test completed successfully';
EXCEPTION 
  WHEN OTHERS THEN
    RAISE NOTICE 'HTTP test failed: %', SQLERRM;
END $$;
