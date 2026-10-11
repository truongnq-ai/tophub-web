"use client";

import React, { useState } from "react";
import { Gamepad2, Sparkles } from "lucide-react";
import { AccountCard } from "@/components/dashboard/account-card";
import { AddAccountDialog } from "@/components/dashboard/add-account-dialog";
import { updateAccountAction, unlinkAccountAction } from "@/actions/accounts";
import type { GameAccountItem } from "@/types/api";

interface AccountsManagerProps {
  initialAccounts: GameAccountItem[];
  labels: {
    manageAccountsTitle: string;
    manageAccountsDesc: string;
    addAccountBtn: string;
    autoRedeem: string;
    autoCheckin: string;
    unlink: string;
    unlinkConfirmTitle: string;
    unlinkConfirmDesc: string;
    addModalTitle: string;
    addModalDesc: string;
    uidLabel: string;
    uidPlaceholder: string;
    verifying: string;
    addSuccess: string;
    emptyAccounts: string;
    confirm: string;
    cancel: string;
  };
}

export function AccountsManager({ initialAccounts, labels }: AccountsManagerProps) {
  const [accounts, setAccounts] = useState<GameAccountItem[]>(initialAccounts);

  const handleToggle = async (
    accountId: string,
    field: "auto_redeem" | "auto_checkin",
    value: boolean
  ) => {
    // Optimistic UI update
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === accountId ? { ...acc, [field]: value } : acc))
    );

    try {
      await updateAccountAction(accountId, { [field]: value });
    } catch {
      // Rollback if failed
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === accountId ? { ...acc, [field]: !value } : acc))
      );
    }
  };

  const handleUnlink = async (accountId: string) => {
    // Optimistic UI update
    const previous = [...accounts];
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));

    try {
      const res = await unlinkAccountAction(accountId);
      if (!res.success) {
        setAccounts(previous);
      }
    } catch {
      setAccounts(previous);
    }
  };

  const cardLabels = {
    autoRedeem: labels.autoRedeem,
    autoCheckin: labels.autoCheckin,
    unlink: labels.unlink,
    unlinkConfirmTitle: labels.unlinkConfirmTitle,
    unlinkConfirmDesc: labels.unlinkConfirmDesc,
    confirm: labels.confirm,
    cancel: labels.cancel,
  };

  const dialogLabels = {
    addAccountBtn: labels.addAccountBtn,
    addModalTitle: labels.addModalTitle,
    addModalDesc: labels.addModalDesc,
    uidLabel: labels.uidLabel,
    uidPlaceholder: labels.uidPlaceholder,
    verifying: labels.verifying,
    addSuccess: labels.addSuccess,
    confirm: labels.confirm,
    cancel: labels.cancel,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            {labels.manageAccountsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {labels.manageAccountsDesc}
          </p>
        </div>

        <AddAccountDialog labels={dialogLabels} />
      </div>

      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((acc) => (
            <AccountCard
              key={acc.id}
              account={acc}
              onToggle={handleToggle}
              onUnlink={handleUnlink}
              labels={cardLabels}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-12 text-center bg-card/30">
          <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground mb-3">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-foreground max-w-sm mb-4">
            {labels.emptyAccounts}
          </p>
          <AddAccountDialog labels={dialogLabels} />
        </div>
      )}
    </div>
  );
}
