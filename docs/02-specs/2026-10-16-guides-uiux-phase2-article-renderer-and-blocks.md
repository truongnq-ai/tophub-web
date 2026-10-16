# Guides Hub v3.0 — Phase 2 (Bước 2A): `GuideArticleRenderer v3.0` & 8 Content Blocks Redesign — Hardened Implementation Plan (v1.2)

> **Canonical Plan File:** [`docs/plans/2026-10-16-guides-uiux-phase2-article-renderer-and-blocks.md`](file:///d:/GitHub/top-hero/docs/plans/2026-10-16-guides-uiux-phase2-article-renderer-and-blocks.md)
> **Master Spec Reference:** [`tophub-web/docs/02-specs/guides-uiux-redesign-master-plan.md`](file:///d:/GitHub/top-hero/tophub-web/docs/02-specs/guides-uiux-redesign-master-plan.md)
> **Status:** Hardened v1.2 (11/11 Gaps Patched, 12/12 Senior Tech Lead Checkpoints Passed)

## Các Điểm Gia Cố Kỹ Thuật Cốt Lõi (v1.2)
- **`GAP-P2-07`:** Chuẩn hóa `TldrActionBoxProps` (`{ tldr: GuideTldrSummary; locale: GuideLocale; keyTakeaways?: LocalizedText[] }`).
- **`GAP-P2-08`:** Bổ sung `"use client";` cho `tldr-action-box.tsx`, `responsive-data-table.tsx`, `step-roadmap.tsx`, `guide-article-renderer.tsx`; giữ từ điển `LABELS[locale]` nội bộ cho 8 block để không phụ thuộc `NextIntlClientProvider` trong unit tests.
- **`GAP-P2-09`:** Ẩn toàn bộ `<ProContentGate>` khi Tab đang chọn (`core`) không chứa mục PRO nào.
- **`GAP-P2-10`:** Giữ nguyên `CalloutVariant` (`danger | warning | tip | rule`) và khóa `tophub_checklist_v2_${block.checklistId}`.
- **`GAP-P2-11`:** Chặn lỗi `getBoundingClientRect().top === 0` của các mục đang ẩn ở Tab khác bằng `data-tab-hidden="true"` và guard `el.closest('[data-tab-hidden="true"]')` trong `useArticleScrollSpy` (`guides-toc.tsx`).

Xem chi tiết từng bước TDD tại [`docs/plans/2026-10-16-guides-uiux-phase2-article-renderer-and-blocks.md`](file:///d:/GitHub/top-hero/docs/plans/2026-10-16-guides-uiux-phase2-article-renderer-and-blocks.md).
