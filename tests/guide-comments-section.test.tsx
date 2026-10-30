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

  it("enforces Google MD3 Phase 3.6 Typography: zero sub-12px classes, 16px mobile textareas (text-base sm:text-sm), 14px-16px comment bodies, and zero Vietnamese diacritics inside .font-mono", async () => {
    mockActiveAccount = {
      uid: "2446869146316",
      nickname: "CyberViking",
      server_id: "S1028",
      active_plan: "PRO",
    };

    getPublicCommentsMock.mockResolvedValueOnce({
      success: true,
      data: {
        items: [
          {
            id: "cmt-root-md3",
            page_key: "guides:heroes/encyclopedia",
            author_nickname: "DragonSlayer",
            author_server_id: "S1024",
            is_admin_author: false,
            is_pro_author: true,
            parent_id: null,
            reply_to_comment_id: null,
            reply_to_nickname: null,
            reply_to_server_id: null,
            intent_tag: "QUESTION",
            content: "Nội dung bình luận gốc chuẩn 14px-16px.",
            status: "APPROVED",
            is_pinned: true,
            helpful_count: 5,
            viewer_has_liked: false,
            is_own_comment: true,
            created_at: "2026-10-17T10:00:00.000Z",
            replies: [
              {
                id: "cmt-reply-md3",
                page_key: "guides:heroes/encyclopedia",
                author_nickname: "AdminCommander",
                author_server_id: "ADMIN",
                is_admin_author: true,
                is_pro_author: true,
                parent_id: "cmt-root-md3",
                reply_to_comment_id: "cmt-root-md3",
                reply_to_nickname: "DragonSlayer",
                reply_to_server_id: "S1024",
                intent_tag: "DISCUSSION",
                content: "Nội dung câu trả lời chuẩn 14px-16px.",
                status: "PENDING_REVIEW",
                is_pinned: false,
                helpful_count: 2,
                viewer_has_liked: true,
                is_own_comment: true,
                created_at: "2026-10-17T10:15:00.000Z",
              },
            ],
          },
        ],
        total: 1,
        page: 1,
        limit: 30,
      },
    });

    const { container } = render(
      <GuideCommentsSection
        pageKey="guides:heroes/encyclopedia"
        locale="vi"
      />
    );

    await screen.findByText("DragonSlayer");

    // Open inline reply composer to inspect reply textarea
    const replyBtns = screen.getAllByTestId("comment-reply-btn");
    fireEvent.click(replyBtns[0]!);

    const rootTextarea = screen.getByTestId("comment-root-textarea");
    const replyTextarea = await screen.findByTestId("comment-reply-textarea");
    expect(rootTextarea.className).toContain("text-base");
    expect(rootTextarea.className).toContain("sm:text-sm");
    expect(replyTextarea.className).toContain("text-base");
    expect(replyTextarea.className).toContain("sm:text-sm");

    const rootBody = screen.getByText("Nội dung bình luận gốc chuẩn 14px-16px.");
    expect(rootBody.className).toContain("text-sm");
    expect(rootBody.className).toContain("sm:text-base");

    const replyAuthor = screen.getByText("AdminCommander");
    expect(replyAuthor.className).toContain("text-sm");

    const replyBody = screen.getByText(/Nội dung câu trả lời chuẩn 14px-16px\./);
    expect(replyBody.className).toContain("text-sm");
    expect(replyBody.className).toContain("sm:text-base");

    // Verify 0 sub-12px classes in rendered DOM and static source
    expect(container.innerHTML).not.toMatch(/text-\[(?:8|9|10|11)px\]/);
  });

  it("enforces >= 44px touch targets on all interactive controls and flattens Level 1 Replies to Single-Layer Containment (max bordered container depth <= 1)", async () => {
    const {
      getMaxBorderedContainerDepth,
      findMonoElementsWithVietnamese,
      findMicroTextElements,
    } = await import("./utils/md3-audit");

    // 1. Check UID Gate link touch target when logged out
    mockActiveAccount = null;
    const { unmount: unmountLoggedOut } = render(
      <GuideCommentsSection
        pageKey="guides:heroes/encyclopedia"
        locale="vi"
      />
    );
    const uidGate = await screen.findByTestId("comments-uid-gate");
    const loginLink = uidGate.querySelector("a")!;
    expect(loginLink.className).toContain("min-h-[44px]");
    unmountLoggedOut();

    // 2. Check logged-in composer, root comment, level-1 replies, and inline reply composer
    mockActiveAccount = {
      uid: "2446869146316",
      nickname: "CyberViking",
      server_id: "S1028",
      active_plan: "PRO",
    };

    getPublicCommentsMock.mockResolvedValueOnce({
      success: true,
      data: {
        items: [
          {
            id: "cmt-root-touch",
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
            content: "Bình luận gốc kiểm tra touch target.",
            status: "APPROVED",
            is_pinned: false,
            helpful_count: 3,
            viewer_has_liked: false,
            is_own_comment: true,
            created_at: "2026-10-17T10:00:00.000Z",
            replies: [
              {
                id: "cmt-reply-touch",
                page_key: "guides:heroes/encyclopedia",
                author_nickname: "CyberViking",
                author_server_id: "S1028",
                is_admin_author: false,
                is_pro_author: true,
                parent_id: "cmt-root-touch",
                reply_to_comment_id: "cmt-root-touch",
                reply_to_nickname: "DragonSlayer",
                reply_to_server_id: "S1024",
                intent_tag: "DISCUSSION",
                content: "Câu trả lời cấp 1 phẳng hóa khung viền.",
                status: "APPROVED",
                is_pinned: false,
                helpful_count: 1,
                viewer_has_liked: false,
                is_own_comment: true,
                created_at: "2026-10-17T10:05:00.000Z",
              },
            ],
          },
        ],
        total: 1,
        page: 1,
        limit: 30,
      },
    });

    render(
      <GuideCommentsSection
        pageKey="guides:heroes/encyclopedia"
        locale="vi"
      />
    );

    await screen.findByText("DragonSlayer");

    // Open inline reply form
    const replyBtns = screen.getAllByTestId("comment-reply-btn");
    fireEvent.click(replyBtns[0]!);
    await screen.findByTestId("comment-reply-textarea");

    const section = screen.getByTestId("guide-comments-section");

    // Every <button> inside GuideCommentsSection must enforce min-h-[44px]
    const allButtons = Array.from(section.querySelectorAll("button"));
    expect(allButtons.length).toBeGreaterThanOrEqual(12);
    for (const btn of allButtons) {
      expect(
        btn.className,
        `Button "${btn.textContent?.trim()}" is missing min-h-[44px]`
      ).toContain("min-h-[44px]");
    }

    // Verify Single-Layer Containment (max bordered container depth <= 1 even with replies!)
    expect(getMaxBorderedContainerDepth(section)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(section)).toEqual([]);
    expect(findMonoElementsWithVietnamese(section)).toEqual([]);
  });
});
