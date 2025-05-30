import { getCredits } from "@/app/actions/credit-actions";
import PlanSummary from "@/components/billing/PlanSummary";
import PricingSection from "@/components/billing/PricingSection";
import { getProducts, getSubscription, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const BillingPage = async () => {
  const supabse = await createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabse), // get the currently authenticated user
    getProducts(supabse), // get the active products with their prices
    getSubscription(supabse),
  ]);
  if (!user) {
    return redirect("/login");
  }

  const { data: credits } = await getCredits();
  return (
    <section className="container mx-auto">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>
      <div className="grid gap-10">
        <PlanSummary
          credits={credits}
          subscription={subscription}
          user={user}
          products={products}
        />
        {subscription.status === "active" && (
          <PricingSection
            showInterval={false}
            className="!p-0 max-w-full"
            user={user}
            products={products ?? []}
            subscription={subscription}
            activeProduct={subscription?.prices?.products?.name.toLowerCase() || 'pro'}
          />
        )}
      </div>
    </section>
  );
};

export default BillingPage;
