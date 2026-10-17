"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  CheckCircle2,
  EyeOff,
  Trash2,
  Pin,
  ShieldAlert,
  Send,
  Search,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";
import {
  getAdminCommentsAction,
  updateAdminCommentAction,
  replyAdminCommentAction,
  getAdminBannedWordsAction,
  updateAdminBannedWordsAction,
} from "@/actions/comments";
import type { AdminCommentItem, CommentStatus } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TabCommentsProps {
  onStatsChange?: () => void;
}

export function TabComments({ onStatsChange }: TabCommentsProps) {
  const [comments, setComments] = useState<AdminCommentItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState({
    pending_count: 0,
    approved_count: 0,
    hidden_count: 0,
  });

  // Admin Reply State
  const [replyingComment, setReplyingComment] = useState<AdminCommentItem | null>(null);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  // Banned Words Dictionary State
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [defaultWords, setDefaultWords] = useState<string[]>([]);
  const [newBannedWord, setNewBannedWord] = useState("");
  const [showWordsPanel, setShowWordsPanel] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAdminCommentsAction({
        status: statusFilter,
        search: searchQuery || undefined,
        page: 1,
        limit: 50,
      });
      if (res && res.success && res.data) {
        setComments(res.data.items ?? []);
        if (res.data.summary) {
          setSummary(res.data.summary);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchQuery]);

  const loadBannedWords = useCallback(async () => {
    try {
      const res = await getAdminBannedWordsAction();
      if (res && res.success && res.data) {
        setDefaultWords(res.data.default_words ?? []);
        setCustomWords(res.data.custom_words ?? []);
      }
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    loadComments();
    loadBannedWords();
  }, [loadComments, loadBannedWords]);

  const handleStatusChange = async (id: string, status: CommentStatus) => {
    const res = await updateAdminCommentAction(id, { status });
    if (res && res.success) {
      setComments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      onStatsChange?.();
    }
  };

  const handleTogglePin = async (item: AdminCommentItem) => {
    const nextPinned = !item.is_pinned;
    const res = await updateAdminCommentAction(item.id, {
      is_pinned: nextPinned,
    });
    if (res && res.success) {
      setComments((prev) =>
        prev.map((c) => (c.id === item.id ? { ...c, is_pinned: nextPinned } : c))
      );
    }
  };

  const handleSendAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingComment || adminReplyText.trim().length < 3 || isSendingReply)
      return;

    try {
      setIsSendingReply(true);
      const res = await replyAdminCommentAction({
        page_key: replyingComment.page_key,
        content: adminReplyText.trim(),
        parent_id: replyingComment.parent_id ?? replyingComment.id,
        reply_to_comment_id: replyingComment.id,
      });
      if (res && res.success) {
        setAdminReplyText("");
        setReplyingComment(null);
        await loadComments();
      }
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleAddBannedWord = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newBannedWord.trim().toLowerCase();
    if (!clean || customWords.includes(clean)) return;
    const updated = [...customWords, clean];
    const res = await updateAdminBannedWordsAction(updated);
    if (res && res.success && res.data) {
      setCustomWords(res.data.custom_words);
      setNewBannedWord("");
    }
  };

  const handleRemoveBannedWord = async (word: string) => {
    const updated = customWords.filter((w) => w !== word);
    const res = await updateAdminBannedWordsAction(updated);
    if (res && res.success && res.data) {
      setCustomWords(res.data.custom_words);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Moderation Toolbar */}
      <Card className="border border-border/60 bg-card/80 rounded-xl">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "ALL", label: "Tất cả" },
                  {
                    id: "PENDING_REVIEW",
                    label: `Chờ duyệt (${summary.pending_count})`,
                  },
                  {
                    id: "APPROVED",
                    label: `Đang hiện (${summary.approved_count})`,
                  },
                  { id: "HIDDEN", label: `Đã ẩn (${summary.hidden_count})` },
                ] as const
              ).map((tab) => (
                <Button
                  key={tab.id}
                  type="button"
                  size="sm"
                  variant={statusFilter === tab.id ? "default" : "outline"}
                  onClick={() => setStatusFilter(tab.id)}
                  className="text-xs font-bold rounded-lg h-8"
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowWordsPanel((prev) => !prev)}
                className="text-xs font-bold h-8 gap-1.5"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                <span>Từ khóa cấm ({defaultWords.length + customWords.length})</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={loadComments}
                className="h-8 px-2.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo nội dung, tên nhân vật, UID hoặc mã trang cẩm nang..."
              className="pl-9 h-9 text-xs"
            />
          </div>

          {/* Dynamic Banned Words Manager Panel */}
          {showWordsPanel && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 space-y-3">
              <form onSubmit={handleAddBannedWord} className="flex gap-2">
                <Input
                  value={newBannedWord}
                  onChange={(e) => setNewBannedWord(e.target.value)}
                  placeholder="Thêm từ khóa cấm mới (VD: shop lậu, cày thuê...)"
                  className="h-8 text-xs"
                />
                <Button type="submit" size="sm" className="h-8 text-xs font-bold gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Thêm từ cấm</span>
                </Button>
              </form>
              <div className="flex flex-wrap gap-1.5">
                {customWords.map((word) => (
                  <Badge
                    key={word}
                    variant="outline"
                    className="text-xs gap-1 border-amber-500/40 bg-amber-500/10"
                  >
                    <span>{word}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBannedWord(word)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-muted-foreground font-mono">
            Đang tải danh sách bình luận...
          </div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
            Không có bình luận nào khớp bộ lọc.
          </div>
        ) : (
          comments.map((item) => (
            <Card
              key={item.id}
              className="border border-border/70 bg-card/85 rounded-xl"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading font-bold text-sm">
                      {item.author_nickname}
                    </span>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      S{item.author_server_id}
                    </Badge>
                    {item.author_uid && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] border-blue-500/40 bg-blue-500/10 text-blue-500"
                      >
                        UID: {item.author_uid}
                      </Badge>
                    )}
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {item.page_key}
                    </Badge>
                    <Badge
                      className={
                        item.status === "APPROVED"
                          ? "bg-emerald-500/20 text-emerald-500 text-[10px]"
                          : item.status === "PENDING_REVIEW"
                            ? "bg-amber-500/20 text-amber-500 text-[10px]"
                            : "bg-muted text-muted-foreground text-[10px]"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.status !== "APPROVED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`admin-approve-comment-${item.id}`}
                        onClick={() => handleStatusChange(item.id, "APPROVED")}
                        className="h-7 px-2.5 text-xs text-emerald-600 border-emerald-500/40"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Duyệt
                      </Button>
                    )}
                    {item.status !== "HIDDEN" && (
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`admin-hide-comment-${item.id}`}
                        onClick={() => handleStatusChange(item.id, "HIDDEN")}
                        className="h-7 px-2.5 text-xs text-amber-600 border-amber-500/40"
                      >
                        <EyeOff className="h-3.5 w-3.5 mr-1" />
                        Ẩn
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePin(item)}
                      className="h-7 px-2.5 text-xs"
                    >
                      <Pin className="h-3.5 w-3.5 mr-1" />
                      {item.is_pinned ? "Bỏ ghim" : "Ghim"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setReplyingComment(item)}
                      className="h-7 px-2.5 text-xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      Trả lời
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      data-testid={`admin-delete-comment-${item.id}`}
                      onClick={() => handleStatusChange(item.id, "DELETED")}
                      className="h-7 px-2.5 text-xs text-destructive border-destructive/40"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Xóa
                    </Button>
                  </div>
                </div>

                {item.flagged_reason && (
                  <div className="text-[11px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1">
                    ⚠️ Lý do gắn cờ: {item.flagged_reason}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-foreground/90 whitespace-pre-line">
                  {item.content}
                </p>

                {replyingComment?.id === item.id && (
                  <form
                    onSubmit={handleSendAdminReply}
                    className="pt-2 border-t border-border/60 flex gap-2"
                  >
                    <Input
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      placeholder="Nhập phản hồi dưới danh nghĩa 🛡️ Ban Biên Tập TopHub..."
                      className="h-8 text-xs"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSendingReply || adminReplyText.trim().length < 3}
                      className="h-8 text-xs font-bold gap-1"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Gửi</span>
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
