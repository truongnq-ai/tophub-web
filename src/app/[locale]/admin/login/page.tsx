"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Loader2, AlertCircle, Lock, User } from "lucide-react";
import { adminLoginAction } from "@/actions/admin";

export default function AdminLoginPage() {
  const locale = useLocale();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await adminLoginAction({ username, password });
      if (res.success && res.data?.token) {
        router.push(`/${locale}/admin/dashboard`);
        router.refresh();
      } else {
        setError(res.error?.message || "Tài khoản hoặc mật khẩu quản trị không chính xác");
      }
    } catch {
      setError("Lỗi kết nối tới máy chủ xác thực quản trị viên");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-14rem)] w-full items-center justify-center p-6 md:p-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md border-border/80 bg-card/85 backdrop-blur-2xl shadow-2xl relative z-10 rounded-3xl">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary mx-auto mb-2 border border-primary/30 shadow-inner">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-foreground font-heading">
            Admin Console
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Cổng đăng nhập bảo mật dành riêng cho Quản trị viên hệ thống TopHub
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {error && (
            <div className="p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 text-xs animate-in fade-in-50">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tài Khoản Quản Trị
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="pl-9 h-11 rounded-xl bg-background/60"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Mật Khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-9 h-11 rounded-xl bg-background/60"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white min-h-[44px] shadow-lg shadow-primary/25"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <span>Đăng Nhập Quản Trị</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
