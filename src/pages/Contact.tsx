
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const Contact = () => {
  const [contactMethod, setContactMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen py-20 warm-section mandala-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you on your educational journey. Get in touch with us for any questions or support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@aadhvikhaventures.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Phone className="h-8 w-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">123 Education Street</p>
                      <p className="text-gray-600">Learning City, LC 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
              <div className="flex flex-col space-y-3">
                <ApplicationForm>
                  <Button className="bg-gradient-primary hover:opacity-90 text-white border-0 justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Course Information
                  </Button>
                </ApplicationForm>
                <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-pink-400">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send us an Inquiry
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium text-gray-700">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-method" className="text-base font-medium text-gray-700">
                      Preferred Contact Method *
                    </Label>
                    <Select value={contactMethod} onValueChange={setContactMethod}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your preferred contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {contactMethod === "email" && (
                    <div>
                      <Label htmlFor="email" className="text-base font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className="mt-2"
                        required
                      />
                    </div>
                  )}

                  {contactMethod === "phone" && (
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-2"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="inquiry" className="text-base font-medium text-gray-700">
                      Inquiry Message *
                    </Label>
                    <Textarea
                      id="inquiry"
                      value={formData.inquiry}
                      onChange={(e) => handleInputChange("inquiry", e.target.value)}
                      placeholder="Please describe your inquiry or questions..."
                      className="mt-2 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white border-0 text-lg py-3"
                    disabled={!contactMethod || !formData.name || !formData.inquiry}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-8 bg-gradient-accent border-l-4 border-l-orange-400">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3"></div>
                    We'll review your inquiry within 24 hours
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3"></div>
                    A member of our team will contact you using your preferred method
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3"></div>
                    We'll provide personalized guidance and answer all your questions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* IAM Partnership Section */}
        <section className="mt-20">
          <Card className="bg-gradient-accent border-orange-200 border-t-4 border-t-pink-400">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Certified by Institute of Administrative Management (IAM)
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-lg">IAM</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                All our courses are accredited by the Institute of Administrative Management, ensuring international recognition and professional credibility. Learn more about our certification partner and their standards.
              </p>
              <a 
                href="https://instam.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors duration-200"
              >
                Visit IAM Website
                <Send className="h-5 w-5 ml-2" />
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
