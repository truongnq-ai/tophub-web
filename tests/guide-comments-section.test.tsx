import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GuideCommentsSection } from "../src/components/guides/guide-comments-section";

vi.mock("@/i18n/routing", () => ({
  Link: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

let mockActiveAccount: any = null;

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: mockActiveAccount,
  }),
}));

const getPublicCommentsMock = vi.fn();
const createPublicCommentMock = vi.fn();
const toggleCommentLikeMock = vi.fn();
const deleteOwnCommentMock = vi.fn();

vi.mock("@/actions/comments", () => ({
  getPublicCommentsAction: (...args: any[]) => getPublicCommentsMock(...args),
  createPublicCommentAction: (...args: any[]) => createPublicCommentMock(...args),
  toggleCommentLikeAction: (...args: any[]) => toggleCommentLikeMock(...args),
  deleteOwnCommentAction: (...args: any[]) => deleteOwnCommentMock(...args),
}));

describe("GuideCommentsSection Unified Component", () => {
  beforeEach(() => {
    mockActiveAccount = null;
    getPublicCommentsMock.mockReset();
    createPublicCommentMock.mockReset();
    toggleCommentLikeMock.mockReset();
    deleteOwnCommentMock.mockReset();

    getPublicCommentsMock.mockResolvedValue({
      success: true,
      data: {
        items: [
          {
            id: "cmt-root-1",
            page_key: "guides:heroes/encyclopedia",
            author_nickname: "DragonSlayer",
            author_server_id: "S1024",
            is_admin_author: false,
            is_pro_author: true,
            parent_id: null,
            reply_to_comment_id: null,
            reply_to_nickname: null,
            reply_to_server_id: null,
            intent_tag: "TIP",
            content: "Đấu Sĩ lên 12 sao là gánh team cực khỏe!",
            status: "APPROVED",
            is_pinned: true,
            helpful_count: 3,
            viewer_has_liked: false,
            is_own_comment: false,
            created_at: "2026-10-17T10:00:00.000Z",
            replies: [],
          },
        ],
        total: 1,
        page: 1,
        limit: 30,
      },
    });
  });

  it("renders UID Gate prompt with returnUrl when user has not entered UID", async () => {
    render(
      <GuideCommentsSection
        pageKey="guides:heroes/encyclopedia"
        locale="vi"
      />
    );

    const gate = await screen.findByTestId("comments-uid-gate");
    expect(gate).toBeTruthy();
    expect(screen.getAllByText("Vui lòng nhập UID để bình luận").length).toBeGreaterThanOrEqual(1);

    const link = gate.querySelector("a");
    expect(link?.getAttribute("href")).toBe(
      "/?returnUrl=%2Fvi%2Fguides%2Fheroes%2Fencyclopedia%23comments"
    );
  });

  it("displays Nickname + Server (strictly hiding UID), submits comments, and supports 1-level replies with @tag", async () => {
    mockActiveAccount = {
      uid: "2446869146316",
      nickname: "CyberViking",
      server_id: "S1028",
      active_plan: "PRO",
    };

    createPublicCommentMock.mockResolvedValueOnce({
      success: true,
      data: {
        id: "cmt-pending-new",
        page_key: "guides:heroes/encyclopedia",
        author_nickname: "CyberViking",
        author_server_id: "S1028",
        is_admin_author: false,
        is_pro_author: true,
        parent_id: null,
        reply_to_comment_id: null,
        reply_to_nickname: null,
        reply_to_server_id: null,
        intent_tag: "DISCUSSION",
        content: "Bình luận đang chờ duyệt",
        status: "PENDING_REVIEW",
        is_pinned: false,
        helpful_count: 0,
        viewer_has_liked: false,
        is_own_comment: true,
        created_at: "2026-10-17T11:00:00.000Z",
        replies: [],
      },
    });

    const { container } = render(
      <GuideCommentsSection
        pageKey="guides:heroes/encyclopedia"
        locale="vi"
      />
    );

    await screen.findByText("DragonSlayer");
    expect(screen.getByText("CyberViking")).toBeTruthy();
    expect(screen.getByText("Server S1028")).toBeTruthy();
    expect(screen.getByText("S1024")).toBeTruthy();
    expect(screen.queryByText("SS1024")).toBeNull();
    // Strictly never render the raw UID anywhere in the DOM!
    expect(container.textContent).not.toContain("2446869146316");

    // Submit root comment that gets flagged as PENDING_REVIEW
    const textarea = screen.getByTestId("comment-root-textarea");
    fireEvent.change(textarea, {
      target: { value: "Bình luận đang chờ duyệt" },
    });
    fireEvent.click(screen.getByTestId("comment-root-submit-btn"));

    await waitFor(() => {
      expect(createPublicCommentMock).toHaveBeenCalledWith({
        page_key: "guides:heroes/encyclopedia",
        uid: "2446869146316",
        content: "Bình luận đang chờ duyệt",
        intent_tag: "DISCUSSION",
      });
      expect(screen.getByText("⏳ Đang chờ Admin phê duyệt")).toBeTruthy();
    });

    // Test 1-level reply with @Nickname (S1024) tag
    createPublicCommentMock.mockResolvedValueOnce({
      success: true,
      data: {
        id: "cmt-reply-1",
        page_key: "guides:heroes/encyclopedia",
        author_nickname: "CyberViking",
        author_server_id: "S1028",
        is_admin_author: false,
        is_pro_author: true,
        parent_id: "cmt-root-1",
        reply_to_comment_id: "cmt-root-1",
        reply_to_nickname: "DragonSlayer",
        reply_to_server_id: "S1024",
        intent_tag: "DISCUSSION",
        content: "Chuẩn luôn bác ơi!",
        status: "APPROVED",
        is_pinned: false,
        helpful_count: 0,
        viewer_has_liked: false,
        is_own_comment: true,
        created_at: "2026-10-17T11:05:00.000Z",
      },
    });

    const replyButtons = screen.getAllByTestId("comment-reply-btn");
    fireEvent.click(replyButtons[replyButtons.length - 1]!);

    const replyInput = await screen.findByTestId("comment-reply-textarea");
    fireEvent.change(replyInput, { target: { value: "Chuẩn luôn bác ơi!" } });
    fireEvent.click(screen.getByTestId("comment-reply-submit-btn"));

    await waitFor(() => {
      expect(screen.getByText("Chuẩn luôn bác ơi!")).toBeTruthy();
      expect(screen.getByText(/@DragonSlayer \(S1024\)/)).toBeTruthy();
      expect(screen.queryByText(/SS1024/)).toBeNull();
    });
  });
});
