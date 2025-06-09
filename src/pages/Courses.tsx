
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, Award, User, Globe, Download, Info, CheckCircle } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

const Courses = () => {
  const learningOutcomes = [
    "Fundamentals of AI, big data, blockchain, and cybersecurity in a managerial context",
    "Strategic use of emerging technologies in decision-making",
    "Implementation of data-driven innovation and cybersecurity strategies",
    "Risk and ethics in adopting new technologies",
    "Collaboration between technical and managerial teams for business success"
  ];

  const moduleContent = {
    "ai-bigdata": {
      title: "AI & Big Data in Management",
      topics: [
        "Introduction to AI and its business applications",
        "Ethics of AI",
        "Big Data overview and trends",
        "Analytics tools for managers"
      ]
    },
    "blockchain": {
      title: "Blockchain for Managers",
      topics: [
        "Blockchain basics and applications",
        "Use in supply chain and operations",
        "Smart contracts",
        "Blockchain-enhanced cybersecurity"
      ]
    },
    "cybersecurity": {
      title: "Cybersecurity for Managers",
      topics: [
        "Cyber threats and challenges",
        "Security frameworks and best practices",
        "Risk assessment and crisis response",
        "Business continuity planning"
      ]
    }
  };

  return (
    <div className="min-h-screen py-20 warm-section mandala-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Course
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advance your career with our professionally certified management course designed for today's leaders
          </p>
        </div>

        {/* Main Course Card */}
        <Card className="mb-12 shadow-xl border-l-4 border-l-orange-400 animate-fade-in">
          <CardHeader className="bg-gradient-accent rounded-t-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-gradient-primary text-white border-0 text-sm px-3 py-1">
                    MGT1800
                  </Badge>
                  <Badge variant="outline" className="border-pink-300 text-pink-700">
                    Professional Development
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Certified Contemporary Management
                </CardTitle>
                <CardDescription className="text-lg text-gray-700">
                  This course equips managers and professionals with a foundational understanding of emerging technologies, focusing on artificial intelligence (AI), big data, blockchain, and cybersecurity.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-orange-600">
                <Award className="h-6 w-6" />
                <span className="font-semibold">IAM Certified</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Course Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gradient-soft rounded-lg border-l-4 border-l-orange-300">
                <Clock className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-900">Duration</p>
                  <p className="text-gray-600">1 week (40 hours)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-soft rounded-lg border-l-4 border-l-pink-300">
                <Globe className="h-6 w-6 text-pink-500" />
                <div>
                  <p className="font-semibold text-gray-900">Delivery Mode</p>
                  <p className="text-gray-600">100% Online (Self-paced)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-soft rounded-lg border-l-4 border-l-orange-300">
                <User className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-900">Instructor</p>
                  <p className="text-gray-600">Syed Helmy bin Syed Abu Bakar</p>
                </div>
              </div>
            </div>

            {/* Course Overview */}
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-orange-500" />
                Course Overview
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Participants will gain practical insights, strategic decision-making skills, and risk mitigation techniques to apply these technologies effectively in real-world management settings.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Learning Outcomes */}
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-orange-100 hover-scale">
                    <div className="w-3 h-3 bg-gradient-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{outcome}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Program Modules */}
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Modules</h3>
              <Tabs defaultValue="ai-bigdata" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gradient-accent">
                  <TabsTrigger value="ai-bigdata" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
                    AI & Big Data
                  </TabsTrigger>
                  <TabsTrigger value="blockchain" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
                    Blockchain
                  </TabsTrigger>
                  <TabsTrigger value="cybersecurity" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
                    Cybersecurity
                  </TabsTrigger>
                </TabsList>

                {Object.entries(moduleContent).map(([key, module]) => (
                  <TabsContent key={key} value={key} className="mt-6">
                    <Card className="border-l-4 border-l-orange-400">
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900">{module.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                              <span className="text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            <Separator className="my-8" />

            {/* Prerequisites & Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-l-4 border-l-pink-400">
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Basic knowledge or work experience in management.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-400">
                <CardHeader>
                  <CardTitle className="text-lg">Tools Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">Moodle</Badge>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-800">Perlego</Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">OpenEduCat</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certification */}
            <Card className="bg-gradient-accent border-t-4 border-t-pink-400 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Award className="h-12 w-12 text-orange-500" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">IAM Certification</h4>
                    <p className="text-gray-700">Upon completion, learners receive an internationally recognized IAM certification.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Course Outline
              </Button>
              <ApplicationForm>
                <Button size="lg" variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Request Information
                </Button>
              </ApplicationForm>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Courses;
