"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tables } from "@datatypes.types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProduct?: string;
}

const PricingSection = ({
  products,
  mostPopularProduct = "pro",
}: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  console.log(products);

  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium glassmorphism-badge mb-4">
            <AnimatedGradientText className="text-sm font-medium border rounded-full px-4 py-1.5">
              Flexible Plans
            </AnimatedGradientText>{" "}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="text-xl text-white/80">
            From startups to enterprise brands, we have pricing options to suit
            businesses of all sizes.
          </p>
          <div className="flex justify-center items-center space-x-4 py-8">
            <Label htmlFor="pricing-switch" className="font-semibold text-base">
              Monthly
            </Label>
            <Switch
              id="pricing-switch"
              checked={billingInterval === "year"}
              onCheckedChange={(checked) =>
                setBillingInterval(checked ? "year" : "month")
              }
            />
            <Label htmlFor="pricing-switch" className="font-semibold text-base">
              Yearly
            </Label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`relative lg:-mt-8 lg:mb-8 `}
        >
          <div className="grid md:grid-cols-3 place-items-center mx-auto gap-8">
            {products.map((product) => {
              const price = product?.prices.find(
                (price) => price.interval === billingInterval
              );
              if (!price) return null;

              const priceString = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currency!,
                minimumFractionDigits: 0,
              }).format(price?.unit_amount || 0 / 100);

              return (
                <div
                  key={product.id}
                  className={cn(
                    "glassmorphism-card bg-background border rounded-xl shadow-sm h-fit divide-y divide-border",
                    product.name?.toLowerCase() ===
                      mostPopularProduct.toLowerCase()
                      ? "border-primary bg-background drop-shadow-md scale-105"
                      : "border-border"
                  )}
                >
                  <div className="p-6 ">
                    <h2 className="text-2xl leading-6 font-semibold text-foreground flex items-center justify-between">
                      {product.name}
                      {product.name?.toLowerCase() ===
                      mostPopularProduct.toLowerCase() ? (
                        <Badge className="border-border font-semibold">
                          Most Popular
                        </Badge>
                      ) : null}
                    </h2>
                    <p className="text-muted-foreground mt-4 text-sm">
                      {product.description}
                    </p>
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-foreground">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-muted-foreground">
                        /{billingInterval}
                      </span>
                    </p>
                    <Link href={"/login?state=signup"}>
                      <Button
                        className="mt-8 w-full font-semibold"
                        variant={
                          product?.name?.toLowerCase() ===
                          mostPopularProduct.toLowerCase()
                            ? "default"
                            : "secondary"
                        }
                      >
                        Subscribe
                      </Button>
                    </Link>
                  </div>
                  <div className="pt-6 pb-8 px-6">
                    <h3 className="uppercase tracking-wide text-foreground font-medium text-sm">
                      What&apos;s included
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {Object.values(product.metadata || {}).map(
                        (features, index) => {
                          if (features) {
                            return (
                              <li key={index} className="flex space-x-3">
                                <Check className="w-5 h-5 text-primary" />
                                <span className="text-sm text-muted-foreground">{features}</span>
                              </li>
                            );
                          }
                        }
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center glassmorphism-floating-card p-4 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-black">
                No credit card required for free plan
              </span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-black">14-day money-back guarantee</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-black">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
