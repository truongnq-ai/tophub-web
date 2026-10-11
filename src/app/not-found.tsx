"use client";

import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="vi">
      <body className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center p-6">
          <h1 className="mb-4 text-4xl font-bold text-destructive">
            404 - Không Tìm Thấy Trang
          </h1>
          <p className="mb-4 text-lg text-muted-foreground">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đi.
          </p>
          <Error statusCode={404} />
        </div>
      </body>
    </html>
  );
}
