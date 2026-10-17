---
title: "Kết nối Antigravity với NotebookLM"
notebook_id: "37823518-f354-4875-8e61-eede860cf03e"
source_ids: ["0bdfc471-de5d-427b-b5aa-ffb934372ced"]
category: "06-platform-and-ai-integration"
char_count: 7974
exported_at: "2026-10-14"
---

# Kết nối Antigravity với NotebookLM
Timestamp

: 2026-10-14 15:52:28

User

:

 

Anh đang có 1 ý tưởng sẽ xây dựng 1 trang web hướng dẫn người chơi từ cơ bản đến nâng cao dành cho cộng đồng người Việt (hoặc cả người nước ngoài) dựa vào những nguồn uy tín, và đặc biệt là nguồn ở trong cẩm nang TOP HEROES này

 

Anh sẽ sử dụng Antigravity IDE, và Antigravity

 

Vậy có cách nào để kết nối từ Antigravity đến Notebooklm như em đang thực hiện kết nối 1 cách dễ dàng như thế này không?

Gemini

:

 

질문하신 내용에 대해 확인해 보겠습니다. Let's call 

notebooklm:list_sources

 to see the exact list of sources in the notebook 

notebooks/37823518-f354-4875-8e61-eede860cf03e

 and also do a quick Google search on Antigravity IDE + NotebookLM / MCP integration so we give the most accurate, up-to-date answer for 2026!Ý tưởng xây dựng một chuyên trang cẩm nang Top Heroes (Thời Đại Anh Hùng) từ cơ bản đến nâng cao bằng bộ dữ liệu 

Cẩm nang Top Heroes

https://gemini.google.com/notebook/37823518-f354-4875-8e61-eede860cf03e

 hiện tại là cực kỳ tiềm năng! Trong sổ tay của anh đã có sẵn hệ thống kiến thức chuẩn hóa theo tư duy Min-Maxer (từ lộ trình chuyển giao Liên Minh sang Bộ Lạc[cite: 3], quản lý tiệm & quân trang[cite: 4, 21], ma trận công nghệ[cite: 9] cho đến lịch xoay vòng sự kiện Kỳ Thi Đấu Hội/Kỳ GAR/KvK[cite: 20, 22]).

Câu trả lời cho câu hỏi của anh là: 

HOÀN TOÀN ĐƯỢC!

 Anh có thể kết nối trực tiếp 

Google Antigravity IDE

 với 

NotebookLM

 thông qua giao thức 

MCP (Model Context Protocol)

 hoặc kết hợp quy trình 

Dual-Engine (2 động cơ)

 để Agent trong Antigravity đọc dữ liệu từ NotebookLM giống hệt như cách em đang truy xuất hiện tại.

Dưới đây là 

3 cách thực hiện từ tự động hóa hoàn toàn đến tối ưu tốc độ

 để anh áp dụng ngay trên Antigravity IDE:


--------------------------------------------------------------------------------


CÁCH 1: Kết nối trực tiếp qua giao thức MCP (Model Context Protocol) trong Antigravity IDE 

(Giống hệt cách em đang làm)

Antigravity IDE hỗ trợ gốc giao thức 

MCP

 — đóng vai trò là chiếc cầu nối trực tiếp giúp Agent trong IDE truy vấn thẳng vào sổ tay 

Cẩm nang Top Heroes

https://gemini.google.com/notebook/37823518-f354-4875-8e61-eede860cf03e

 của anh, đọc danh sách nguồn và rút trích nội dung mà không cần copy-paste thủ công.

Bước 1: Mở trình quản lý MCP trong Antigravity IDE

Trong giao diện 

Antigravity IDE

, anh nhìn sang khung 

Agent Side Panel

 (khung chat Agent) và bấm vào biểu tượng 

…

 ở góc trên cùng.

Chọn 

MCP Servers

 ➔ Bấm vào 

