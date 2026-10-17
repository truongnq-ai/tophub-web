# 🎮 Cẩm Nang Chiến Thuật & Kho Dữ Liệu Top Heroes (NotebookLM Knowledge Base)

Kho lưu trữ cục bộ (Local Knowledge Base) chứa toàn bộ **46 nguồn dữ liệu gốc (Sources)**, **3 tài liệu thành phẩm (Studio Artifacts)** và **10 lượt hội thoại phân tích chuyên sâu (Chat Transcripts)** được đồng bộ hóa 100% từ sổ tay NotebookLM **🎮 Cẩm nang Top Heroes** (`37823518-f354-4875-8e61-eede860cf03e`).

---

## 🛠️ Yêu Cầu Tiên Quyết (Prerequisites)

- **NotebookLM MCP Server:** `notebooklm-mcp-cli >= 0.15.3` (Tài khoản mặc định: `truongnq.ai@gmail.com`)
- **Trình đọc Markdown / PDF:** VS Code / Antigravity IDE (hỗ trợ chuẩn UTF-8 và GitHub Flavored Markdown)
- **Notebook UUID gốc:** `37823518-f354-4875-8e61-eede860cf03e`

---

## ⚡ Lệnh Đồng Bộ & Truy Vấn Nhanh (Usage Commands)

```powershell
# 1. Kiểm tra danh sách toàn bộ file tài liệu đã đồng bộ về local
Get-ChildItem -Path "d:\GitHub\top-hero\docs\06-game-guides" -Recurse -File | Select-Object Directory, Name, Length

# 2. Nâng cấp công cụ NotebookLM MCP CLI khi có bản mới
uv tool upgrade notebooklm-mcp-cli
```

---

## 📂 Cấu Trúc Phân Chia Thư Mục (7 Phân Khu Chuyên Biệt)

### 00. Bảng Điều Khiển Trung Tâm & Tổng Hợp AI (`00-master-dashboard/`)

| Tài liệu | Nội dung cốt lõi | Nguồn gốc |
| :--- | :--- | :---: |
| [master-dashboard-7-topics.md](00-master-dashboard/master-dashboard-7-topics.md) | Bảng điều khiển trung tâm quản lý 7 chuyên đề chiến thuật (Tài khoản `[GAS]Max - Server 10956`) | `Source` |
| [progress-check-6-topics.md](00-master-dashboard/progress-check-6-topics.md) | Báo cáo rà soát tiến độ hoàn thiện 6 Topic ban đầu | `Source` |
| [notebooklm-ai-synthesis-and-chat-history.md](00-master-dashboard/notebooklm-ai-synthesis-and-chat-history.md) | Toàn bộ 10 lượt hỏi-đáp chuyên sâu và bản tổng hợp kiến trúc 7 Topics từ AI NotebookLM | `Chat Transcript` |

### 01. 7 Chuyên Đề Chiến Thuật Chuẩn Hóa (`01-core-strategic-topics/`)

| Tài liệu | Chuyên đề | Nội dung cốt lõi |
| :--- | :---: | :--- |
| [topic-1-heroes-1queue-rule-epic-traits.md](01-core-strategic-topics/topic-1-heroes-1queue-rule-epic-traits.md) | **TOPIC 1** | Nguyên tắc cốt lõi về Tướng, Quy tắc 1 Hàng khắc nghiệt & Hệ thống Thiên phú Tướng Tím (12 sao) |
| [topic-2-and-4-buildings-and-research-tech.md](01-core-strategic-topics/topic-2-and-4-buildings-and-research-tech.md) | **TOPIC 2 & 4** | Chiến lược nâng cấp Hạ tầng Công trình (3 hàng đợi thợ) & Nghiên cứu Công nghệ (2 hàng đợi) |
| [topic-3-hero-gear-lord-gear-exclusive-weapon.md](01-core-strategic-topics/topic-3-hero-gear-lord-gear-exclusive-weapon.md) | **TOPIC 3** | Bách khoa Trang bị Tướng (3 bộ Vàng, lộ trình +10 ➔ +40 & 5 Sao Đỏ), Trang bị Lãnh chúa & Vũ khí Độc quyền |
| [topic-5-shops-currencies-military-gear.md](01-core-strategic-topics/topic-5-shops-currencies-military-gear.md) | **TOPIC 5** | Hệ thống Tiệm (Shops), Tiền tệ, Ngưỡng đóng băng Xu Vinh Quang Hội & Quân trang (Pro Edition) |
| [topic-6-biweekly-event-schedule-week-a-b.md](01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md) | **TOPIC 6** | Chiến thuật Sự kiện theo Chu kỳ Xoay vòng 2 Tuần (Kỳ Thi Đấu Hội: Thi Đấu Hội ⇄ Kỳ GAR/KvK: Đua Vũ Trang GAR / KvK) |
| [topic-7-server-timeline-s0-s4-horde-pivot.md](01-core-strategic-topics/topic-7-server-timeline-s0-s4-horde-pivot.md) | **TOPIC 7** | Bản đồ Timeline Máy chủ (Pre-Season ➔ Season 4) & Lộ trình Chuyển giao Liên Minh sang Bộ Lạc (Horde Pivot) |

