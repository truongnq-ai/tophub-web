"use client";

import React, { useState } from "react";
import { BillingSelector, type BillingCycle } from "@/components/pricing/billing-selector";
import { PlanCard } from "@/components/pricing/plan-card";
import type { PlanItem } from "@/types/api";

interface PricingSectionProps {
  plans: PlanItem[];
  isLoggedIn: boolean;
  locale: string;
  labels: React.ComponentProps<typeof PlanCard>["labels"] &
    React.ComponentProps<typeof BillingSelector>["labels"];
}

export function PricingSection({ plans, isLoggedIn, locale, labels }: PricingSectionProps) {
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(6);

  return (
    <div className="space-y-8 sm:space-y-10">
      <BillingSelector
        selectedCycle={selectedCycle}
        onChange={setSelectedCycle}
        labels={labels}
      />
      <PlanCard
        plans={plans}
        selectedCycle={selectedCycle}
        isLoggedIn={isLoggedIn}
        locale={locale}
        labels={labels}
      />
    </div>
  );
}
