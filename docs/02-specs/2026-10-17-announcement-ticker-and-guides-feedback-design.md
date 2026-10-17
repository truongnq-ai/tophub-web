# 📢 Đặc Tả Yêu Cầu, Kiểm Toán Kỹ Thuật (`/review-plan`) & Kế Hoạch Thực Thi TDD — Thanh Thông Báo Chạy Ngang Trang Chủ & Cảnh Báo Góp Ý Cẩm Nang

> **Version:** 2.0 (Hardened via `/review-plan`) · **Ngày:** 2026-10-17 · **Trạng thái:** `HARDENED — SẴN SÀNG THỰC THI`
> **Áp dụng quy trình:** `/software-ba-gather-requirements` · `/software-dev-code-review` · `/software-team-brainstorm-idea` · `/question` · `/review-plan`
> **Liên quan:** [Index.tsx](../../src/app/%5Blocale%5D/Index.tsx) · [header.tsx](../../src/components/header.tsx) · [guides-shell.tsx](../../src/components/guides/guides-shell.tsx) · [guide-comments-section.tsx](../../src/components/guides/guide-comments-section.tsx) · [guides-bilingual-purity.test.ts](../../tests/guides-bilingual-purity.test.ts) · [i18n.test.ts](../../tests/i18n.test.ts)

---

## 1. Tổng Quan & Bảng Quyết Định Thiết Kế Đã Chốt (`Locked Decisions`)

| Mã Quyết Định | Hạng mục | Phương án đã chốt | Chi tiết thực thi cốt lõi |
| :---: | :--- | :--- | :--- |
| **`DEC-ANN-01`** | **Vị trí dòng thông báo chạy ngang (Trang chủ)** | **Phương án A:** Thanh Full-width Banner sát dưới Header tại Trang chủ | Đặt ngay phía trên vùng nội dung chính của Trang chủ ([Index.tsx](../../src/app/%5Blocale%5D/Index.tsx)), trải rộng toàn màn hình (`w-full border-b`), nổi bật như loa thông báo toàn máy chủ trong game RPG, không làm xô lệch bố cục khung nhập UID hay Bảng điều khiển Bot. |
| **`DEC-GNF-01`** | **Vị trí dòng cảnh báo nhẹ tại Cẩm nang (`/guides/*`)** | **Phương án C:** Mô hình *"Kẹp Đôi Tinh Tế"* (Top Micro-Bar + Pre-Comment Callout) | **Chạm 1 (Đầu trang trong `GuidesShell`):** Thanh Micro-bar 1 dòng gọn nhẹ rào trước kỳ vọng ngay khi vào trang.<br>**Chạm 2 (Ngay trước `GuideCommentsSection`):** Hộp Callout đầy đủ, ấm áp kèm nút **"✍️ Để lại góp ý ngay"** đặt sát trên khung Bình luận để đón đúng điểm rơi khi người dùng vừa đọc xong bài. |
| **`DEC-QW-01`** | **Tương tác Thanh Chữ Chạy Thông Minh** | **Bật Pause-on-Hover & Click-to-Navigate** | Tự động tạm dừng chuyển động (`pause`) khi người dùng rê chuột vào (Desktop) hoặc chạm giữ (Mobile); bấm vào thanh thông báo sẽ chuyển hướng thẳng tới `/guides`. |
| **`DEC-QW-02`** | **Nút "Góp ý ngay" kết nối khung Comment** | **1-Click Smooth Scroll + Auto-Focus Textarea** | Khi bấm nút góp ý trên thanh Micro-bar hoặc hộp Callout trước Comment: tự động cuộn mượt xuống `#comments`, nếu đã đăng nhập UID thì tự động focus con trỏ vào `textarea` bình luận; nếu chưa nhập UID thì tạo nhịp sáng nổi bật tại hộp nhắc nhập UID. |
| **`DEC-QW-03`** | **Chuẩn hóa Schema Dữ liệu Thông báo** | **Tạo `src/config/announcements.ts`** | Định nghĩa sẵn interface `SystemAnnouncement` (`id`, `type`, `isActive`, `startsAt`, `endsAt`, `href`, `badge`, `message: { vi, en }`) kèm hàm `getActiveAnnouncements(now)` để giai đoạn sau nối DB/Admin chỉ cần thay nguồn fetch dữ liệu. |
| **`DEC-QW-04`** | **Đồng bộ Nhận diện trên Menu Header** | **Gắn Badge `MỚI` / `NEW` tại mục Cẩm Nang** | Gắn huy hiệu nhỏ phát sáng nhẹ cạnh mục **"Cẩm Nang"** trên thanh điều hướng [Header](../../src/components/header.tsx) (cả Desktop & Mobile Sheet). |