### 02. Bách Khoa Toàn Thư Tướng & Đội Hình (`02-heroes-and-lineups/`)

| Tài liệu | Nội dung cốt lõi | Nguồn gốc |
| :--- | :--- | :---: |
| [danh-sach-tuong-top-heroes-studio.md](02-heroes-and-lineups/danh-sach-tuong-top-heroes-studio.md) | Bản xuất Studio chuẩn hóa danh sách toàn bộ Anh hùng, Phẩm cấp, Phe phái & Vai trò | `Studio Artifact` |
| [danh-sach-tuong-top-heroes.md](02-heroes-and-lineups/danh-sach-tuong-top-heroes.md) | Bản nguồn gốc danh sách tướng, khắc chế hệ & hào quang đội hình | `Source` |
| [guide-topheroes-heroes-system.md](02-heroes-and-lineups/guide-topheroes-heroes-system.md) | Hướng dẫn cơ chế Tướng, thức tỉnh, kỹ năng và xếp đội hình | `Source (x2)` |
| [best-teams-meta-2026-mobigg.md](02-heroes-and-lineups/best-teams-meta-2026-mobigg.md) | Phân tích các đội hình Meta mạnh nhất 2026 (Mobi.gg) | `Source (x2)` |
| [reddit-best-league-lineup-discussion.md](02-heroes-and-lineups/reddit-best-league-lineup-discussion.md) | Thảo luận chuyên sâu cộng đồng Reddit `r/TopHeroes` về đội hình Liên Minh mạnh nhất | `Source (x2)` |

### 03. Thư Viện Số Liệu Định Lượng (`03-data-tables-and-mechanics/`)

| Tài liệu | Nội dung cốt lõi | Dung lượng |
| :--- | :--- | :---: |
| [topheroes-tables-analysis-summary.md](03-data-tables-and-mechanics/topheroes-tables-analysis-summary.md) | Bản bóc tách & giải nghĩa chi tiết các bảng tính trong `TopHeroes Tables` (Lord Gear, Runes, Faction Level...) | ~8.4 KB |
| [topheroes-tables-max-raw-dataset.md](03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md) | Dữ liệu gốc toàn bộ bảng tính `TopHeroes Tables - Max` (Chi phí nâng cấp, Runes, DE-Dust, VIP, Relics, Pets, Skins...) | ~123 KB |

### 04. Hồ Sơ Tư Vấn Thực Chiến & Kiểm Toán Tài Khoản (`04-account-audits-and-consultations/`)

| Tài liệu | Nội dung cốt lõi |
| :--- | :--- |
| [preseason-upgrade-consultation-full.md](04-account-audits-and-consultations/preseason-upgrade-consultation-full.md) | Hồ sơ tư vấn toàn diện giai đoạn Pre-Season (78 KB lịch sử phân tích chi tiết từng hạng mục) |
| [gear-optimization-consultation.md](04-account-audits-and-consultations/gear-optimization-consultation.md) | Tư vấn tối ưu hóa rèn đúc và phân bổ trang bị thực chiến |
| [gear-set-and-enhancement-master-qa.md](04-account-audits-and-consultations/gear-set-and-enhancement-master-qa.md) | Giải đáp cơ chế Bộ trang bị phe phái vs Bậc thầy cường hóa (+10/+20) qua ảnh chụp |
| [buildings-and-barracks-screenshot-audit.md](04-account-audits-and-consultations/buildings-and-barracks-screenshot-audit.md) | Phân tích tiến độ Công trình, Lâu đài và Trại lính qua ảnh chụp màn hình |
| [research-completion-and-next-steps.md](04-account-audits-and-consultations/research-completion-and-next-steps.md) | Đánh giá nhánh Nghiên cứu đã hoàn thành và định hướng nhánh tiếp theo |
| [event-shopping-consultation.md](04-account-audits-and-consultations/event-shopping-consultation.md) | Tư vấn ưu tiên mua sắm vật phẩm trong các tiệm sự kiện |
| [saturday-upgrade-item-dump-plan.md](04-account-audits-and-consultations/saturday-upgrade-item-dump-plan.md) | Kế hoạch xả vật phẩm nâng cấp và Thẻ chiêu mộ vào ngày Thứ 7 & Chủ Nhật |
| [pasted-notes-and-quick-tips.md](04-account-audits-and-consultations/pasted-notes-and-quick-tips.md) | Ghi chú nhanh và văn bản tổng hợp đã dán |
| [ingame-screenshots-index.md](04-account-audits-and-consultations/ingame-screenshots-index.md) | Danh mục chỉ mục và đường dẫn gốc của 4 nguồn ảnh chụp trong game (`image_picker_*`) |

