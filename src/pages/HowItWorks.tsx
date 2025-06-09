
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, BookOpen, Award, Download, Clock, Book, Smartphone } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <Search className="h-12 w-12 text-orange-500" />,
      title: "Browse Courses",
      description: "Explore our comprehensive catalog of professionally certified courses. Use filters to find programs that match your career goals, schedule, and skill level."
    },
    {
      number: "02",
      icon: <FileText className="h-12 w-12 text-orange-500" />,
      title: "Apply Online",
      description: "Complete our simple online application process. Provide your information, select your preferred course, and submit your application for quick review."
    },
    {
      number: "03",
      icon: <BookOpen className="h-12 w-12 text-orange-500" />,
      title: "Start Learning",
      description: "Access your course materials immediately upon enrollment. Begin your learning journey with comprehensive resources, expert instruction, and flexible scheduling."
    },
    {
      number: "04",
      icon: <Award className="h-12 w-12 text-orange-500" />,
      title: "Get Certified",
      description: "Complete your course requirements and assessments to earn your internationally recognized IAM certification, enhancing your professional credentials."
    }
  ];

  const learningFeatures = [
    {
      icon: <Download className="h-8 w-8 text-orange-500" />,
      title: "Instant Access",
      description: "Get immediate access to all course materials upon enrollment"
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Flexible Schedule",
      description: "Learn at your own pace with 24/7 access to course content"
    },
    {
      icon: <Book className="h-8 w-8 text-orange-500" />,
      title: "Comprehensive Resources",
      description: "Access videos, readings, assignments, and supplementary materials"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-500" />,
      title: "Any Device",
      description: "Study on your computer, tablet, or smartphone from anywhere"
    }
  ];

  return (
    <div className="min-h-screen py-20 warm-section mandala-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with your professional development journey is simple and straightforward
          </p>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale h-full border-l-4 border-l-orange-400">
                  <CardHeader>
                    <div className="relative mb-4">
                      <div className="absolute -top-4 -right-4 bg-gradient-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        {step.number}
                      </div>
                      <div className="flex justify-center mb-4">
                        {step.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {/* Connector Arrow (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-orange-300"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-orange-300 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Learning Format */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Learning Format Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our flexible learning platform is designed to fit your lifestyle and learning preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover-scale border-l-4 border-l-orange-400">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
