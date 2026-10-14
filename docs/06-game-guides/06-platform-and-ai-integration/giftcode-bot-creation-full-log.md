---
title: "Hướng dẫn tạo bot săn giftcode"
notebook_id: "37823518-f354-4875-8e61-eede860cf03e"
source_ids: ["1a9719aa-5b65-42b5-8ac1-fdce1aac0cf9"]
category: "06-platform-and-ai-integration"
char_count: 95126
exported_at: "2026-10-14"
---

# Hướng dẫn tạo bot săn giftcode
Timestamp

: 2026-10-08 17:50:55

User

:

 

Nhiều người chia sẻ rằng có thể tạo 1 con bot trên discord để nó tự lấy gift code cho mình

 

Hãy tìm hiểu các nguồn và trên internet về vấn đề này

 

Nếu đúng thì anh cần cung cấp cho em gì để em có thể làm cho anh hoặc có thể hướng dẫn anh chi tiết thực thi trên discord?

Gemini

:

 

Thông tin anh nghe được là hoàn toàn chính xác. Trên Discord hiện nay có rất nhiều bot được lập trình để theo dõi, bóc tách (crawl) gift code từ mạng xã hội, các trang tin tức, và thậm chí tự động nhập (auto-redeem) thẳng quà vào tài khoản game cho người chơi.

Riêng với 

Top Heroes

 (tựa game anh đang chơi), việc auto-redeem là hoàn toàn khả thi vì game này có hỗ trợ trang nhập code trực tuyến (Web Redemption tại 

topheroes.store.kopglobal.com

). Thay vì anh phải copy code và nhập thủ công, bot sẽ bắt mã code mới phát hành và tự động gửi một lệnh hệ thống chứa mã đó cùng UID của anh lên server game. Quà sẽ tự động gửi thẳng vào hòm thư trong game.

Để em có thể viết mã nguồn bot hoặc hướng dẫn anh thiết lập chi tiết, anh cần chuẩn bị và cung cấp các thành phần sau:

1. Discord Bot Token (Chìa khóa bảo mật của Bot)

Anh cần truy cập 

Discord Developer Portal

, tạo một ứng dụng (Application) mới và kích hoạt tính năng Bot.

Cấp cho em mã 

Bot Token

. Đây là mã định danh để đoạn code em viết có thể điều khiển con bot trên server của anh.

Lưu ý:

 Mã Token này giống như mật khẩu, anh chỉ cung cấp cho em trong phiên làm việc này và không chia sẻ công khai.

2. Phân tích gói tin Web API của Top Heroes

Để lập trình tính năng tự động nhập, em cần biết cấu trúc dữ liệu mà trang web Top Heroes sử dụng.

Anh cần dùng máy tính vào trang nhập code của game, nhấn 

F12

 (mở Developer Tools) và chuyển sang tab 

Network

.

Nhập thử một code bất kỳ (dù hết hạn cũng được) cùng UID của anh.

Tìm dòng yêu cầu gửi dữ liệu (thường là lệnh 

POST

), click chuột phải chọn 

Copy as cURL

 và dán cho em. Em sẽ bóc tách cấu trúc này để đưa vào lõi bot.

3. Danh sách UID (User ID) trong game

Anh cung cấp UID tài khoản Top Heroes của anh (và của những anh em trong Guild nếu anh muốn bot tự động nhập cho cả bang). Bot sẽ dùng danh sách UID này để quét và tự động đẩy quà vào từng tài khoản mỗi khi có code mới (ví dụ các mã code chớp nhoáng chỉ tồn tại 48 giờ).

4. Môi trường lưu trữ chạy Bot 24/7 (Hosting)

Bot cần online liên tục để cào dữ liệu từ Twitter (@TopHeroes_) hoặc Discord chính thức của game.

Anh cần chuẩn bị một máy tính cắm 24/24 hoặc tạo một tài khoản miễn phí trên các nền tảng đám mây như 

Replit

, 

Railway

, hoặc sử dụng VPS cá nhân. Em sẽ cấp mã nguồn để anh upload lên đó.