### 05. Cẩm Nang Sự Kiện, Tân Thủ & Cộng Đồng (`05-events-and-community-guides/`)

| Tài liệu | Nội dung cốt lõi | Định dạng |
| :--- | :--- | :---: |
| [top-heroes-event-schedule-studio.md](05-events-and-community-guides/top-heroes-event-schedule-studio.md) | Lịch trình Sự kiện & Cẩm nang Double-Dip xuất từ bảng Studio | `.md` |
| [top-heroes-event-schedule.pdf](05-events-and-community-guides/top-heroes-event-schedule.pdf) | Bản in PDF chuẩn hóa Lịch trình Sự kiện Top Heroes từ bảng Studio | `.pdf` |
| [event-strategy-hub-guide.md](05-events-and-community-guides/event-strategy-hub-guide.md) | Cẩm nang chiến thuật sự kiện tổng hợp (`Event Strategy Hub - Top Heroes Guide`) | `.md` |
| [beginner-guide-topheroes.md](05-events-and-community-guides/beginner-guide-topheroes.md) | Hướng dẫn toàn diện cho người mới bắt đầu (`TopHeroes Guide`) | `.md` |
| [reddit-beginner-guide-discussion.md](05-events-and-community-guides/reddit-beginner-guide-discussion.md) | Tổng hợp kinh nghiệm cho người mới từ cộng đồng Reddit `r/TopHeroes` | `.md` |
| [reddit-best-diamond-spending-guide.md](05-events-and-community-guides/reddit-best-diamond-spending-guide.md) | Chiến thuật chi tiêu Kim Cương hiệu quả nhất (`r/TopHeroes`) | `.md` |
| [reddit-squad-power-upgrade-tips.md](05-events-and-community-guides/reddit-squad-power-upgrade-tips.md) | Mẹo nâng cấp sức mạnh đội hình cho người chơi mới và cũ (`r/TopHeroes`) | `.md` |
| [gameplay-and-core-features-2game.md](05-events-and-community-guides/gameplay-and-core-features-2game.md) | Tổng quan lối chơi và các tính năng quan trọng trong Top Heroes (`2Game`) | `.md` |
| [giftcodes-oct-2026-thegioididong.md](05-events-and-community-guides/giftcodes-oct-2026-thegioididong.md) | Tổng hợp mã Giftcode Thời Đại Anh Hùng và hướng dẫn nhập code (`Thegioididong`) | `.md` |

### 06. Tài Liệu Ý Tưởng Web, Bot & Kết Nối AI (`06-platform-and-ai-integration/`)

| Tài liệu | Nội dung cốt lõi |
| :--- | :--- |
| [web-companion-product-brainstorm.md](06-platform-and-ai-integration/web-companion-product-brainstorm.md) | Bản thảo luận ý tưởng sản phẩm Web Companion Top Heroes, phân luồng F2P/Spender & mô hình Freemium 1–2$/tháng |
| [giftcode-bot-creation-full-log.md](06-platform-and-ai-integration/giftcode-bot-creation-full-log.md) | Toàn bộ nhật ký thiết kế & xây dựng hệ thống Bot săn và tự động nhập Giftcode (95 KB) |
| [antigravity-notebooklm-mcp-integration.md](06-platform-and-ai-integration/antigravity-notebooklm-mcp-integration.md) | Giải pháp kiến trúc kết nối Antigravity IDE với NotebookLM qua MCP Server & Bulk Export |

