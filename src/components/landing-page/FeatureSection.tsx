"use client"

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, Layers, Upload, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

const FeatureSection = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    benefits: false,
  });
  const featuresRef = useRef<HTMLDivElement>(null);
    const howItWorksRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.target === featuresRef.current) {
                setIsVisible((prev) => ({
                  ...prev,
                  features: entry.isIntersecting,
                }));
              } else if (entry.target === howItWorksRef.current) {
                setIsVisible((prev) => ({
                  ...prev,
                  howItWorks: entry.isIntersecting,
                }));
              } else if (entry.target === benefitsRef.current) {
                setIsVisible((prev) => ({
                  ...prev,
                  benefits: entry.isIntersecting,
                }));
              }
            });
          },
          { threshold: 0.1 }
        );
    
        if (featuresRef.current) observer.observe(featuresRef.current);
        if (howItWorksRef.current) observer.observe(howItWorksRef.current);
        if (benefitsRef.current) observer.observe(benefitsRef.current);
    
        return () => {
          if (featuresRef.current) observer.unobserve(featuresRef.current);
          if (howItWorksRef.current) observer.unobserve(howItWorksRef.current);
          if (benefitsRef.current) observer.unobserve(benefitsRef.current);
        };
      }, []);
    

  return (
    <>
      <section id="features" ref={featuresRef} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Revolutionize Your Advertising Workflow
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines advanced AI technologies to create
              photorealistic advertising visuals without traditional
              photoshoots.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multi-Angle Model Training",
                description:
                  "Upload multi-angle images of human models to train AI for realistic representations in any pose.",
                icon: <Upload className="h-5 w-5" />,
                delay: 0.1,
              },
              {
                title: "Product Integration",
                description:
                  "Seamlessly combine product images with human models for natural and realistic product placement.",
                icon: <Layers className="h-5 w-5" />,
                delay: 0.2,
              },
              {
                title: "Customizable Backgrounds",
                description:
                  "Choose from a variety of backgrounds or upload your own for complete creative control.",
                icon: <Zap className="h-5 w-5" />,
                delay: 0.3,
              },
              {
                title: "Style Variations",
                description:
                  "Generate visuals in different styles from lifestyle to product-centric imagery.",
                icon: <Layers className="h-5 w-5" />,
                delay: 0.4,
              },
              {
                title: "Realistic Lighting & Shadows",
                description:
                  "Advanced neural rendering ensures proper lighting, shadows, and color consistency.",
                icon: <Zap className="h-5 w-5" />,
                delay: 0.5,
              },
              {
                title: "Batch Generation",
                description:
                  "Create multiple variations at once for large-scale campaigns with unique requirements.",
                icon: <Upload className="h-5 w-5" />,
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-muted">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="py-20 md:py-32 bg-muted/30"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.howItWorks ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How VisualAI Studio Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform uses advanced AI to transform your inputs into
              stunning advertising visuals in just a few steps.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-1/2 h-[calc(100%-6rem)] w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block"></div>

            <div className="grid gap-12 relative">
              {[
                {
                  title: "Upload Assets",
                  description:
                    "Upload multi-angle images of human models and product photos to train our AI system.",
                  image:
                    "/placeholder.svg?height=300&width=500&text=Upload+Assets",
                  delay: 0.1,
                },
                {
                  title: "Configure Settings",
                  description:
                    "Specify your desired visual style, model poses, product placement, and background settings.",
                  image:
                    "/placeholder.svg?height=300&width=500&text=Configure+Settings",
                  delay: 0.3,
                },
                {
                  title: "AI Generation",
                  description:
                    "Our advanced AI combines models using GANs and neural rendering to create photorealistic visuals.",
                  image:
                    "/placeholder.svg?height=300&width=500&text=AI+Generation",
                  delay: 0.5,
                },
                {
                  title: "Export & Use",
                  description:
                    "Download high-resolution visuals ready for your advertising campaigns across any channel.",
                  image:
                    "/placeholder.svg?height=300&width=500&text=Export+&+Use",
                  delay: 0.7,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.howItWorks ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: step.delay }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                  style={{ direction: index % 2 === 1 ? "rtl" : "ltr" }}
                >
                  <div className="relative" style={{ direction: "ltr" }}>
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 pointer-events-none"></div>
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="absolute top-4 left-4 md:top-1/2 md:left-0 md:-translate-x-1/2 md:-translate-y-1/2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg z-20 shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-4"
                    style={{ direction: "ltr" }}
                  >
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>
                            Feature point {i} for {step.title.toLowerCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" ref={benefitsRef} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.benefits ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Benefits for Your Business
            </h2>
            <p className="text-xl text-muted-foreground">
              Our AI-powered platform delivers significant advantages over
              traditional advertising production methods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible.benefits ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent z-10 pointer-events-none"></div>
              <img
                src="/placeholder.svg?height=600&width=800&text=Cost+Comparison+Chart"
                alt="Cost comparison between traditional photoshoots and AI generation"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible.benefits ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center gap-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Cost Efficiency</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Eliminate expensive photoshoot costs including studio rentals,
                  photographer fees, model compensation, and post-production
                  expenses.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Save up to 80% on production costs</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Time Savings</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Generate hundreds of campaign visuals in minutes instead of
                  weeks of planning, shooting, and editing.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Reduce production time by 95%</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Unlimited Variations
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Create endless variations of your advertising visuals to test
                  different concepts, styles, and approaches.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Experiment without additional costs</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.benefits ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Scalability",
                description:
                  "Easily scale your advertising production for multiple markets, campaigns, and platforms.",
              },
              {
                title: "Consistency",
                description:
                  "Maintain visual consistency across all your advertising materials with AI-powered generation.",
              },
              {
                title: "Accessibility",
                description:
                  "Make professional advertising visuals accessible to businesses of all sizes and budgets.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-muted">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
