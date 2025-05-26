
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Award, Filter, Users, Star } from "lucide-react";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

  const courseCategories = [
    { value: "all", label: "All Categories" },
    { value: "business", label: "Business Administration" },
    { value: "management", label: "Management" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "project", label: "Project Management" }
  ];

  const durations = [
    { value: "all", label: "All Durations" },
    { value: "short", label: "1-4 weeks" },
    { value: "medium", label: "1-3 months" },
    { value: "long", label: "3-6 months" }
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const formats = [
    { value: "all", label: "All Formats" },
    { value: "online", label: "Online" },
    { value: "hybrid", label: "Hybrid" },
    { value: "self-paced", label: "Self-Paced" }
  ];

  const sampleCourses = [
    {
      title: "Business Administration Fundamentals",
      category: "Business Administration",
      duration: "6 weeks",
      level: "Beginner",
      format: "Online",
      description: "Comprehensive introduction to business administration principles and practices.",
      features: ["IAM Certification", "Flexible Schedule", "Expert Instructors", "Career Support"]
    },
    {
      title: "Advanced Project Management",
      category: "Project Management",
      duration: "8 weeks",
      level: "Advanced",
      format: "Hybrid",
      description: "Master advanced project management methodologies and leadership skills.",
      features: ["IAM Certification", "Real Projects", "Industry Mentorship", "Portfolio Building"]
    },
    {
      title: "Digital Marketing Strategy",
      category: "Marketing",
      duration: "4 weeks",
      level: "Intermediate",
      format: "Self-Paced",
      description: "Learn modern digital marketing strategies and implementation techniques.",
      features: ["IAM Certification", "Hands-on Practice", "Case Studies", "Tools Access"]
    }
  ];

  return (
    <div className="min-h-screen py-20 warm-section mandala-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of professionally certified courses designed to advance your career
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-accent p-6 rounded-lg shadow-md mb-12 border-l-4 border-l-orange-400">
          <div className="flex items-center mb-6">
            <Filter className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Courses</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {courseCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleCourses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale border-l-4 border-l-orange-400">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-gradient-accent text-orange-800 border-0">{course.category}</Badge>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-sm text-gray-600">IAM Certified</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800">{course.level}</Badge>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">{course.format}</Badge>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Course Features:</h4>
                  <ul className="space-y-1">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gradient-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full bg-gradient-primary hover:opacity-90 text-white border-0">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Template Information */}
        <section className="bg-gradient-accent p-8 rounded-lg border-t-4 border-t-pink-400">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complete Course Details Available
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-l-4 border-l-orange-400">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Comprehensive course descriptions and objectives</p>
              </CardContent>
            </Card>

            <Card className="text-center border-l-4 border-l-orange-400">
              <CardHeader>
                <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Clear learning objectives and skill development goals</p>
              </CardContent>
            </Card>

            <Card className="text-center border-l-4 border-l-orange-400">
              <CardHeader>
                <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Certification Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">IAM certification requirements and benefits</p>
              </CardContent>
            </Card>

            <Card className="text-center border-l-4 border-l-orange-400">
              <CardHeader>
                <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Instructor Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Expert instructors with industry experience</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 mb-4">
              Each course includes detailed modules, prerequisites, duration, and schedule information
            </p>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0">
              View All Course Details
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Courses;
