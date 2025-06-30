
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { 
  FileSpreadsheet, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  ExternalLink,
  Zap
} from "lucide-react";

const GoogleSheetsSync = () => {
  const { toast } = useToast();
  const [googleSheetsId, setGoogleSheetsId] = useState("");
  const [googleCredentials, setGoogleCredentials] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('sync-google-sheets', {
        body: { test: true }
      });
      
      if (error && error.message?.includes('credentials not configured')) {
        setIsConfigured(false);
      } else {
        setIsConfigured(true);
      }
    } catch (error) {
      setIsConfigured(false);
    }
  };

  const testSync = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-google-sheets', {
        body: {
          table: 'applications',
          operation: 'INSERT',
          data: {
            id: 'test-' + Date.now(),
            submitted_at: new Date().toISOString(),
            full_name: 'Test User',
            email: 'test@example.com',
            phone: '+1234567890',
            course: 'MGT1800',
            message: 'Test sync message'
          }
        }
      });

      if (error) {
        throw error;
      }

      setSyncStatus('success');
      toast({
        title: "Test Successful!",
        description: "Test data has been synced to your Google Sheet.",
      });
    } catch (error) {
      console.error('Test sync error:', error);
      setSyncStatus('error');
      toast({
        title: "Test Failed",
        description: "Failed to sync test data. Please check your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const sampleCredentials = `{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"
}`;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <FileSpreadsheet className="h-8 w-8 text-green-600" />
          Google Sheets Sync
        </h1>
        <p className="text-gray-600">
          Automatically sync your application data to Google Sheets in real-time
        </p>
      </div>

      {/* Configuration Status */}
      <Card className="border-l-4 border-l-blue-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            {isConfigured ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Configured
                </Badge>
                <span className="text-sm text-gray-600">
                  Google Sheets sync is ready and active
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Not Configured
                </Badge>
                <span className="text-sm text-gray-600">
                  Setup required to enable sync
                </span>
              </>
            )}
          </div>
          
          {isConfigured && (
            <div className="flex gap-2">
              <Button onClick={testSync} disabled={isLoading} size="sm">
                <Zap className="h-4 w-4 mr-2" />
                {isLoading ? "Testing..." : "Test Sync"}
              </Button>
              
              {syncStatus === 'success' && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Test Passed
                </Badge>
              )}
              
              {syncStatus === 'error' && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Test Failed
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>
            Follow these steps to configure Google Sheets synchronization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-semibold">
                1
              </div>
              <h3 className="font-semibold">Create Google Cloud Project & Enable API</h3>
            </div>
            <div className="ml-8 space-y-2">
              <p className="text-sm text-gray-600">
                1. Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                  Google Cloud Console <ExternalLink className="h-3 w-3" />
                </a>
              </p>
              <p className="text-sm text-gray-600">2. Create a new project or select existing one</p>
              <p className="text-sm text-gray-600">3. Enable the Google Sheets API</p>
              <p className="text-sm text-gray-600">4. Create a Service Account and download the JSON credentials</p>
            </div>
          </div>

          <Separator />

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-semibold">
                2
              </div>
              <h3 className="font-semibold">Create Google Sheet & Get ID</h3>
            </div>
            <div className="ml-8 space-y-2">
              <p className="text-sm text-gray-600">
                1. Create a new Google Sheet with these exact sheet names:
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-mono text-sm">• Applications</p>
                <p className="font-mono text-sm">• Course Applications</p>
              </div>
              <p className="text-sm text-gray-600">
                2. Copy the Sheet ID from the URL (the long string between /spreadsheets/d/ and /edit)
              </p>
              <p className="text-sm text-gray-600">
                3. Share the sheet with your service account email (found in the JSON credentials)
              </p>
            </div>
          </div>

          <Separator />

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-semibold">
                3
              </div>
              <h3 className="font-semibold">Configure Supabase Secrets</h3>
            </div>
            <div className="ml-8 space-y-4">
              <p className="text-sm text-gray-600">
                Add these secrets to your Supabase project:
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="sheets-id" className="text-sm font-medium">
                    GOOGLE_SHEETS_ID
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="sheets-id"
                      value={googleSheetsId}
                      onChange={(e) => setGoogleSheetsId(e.target.value)}
                      placeholder="Enter your Google Sheets ID"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(googleSheetsId, "Google Sheets ID")}
                      disabled={!googleSheetsId}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="credentials" className="text-sm font-medium">
                    GOOGLE_SHEETS_CREDENTIALS (JSON)
                  </Label>
                  <div className="space-y-2 mt-1">
                    <Textarea
                      id="credentials"
                      value={googleCredentials}
                      onChange={(e) => setGoogleCredentials(e.target.value)}
                      placeholder="Paste your service account JSON credentials here"
                      rows={8}
                      className="font-mono text-xs"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(googleCredentials, "Google Credentials")}
                        disabled={!googleCredentials}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGoogleCredentials(sampleCredentials)}
                      >
                        Load Sample Format
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Important:</p>
                    <p className="text-sm text-amber-700">
                      You need to add these secrets directly in your Supabase dashboard under 
                      Settings → Edge Functions → Environment Variables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Real-time Sync:</strong> Every time a new application is submitted, it's automatically added to your Google Sheet
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Separate Sheets:</strong> General applications and course applications are synced to different sheets
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>Secure:</strong> All communication is encrypted and your credentials are stored securely in Supabase
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">
                <strong>No Manual Export:</strong> Data flows automatically, so you always have the latest information
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleSheetsSync;