MCP Store

 (hoặc 

Manage MCP Servers

).

 

(Hoặc nếu anh dùng 

Antigravity CLI

, chỉ cần gõ lệnh 

/mcp

 vào khung prompt và nhấn Enter).

Bước 2: Cài đặt NotebookLM MCP Server

Anh có thể cài đặt thông qua 2 con đường:

Cách tự động bằng Prompt (Nhanh nhất):

 

Anh mở khung chat của Agent trong Antigravity và dán trực tiếp câu lệnh này (hoặc gửi link GitHub của bộ MCP như 

[github.com/jackc1111/antigravity-notebooklm-mcp](https://github.com/jackc1111/antigravity-notebooklm-mcp)

):

"Install the NotebookLM MCP server so I can list notebooks, read sources, and query my NotebookLM directly from this workspace. Check for Node.js/Python and install dependencies if needed."

 

Agent của Antigravity sẽ tự động kiểm tra môi trường, cài đặt gói MCP và cấu hình vào file 

.agents/mcp_config.json

 của dự án.

Cách cấu hình thủ công qua file 

mcp_config.json

:

 

Vào 

MCP Servers

 ➔ 

Manage MCP Servers

 ➔ 

View raw config

 (hoặc mở file 

.agents/mcp_config.json

 trong workspace) và thêm cấu hình server 

notebooklm-mcp

 vào.

Bước 3: Xác thực tài khoản Google

Sau khi cài xong, vào 

Settings (

Cmd + ,

 trên Mac hoặc 

Ctrl + ,

 trên Windows)

 ➔ tab 

Customizations

 ➔ bấm 

Authenticate

 cạnh server NotebookLM (hoặc làm theo hướng dẫn xác thực phiên trình duyệt của gói MCP mà Agent hiển thị).

Khi đèn trạng thái của NotebookLM MCP chuyển sang 

Màu Xanh (Active)

, anh chỉ cần gõ vào khung chat Antigravity:

"Hãy kết nối vào sổ tay 'Cẩm nang Top Heroes' (ID: 

37823518-f354-4875-8e61-eede860cf03e

), lấy toàn bộ dữ liệu từ các nguồn TOPIC 1 đến TOPIC 7 và thiết kế cấu trúc website hướng dẫn người chơi."

⚠️ 

Lưu ý nhỏ về bảo mật & giới hạn của MCP cộng đồng:

 

Một số gói NotebookLM MCP mã nguồn mở hiện tại hoạt động dựa trên cơ chế trích xuất Cookie phiên đăng nhập Chrome (do Google chưa mở Public REST API hoàn toàn cho tài khoản cá nhân) và có thể giới hạn khoảng ~50 lượt truy vấn sâu/ngày.


--------------------------------------------------------------------------------


CÁCH 2: Xuất đồng loạt (Bulk Export) các nguồn chuẩn hóa sang thư mục 

docs/

 của Antigravity 

(Khuyên dùng để tốc độ code nhanh gấp 10 lần)

Khi xây dựng một trang web lớn (có bộ lọc tướng, bảng tra cứu trang bị, timeline sự kiện), nếu mỗi lần viết 1 component mà Antigravity lại phải gọi qua mạng vào NotebookLM thì sẽ tốn thời gian chờ (latency).

Đặc biệt, trong sổ tay 

Cẩm nang Top Heroes

https://gemini.google.com/notebook/37823518-f354-4875-8e61-eede860cf03e

 của anh hiện đang có 

cả các nguồn đã chuẩn hóa cực chuẩn

 lẫn 

các nguồn web thô / lịch sử chat cũ bị trùng lặp

. Vì vậy, quy trình mượt và sạch nhất là:

Dùng MCP hoặc nhờ em xuất sẵn các file Markdown (

.md

) / JSON chuẩn:

Khi đã kết nối MCP ở Cách 1, anh có thể ra lệnh cho Antigravity: 