Anh muốn chúng ta bắt đầu triển khai ngay từ 

Bước 1: Tạo Bot trên Discord Developer Portal

 luôn chứ? Em sẽ hướng dẫn chi tiết từng cú click cho anh.

Timestamp

: 2026-10-08 18:15:33

User

:

 

fetch("https://store.topheroes.com/vi", {

 

  "headers": {

 

    "accept": "

/

"

 

  },

 

  "referrer": "https://store.topheroes.com/vi?uid=2446869146316",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/site/builder/get-pwa-file-stream?site_builder_id=1028526", {

 

  "headers": {

 

    "accept": "

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/redemption/redeem", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxNzo1NzoxMC40MzA4Mjk0MzlaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE3OjU3OjEwLjQzMDgyOTQzOVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODcwMzAsImlhdCI6MTc5MTQ4MjIzMCwiaXNzIjoicml2ZXJnYW1lIn0.iaFyXkipqLLfi-L-bvPPNyzk0MqwbxwNGexxljWdZzk",

 

    "content-type": "application/json",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": "{"project_id":1028637,"redemption_code":"abc"}",

 

  "method": "POST",

 

  "mode": "cors",

 

  "credentials": "include"

 

});

Với thông tin này kèm Discord Bot Token (Chìa khóa bảo mật của Bot -  anh sẽ cung cấp sau) thì đã đủ chưa?

Gemini

:

 

Thông tin anh cung cấp rất giá trị và đã đi đúng hướng, nhưng 

chưa hoàn toàn đủ

 để tạo một con bot chạy tự động 24/7 về lâu dài.

Dựa vào các gói tin anh bắt được, anh đã tìm đúng lõi của vấn đề là API gửi lệnh đổi quà (

POST /api/v2/store/redemption/redeem

) với định dạng body chứa 

project_id

 và mã 

redemption_code

. Tuy nhiên, để hoàn thiện lõi bot, chúng ta còn thiếu 2 mảnh ghép quan trọng sau:

1. Gói tin xác thực đăng nhập (Cấp lại Token)

 

Trong gói 

fetch

 thứ 3 của anh, có một dòng rất quan trọng:

 

"authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."

 

Đây là mã định danh (JWT - JSON Web Token) xác nhận tài khoản 

UID 2446869146316

 của anh (nhân vật tên "Max" ở server S10956). Vấn đề là token này có thời hạn sử dụng. Dữ liệu bên trong token cho thấy nó được cấp vào ngày 08/10/2026 và sẽ 

hết hạn sau 7 ngày

 (vào ngày 15/10/2026).

Cái anh cần cung cấp thêm:

 Nếu chúng ta cắm cứng (hardcode) token này vào bot, bot sẽ dừng hoạt động sau 7 ngày. Anh cần làm mới trang, thao tác đăng nhập lại bằng UID (hoặc email) trên trang web nhập code, và bắt lại cho em 

gói tin thực hiện quá trình đăng nhập đó

. Em cần biết API nào trả về chuỗi Token này để dạy bot cách tự xin lại "giấy thông hành" khi bị hết hạn.

2. Nguồn cào dữ liệu Giftcode (Crawler Source)

 

Gói tin anh cung cấp mới giải quyết được vế "Tự động nhập code", nhưng chưa có vế "Tự động lấy code".

Cái anh cần quyết định:

 Anh muốn bot cào code từ nguồn nào?

Nếu là từ một kênh Discord khác (ví dụ: kênh thông báo của server Top Heroes chính thức), bot của anh không thể tự đọc tin nhắn ở server khác trừ khi nó được add vào server đó (điều bất khả thi với server của nhà phát hành). Thay vào đó, anh sẽ cần dùng tính năng Webhook hoặc follow kênh đó về server của anh, sau đó bot sẽ đọc tin nhắn từ server của anh để lọc ra mã code.

Nếu lấy từ Twitter hay các trang web (như thế giới di động, 2game...), cần phải lập trình thêm module quét HTML/API của các trang đó.

Tóm lại, bước tiếp theo anh cần làm là:

Cung cấp gói tin (cURL) của bước 

Đăng nhập/Nhập UID

 sinh ra cái token Bearer.

Cung cấp 

Bot Token

 từ Discord Developer Portal.

Chốt phương án nguồn lấy code (ví dụ: "Anh sẽ follow kênh 

#gift-codes

 từ server gốc về một kênh 

#code-moi

 trong server của anh, em làm bot đọc từ kênh 

#code-moi

 đó nhé").

Khi có đủ 3 yếu tố này, em có thể viết cho anh toàn bộ mã nguồn (bằng Node.js hoặc Python) để anh treo lên server chạy ngay.

Timestamp

: 2026-10-08 18:22:47

User

:

 

fetch("https://store.topheroes.com/api/v2/store/point/reporting", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "content-type": "application/json",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": "{"project_id":1028637,"store_id":1028526,"merchant_id":1002558,"country":"VN","type":"UID_LOGIN_SHOW","device":"pc","platform":"windows pc"}",

 

  "method": "POST",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/player-info?project_id=1028637&player_id=2446869146316&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/player-info?project_id=1028637&player_id=2446869146316&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/player-info?project_id=1028637&player_id=2446869146316&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/player-info?project_id=1028637&player_id=2446869146316&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/login/player", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "content-type": "application/json",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": "{"site_id":1028526,"player_id":"2446869146316","server_id":"S10956","device":"pc"}",

 

  "method": "POST",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/customer/info?site_id=1028526&device=pc", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/customer/info?site_id=1028526&device=pc", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/tool/country-currency?merchant_id=1002558&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/tool/country-currency?merchant_id=1002558&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?biz_id=1113427", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?biz_id=1113472", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?biz_id=1113471", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/accumulated-recharge/details?project_id=1028637&activity_id=1113475&now_time=1791483498", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/rolling-offer/details?project_id=1028637&activity_id=1113473&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/rolling-offer/details?project_id=1028637&activity_id=1113474&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?activity_type=7&player_id=2446869146316&project_id=1028637&biz_id=1113389&now_time=1791483498", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/virtual-item/card/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/virtual-item/card/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?biz_id=1113427", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/virtual-item/card/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/sign-in-list?page_size=365&site_id=1028526&page_no=1&activity_id=1113434", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/customer/project/member/info?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/shopping/cart/list?player_id=2446869146316&project_id=1028637&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/recharge/denomination/list?merchant_id=1002558&project_id=1028637&currency=VND&include_zero=0", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?biz_id=1113472", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?biz_id=1113471", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/accumulated-recharge/details?project_id=1028637&activity_id=1113475&now_time=1791483498", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/rolling-offer/details?project_id=1028637&activity_id=1113473&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/rolling-offer/details?project_id=1028637&activity_id=1113474&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/list?activity_type=7&player_id=2446869146316&project_id=1028637&biz_id=1113389&now_time=1791483498", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/virtual-item/card/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/virtual-item/card/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/virtual-item/card/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/sign-in-list?page_size=365&site_id=1028526&page_no=1&activity_id=1113434", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/customer/project/member/info?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/shopping/cart/list?player_id=2446869146316&project_id=1028637&site_id=1028526", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/recharge/denomination/list?merchant_id=1002558&project_id=1028637&currency=VND&include_zero=0", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/customer/info?device=pc", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/point/reporting", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "content-type": "application/json",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": "{"project_id":1028637,"store_id":1028526,"merchant_id":1002558,"country":"VN","type":"UID_LOGIN","device":"pc","platform":"windows pc"}",

 

  "method": "POST",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/customer/info?device=pc", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/continuous-recharge/list?activity_id=1113389", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/sale/biz/continuous-recharge/list?activity_id=1113389", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111493&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111493&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111501&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111480&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111502&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111500&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111468&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111501&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111480&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111502&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111500&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=111468&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=1455&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=1455&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=1478&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=1323&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=1478&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/item/get-by-groups?pageSize=200&pageNo=1&group_id=1323&project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/task/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://store.topheroes.com/api/v2/store/task/list?project_id=1028637", {

 

  "headers": {

 

    "accept": "application/json, text/plain, 

/

",

 

    "accept-language": "en,vi;q=0.9",

 

    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjowLCJwbGF5ZXJfaWQiOiIyNDQ2ODY5MTQ2MzE2Iiwic2VydmVyX2lkIjoiUzEwOTU2IiwiY291bnRyeSI6IlZOIiwiZW1haWwiOiIiLCJhdmF0YXIiOiIiLCJuaWNrbmFtZSI6Ik1heCIsIm1lcmNoYW50X2lkIjoxMDAyNTU4LCJwcm9qZWN0X2lkIjoxMDI4NjM3LCJzaXRlX2lkIjoxMDI4NTI2LCJrb3BfY3VzdG9tZXJfaWQiOiI5NDkwMDUwMyIsImNyZWF0ZV90aW1lIjoiMjAyNi0xMC0wOFQxODoxODoxNy41ODk2MDM3NjFaIiwidXBkYXRlX3RpbWUiOiIyMDI2LTEwLTA4VDE4OjE4OjE3LjU4OTYwMzc2MVoiLCJ1aWQiOiIyNDQ2ODY5MTQ2MzE2IiwibG9naW5fdHlwZSI6IjEiLCJmcm9tX3ByZXZpZXdfbW9kZSI6ZmFsc2V9LCJleHAiOjE3OTIwODgyOTcsImlhdCI6MTc5MTQ4MzQ5NywiaXNzIjoicml2ZXJnYW1lIn0.sTI5M_qTFy02_PbQg0MlgLKTtn5QGIEu43igOsWQX0Q",

 

    "priority": "u=1, i"

 

  },

 

  "referrer": "https://store.topheroes.com/vi",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "include"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/1002558/1028637/1028526/1773751621508_screenshot-20260317-204512.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790060685316_icon_avatarFrame_74.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1779951422365_img_v3_02124_81897b41-da89-484c-8382-55ddb635eddg.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1774521036261_20260326-183008.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1770956165925_20260213-121551.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1764555453657_icon_30408.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:18:30 GMT",

 

    "if-none-match": ""3e698c25dd1cc8542325e82f84716a7d"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/1002558/1028637/1028526/1773751621508_screenshot-20260317-204512.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790060685316_icon_avatarFrame_74.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1779951422365_img_v3_02124_81897b41-da89-484c-8382-55ddb635eddg.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1774521036261_20260326-183008.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1770956165925_20260213-121551.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1764555453657_icon_30408.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1782719879231_icon_31206.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1740386999308_icon_30400.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1782719879231_icon_31206.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:19:24 GMT",

 

    "if-none-match": ""0de19f056f5360d111ee1e9f7fce633c"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1740386999308_icon_30400.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:17:06 GMT",

 

    "if-none-match": ""3b6fe04e4f44365aa6b2618fad5fcdba"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1740386989177_icon_30177.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1764318941096_30789.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1745562332239_icon_30370.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1745562353438_icon_30375.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1764318962888_30790.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1774864528584_Group2.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1777349461624_icon_30739.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149705187_4.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1782875032006_1111.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1761624392045_icon_30588.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1761624399172_30791.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1779951493161_icon_30247.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149689743_3.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149677611_2.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1761644521055_20251028-174152.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149663797_1.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1774860240145_icon_30792.png", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1740386989177_icon_30177.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1764318941096_30789.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1745562332239_icon_30370.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1745562353438_icon_30375.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1764318962888_30790.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1774864528584_Group2.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:18:54 GMT",

 

    "if-none-match": ""0eff52f10112ad1e6d4059af3f4c09f3"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1777349461624_icon_30739.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149705187_4.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1782875032006_1111.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:19:25 GMT",

 

    "if-none-match": ""9c0ad07a82a3518f9a6b736de37eba7e"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1761624392045_icon_30588.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1761624399172_30791.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:18:21 GMT",

 

    "if-none-match": ""b85335b2a66cd09ce40a38d796731311"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1779951493161_icon_30247.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149689743_3.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149677611_2.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1761644521055_20251028-174152.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1790149663797_1.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1774860240145_icon_30792.png", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8",

 

    "accept-language": "en,vi;q=0.9",

 

    "if-modified-since": "Wed, 05 Aug 2026 11:18:55 GMT",

 

    "if-none-match": ""77d486e78d3516f545927fe12e2c7a22"",

 

    "priority": "i"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1785496556034_%E7%A4%BC%E5%8C%85%E5%9B%BEjpg.jpg", {

 

  "headers": {

 

    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/

,

/

;q=0.8"

 

  },

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

}); ;

 

fetch("https://pay.rivergame.net/site-builder/prod/store/1785496556034_%E7%A4%BC%E5%8C%85%E5%9B%BEjpg.jpg", {

 

  "referrer": "https://store.topheroes.com/",

 

  "body": null,

 

  "method": "GET",

 

  "mode": "cors",

 

  "credentials": "omit"

 

});

 

Cung cấp Bot Token từ Discord Developer Portal. -> Giả lập thông tin trước, anh cung cấp sau

 

Anh sẽ follow kênh #gift-codes từ server gốc về một kênh #code-moi trong server của anh, em làm bot đọc từ kênh #code-moi đó nhé. Ví dụ kênh của tophero là

 

https://discord.com/channels/1098493491216121916/@home

Gemini

:

 

Thông tin anh cung cấp đã hoàn toàn đủ để tiến hành lập trình lõi của Bot tự động săn code.

Anh đã bắt được chính xác gói tin 

POST

 gửi đến 

/api/v2/store/login/player

. Gói tin này chứa thông tin định danh tĩnh của anh (

site_id

, 

player_id

, 

server_id

). Nhờ đó, bot có thể tự động gọi API này để xin cấp lại Token mới mỗi khi Token cũ hết hạn, giải quyết triệt để vấn đề bot bị dừng hoạt động sau 7 ngày. Phương án follow kênh 

#gift-codes

 về kênh 

#code-moi

 trên server của anh cũng là cách tối ưu, an toàn và dễ thực thi nhất.

Dưới đây là toàn bộ mã nguồn Node.js để chạy con Bot này, kèm theo hướng dẫn thiết lập chi tiết.

1. Mã nguồn Bot (Node.js)

Bot sẽ tự động đọc tin nhắn ở kênh 

#code-moi

, dùng Regex (biểu thức chính quy) để lọc ra các chuỗi chữ và số (dạng giftcode), tự động đăng nhập lấy token mới, sau đó bắn lệnh đổi quà vào server game.

Anh lưu đoạn code sau vào một file tên là 

bot.js

:

const { Client, GatewayIntentBits } = require('discord.js');

// Khởi tạo Bot với quyền đọc tin nhắn
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// ================= CẤU HÌNH CỦA ANH =================
const BOT_TOKEN = 'MOCK_TOKEN_ANH_DIEN_SAU'; // Thay token thật vào đây
const TARGET_CHANNEL_ID = 'ID_KENH_CODE_MOI_CUA_ANH'; // Chuột phải vào kênh #code-moi chọn Copy Channel ID
const UID = '2446869146316';
const SERVER_ID = 'S10956';
const PROJECT_ID = 1028637;
const SITE_ID = 1028526;
// ====================================================

let currentBearerToken = '';

// 1. Hàm tự động đăng nhập để lấy Token cấp phép
async function loginAndGetToken() {
    try {
        const res = await fetch("https://store.topheroes.com/api/v2/store/login/player", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json"
            },
            body: JSON.stringify({ 
                site_id: SITE_ID, 
                player_id: UID, 
                server_id: SERVER_ID, 
                device: "pc" 
            })
        });
        const data = await res.json();
        
        // Lưu lại token hệ thống trả về
        currentBearerToken = data?.data?.token || data?.token;
        console.log(`[HỆ THỐNG] Đã làm mới Token thành công cho UID ${UID}`);
    } catch (error) {
        console.error("[LỖI] Không thể đăng nhập lấy token:", error);
    }
}

