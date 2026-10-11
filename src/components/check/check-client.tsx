"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, Bot, AlertCircle, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusCard } from "@/components/check/status-card";
import { getPlayerStatusAction } from "@/actions/billing";
import type { PlayerStatusResponse } from "@/types/api";

interface CheckClientProps {
  locale: string;
}

export function CheckClient({ locale }: CheckClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUid = searchParams.get("uid") || "";

  const [uid, setUid] = useState(initialUid);
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState<PlayerStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async (targetUid: string) => {
    const clean = targetUid.trim();
    if (!clean || !/^\d{10,20}$/.test(clean)) {
      setError("Vui lòng nhập UID game hợp lệ (10 đến 20 chữ số)");
      setStatusData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await getPlayerStatusAction(clean);
      if (res.success && res.data) {
        setStatusData(res.data);
      } else {
        setStatusData(null);
        setError(res.error?.message || "Không tìm thấy dữ liệu bot cho UID này");
      }
    } catch {
      setStatusData(null);
      setError("Lỗi kết nối khi tra cứu dữ liệu máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUid && /^\d{10,20}$/.test(initialUid)) {
      fetchStatus(initialUid);
    }
  }, [initialUid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = uid.trim();
    if (clean) {
      router.push(`/${locale}/check?uid=${clean}`);
      fetchStatus(clean);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nhập Game UID cần tra cứu (ví dụ: 2446869146316)..."
              value={uid}
              onChange={(e) => setUid(e.target.value.replace(/\D/g, ""))}
              className="bg-transparent border-0 pl-10 pr-4 font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
              maxLength={20}
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !uid.trim()}
            className="w-full sm:w-auto font-bold gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang tra cứu...</span>
              </>
            ) : (
              <>
                <Bot className="h-4 w-4" />
                <span>Tra Cứu Ngay</span>
              </>
            )}
          </Button>
        </form>

        {/* Error notification */}
        {error && (
          <div className="mt-4 flex items-center gap-2.5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm animate-in fade-in-50">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Result Display */}
      {statusData && <StatusCard data={statusData} locale={locale} />}

      {/* Empty State / How to find UID guide */}
      {!statusData && !loading && !error && (
        <div className="max-w-xl mx-auto p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md text-center space-y-3">
          <div className="h-10 w-10 mx-auto rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Cách tìm Game UID trong Top Heroes</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            1. Mở game Top Heroes trên điện thoại hoặc giả lập.<br />
            2. Bấm vào ảnh đại diện (Avatar) ở góc trên bên trái màn hình.<br />
            3. Dãy số dưới tên nhân vật chính là Game UID của bạn.
          </p>
        </div>
      )}
    </div>
  );
}
