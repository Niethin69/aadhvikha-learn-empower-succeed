
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, User, Mail, Phone, BookOpen, MessageSquare } from "lucide-react";

interface ApplicationFormProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}

const ApplicationForm = ({ trigger, children }: ApplicationFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const courseOptions = [
    "Digital Marketing Fundamentals",
    "Social Media Strategy & Management",
    "Content Creation & Copywriting",
    "Email Marketing Mastery",
    "SEO & Google Analytics",
    "PPC Advertising (Google Ads & Facebook)",
    "E-commerce Marketing",
    "Brand Development & Strategy",
    "Advanced Analytics & Data Interpretation",
    "Marketing Automation"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { fullName, email, phone, course } = formData;
    
    if (!fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    if (!phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return false;
    }

    if (!course) {
      toast({
        title: "Validation Error",
        description: "Please select a course you're interested in.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          message: formData.message || null
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest! We'll contact you within 24 hours.",
        variant: "default"
      });

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        message: ""
      });

      // Close the sheet
      setIsOpen(false);

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="h-6 w-6 text-orange-500 mr-2" />
            Request Course Information
          </SheetTitle>
          <SheetDescription>
            Fill out the form below and we'll get back to you within 24 hours with detailed course information and next steps.
          </SheetDescription>
        </SheetHeader>

        <Card className="mt-6 border-t-4 border-t-orange-400">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Application Details</CardTitle>
            <CardDescription>
              Please provide your information so we can recommend the best courses for your goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium text-gray-700 flex items-center">
                  <User className="h-4 w-4 mr-2 text-orange-500" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-gray-700 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-orange-500" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-orange-500" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course" className="text-base font-medium text-gray-700 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-orange-500" />
                  Preferred Course *
                </Label>
                <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="Select a course you're interested in" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium text-gray-700 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-orange-500" />
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your goals, experience level, or any specific questions..."
                  className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 text-white border-0 text-lg py-3 transition-all duration-200 hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-gradient-accent rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              We'll review your application within 24 hours
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              You'll receive detailed course information via email
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              A course advisor will contact you to discuss your goals
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ApplicationForm;