// 2. Hàm gửi lệnh nhập code
async function redeemCode(code) {
    // Nếu chưa có token, chạy hàm đăng nhập trước
    if (!currentBearerToken) await loginAndGetToken();

    try {
        const res = await fetch("https://store.topheroes.com/api/v2/store/redemption/redeem", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${currentBearerToken}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ project_id: PROJECT_ID, redemption_code: code })
        });
        return await res.json();
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 3. Lắng nghe tin nhắn mới trên Discord
client.on('messageCreate', async (message) => {
    // Bỏ qua tin nhắn do chính bot gửi để tránh loop
    if (message.author.bot) return;

    // Chỉ xử lý tin nhắn đẩy về từ kênh #code-moi
    if (message.channelId === TARGET_CHANNEL_ID) {
        // Lọc các chuỗi viết hoa + số liền nhau từ 5-20 ký tự (Định dạng phổ biến của Giftcode)
        const possibleCodes = message.content.match(/\b[A-Z0-9]{5,20}\b/g);
        
        if (possibleCodes) {
            for (const code of possibleCodes) {
                console.log(`[PHÁT HIỆN CODE] Đang thử nhập code: ${code}`);
                const result = await redeemCode(code);
                
                // Trả lời kết quả ngay trên kênh Discord
                message.reply(`Tiến hành nhập code **${code}** cho UID ${UID}.\nKết quả: \`${JSON.stringify(result)}\``);
            }
        }
    }
});

