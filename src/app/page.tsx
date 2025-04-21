import Link from "next/link";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/landing-page/HeroSection";
import BrandSection from "@/components/landing-page/BrandSection";
import FeatureSection from "@/components/landing-page/FeatureSection";
import PricingSection from "@/components/landing-page/PricingSection";
import CtaSection from "@/components/landing-page/CtaSection";
import { createClient } from "@/lib/supabase/server";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabse = await createClient()
  const [user , products] = await Promise.all([
    getUser(supabse), // get the currently authenticated user
    getProducts(supabse) // get the active products with their prices
  ])

  // if (user) {
  //   return redirect("/dashboard")
  // }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Layers className="h-6 w-6 text-primary" />
            <span>FashionAI Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <HeroSection />

        {/* Brands Section */}
        <BrandSection />

        {/* Features Section */}
        <FeatureSection />

        {/* Pricing section */}
        <PricingSection products={products ?? []} />

        {/* CTA Section */}
        <CtaSection />
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Layers className="h-6 w-6 text-primary" />
                <span>FashionAI Studio</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Redefining advertising visuals with AI-powered generation.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-4 w-4"></div>
                    </a>
                  )
                )}
              </div>
            </div>
            {["Product", "Company", "Resources"].map((category) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {category} Link {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 VisualAI Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
