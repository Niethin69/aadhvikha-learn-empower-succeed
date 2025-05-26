
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Star, BookOpen, Award, Clock, Download } from "lucide-react";

const Homepage = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-teal-600" />,
      title: "Accredited by Institute of Administrative Management (IAM)",
      description: "Internationally recognized certifications"
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-600" />,
      title: "Flexible Learning",
      description: "Learn at your own pace, anywhere, anytime"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-teal-600" />,
      title: "Industry-Aligned Curriculum",
      description: "Courses designed with current industry needs"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
      title: "CPD improvement",
      description: "Continuous Professional Development enhancement"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent course structure and comprehensive materials. The certification helped advance my career significantly.",
      course: "Business Administration"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Flexible learning format perfect for working professionals. Highly recommend!",
      course: "Project Management"
    },
    {
      name: "Emma Williams",
      rating: 5,
      comment: "Outstanding support from instructors and valuable industry insights throughout the program.",
      course: "Digital Marketing"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering careers through certified short courses
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn. Certify. Succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-4">
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 text-lg px-8 py-4">
                Request Information
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-teal-600 mb-2">1,000+</div>
              <div className="text-lg text-gray-600">Professionals Certified</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-lg text-gray-600">Student Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Aadhvikha Ventures?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide world-class education with international recognition
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover-scale">
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
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Reviews
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our successful graduates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {review.name}
                    </CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Badge variant="secondary">{review.course}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers through our certified programs
          </p>
          <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-4">
            Start Learning Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