// 4. Khởi động Bot
client.once('ready', () => {
    console.log(`[THÀNH CÔNG] Bot ${client.user.tag} đã online và sẵn sàng cào code!`);
    loginAndGetToken(); // Lấy token ngay lần đầu tiên bật bot
});

client.login(BOT_TOKEN);


javascript

2. Các bước thực thi chi tiết trên máy tính của anh

Bước 1: Chuẩn bị môi trường chạy code

Tải và cài đặt 

Node.js

 (phiên bản LTS) từ trang chủ 

nodejs.org

 nếu máy anh chưa có.

Tạo một thư mục mới trên máy tính (ví dụ: 

TopHeroesBot

).

Mở Terminal (Command Prompt hoặc PowerShell) tại thư mục đó, gõ lệnh: 

npm init -y

 để khởi tạo dự án.

Gõ tiếp lệnh: 

npm install discord.js

 để cài đặt thư viện điều khiển Discord.

Bước 2: Chuẩn bị ID và Token

Vào 

Discord Developer Portal

, mục 

Bot

, nhấn 

Reset Token

 để copy đoạn mã Bot Token.

Dán đoạn mã đó vào dòng 

BOT_TOKEN = '...'

 trong file 

bot.js

.

Trong ứng dụng Discord, vào Cài đặt người dùng > 

Advanced (Nâng cao)

 > Bật 

Developer Mode (Chế độ nhà phát triển)

.

Ra ngoài server của anh, click chuột phải vào kênh 

#code-moi

 > chọn 

Copy Channel ID

 và dán vào dòng 

TARGET_CHANNEL_ID = '...'

.

Bước 3: Chạy Bot

Lưu file 

bot.js

.

Mở Terminal tại thư mục chứa file, gõ lệnh: 

node bot.js

Nếu Terminal hiện dòng chữ 

[THÀNH CÔNG] Bot ... đã online và sẵn sàng cào code!

, anh đã thành công.

Bây giờ, cứ mỗi khi kênh 

#gift-codes

 chính thức đẩy tin nhắn chứa code mới về kênh 

#code-moi

 của anh, bot sẽ lập tức bắt lấy mã đó và gửi thẳng vào game chưa tới 1 giây.

Anh hãy thử thiết lập, nếu cấu trúc JSON trả về khi redeem báo lỗi hoặc cần tinh chỉnh thêm phần bóc tách nội dung tin nhắn, anh cứ dán log lỗi lên đây em sẽ điều chỉnh lại script ngay cho anh.
