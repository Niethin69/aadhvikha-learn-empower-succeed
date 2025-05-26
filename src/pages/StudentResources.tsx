
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, BookOpen, Users, Download, ExternalLink, MessageCircle } from "lucide-react";

const StudentResources = () => {
  const faqData = {
    enrollment: [
      {
        question: "How do I enroll in a course?",
        answer: "You can enroll by browsing our course catalog, selecting your desired program, and completing the online application process. Once submitted, you'll receive confirmation and access details within 24 hours."
      },
      {
        question: "What are the prerequisites for enrollment?",
        answer: "Prerequisites vary by course. Most of our programs are designed for working professionals and require basic computer literacy and internet access. Specific requirements are listed on each course page."
      },
      {
        question: "Can I enroll in multiple courses simultaneously?",
        answer: "Yes, you can enroll in multiple courses. However, we recommend considering your time commitments and workload to ensure you can dedicate adequate attention to each program."
      },
      {
        question: "Is there an enrollment deadline?",
        answer: "Most of our courses have rolling admissions, allowing you to start at your convenience. Some specialized programs may have specific start dates, which will be clearly indicated on the course page."
      }
    ],
    certification: [
      {
        question: "What certifications do you offer?",
        answer: "We offer internationally recognized certifications through our partnership with the Institute of Administrative Management (IAM). All our courses lead to professional certifications that are respected by employers worldwide."
      },
      {
        question: "How long does it take to receive my certificate?",
        answer: "Upon successful completion of all course requirements and assessments, digital certificates are typically issued within 5-7 business days. Physical certificates can be requested and will be mailed within 2-3 weeks."
      },
      {
        question: "Are the certifications internationally recognized?",
        answer: "Yes, all our certifications are issued by IAM (Institute of Administrative Management), which is internationally recognized and respected by employers and institutions worldwide."
      },
      {
        question: "Can I verify my certification online?",
        answer: "Yes, all our certifications can be verified online through the IAM verification system. Each certificate includes a unique verification code for employer verification purposes."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, bank transfers, and offer installment payment plans for select courses. Payment processing is secure and encrypted."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment plans for most courses. You can choose to pay in installments over 3, 6, or 12 months depending on the course duration and fee structure."
      },
      {
        question: "Is there a refund policy?",
        answer: "We offer a 14-day money-back guarantee from the course start date. If you're not satisfied with the course content or format, you can request a full refund within this period."
      },
      {
        question: "Are there any additional fees?",
        answer: "Course fees are all-inclusive and cover all learning materials, assessments, and certification. There are no hidden fees. Optional services like expedited certificate delivery may have additional charges."
      }
    ],
    content: [
      {
        question: "How is the course content delivered?",
        answer: "Course content is delivered through our online learning platform, featuring video lectures, interactive modules, downloadable resources, and assignments. You can access content 24/7 from any device."
      },
      {
        question: "Can I download course materials?",
        answer: "Yes, most course materials including PDFs, worksheets, and supplementary resources can be downloaded for offline study. Video content is available for streaming with limited download options."
      },
      {
        question: "How long do I have access to course materials?",
        answer: "You have lifetime access to course materials once enrolled. This includes all updates and revisions to the content, ensuring your resources remain current with industry standards."
      },
      {
        question: "Are there live sessions or is it all self-paced?",
        answer: "Our courses are primarily self-paced for maximum flexibility. However, some programs include optional live webinars, Q&A sessions, and discussion forums for interactive learning."
      }
    ],
    support: [
      {
        question: "What kind of student support do you provide?",
        answer: "We provide comprehensive student support including technical assistance, academic guidance, career counseling, and 24/7 access to our support team via email, chat, and phone."
      },
      {
        question: "How can I contact an instructor?",
        answer: "You can contact instructors through our learning platform's messaging system, discussion forums, or scheduled office hours. Response time is typically within 24-48 hours for academic questions."
      },
      {
        question: "Do you provide career services?",
        answer: "Yes, we offer career services including resume review, interview preparation, job search assistance, and networking opportunities with our alumni and industry partners."
      },
      {
        question: "What if I'm struggling with the course content?",
        answer: "If you're having difficulty, reach out to your instructor or our academic support team immediately. We offer additional tutoring, study groups, and extended deadlines when needed."
      }
    ]
  };

  const blogPosts = [
    {
      title: "The Future of Professional Development in 2024",
      excerpt: "Exploring emerging trends and technologies shaping professional education and career advancement.",
      date: "March 15, 2024",
      category: "Industry Insights"
    },
    {
      title: "How to Choose the Right Professional Certification",
      excerpt: "A comprehensive guide to selecting certifications that align with your career goals and industry requirements.",
      date: "March 10, 2024",
      category: "Career Guidance"
    },
    {
      title: "Success Stories: Alumni Career Transformations",
      excerpt: "Real stories from graduates who have successfully advanced their careers through our certification programs.",
      date: "March 5, 2024",
      category: "Success Stories"
    }
  ];

  const careerResources = [
    {
      title: "Resume Building Guide",
      description: "Comprehensive guide to creating a professional resume that highlights your certifications and skills.",
      type: "PDF Guide"
    },
    {
      title: "Interview Preparation Toolkit",
      description: "Essential tips and practice questions to help you succeed in job interviews.",
      type: "PDF Guide"
    },
    {
      title: "Industry Salary Reports",
      description: "Current salary benchmarks and career progression data for certified professionals.",
      type: "PDF Report"
    },
    {
      title: "Career Path Roadmaps",
      description: "Visual guides showing potential career paths and required certifications for different industries.",
      type: "Interactive Guide"
    }
  ];

  return (
    <div className="min-h-screen py-20 warm-section mandala-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Student Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed in your learning journey and advance your career
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our courses and services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enrollment FAQ */}
            <Card className="border-l-4 border-l-orange-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users className="h-6 w-6 text-orange-500 mr-2" />
                  Enrollment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqData.enrollment.map((faq, index) => (
                    <AccordionItem key={index} value={`enrollment-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Certification FAQ */}
            <Card className="border-l-4 border-l-orange-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="h-6 w-6 text-orange-500 mr-2" />
                  Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqData.certification.map((faq, index) => (
                    <AccordionItem key={index} value={`certification-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Payment FAQ */}
            <Card className="border-l-4 border-l-orange-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Download className="h-6 w-6 text-orange-500 mr-2" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqData.payment.map((faq, index) => (
                    <AccordionItem key={index} value={`payment-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Course Content FAQ */}
            <Card className="border-l-4 border-l-orange-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="h-6 w-6 text-orange-500 mr-2" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqData.content.map((faq, index) => (
                    <AccordionItem key={index} value={`content-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Support FAQ */}
            <Card className="lg:col-span-2 border-t-4 border-t-pink-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageCircle className="h-6 w-6 text-orange-500 mr-2" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {faqData.support.map((faq, index) => (
                      <AccordionItem key={index} value={`support-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Blog/Articles Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Blog & Articles
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with industry insights, career tips, and success stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale border-l-4 border-l-orange-400">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-orange-600 font-medium bg-gradient-accent px-2 py-1 rounded">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full text-orange-500 border-orange-500 hover:bg-orange-50">
                    Read More
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0">
              View All Articles
            </Button>
          </div>
        </section>

        {/* Career Resources Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Career Resources
            </h2>
            <p className="text-xl text-gray-600">
              Downloadable guides and tools to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale border-l-4 border-l-orange-400">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {resource.description}
                      </CardDescription>
                    </div>
                    <Download className="h-6 w-6 text-orange-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 bg-gradient-accent px-2 py-1 rounded">{resource.type}</span>
                    <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-accent p-8 rounded-lg border-t-4 border-t-pink-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Additional Support?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our student support team is here to help you succeed. Contact us for personalized assistance.
              </p>
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentResources;
