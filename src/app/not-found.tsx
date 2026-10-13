"use client";

import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center p-6 space-y-3 max-w-md">
          <h1 className="text-3xl font-black text-destructive font-heading">
            404 — Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>
          <p className="text-xs text-muted-foreground/80 italic">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <div className="pt-4">
            <a
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors"
            >
              Back to Home / Về Trang Chủ
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
