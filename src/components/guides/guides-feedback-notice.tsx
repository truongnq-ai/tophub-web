"use client";

import React from "react";
import { BookOpen, MessageSquarePlus, Sparkles, ArrowDown } from "lucide-react";
import type { GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";

export interface GuidesFeedbackNoticeProps {
  variant?: "top-bar" | "pre-comment";
  locale?: GuideLocale;
  className?: string;
}

const COPY = {
  vi: {
    topBarBadge: "Đang hoàn thiện",
    topBarText:
      "Đây là nội dung đang xây dựng, có thể chưa chính xác hoàn toàn. Vui lòng tham khảo và để lại bình luận góp ý cho đội ngũ phát triển!",
    topBarAction: "Góp ý ngay",
    preCommentBadge: "Cẩm Nang Đang Hoàn Thiện • Lắng Nghe Cộng Đồng",
    preCommentTitle:
      "Nội dung đang xây dựng & Rất mong nhận được ý kiến từ bạn!",
    preCommentBody:
      "Đây là nội dung đang xây dựng, có thể chưa chính xác hoàn toàn, vui lòng tham khảo và cho chúng tôi ý kiến. Nếu có bất kỳ vấn đề nào về nội dung hoặc số liệu, vui lòng để lại comment ngay bên dưới cho đội ngũ phát triển. Cảm ơn bạn rất nhiều!",
    preCommentAction: "Để lại góp ý ngay",
  },
  en: {
    topBarBadge: "Work in Progress",
    topBarText:
      "This content is currently under active development and may not be 100% accurate yet. Please use it as a reference and share your feedback in the comments!",
    topBarAction: "Leave feedback",
    preCommentBadge: "Living Tactical Guide • Community Driven",
    preCommentTitle:
      "Content Under Construction & We Value Your Feedback!",
    preCommentBody:
      "This content is currently under active development and may not be 100% accurate yet — please use it as a reference and share your thoughts with us. If you spot any issues with the content, please leave a comment below for our development team. Thank you!",
    preCommentAction: "Leave feedback now",
  },
} as const;

export function triggerGuideCommentFocus() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const commentsSection = document.getElementById("comments");
  if (
    commentsSection &&
    typeof commentsSection.scrollIntoView === "function"
  ) {
    commentsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.dispatchEvent(new CustomEvent("tophub:focus-comment"));

  const textarea = document.querySelector<HTMLTextAreaElement>(
    '[data-testid="comment-root-textarea"]'
  );
  if (textarea && typeof textarea.focus === "function") {
    try {
      textarea.focus({ preventScroll: true });
    } catch {
      textarea.focus();
    }
  }
}

export function GuidesFeedbackNotice({
  variant = "pre-comment",
  locale = "vi",
  className,
}: GuidesFeedbackNoticeProps) {
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const labels = COPY[safeLocale];

  if (variant === "top-bar") {
    return (
      <div
        data-testid="guides-feedback-top-bar"
        role="note"
        className={cn(
          "mb-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card/80 to-amber-500/5 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shadow-xs",
          className
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/35 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>{labels.topBarBadge}</span>
          </span>
          <p className="text-muted-foreground leading-snug">
            {labels.topBarText}
          </p>
        </div>

        <button
          type="button"
          data-testid="guides-feedback-top-bar-btn"
          onClick={triggerGuideCommentFocus}
          className="inline-flex items-center gap-1 rounded-xl border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 px-2.5 py-1 font-heading font-bold text-[11px] text-amber-600 dark:text-amber-400 transition-all shrink-0 cursor-pointer"
        >
          <span>{labels.topBarAction}</span>
          <ArrowDown className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      data-testid="guides-feedback-pre-comment"
      role="note"
      className={cn(
        "rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-card/90 to-emerald-500/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/35 text-amber-500 shrink-0 mt-0.5">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {labels.preCommentBadge}
            </span>
          </div>
          <h3 className="font-heading font-bold text-sm sm:text-base text-foreground leading-snug">
            {labels.preCommentTitle}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {labels.preCommentBody}
          </p>
        </div>
      </div>

      <button
        type="button"
        data-testid="guides-feedback-action-btn"
        onClick={triggerGuideCommentFocus}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 px-4 py-2.5 min-h-[42px] font-heading font-bold text-xs sm:text-sm text-amber-600 dark:text-amber-300 transition-all shrink-0 cursor-pointer shadow-xs"
      >
        <MessageSquarePlus className="h-4 w-4 shrink-0" />
        <span>{labels.preCommentAction}</span>
      </button>
    </div>
  );
}
