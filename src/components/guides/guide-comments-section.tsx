"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  ShieldCheck,
  Crown,
  ThumbsUp,
  Reply,
  Trash2,
  Pin,
  Clock,
  Lock,
  Send,
  Loader2,
  AlertTriangle,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import {
  getPublicCommentsAction,
  createPublicCommentAction,
  toggleCommentLikeAction,
  deleteOwnCommentAction,
} from "@/actions/comments";
import { buildGuideReturnUrl } from "@/lib/return-url";
import type {
  PublicCommentItem,
  CommentIntentTag,
} from "@/types/api";
import type { GuideLocale } from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatLocalizedDate } from "@/lib/timezone";
import { cn, formatServerCode } from "@/lib/utils";
import { GuidesFeedbackNotice } from "./guides-feedback-notice";

interface GuideCommentsSectionProps {
  pageKey: string;
  locale?: GuideLocale;
  className?: string;
}

const COPY = {
  vi: {
    sectionTitle: "Thảo Luận & Kinh Nghiệm Thực Chiến",
    sectionSubtitle:
      "Cùng trao đổi chiến thuật, hỏi đáp đội hình theo tuổi Server. UID của bạn luôn được ẩn và bảo mật 100%.",
    loginPromptBtn: "Vui lòng nhập UID để bình luận",
    loginPromptDesc:
      "Bạn cần chọn hoặc nhập Game UID để tham gia thảo luận dưới Tên Nhân Vật + Server (Tuyệt đối không hiển thị UID).",
    commentingAs: "Bình luận dưới tên:",
    uidHiddenBadge: "Ẩn UID 100%",
    intentDiscussion: "💬 Thảo luận",
    intentQuestion: "❓ Hỏi đáp",
    intentTip: "💡 Chia sẻ mẹo",
    placeholder:
      "Chia sẻ mẹo thực chiến, đặt câu hỏi về đội hình hoặc lộ trình Server của bạn (3–1000 ký tự)...",
    replyPlaceholder: "Nhập câu trả lời của bạn...",
    submitBtn: "Gửi bình luận",
    submittingBtn: "Đang gửi...",
    submitReplyBtn: "Gửi trả lời",
    cancelReplyBtn: "Hủy",
    sortNewest: "Mới nhất",
    sortHelpful: "Hữu ích nhất",
    pinnedBadge: "Đã ghim",
    adminBadge: "ADMIN",
    pendingBadge: "⏳ Đang chờ Admin phê duyệt",
    pendingBanner:
      "Bình luận của bạn chứa từ khóa hoặc liên kết cần kiểm tra nên đang tạm ẩn và chờ Quản trị viên phê duyệt.",
    helpfulBtn: "Hữu ích",
    replyBtn: "Trả lời",
    deleteBtn: "Xóa",
    replyingToPrefix: "Đang trả lời",
    emptyComments:
      "Chưa có bình luận nào trên trang này. Hãy là chỉ huy đầu tiên chia sẻ kinh nghiệm!",
    loadingComments: "Đang tải thảo luận...",
  },
  en: {
    sectionTitle: "Commander Discussion & Field Notes",
    sectionSubtitle:
      "Discuss tactics and ask lineup questions by Server age. Your Game UID is strictly hidden and never exposed.",
    loginPromptBtn: "Please enter your Game UID to comment",
    loginPromptDesc:
      "Please select or enter your Game UID to comment under your Character Nickname + Server (Your UID is never shown).",
    commentingAs: "Commenting as:",
    uidHiddenBadge: "UID 100% Hidden",
    intentDiscussion: "💬 Discussion",
    intentQuestion: "❓ Question",
    intentTip: "💡 Pro Tip",
    placeholder:
      "Share battle-tested tips, ask lineup questions, or discuss your server timeline (3–1000 chars)...",
    replyPlaceholder: "Write your reply...",
    submitBtn: "Post Comment",
    submittingBtn: "Posting...",
    submitReplyBtn: "Post Reply",
    cancelReplyBtn: "Cancel",
    sortNewest: "Newest",
    sortHelpful: "Most Helpful",
    pinnedBadge: "Pinned",
    adminBadge: "ADMIN",
    pendingBadge: "⏳ Awaiting Admin Approval",
    pendingBanner:
      "Your comment contains restricted keywords or links and is currently hidden pending Administrator review.",
    helpfulBtn: "Helpful",
    replyBtn: "Reply",
    deleteBtn: "Delete",
    replyingToPrefix: "Replying to",
    emptyComments:
      "No comments on this guide yet. Be the first commander to share your insights!",
    loadingComments: "Loading discussions...",
  },
} as const;