---

## 2. 🛡️ Báo Cáo Kiểm Toán Kế Hoạch (`/review-plan` — 12-Point Tech Lead Audit)

### 2.1. 🔍 Phân Tích Điểm Mù & Lỗ Hổng (`Gap & Blindspot Analysis`)

| # | Hạng mục kiểm tra | Phát hiện / Điểm mù trong Plan ban đầu | Mức độ rủi ro | Biện pháp vá triệt để trong Hardened Plan |
| :-: | :--- | :--- | :---: | :--- |
| **GAP-01** | **NextIntl Context Crash trong Unit Test cũ** | File [tests/guide-comments-section.test.tsx](../../tests/guide-comments-section.test.tsx) render `<GuideCommentsSection />` độc lập mà **không bọc `NextIntlClientProvider` và không mock `next-intl`**. Nếu `GuidesFeedbackNotice` gọi trực tiếp `useTranslations()` hoặc `useLocale()`, test cũ sẽ crash ngay lập tức. | 🔴 `HIGH` | Thiết kế `GuidesFeedbackNotice` nhận trực tiếp prop `locale?: GuideLocale` và dùng từ điển nội bộ `COPY[safeLocale]` (đồng bộ 100% với pattern của `GuideCommentsSection`). Không phụ thuộc cứng vào `NextIntlClientProvider`. |
| **GAP-02** | **Rò rỉ tiếng Việt trong `guides-bilingual-purity.test.ts`** | File [tests/guides-bilingual-purity.test.ts](../../tests/guides-bilingual-purity.test.ts#L302) render `GuideArticleRenderer` ở `locale="en"` và quét `VI_DIACRITIC_REGEX` trên toàn bộ `container.textContent`. Nếu `GuidesFeedbackNotice` hoặc `GuidesShell` không nhận đúng `locale="en"`, test sẽ fail đỏ. | 🔴 `HIGH` | Truyền tường minh `locale={locale}` từ `GuideArticleRenderer` $\rightarrow$ `GuideCommentsSection` $\rightarrow$ `GuidesFeedbackNotice`, và truyền `locale` từ `guides/layout.tsx` $\rightarrow$ `GuidesShell` $\rightarrow$ `GuidesFeedbackNotice`. |
| **GAP-03** | **Strict Key Parity trong `tests/i18n.test.ts`** | File [tests/i18n.test.ts](../../tests/i18n.test.ts) kiểm tra `Object.keys(vi.Navigation).sort() === Object.keys(en.Navigation).sort()` và tương tự cho `Guides`, `Common`, top-level keys. Thêm key lệch giữa `vi.json` và `en.json` sẽ làm gãy CI. | 🔴 `HIGH` | Bổ sung key đối xứng tuyệt đối 1:1 giữa `messages/vi.json` và `messages/en.json`, đồng thời chạy test tự động kiểm tra cả `i18n.test.ts` lẫn `guides-bilingual-purity.test.ts`. |
| **GAP-04** | **Lỗi `scrollIntoView` trên JSDOM & Xung đột `focus()` trên Mobile Safari** | Mặc định JSDOM không có `Element.prototype.scrollIntoView`. Ngoài ra, trên Mobile Safari, gọi `textarea.focus()` mặc định ngay sau `scrollIntoView({ behavior: 'smooth' })` sẽ hủy hiệu ứng cuộn mượt và giật trang. | 🟡 `MEDIUM` | 1. Kiểm tra `typeof el.scrollIntoView === "function"` trước khi gọi.<br>2. Gọi `textarea.focus({ preventScroll: true })` kết hợp sự kiện `tophub:focus-comment` để kích hoạt hiệu ứng viền sáng `ring-2 ring-amber-500` trong 1.8 giây tại khung Comment. |
| **GAP-05** | **Nhân đôi DOM trong Marquee gây lỗi Screen Reader & `getByText`** | Nếu nhân đôi dải chữ chạy ngang để làm hiệu ứng vòng lặp vô tận (Infinite Loop) mà không ẩn bản sao, Screen Reader sẽ đọc 2 lần và `screen.getByText()` trong Vitest sẽ báo lỗi `Found multiple elements`. | 🟡 `MEDIUM` | Đánh dấu bản sao thứ 2 trong Marquee bằng `aria-hidden="true"` và `data-testid="announcement-track-clone"`, giữ bản gốc ở `data-testid="announcement-track-primary"`. |
| **GAP-06** | **Null Safety & Date Boundary cho `SystemAnnouncement`** | Khi mở rộng sang Admin/DB, các trường `startsAt` / `endsAt` có thể là `null`, chuỗi rỗng hoặc định dạng ngày lỗi. | 🟡 `MEDIUM` | Viết hàm thuần (pure function) `isAnnouncementActive(item, now)` kiểm tra `Number.isNaN(Date.parse(...))` an toàn, có unit test riêng cho các biên thời gian (trước hạn, trong hạn, quá hạn, ngày lỗi). |
| **GAP-07** | **Tràn khung nhìn (Viewport Squeeze) trên màn hình Mobile 320px** | Nếu cả Badge bên trái (`[📢 THÔNG BÁO MỚI]`) và nút CTA bên phải (`[📖 Mở Cẩm Nang →]`) đều hiển thị đầy đủ trên màn hình dọc điện thoại, vùng chữ chạy ở giữa sẽ bị ép nhỏ dưới 120px. | 🟡 `MEDIUM` | Responsive thông minh: Trên mobile (`< sm`), thu gọn nhãn trái thành `[📢 MỚI]` / `[📢 NEW]` và thu gọn nút phải thành icon `ArrowRight`, dành trọn `>75%` chiều ngang màn hình cho dòng chữ chạy và icon `BookOpen`. |

---

### 2.2. ⚡ Ma Trận Đánh Giá Tác Động Hệ Thống (`Impact Assessment Matrix`)

- **API Contracts**: `NO BREAKING CHANGES` — Giai đoạn này sử dụng cấu hình chuẩn hóa tại `src/config/announcements.ts`, không thay đổi bất kỳ endpoint REST/Server Action hiện có nào.
- **Database / Schema**: `SAFE (UNTOUCHED)` — Không can thiệp vào schema Prisma hiện tại; thiết kế sẵn TypeScript interface `SystemAnnouncement` tương thích 100% với bảng DB trong tương lai.
- **Auth & Permissions**: `SAFE` — Tuân thủ nghiêm ngặt quy tắc **Zero-UID Exposure** tại `GuideCommentsSection` (người dùng chưa có UID bấm "Góp ý ngay" sẽ được dẫn tới khung `comments-uid-gate` an toàn).
- **Regression Scope**: `AFFECTS 4 SHARED MODULES` (`Header`, `Index`, `GuidesShell`, `GuideCommentsSection`) — Đã có kịch bản bảo vệ toàn bộ 35 file test hiện hữu trong `tophub-web/tests/`.

---

## 3. 🛠️ Kế Hoạch Thực Thi Đã Vá Lỗi (`Hardened Atomic TDD Implementation Plan`)

> **Mục tiêu:** Triển khai thanh thông báo chạy ngang tại Trang chủ, huy hiệu `MỚI/NEW` trên Header, và hệ thống cảnh báo góp ý 2 chạm tại Cẩm nang theo quy trình TDD nguyên tử, vượt qua 100% bộ kiểm thử hiện có và mới.

### Task 1: Chuẩn hóa Schema & Cấu hình Thông báo (`src/config/announcements.ts`) + Từ điển Song ngữ (`vi.json` / `en.json`)
- [x] **1.1 (Red Test):** Tạo file test `tophub-web/tests/announcement-and-guides-feedback.test.tsx` kiểm tra hàm `isAnnouncementActive()`, `getActiveAnnouncements()` (với các biên `isActive`, `startsAt`, `endsAt`, invalid date) và kiểm tra tính đối xứng khóa dịch mới trong `vi.json` / `en.json`.
- [x] **1.2 (Verify Red):** Chạy `pnpm test tests/announcement-and-guides-feedback.test.tsx` xác nhận test fail do chưa có module.
- [x] **1.3 (Green Code):**
  - Tạo `tophub-web/src/config/announcements.ts` định nghĩa `SystemAnnouncement`, hàm `isAnnouncementActive`, `getActiveAnnouncements`, và cấu hình thông báo mặc định giới thiệu trang Cẩm nang (`id: "ann-guides-launch-2026"`, icon `Megaphone` + `BookOpen`, song ngữ `vi`/`en`).
  - Cập nhật `tophub-web/messages/vi.json` và `tophub-web/messages/en.json` bổ sung khóa `Navigation.guidesNewBadge` và `Home.announcement.*`, `Guides.betaNotice*`.
- [x] **1.4 (Verify Green):** Chạy Vitest cho `tests/announcement-and-guides-feedback.test.tsx`, `tests/i18n.test.ts`, và `tests/guides-bilingual-purity.test.ts` xác nhận PASS.

### Task 2: Triển khai Thanh Thông Báo Chạy Ngang Trang Chủ (`HomeAnnouncementTicker`) & Badge Header
- [x] **2.1 (Red Test):** Bổ sung test cases vào `tests/announcement-and-guides-feedback.test.tsx` kiểm tra:
  - `<HomeAnnouncementTicker />` render đúng icon Loa (`Megaphone`) + Sách mở (`BookOpen`), nội dung chạy ngang theo `locale="vi"` và `locale="en"`, bản sao marquee có `aria-hidden="true"`, link trỏ đúng tới `/guides`, và tự ẩn khi không có thông báo active.
  - `<Header />` hiển thị badge `MỚI` / `NEW` cạnh mục "Cẩm Nang".
- [x] **2.2 (Verify Red):** Chạy test xác nhận fail.
- [x] **2.3 (Green Code):**
  - Cập nhật `tophub-web/tailwind.config.js`: Thêm keyframe `marquee` (`0%: { transform: 'translate3d(0%, 0, 0)' }`, `100%: { transform: 'translate3d(-50%, 0, 0)' }`) và animation `marquee: 'marquee 28s linear infinite'`.
  - Tạo `tophub-web/src/components/home/home-announcement-ticker.tsx` với thiết kế RPG Gold Broadcast, hỗ trợ `group-hover:[animation-play-state:paused]`, `active:[animation-play-state:paused]`, `motion-reduce:animate-none`, responsive tối ưu cho mobile 320px (`GAP-07`).
  - Nhúng `<HomeAnnouncementTicker />` vào đầu `tophub-web/src/app/[locale]/Index.tsx` (ngay dưới Header, phía trên container chính).
  - Cập nhật `tophub-web/src/components/header.tsx` thêm badge `MỚI` / `NEW` tinh tế cạnh mục điều hướng `/guides`.
- [x] **2.4 (Verify Green):** Chạy lại test xác nhận PASS.

### Task 3: Triển khai Hệ Thống Cảnh Báo Cầu Thị & Kích Hoạt Góp Ý 2 Chạm (`GuidesFeedbackNotice`)
- [x] **3.1 (Red Test):** Bổ sung test cases vào `tests/announcement-and-guides-feedback.test.tsx` kiểm tra:
  - `<GuidesFeedbackNotice variant="top-bar" />` và `<GuidesFeedbackNotice variant="pre-comment" />` hiển thị đúng nội dung ở cả `vi` và `en` (0 ký tự tiếng Việt khi `locale="en"`).
  - Khi bấm nút **"✍️ Để lại góp ý ngay"** (hoặc nút trên `top-bar`): gọi `scrollIntoView` an toàn (không crash nếu `scrollIntoView` là `undefined`), phát sự kiện `tophub:focus-comment`, và nếu đã đăng nhập UID thì tự động `focus({ preventScroll: true })` vào `comment-root-textarea`.
- [x] **3.2 (Verify Red):** Chạy test xác nhận fail.
- [x] **3.3 (Green Code):**
  - Tạo `tophub-web/src/components/guides/guides-feedback-notice.tsx` hỗ trợ 2 chế độ `variant="top-bar"` và `variant="pre-comment"`, sử dụng từ điển nội bộ `COPY[safeLocale]` (`GAP-01`, `GAP-02`) và hàm `triggerCommentFocus()`.
  - Cập nhật `tophub-web/src/app/[locale]/guides/layout.tsx` và `tophub-web/src/components/guides/guides-shell.tsx`: Truyền `locale` và đặt `<GuidesFeedbackNotice variant="top-bar" locale={locale} />` ở đầu cột nội dung chính (phủ toàn bộ 32 trang Cẩm nang).
  - Cập nhật `tophub-web/src/components/guides/guide-comments-section.tsx`: Đặt `<GuidesFeedbackNotice variant="pre-comment" locale={safeLocale} />` ngay phía trên khung thảo luận, lắng nghe sự kiện `tophub:focus-comment` để focus vào `textarea` và bật hiệu ứng viền sáng `ring-2 ring-amber-500` trong 1.8 giây (`GAP-04`).
- [x] **3.4 (Verify Green & Full Regression):** Chạy toàn bộ bộ test của dự án (`pnpm test`) để đảm bảo 100% test suites (bao gồm `guide-comments-section.test.tsx`, `guides-hub-client.test.tsx`, `guide-article-renderer.test.tsx`, `guides-bilingual-purity.test.ts`, `i18n.test.ts`) đều PASS xanh.