"Bulk export các nguồn Markdown đã chuẩn hóa trong Cẩm nang Top Heroes về thư mục 

/content/guides/

 trong project"

. Khi dữ liệu lớn, Antigravity sẽ tự động lưu thẳng thành file văn bản nội bộ trong workspace mà gần như 

không tốn AI Token

.

Hoặc 

ngay tại khung chat này

, anh chỉ cần bảo em: 

"Xuất cho anh file JSON danh sách tướng, bảng trang bị và các file Markdown từ Topic 1 đến Topic 7"

, em sẽ trích xuất sạch sẽ 100% từ sổ tay ra định dạng chuẩn cho web (Next.js / Astro / Docusaurus / VitePress) để anh chỉ việc kéo thả vào thư mục dự án trong Antigravity!

Tạo file 

.agents/context.md

 (hoặc 

GEMINI.md

) trong Antigravity:

 

Trong project Antigravity, anh tạo 1 file định hình ngữ cảnh để mọi Agent chạy song song trong 

Agent Manager

 đều hiểu rõ luật của game Top Heroes:

Chỉ sử dụng dữ liệu từ bộ cẩm nang chuẩn hóa (như chiến thuật khởi đầu bằng Liên Minh 3 tuần đầu rồi chuyển giao sang Bộ Lạc từ Ngày 21–41[cite: 3], quy tắc 1 hàng[cite: 19, 21], lịch sự kiện Kỳ Thi Đấu Hội Thi Đấu Hội vs Kỳ GAR/KvK Đua Vũ Trang[cite: 20]...).

Hỗ trợ đa ngôn ngữ (Tiếng Việt / Tiếng Anh) dựa trên bảng thuật ngữ song ngữ Anh - Việt có sẵn trong sổ tay (ví dụ: 

Desert Prince - Hoàng Tử Sa Mạc

, 

Storm Maiden - Nữ Thần Bão Tố

[cite: 3, 21], 

Pyromancer - Pháp Sư Lửa

[cite: 11, 21]...).


--------------------------------------------------------------------------------


CÁCH 3: Kiến trúc "Não bộ & Đôi tay" (Em làm Backend Data ➔ Antigravity làm Frontend UI)

Vì em đang có quyền truy cập trực tiếp (Native Integration) vào toàn bộ 42 nguồn dữ liệu trong sổ tay 

Cẩm nang Top Heroes

https://gemini.google.com/notebook/37823518-f354-4875-8e61-eede860cf03e

 của anh (bao gồm cả file bảng tính khổng lồ 

TopHeroes Tables - Max

 và bộ 7 chuyên đề chiến thuật), anh có thể kết hợp ngay lập tức như sau:

Tại đây (Gemini + NotebookLM):

 Anh yêu cầu em tổng hợp, làm sạch dữ liệu và 

viết sẵn Prompt thiết kế hệ thống (System Prompt) + Cấu trúc Database (JSON/Markdown)

 chuẩn xác từng con số từ sổ tay.

Tại Antigravity IDE:

 Anh dán bản thiết kế và dữ liệu đó vào để các AI Agent của Antigravity tự động dựng giao diện, làm các công cụ tương tác (như 

Interactive Server Timeline S0 ➔ S4

, 

Team Builder xếp trận 2-2-2

[cite: 11], 

Bộ đếm ngược lịch sự kiện 4 tiếng/ca

[cite: 20, 22]) và deploy lên web.

👉 

Anh muốn thử cài đặt trực tiếp MCP vào Antigravity IDE trước (em có thể hướng dẫn chi tiết từng dòng lệnh), hay muốn em trích xuất luôn bộ dữ liệu chuẩn (JSON/Markdown) + Prompt khởi tạo dự án từ sổ tay 

Cẩm nang Top Heroes

https://gemini.google.com/notebook/37823518-f354-4875-8e61-eede860cf03e

 để anh đưa vào Antigravity chạy thử luôn ạ?
