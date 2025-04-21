"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Layers, Play, Upload, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
      <div className="container relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Redefining Advertising Visuals
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              AI-Powered <span className="text-primary">Advertising</span>{" "}
              Without Photoshoots
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate stunning, customizable advertising visuals by combining
              AI-trained models of humans and products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                <Play className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 pointer-events-none"></div>
              <img
                src="/hero-images/hero-men.jpeg"
                alt="AI-Generated Advertising Visual"
                className="w-full md:h-[44rem] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <div className="text-sm font-medium">
                  Generated in 12 seconds
                </div>
                <div className="text-xs opacity-80">No photoshoot required</div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -left-4 top-1/4 bg-background rounded-lg p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Upload Models</div>
                  <div className="text-xs text-muted-foreground">
                    Multi-angle images
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-4 left-1/4 bg-background rounded-lg p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">AI Generation</div>
                  <div className="text-xs text-muted-foreground">
                    Realistic results
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -right-4 top-1/3 bg-background rounded-lg p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Layers className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Customizable</div>
                  <div className="text-xs text-muted-foreground">
                    Endless variations
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-24"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 29.3C384 26 480 28 576 32.7C672 37.3 768 44.7 864 47.3C960 50 1056 48 1152 42.7C1248 37.3 1344 28.7 1392 24.3L1440 20V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V50Z"
            fill="currentColor"
            className="text-background/10"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
