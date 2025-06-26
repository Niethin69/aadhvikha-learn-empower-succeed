
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Upload, Send, User, MapPin, FileText, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DocumentViewer from "./DocumentViewer";
import { 
  sanitizeText, 
  sanitizeEmail, 
  sanitizePhone, 
  sanitizePassportIC,
  validateFileType,
  validateFileSize 
} from "@/utils/inputSanitizer";
import { formSubmissionLimiter, fileUploadLimiter } from "@/utils/rateLimiter";

interface CourseApplicationFormProps {
  children: React.ReactNode;
}

const CourseApplicationForm = ({ children }: CourseApplicationFormProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    street: "",
    streetSecond: "",
    state: "",
    postcode: "",
    country: "",
    passportIc: "",
    documentFile: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    
    // Apply appropriate sanitization based on field type
    switch (field) {
      case 'email':
        sanitizedValue = sanitizeEmail(value);
        break;
      case 'phone':
        sanitizedValue = sanitizePhone(value);
        break;
      case 'passportIc':
        sanitizedValue = sanitizePassportIC(value);
        break;
      default:
        sanitizedValue = sanitizeText(value);
        break;
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type and size
      if (!validateFileType(file)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, JPG, JPEG, or PNG file.",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateFileSize(file)) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      // Check rate limiting for file uploads
      if (!fileUploadLimiter.isAllowed('file-upload')) {
        const timeUntilReset = fileUploadLimiter.getTimeUntilReset('file-upload');
        toast({
          title: "Upload Limit Reached",
          description: `Please wait ${Math.ceil(timeUntilReset / 1000)} seconds before uploading another file.`,
          variant: "destructive",
        });
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, documentFile: file }));
    setUploadedFileUrl(""); // Reset uploaded file URL when new file is selected
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    // Use a general folder for public uploads
    const filePath = `public/${fileName}`;

    console.log("Uploading file:", filePath);

    const { data, error } = await supabase.storage
      .from('course-documents')
      .upload(filePath, file);

    if (error) {
      console.error("File upload error:", error);
      throw error;
    }

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('course-documents')
      .getPublicUrl(filePath);

    console.log("File uploaded successfully with public URL");
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    if (!formSubmissionLimiter.isAllowed('form-submission')) {
      const timeUntilReset = formSubmissionLimiter.getTimeUntilReset('form-submission');
      toast({
        title: "Submission Limit Reached",
        description: `Please wait ${Math.ceil(timeUntilReset / 60000)} minutes before submitting another application.`,
        variant: "destructive",
      });
      return;
    }
    
    // Check if terms are accepted
    if (!termsAccepted) {
      toast({
        title: "Terms Agreement Required",
        description: "Please accept the terms and conditions to submit your application.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate required fields
    const requiredFields = [
      'fullName', 'dateOfBirth', 'gender', 'email', 'phone',
      'street', 'state', 'postcode', 'country', 'passportIc'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0 || !formData.documentFile) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields and upload the required document.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = "";
      
      // Upload file to Supabase Storage
      if (formData.documentFile) {
        fileUrl = await uploadFile(formData.documentFile);
        setUploadedFileUrl(fileUrl);
      }

      // Prepare the data for Supabase insertion (with sanitized values)
      const applicationData = {
        full_name: sanitizeText(formData.fullName),
        date_of_birth: sanitizeText(formData.dateOfBirth),
        gender: formData.gender,
        email: sanitizeEmail(formData.email),
        phone: sanitizePhone(formData.phone),
        street: sanitizeText(formData.street),
        street_second: formData.streetSecond ? sanitizeText(formData.streetSecond) : null,
        state: sanitizeText(formData.state),
        postcode: sanitizeText(formData.postcode),
        country: sanitizeText(formData.country),
        passport_ic: sanitizePassportIC(formData.passportIc),
        document_file_name: formData.documentFile?.name || null,
        document_file_url: fileUrl,
        terms_accepted: termsAccepted,
        course_code: 'MGT1800',
        user_id: null // No authentication required
      };

      console.log("Submitting application data:", applicationData);

      // Insert the application data into Supabase
      const { data, error } = await supabase
        .from('course_applications')
        .insert([applicationData])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Application submitted successfully:", data);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll review it and get back to you within 24-48 hours.",
      });
      
      setIsOpen(false);
      
      // Reset form
      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phone: "",
        street: "",
        streetSecond: "",
        state: "",
        postcode: "",
        country: "",
        passportIc: "",
        documentFile: null,
      });
      setTermsAccepted(false);
      setUploadedFileUrl("");

    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-6 w-6 text-orange-500" />
            Course Application Form
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Please fill out all required information to apply for the Certified Contemporary Management course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <Card className="border-l-4 border-l-orange-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-orange-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth (DD/MM/YYYY) *</Label>
                  <Input
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    placeholder="DD/MM/YYYY"
                    pattern="\d{2}/\d{2}/\d{4}"
                    required
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="others" id="others" />
                    <Label htmlFor="others">Others</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+60123456789"
                    required
                    maxLength={20}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information Section */}
          <Card className="border-l-4 border-l-pink-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-pink-500" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="Enter your street address"
                  required
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetSecond">Street (Second line)</Label>
                <Input
                  id="streetSecond"
                  value={formData.streetSecond}
                  onChange={(e) => handleInputChange('streetSecond', e.target.value)}
                  placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
                  maxLength={200}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                    required
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode *</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => handleInputChange('postcode', e.target.value)}
                    placeholder="Enter postcode"
                    required
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Enter country"
                    required
                    maxLength={50}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Section */}
          <Card className="border-l-4 border-l-orange-400">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passportIc">Passport Number / IC Number *</Label>
                <Input
                  id="passportIc"
                  value={formData.passportIc}
                  onChange={(e) => handleInputChange('passportIc', e.target.value)}
                  placeholder="Enter passport or IC number"
                  required
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentFile">Copy of Passport / IC *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="documentFile"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                  {uploadedFileUrl && formData.documentFile && (
                    <DocumentViewer fileName={formData.documentFile.name} fileUrl={uploadedFileUrl}>
                      <Button type="button" variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DocumentViewer>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Accepted formats: PDF, JPG, JPEG, PNG (Max 10MB)
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Agreement and Submit */}
          <div className="space-y-6">
            <div className="bg-gradient-accent p-6 rounded-lg border-l-4 border-l-pink-400">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Upon submitting this form, I hereby consent to adhere to all the policies and guidelines set forth by Aadhvikha Ventures. Furthermore, I authorize the utilization of my contact details for communication purposes related to the application.
              </p>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  I accept the terms and conditions stated above *
                </Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                size="lg"
                disabled={!termsAccepted || isSubmitting}
                className="bg-gradient-primary hover:opacity-90 text-white border-0 px-8 py-3 text-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="h-5 w-5 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseApplicationForm;
