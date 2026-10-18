import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TabComments } from "../src/components/dashboard/admin/tab-comments";

const getAdminCommentsMock = vi.fn();
const updateAdminCommentMock = vi.fn();
const replyAdminCommentMock = vi.fn();
const getAdminBannedWordsMock = vi.fn();
const updateAdminBannedWordsMock = vi.fn();

vi.mock("@/actions/comments", () => ({
  getAdminCommentsAction: (...args: any[]) => getAdminCommentsMock(...args),
  updateAdminCommentAction: (...args: any[]) => updateAdminCommentMock(...args),
  replyAdminCommentAction: (...args: any[]) => replyAdminCommentMock(...args),
  getAdminBannedWordsAction: (...args: any[]) => getAdminBannedWordsMock(...args),
  updateAdminBannedWordsAction: (...args: any[]) => updateAdminBannedWordsMock(...args),
}));

describe("Admin TabComments Moderation Component", () => {
  beforeEach(() => {
    getAdminCommentsMock.mockReset();
    updateAdminCommentMock.mockReset();
    replyAdminCommentMock.mockReset();
    getAdminBannedWordsMock.mockReset();
    updateAdminBannedWordsMock.mockReset();

    getAdminCommentsMock.mockResolvedValue({
      success: true,
      data: {
        items: [
          {
            id: "cmt-flagged-1",
            page_key: "guides:heroes/encyclopedia",
            author_uid: "2446869146316",
            author_nickname: "SuspectUser",
            author_server_id: "1024",
            is_admin_author: false,
            is_pro_author: false,
            parent_id: null,
            reply_to_comment_id: null,
            reply_to_nickname: null,
            reply_to_server_id: null,
            intent_tag: "DISCUSSION",
            content: "Bình luận bị nghi ngờ có từ khóa cấm",
            status: "PENDING_REVIEW",
            flagged_reason: 'Chứa từ khóa hạn chế: "lừa đảo"',
            is_pinned: false,
            helpful_count: 0,
            created_at: "2026-10-17T12:00:00.000Z",
          },
        ],
        total: 45,
        page: 1,
        limit: 20,
        total_pages: 3,
        summary: {
          pending_count: 1,
          approved_count: 5,
          hidden_count: 0,
        },
      },
    });

    getAdminBannedWordsMock.mockResolvedValue({
      success: true,
      data: {
        default_words: ["lừa đảo", "cờ bạc"],
        custom_words: ["shop lậu"],
      },
    });
  });

  it("renders comments with author_uid, flagged_reason, and allows Admin to Approve, Hide, or Delete", async () => {
    updateAdminCommentMock.mockResolvedValue({
      success: true,
      data: { id: "cmt-flagged-1", status: "APPROVED", is_pinned: false },
    });

    render(<TabComments />);

    await screen.findByText("SuspectUser");
    expect(getAdminCommentsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "ALL",
        page: 1,
        limit: 20,
      })
    );
    expect(screen.getByText("UID: 2446869146316")).toBeTruthy();
    expect(screen.getByText(/Chứa từ khóa hạn chế: "lừa đảo"/)).toBeTruthy();

    // Approve comment
    const approveBtn = screen.getByTestId("admin-approve-comment-cmt-flagged-1");
    fireEvent.click(approveBtn);

    await waitFor(() => {
      expect(updateAdminCommentMock).toHaveBeenCalledWith("cmt-flagged-1", {
        status: "APPROVED",
      });
    });

    // Hide comment
    updateAdminCommentMock.mockResolvedValueOnce({
      success: true,
      data: { id: "cmt-flagged-1", status: "HIDDEN", is_pinned: false },
    });
    const hideBtn = screen.getByTestId("admin-hide-comment-cmt-flagged-1");
    fireEvent.click(hideBtn);

    await waitFor(() => {
      expect(updateAdminCommentMock).toHaveBeenCalledWith("cmt-flagged-1", {
        status: "HIDDEN",
      });
    });

    // Delete comment
    updateAdminCommentMock.mockResolvedValueOnce({
      success: true,
      data: { id: "cmt-flagged-1", status: "DELETED", is_pinned: false },
    });
    const deleteBtn = screen.getByTestId("admin-delete-comment-cmt-flagged-1");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(updateAdminCommentMock).toHaveBeenCalledWith("cmt-flagged-1", {
        status: "DELETED",
      });
    });
  });

  it("renders AdminPagination and fetches next page on page change", async () => {
    render(<TabComments />);
    await screen.findByText("SuspectUser");

    const nextPageBtn = screen.getByTitle("Trang sau");
    fireEvent.click(nextPageBtn);

    await waitFor(() => {
      expect(getAdminCommentsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 2,
          limit: 20,
        })
      );
    });
  });
});