export function GuideCommentsSection({
  pageKey,
  locale = "vi",
  className,
}: GuideCommentsSectionProps) {
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const labels = COPY[safeLocale];
  const { activeAccount } = useUidSession();

  const [comments, setComments] = useState<PublicCommentItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<"newest" | "most_helpful">("newest");
  const [isLoading, setIsLoading] = useState(true);

  const [content, setContent] = useState("");
  const [intentTag, setIntentTag] = useState<CommentIntentTag>("DISCUSSION");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{
    type: "info" | "error";
    text: string;
  } | null>(null);

  // Active 1-level reply target
  const [replyTarget, setReplyTarget] = useState<{
    rootCommentId: string;
    replyToCommentId: string;
    replyToNickname: string;
    replyToServerId: string;
  } | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const loadComments = useCallback(async () => {
    let active = true;
    try {
      setIsLoading(true);
      const res = await getPublicCommentsAction({
        page_key: pageKey,
        sort: sortBy,
        viewer_uid: activeAccount?.uid,
        page: 1,
        limit: 30,
      });
      if (active && res && res.success && res.data) {
        setComments(res.data.items ?? []);
        setTotalCount(res.data.total ?? 0);
      }
    } catch {
      // Safe fallback in offline or unmocked test environments
    } finally {
      if (active) {
        setIsLoading(false);
      }
    }
    return () => {
      active = false;
    };
  }, [pageKey, sortBy, activeAccount?.uid]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleFocusComment = () => {
      setIsHighlighted(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setIsHighlighted(false), 1800);
    };

    window.addEventListener("tophub:focus-comment", handleFocusComment);
    return () => {
      window.removeEventListener("tophub:focus-comment", handleFocusComment);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const returnPath = buildGuideReturnUrl(pageKey, safeLocale);
  const loginHref = `/?returnUrl=${encodeURIComponent(returnPath)}`;

  const handleCreateRootComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAccount || content.trim().length < 3 || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setFeedbackMsg(null);
      const res = await createPublicCommentAction({
        page_key: pageKey,
        uid: activeAccount.uid,
        content: content.trim(),
        intent_tag: intentTag,
      });

      if (res && res.success && res.data) {
        setContent("");
        setComments((prev) => [res.data!, ...prev]);
        setTotalCount((prev) => prev + 1);
        if (res.data.status === "PENDING_REVIEW") {
          setFeedbackMsg({
            type: "info",
            text: labels.pendingBanner,
          });
        }
      } else {
        setFeedbackMsg({
          type: "error",
          text: res?.error?.message || "Không thể gửi bình luận.",
        });
      }
    } catch {
      setFeedbackMsg({
        type: "error",
        text: "Lỗi kết nối máy chủ khi gửi bình luận.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !activeAccount ||
      !replyTarget ||
      replyContent.trim().length < 3 ||
      isSubmittingReply
    )
      return;

    try {
      setIsSubmittingReply(true);
      setFeedbackMsg(null);
      const res = await createPublicCommentAction({
        page_key: pageKey,
        uid: activeAccount.uid,
        content: replyContent.trim(),
        intent_tag: "DISCUSSION",
        parent_id: replyTarget.rootCommentId,
        reply_to_comment_id: replyTarget.replyToCommentId,
      });

      if (res && res.success && res.data) {
        const newReply = res.data;
        setComments((prev) =>
          prev.map((root) =>
            root.id === replyTarget.rootCommentId
              ? { ...root, replies: [...(root.replies ?? []), newReply] }
              : root
          )
        );
        setReplyContent("");
        setReplyTarget(null);
        if (newReply.status === "PENDING_REVIEW") {
          setFeedbackMsg({
            type: "info",
            text: labels.pendingBanner,
          });
        }
      } else {
        setFeedbackMsg({
          type: "error",
          text: res?.error?.message || "Không thể gửi câu trả lời.",
        });
      }
    } catch {
      setFeedbackMsg({
        type: "error",
        text: "Lỗi kết nối máy chủ khi gửi trả lời.",
      });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleToggleLike = async (commentId: string) => {
    if (!activeAccount) return;
    try {
      const res = await toggleCommentLikeAction(commentId, activeAccount.uid);
      if (res && res.success && res.data) {
        const { viewer_has_liked, helpful_count } = res.data;
        setComments((prev) =>
          prev.map((root) => {
            if (root.id === commentId) {
              return { ...root, viewer_has_liked, helpful_count };
            }
            return {
              ...root,
              replies: (root.replies ?? []).map((rep) =>
                rep.id === commentId
                  ? { ...rep, viewer_has_liked, helpful_count }
                  : rep
              ),
            };
          })
        );
      }
    } catch {
      // Ignore network error on like toggle
    }
  };

  const handleDeleteOwn = async (commentId: string) => {
    if (!activeAccount) return;
    try {
      const res = await deleteOwnCommentAction(commentId, activeAccount.uid);
      if (res && res.success) {
        setComments((prev) =>
          prev
            .filter((root) => root.id !== commentId)
            .map((root) => ({
              ...root,
              replies: (root.replies ?? []).filter((rep) => rep.id !== commentId),
            }))
        );
      }
    } catch {
      // Ignore error
    }
  };

  const renderIntentBadge = (tag: CommentIntentTag) => {
    if (tag === "QUESTION") {
      return (
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400"
        >
          {labels.intentQuestion}
        </Badge>
      );
    }
    if (tag === "TIP") {
      return (
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        >
          {labels.intentTip}
        </Badge>
      );
    }
    return null;
  };

  return (
    <section
      id="comments"
      data-testid="guide-comments-section"
      className={cn(
        "mt-10 pt-8 border-t border-border/80 space-y-6",
        className
      )}
    >
      {/* Touch 2: Heartfelt Soft Beta & Feedback Callout right before Comments (DEC-GNF-01) */}
      <GuidesFeedbackNotice variant="pre-comment" locale={safeLocale} />

      {/* Header & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-heading font-black text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-amber-500 shrink-0" />
            <span>{labels.sectionTitle}</span>
            <Badge
              variant="outline"
              className="font-mono text-xs border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              {totalCount}
            </Badge>
          </h2>
          <p className="text-xs text-muted-foreground">{labels.sectionSubtitle}</p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-card/60 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSortBy("newest")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-colors",
              sortBy === "newest"
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labels.sortNewest}
          </button>
          <button
            type="button"
            onClick={() => setSortBy("most_helpful")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-colors",
              sortBy === "most_helpful"
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labels.sortHelpful}
          </button>
        </div>
      </div>

      {/* UID Gate OR Comment Composer Form */}
      {!activeAccount ? (
        <div
          data-testid="comments-uid-gate"
          className={cn(
            "rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all",
            isHighlighted && "ring-2 ring-amber-500 shadow-lg shadow-amber-500/20"
          )}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-heading font-bold text-foreground">
              <Lock className="h-4 w-4 text-amber-500 shrink-0" />
              <span>{labels.loginPromptBtn}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {labels.loginPromptDesc}
            </p>
          </div>

          <Link
            href={loginHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs sm:text-sm px-5 py-2.5 min-h-[42px] shrink-0 transition-all shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>{labels.loginPromptBtn}</span>
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleCreateRootComment}
          className={cn(
            "rounded-2xl border border-border/80 bg-card/70 p-4 sm:p-5 space-y-3.5 transition-all",
            isHighlighted && "ring-2 ring-amber-500 border-amber-500/60 shadow-lg shadow-amber-500/15"
          )}
        >
          {/* Active Character Identity Bar (Strictly NO UID displayed) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">{labels.commentingAs}</span>
              <span className="font-heading font-bold text-foreground">
                {activeAccount.nickname}
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[11px] border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                Server {formatServerCode(activeAccount.server_id)}
              </Badge>
              {activeAccount.active_plan === "PRO" && (
                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px]">
                  <Crown className="h-3 w-3 mr-1" />
                  PRO
                </Badge>
              )}
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                {labels.uidHiddenBadge}
              </span>
            </div>

            {/* Intent Tag Selector */}
            <div className="flex items-center gap-1.5">
              {(["DISCUSSION", "QUESTION", "TIP"] as const).map((tag) => {
                const tagLabel =
                  tag === "DISCUSSION"
                    ? labels.intentDiscussion
                    : tag === "QUESTION"
                      ? labels.intentQuestion
                      : labels.intentTip;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setIntentTag(tag)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-heading font-bold border transition-all",
                      intentTag === tag
                        ? "border-amber-500/50 bg-amber-500/15 text-amber-600 dark:text-amber-400"
                        : "border-border/70 bg-background/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tagLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            data-testid="comment-root-textarea"
            rows={3}
            maxLength={1000}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={labels.placeholder}
            className="w-full rounded-xl border border-input bg-background/80 p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-y"
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-muted-foreground">
              {content.trim().length}/1000
            </span>
            <Button
              type="submit"
              data-testid="comment-root-submit-btn"
              disabled={isSubmitting || content.trim().length < 3}
              className="btn-tactile-gold h-10 px-5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              <span>{isSubmitting ? labels.submittingBtn : labels.submitBtn}</span>
            </Button>
          </div>
        </form>
      )}

      {/* Feedback Banner (Moderation Pending Notice or Error) */}
      {feedbackMsg && (
        <div
          className={cn(
            "rounded-xl border p-3.5 text-xs flex items-start gap-2.5",
            feedbackMsg.type === "info"
              ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          )}
        >
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="flex-1">{feedbackMsg.text}</span>
          <button
            type="button"
            onClick={() => setFeedbackMsg(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Comments Thread List (Level 0 + Flattened Level 1 Replies) */}
      {isLoading ? (
        <div className="py-8 text-center text-xs text-muted-foreground font-mono">
          {labels.loadingComments}
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/30 p-8 text-center text-xs sm:text-sm text-muted-foreground">
          {labels.emptyComments}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((rootComment) => {
            const isPending = rootComment.status === "PENDING_REVIEW";
            const isReplyingWithinThisThread =
              replyTarget?.rootCommentId === rootComment.id;

            return (
              <div
                key={rootComment.id}
                className={cn(
                  "rounded-2xl border p-4 sm:p-5 space-y-3 transition-all",
                  rootComment.is_pinned
                    ? "border-amber-500/45 bg-amber-500/[0.04]"
                    : isPending
                      ? "border-amber-500/30 bg-amber-500/[0.03] opacity-85"
                      : "border-border/80 bg-card/60"
                )}
              >
                {/* Root Comment Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading font-bold text-sm text-foreground">
                      {rootComment.author_nickname}
                    </span>

                    {rootComment.is_admin_author ? (
                      <Badge className="bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                        🛡️ {labels.adminBadge}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] px-1.5 py-0 border-border/80 text-muted-foreground"
                      >
                        {formatServerCode(rootComment.author_server_id)}
                      </Badge>
                    )}

                    {rootComment.is_pro_author && !rootComment.is_admin_author && (
                      <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px]">
                        👑 PRO
                      </Badge>
                    )}

                    {renderIntentBadge(rootComment.intent_tag)}

                    {rootComment.is_pinned && (
                      <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-[10px]">
                        <Pin className="h-2.5 w-2.5 mr-1" />
                        {labels.pinnedBadge}
                      </Badge>
                    )}

                    {isPending && (
                      <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-[10px]">
                        {labels.pendingBadge}
                      </Badge>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatLocalizedDate(rootComment.created_at, safeLocale)}
                  </span>
                </div>

                {/* Root Comment Body */}
                <p className="text-xs sm:text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                  {rootComment.content}
                </p>

                {/* Root Comment Actions */}
                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="button"
                    disabled={!activeAccount}
                    onClick={() => handleToggleLike(rootComment.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-mono transition-colors",
                      rootComment.viewer_has_liked
                        ? "text-amber-500 font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>
                      {labels.helpfulBtn} ({rootComment.helpful_count})
                    </span>
                  </button>

                  {activeAccount && (
                    <button
                      type="button"
                      data-testid="comment-reply-btn"
                      onClick={() => {
                        setReplyTarget({
                          rootCommentId: rootComment.id,
                          replyToCommentId: rootComment.id,
                          replyToNickname: rootComment.author_nickname,
                          replyToServerId: rootComment.author_server_id,
                        });
                        setReplyContent("");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-heading font-bold text-muted-foreground hover:text-amber-500 transition-colors"
                    >
                      <Reply className="h-3.5 w-3.5" />
                      <span>{labels.replyBtn}</span>
                    </button>
                  )}

                  {rootComment.is_own_comment && (
                    <button
                      type="button"
                      onClick={() => handleDeleteOwn(rootComment.id)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors ml-auto"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{labels.deleteBtn}</span>
                    </button>
                  )}
                </div>

                {/* Level 1 Replies List (Strictly 1 Level Max) */}
                {rootComment.replies && rootComment.replies.length > 0 && (
                  <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-amber-500/25 space-y-3 pt-2">
                    {rootComment.replies.map((reply) => {
                      const isReplyPending = reply.status === "PENDING_REVIEW";
                      return (
                        <div
                          key={reply.id}
                          className={cn(
                            "rounded-xl border p-3.5 space-y-2",
                            isReplyPending
                              ? "border-amber-500/30 bg-amber-500/[0.03] opacity-85"
                              : "border-border/60 bg-background/50"
                          )}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-heading font-bold text-xs text-foreground">
                                {reply.author_nickname}
                              </span>
                              {reply.is_admin_author ? (
                                <Badge className="bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                                  🛡️ {labels.adminBadge}
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="font-mono text-[10px] px-1.5 py-0 border-border/80 text-muted-foreground"
                                >
                                  {formatServerCode(reply.author_server_id)}
                                </Badge>
                              )}
                              {isReplyPending && (
                                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-[10px]">
                                  {labels.pendingBadge}
                                </Badge>
                              )}
                            </div>

                            <span className="text-[10px] font-mono text-muted-foreground">
                              {formatLocalizedDate(reply.created_at, safeLocale)}
                            </span>
                          </div>

                          <p className="text-xs text-foreground/90 whitespace-pre-line leading-relaxed">
                            {reply.reply_to_nickname && (
                              <span className="inline-flex items-center font-heading font-bold text-amber-600 dark:text-amber-400 mr-1.5">
                                @{reply.reply_to_nickname}
                                {reply.reply_to_server_id &&
                                reply.reply_to_server_id.toUpperCase() !== "ADMIN"
                                  ? ` (${formatServerCode(reply.reply_to_server_id)})`
                                  : ""}
                              </span>
                            )}
                            {reply.content}
                          </p>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              disabled={!activeAccount}
                              onClick={() => handleToggleLike(reply.id)}
                              className={cn(
                                "inline-flex items-center gap-1 text-[11px] font-mono transition-colors",
                                reply.viewer_has_liked
                                  ? "text-amber-500 font-bold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>
                                {labels.helpfulBtn} ({reply.helpful_count})
                              </span>
                            </button>

                            {activeAccount && (
                              <button
                                type="button"
                                data-testid="comment-reply-btn"
                                onClick={() => {
                                  // Flattened 1-level: still attaches to rootComment.id, but tags reply.author_nickname!
                                  setReplyTarget({
                                    rootCommentId: rootComment.id,
                                    replyToCommentId: reply.id,
                                    replyToNickname: reply.author_nickname,
                                    replyToServerId: reply.author_server_id,
                                  });
                                  setReplyContent("");
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-muted-foreground hover:text-amber-500 transition-colors"
                              >
                                <Reply className="h-3 w-3" />
                                <span>{labels.replyBtn}</span>
                              </button>
                            )}

                            {reply.is_own_comment && (
                              <button
                                type="button"
                                onClick={() => handleDeleteOwn(reply.id)}
                                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors ml-auto"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>{labels.deleteBtn}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Inline 1-Level Reply Composer */}
                {isReplyingWithinThisThread && replyTarget && (
                  <form
                    onSubmit={handleCreateReply}
                    className="mt-3 pl-4 sm:pl-6 border-l-2 border-amber-500/50 space-y-2.5 pt-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-bold text-amber-600 dark:text-amber-400">
                        {labels.replyingToPrefix} @{replyTarget.replyToNickname}
                        {replyTarget.replyToServerId &&
                        replyTarget.replyToServerId.toUpperCase() !== "ADMIN"
                          ? ` (${formatServerCode(replyTarget.replyToServerId)})`
                          : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyTarget(null)}
                        className="text-muted-foreground hover:text-foreground text-[11px]"
                      >
                        {labels.cancelReplyBtn}
                      </button>
                    </div>

                    <textarea
                      data-testid="comment-reply-textarea"
                      rows={2}
                      maxLength={1000}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={labels.replyPlaceholder}
                      className="w-full rounded-xl border border-input bg-background/90 p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />

                    <div className="flex justify-end gap-2">
                      <Button
                        type="submit"
                        size="sm"
                        data-testid="comment-reply-submit-btn"
                        disabled={
                          isSubmittingReply || replyContent.trim().length < 3
                        }
                        className="btn-tactile-gold h-8 px-4 rounded-lg text-xs font-bold"
                      >
                        {labels.submitReplyBtn}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