### 07. Bộ Tài Liệu Markdown Chuẩn Hóa Cho Web Guides Hub (`07-standardized-web-guides/`)

> 🌟 **Single Source of Truth cho Giai đoạn II (`Track 4 — Guides Hub`):** Toàn bộ 31 file Markdown trong phân khu này đã được chuẩn hóa 100% phi cá nhân hóa, phân tầng `Free 70% ➔ PRO 30%`, bao phủ đủ 3 Phe phái (`Liên Minh` / `Bộ Lạc` / `Thiên Nhiên`) và tích hợp khung đặc tả Media 4 tầng để ánh xạ trực tiếp lên 27 trang Web `/[locale]/guides`.

| Phân nhóm / Tài liệu | Phạm vi File | Nội dung cốt lõi |
| :--- | :---: | :--- |
| [README.md](07-standardized-web-guides/README.md) | **Master Index** | Ma trận ánh xạ 31 file Markdown chuẩn hóa ➔ 27 Web Routes (`registry.ts`) & Hướng dẫn chạy Quality Gate CLI |
| `group-1-getting-started/` | `1.1 ➔ 1.4` (4 files) | Tổng quan 7 trụ cột, Quy tắc 1 Đội hình Tuyệt đối, Tier List tiêu Kim Cương & Gói nạp ROI, 10 Cạm bẫy Phế Acc |
| `group-2-heroes-and-meta/` | `2.1 ➔ 2.5` (5 files) | Bách khoa 45+ Tướng, Đội hình Meta 3 Phe, Sơ đồ 6 Ô & Khắc chế, Chi phí Mảnh/Hồn Đá, Trait 3 Kinh tế Tướng Tím |
| `group-3-events-double-dip/` | `3.1 ➔ 3.4` (4 files) | Lộ trình Sự kiện Kỳ Thi Đấu Hội/B, Mẹo săn Nhiệm vụ Vàng `Guild Race`, Giải phẫu 6 ngày `Arms Race / KvK`, Ma trận `Double-Dip` |
| `group-4-server-roadmap/` | `4.1 ➔ 4.3` (3 files) | Lịch ra mắt Mythic Ngày 1–65 (Wheel/Dice), Phác đồ Chuyển giao Bộ Lạc (`Horde Pivot`), Lộ trình Season 1 ➔ Season 4 |
| `group-5-gear-and-weapons/` | `5.1 ➔ 5.4` (4 files) | Tổng quan 3 hệ thống Trang bị, Phối 3 Bộ Đồ Vàng + Dấu Hệ +30%, Bậc thầy Cường hóa +10/+20/+30/+40 & UW, Chiến thuật Đồ Chúa Tể |
| `group-6-runes-relics-pets/` | `6.1 ➔ 6.3` (3 files) | Cổ Ngữ Lv.1–6 (`Combat Skill Level`), Bộ 3 Thánh Vật chuẩn 3 Phe, Thú Cưng Lv.1–90 & Cự Thú Bang Hội |
| `group-7-shops-and-economy/` | `7.1 ➔ 7.4` (4 files) | Tier List 12+ Cửa hàng, Chiến lược Đóng băng 40,000 Điểm Vinh Dự Bang, Tối ưu VIP/Wheel/Dice Shop, Ngoại hình Quân lính (`Troop Skins`) |
| `group-8-infrastructure/` | `8.1 ➔ 8.4` (4 files) | Đường găng Lâu đài Lv.1–40 & Lính T10, Phân công Thợ xây & Dân làng, Cây Khoa học & Kỹ thuật Baiting, Kho Bảng biểu Tổng hợp (`TopHeroes Tables`) |

---

## ⚠️ Lưu Ý & Xử Lý Sự Cố (Known Quirks & Troubleshooting)

- **Nguồn trùng lặp trong NotebookLM:** Trong 46 nguồn trên NotebookLM có 10 cặp bài viết web/Reddit được thêm 2 lần. Khi xuất về local, hệ thống đã tự động chọn bản có số ký tự đầy đủ nhất và gắn cả 2 `source_id` vào phần YAML Frontmatter ở đầu mỗi file để đảm bảo truy vết 100%.
- **Mã hóa tiếng Việt:** Toàn bộ các file `.md` đều được lưu bằng chuẩn `UTF-8 (No BOM)` để tránh lỗi hiển thị font chữ khi mở trên Windows hoặc render trên Next.js (`tophub-web`).
