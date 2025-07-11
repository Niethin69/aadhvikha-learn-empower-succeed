
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Award, BookOpen } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-orange-500" />,
      title: "Empowerment",
      description: "We believe in empowering individuals through quality education and professional development"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      title: "Innovation",
      description: "We continuously innovate our teaching methods and course content to stay ahead of industry trends"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from course design to student support"
    }
  ];

  return (
    <div className="min-h-screen py-20 warm-section mandala-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <section className="mb-20">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Aadhvikha Ventures
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12 hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Aadhvikha Ventures is a forward-thinking educational organization dedicated to providing high-quality, accessible, and industry-relevant short courses that empower professionals to advance their careers and achieve their goals.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We specialize in delivering certified programs that bridge the gap between academic learning and practical industry requirements. Our courses are designed by industry experts and delivered through innovative learning methods that cater to the needs of modern professionals.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With a commitment to excellence and a passion for education, we strive to be the preferred choice for professionals seeking to enhance their skills, expand their knowledge, and accelerate their career growth through internationally recognized certifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 hover-scale border-t-4 border-t-pink-400">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-orange-500 mr-3" />
                  <CardTitle className="text-2xl font-bold text-gray-900">Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide accessible, high-quality professional education that empowers individuals to achieve their career aspirations and contribute meaningfully to their organizations and communities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover-scale border-t-4 border-t-pink-400">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-orange-500 mr-3" />
                  <CardTitle className="text-2xl font-bold text-gray-900">Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be a globally recognized leader in professional education, known for our innovative learning solutions, industry relevance, and transformative impact on learners' careers.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover-scale border-l-4 border-l-orange-400">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifying Partner Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Certifying Partner</h2>
            <Badge className="bg-gradient-primary text-white text-lg px-4 py-2 mb-8 border-0">
              Internationally Recognized
            </Badge>
          </div>

          <Card className="max-w-4xl mx-auto hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 bg-gradient-accent rounded-lg flex items-center justify-center shadow-lg">
                  <Award className="h-16 w-16 text-orange-500" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                Institute of Administrative Management (IAM)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The Institute of Administrative Management (IAM) is a leading professional body that has been setting standards in business and administrative excellence for over 60 years. As our certifying partner, IAM ensures that all our courses meet the highest international standards and provide learners with globally recognized qualifications.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                IAM certifications are respected by employers worldwide and demonstrate a commitment to professional development and excellence in administrative and business practices.
              </p>
              <a 
                href="https://instam.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors duration-200"
              >
                Visit IAM Website →
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
