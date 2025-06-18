
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Upload, Send, User, MapPin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseApplicationFormProps {
  children: React.ReactNode;
}

const CourseApplicationForm = ({ children }: CourseApplicationFormProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, documentFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetSecond">Street (Second line)</Label>
                <Input
                  id="streetSecond"
                  value={formData.streetSecond}
                  onChange={(e) => handleInputChange('streetSecond', e.target.value)}
                  placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
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
                </div>
                <p className="text-sm text-gray-500">Accepted formats: PDF, JPG, JPEG, PNG (Max 10MB)</p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Agreement and Submit */}
          <div className="space-y-6">
            <div className="bg-gradient-accent p-6 rounded-lg border-l-4 border-l-pink-400">
              <p className="text-sm text-gray-700 leading-relaxed">
                Upon submitting this form, I hereby consent to adhere to all the policies and guidelines set forth by Aadhvikha Ventures. Furthermore, I authorize the utilization of my contact details for communication purposes related to the application.
              </p>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-white border-0 px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Application
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseApplicationForm;
