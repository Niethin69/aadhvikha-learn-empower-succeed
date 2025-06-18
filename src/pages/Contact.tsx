
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send, BookOpen, Users, Award } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const Contact = () => {
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

        {/* Main Contact Section */}
        <div className="max-w-4xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">aadhvikha@outlook.com</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
              <CardContent className="p-8 text-center">
                <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">+60139971315</p>
                <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>
          </div>

          {/* Main CTA Section */}
          <Card className="bg-gradient-accent border-t-4 border-t-orange-400 mb-16">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Take the first step towards advancing your career with our Certified Contemporary Management course. 
                Fill out our application form and we'll get back to you within 24 hours.
              </p>
              
              <ApplicationForm>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-white border-0 text-lg px-8 py-4 transition-all duration-200 hover:scale-105"
                >
                  <Send className="h-6 w-6 mr-3" />
                  Request Information
                </Button>
              </ApplicationForm>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-sm text-gray-600">Our team of education specialists is here to guide you</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Award className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Certified Courses</h3>
                <p className="text-sm text-gray-600">Internationally recognized certification programs</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <BookOpen className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Quality Education</h3>
                <p className="text-sm text-gray-600">Comprehensive curriculum designed for success</p>
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
