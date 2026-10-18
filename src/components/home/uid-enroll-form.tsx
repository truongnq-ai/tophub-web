"use client";

import React, { useState } from "react";
import {
  Shield,
  Search,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Rocket,
  UserPlus,
  Trash2,
  User,
  Server,
  Gift,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { previewPlayerAction, enrollPlayerAction } from "@/actions/players";
import { useUidSession, type SavedAccount } from "@/hooks/use-uid-session";
import { sanitizeReturnUrl, navigateToReturnUrl } from "@/lib/return-url";
import type { PlayerPreviewResponse } from "@/types/api";

interface UidEnrollFormProps {
  initialActiveCodes?: Array<{ code: string; status: string }>;
  returnUrl?: string | null;
  onReturnUrlRedirect?: (url: string) => void;
}

export function UidEnrollForm({
  initialActiveCodes,
  returnUrl,
  onReturnUrlRedirect,
}: UidEnrollFormProps) {
  const t = useTranslations("Home");
  const { savedAccounts, selectAccount, saveAccount, removeSavedAccount } = useUidSession();

  const [uidInput, setUidInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [previewData, setPreviewData] = useState<PlayerPreviewResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [resolvedReturnUrl, setResolvedReturnUrl] = useState<string | null>(() =>
    sanitizeReturnUrl(returnUrl)
  );

  React.useEffect(() => {
    if (returnUrl !== undefined) {
      setResolvedReturnUrl(sanitizeReturnUrl(returnUrl));
      return;
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setResolvedReturnUrl(sanitizeReturnUrl(params.get("returnUrl")));
    }
  }, [returnUrl]);

  const triggerReturnRedirectIfNeeded = () => {
    if (!resolvedReturnUrl) return;
    if (onReturnUrlRedirect) {
      onReturnUrlRedirect(resolvedReturnUrl);
    } else {
      navigateToReturnUrl(resolvedReturnUrl);
    }
  };

  const handleSelectSavedAccount = async (account: SavedAccount) => {
    await selectAccount(account);
    triggerReturnRedirectIfNeeded();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = uidInput.trim().replace(/\D/g, "");
    if (!clean || clean.length < 10) {
      setErrorMsg(t("form.validationError"));
      setPreviewData(null);
      return;
    }

    try {
      setChecking(true);
      setErrorMsg(null);
      const res = await previewPlayerAction(clean);
      if (res.success && res.data) {
        setPreviewData(res.data);
      } else {
        setPreviewData(null);
        setErrorMsg(
          res.error?.code === "PLAYER_NOT_FOUND" || res.error?.message?.includes("Không tìm thấy")
            ? t("form.notFoundError")
            : res.error?.message || t("form.notFoundError")
        );
      }
    } catch {
      setPreviewData(null);
      setErrorMsg(t("form.networkError"));
    } finally {
      setChecking(false);
    }
  };

  const handleProceed = async () => {
    if (!previewData) return;

    if (previewData.is_enrolled) {
      // Đã có trong bot: Lưu vào máy và vào thẳng Dashboard (hoặc quay lại returnUrl)
      const account: SavedAccount = {
        uid: previewData.uid,
        nickname: previewData.nickname,
        server_id: previewData.server_id,
        added_at: Date.now(),
      };
      await saveAccount(account);
      triggerReturnRedirectIfNeeded();
    } else {
      // Chưa có bot: Gọi enroll để đăng ký và lấy token game
      try {
        setEnrolling(true);
        setErrorMsg(null);
        const res = await enrollPlayerAction(previewData.uid);
        if (res.success && res.data) {
          const account: SavedAccount = {
            uid: res.data.uid,
            nickname: res.data.nickname,
            server_id: res.data.server_id,
            added_at: Date.now(),
          };
          await saveAccount(account);
          triggerReturnRedirectIfNeeded();
        } else {
          setErrorMsg(res.error?.message || t("form.enrollFailed"));
        }
      } catch {
        setErrorMsg(t("form.enrollNetworkError"));
      } finally {
        setEnrolling(false);
      }
    }
  };

  const activeCodesList = initialActiveCodes ?? [];

  return (
    <div className="space-y-12 max-w-3xl mx-auto py-6">
      {/* Hero Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-[13px] font-heading font-extrabold text-amber-600 dark:text-amber-400 shadow-sm shadow-amber-500/10">
          <Shield className="h-4 w-4 fill-current text-amber-500" />
          <span>{t("hero.badge")}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-foreground leading-[1.2]">
          {t("hero.title")}
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {t("hero.description")}
        </p>
      </div>

      {/* Main Console Input Form */}
      <div className="card-rpg p-5 sm:p-7 rounded-3xl space-y-5">
        <form onSubmit={handleCheck} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">
            {t("form.uidLabel")}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                type="text"
                placeholder={t("form.uidPlaceholder")}
                value={uidInput}
                onChange={(e) => {
                  setUidInput(e.target.value.replace(/\D/g, ""));
                  setPreviewData(null);
                  setErrorMsg(null);
                }}
                className="pl-10 h-12 rounded-xl bg-background/80 font-mono text-base tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:font-normal border-input focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
                maxLength={20}
              />
            </div>
            <Button
              type="submit"
              disabled={checking || uidInput.trim().length < 10}
              className="btn-tactile-gold h-12 px-7 rounded-xl font-bold shrink-0 min-h-[44px] flex items-center justify-center gap-2"
            >
              {checking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t("form.checking")}</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>{t("form.checkBtn")}</span>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in-50">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Preview Card (Appears after successful verification) */}
        {previewData && (
          <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/40 bg-amber-500/5 dark:bg-card/90 space-y-4 animate-in fade-in-50 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-bold text-xl font-heading shadow-md shadow-amber-500/20 border border-amber-300/30">
                  {previewData.nickname ? previewData.nickname.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-lg text-foreground">
                      {previewData.nickname}
                    </span>
                    {previewData.is_enrolled ? (
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] font-bold">
                        {t("form.enrolledBadge")}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10 text-[11px] font-bold">
                        {t("form.notEnrolledBadge")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-0.5">
                    <span>UID: {previewData.uid}</span>
                    <span>•</span>
                    <span>Server: {previewData.server_id}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: [🚀 Vào xem & Quản lý] OR [➕ Thêm & Kích hoạt Bot] */}
              <Button
                onClick={handleProceed}
                disabled={enrolling}
                className={`h-11 px-6 rounded-xl font-bold min-h-[44px] shrink-0 text-white ${
                  previewData.is_enrolled
                    ? "btn-tactile-emerald"
                    : "btn-tactile-gold"
                }`}
              >
                {enrolling ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>{t("form.enrolling")}</span>
                  </>
                ) : previewData.is_enrolled ? (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    <span>{t("form.manageBtn")}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>{t("form.enrollBtn")}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Switcher: Accounts saved on this device */}
      {savedAccounts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold uppercase tracking-wider px-1 font-heading">
            <span>{t("savedAccounts.title")} ({savedAccounts.length})</span>
            <span className="text-[11px] font-normal normal-case text-muted-foreground/80">{t("savedAccounts.subtext")}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedAccounts.map((account) => (
              <Card
                key={account.uid}
                className="border border-border/80 bg-card/70 hover:bg-card hover:border-amber-500/40 transition-all rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm"
              >
                <div
                  onClick={() => handleSelectSavedAccount(account)}
                  className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                >
                  <div className="h-9 w-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
                    {account.nickname ? account.nickname.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-foreground truncate">{account.nickname}</p>
                    <p className="text-[11px] text-muted-foreground font-mono truncate">
                      S{account.server_id} • UID: {account.uid}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleSelectSavedAccount(account)}
                    className="h-8 px-3 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 transition-colors"
                  >
                    {t("savedAccounts.manageBtn")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSavedAccount(account.uid)}
                    title={t("savedAccounts.removeTitle")}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Giftcodes Badges */}
      <section className="pt-4 border-t border-border/70 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-heading">
            <Gift className="h-4 w-4 text-amber-500" />
            {t("activeCodes.title")} · {activeCodesList.length}
          </h2>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-sans font-semibold flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t("activeCodes.scanning")}
          </span>
        </div>

        {activeCodesList.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {activeCodesList.map((item) => (
              <button
                key={item.code}
                onClick={() => handleCopyCode(item.code)}
                className="group inline-flex items-center gap-2 rounded-xl border border-border/80 dark:border-amber-500/20 bg-muted/40 hover:bg-amber-500/10 hover:border-amber-500/50 px-3.5 py-1.5 font-mono text-xs text-foreground transition-all duration-150"
              >
                <span className="font-bold tracking-wide">{item.code}</span>
                {copiedCode === item.code ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/80 p-4 text-center text-xs text-muted-foreground bg-muted/20">
            {t("activeCodes.empty")}
          </div>
        )}
      </section>

      {/* Community Activity Counters */}
      <section className="pt-6 border-t border-border/70">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 font-heading">
          {t("stats.title")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="card-rpg p-5 rounded-2xl space-y-1">
            <p className="text-xs text-muted-foreground">{t("stats.codesClaimed")}</p>
            <p className="font-heading text-2xl sm:text-4xl font-black text-amber-500 dark:text-amber-400 tracking-tight">11,480+</p>
            <p className="text-[11px] text-muted-foreground">{t("stats.codesClaimedSub")}</p>
          </div>
          <div className="card-rpg p-5 rounded-2xl space-y-1">
            <p className="text-xs text-muted-foreground">{t("stats.activeAccounts")}</p>
            <p className="font-heading text-2xl sm:text-4xl font-black text-amber-500 dark:text-amber-400 tracking-tight">850+</p>
            <p className="text-[11px] text-muted-foreground">{t("stats.activeAccountsSub")}</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="pt-6 border-t border-border/70 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 font-heading">
          {t("faq.title")}
        </h2>
        <div className="space-y-2.5">
          <details className="group rounded-2xl border border-border/80 dark:border-amber-500/15 bg-card/50 hover:border-amber-500/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
              <span>{t("faq.q1")}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("faq.a1")}
            </p>
          </details>

          <details className="group rounded-2xl border border-border/80 dark:border-amber-500/15 bg-card/50 hover:border-amber-500/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
              <span>{t("faq.q2")}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("faq.a2")}
            </p>
          </details>

          <details className="group rounded-2xl border border-border/80 dark:border-amber-500/15 bg-card/50 hover:border-amber-500/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
              <span>{t("faq.q3")}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("faq.a3")}
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
