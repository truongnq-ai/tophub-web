"use client";

import React, { useState } from "react";
import { Plus, Loader2, Gamepad2, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { linkAccountAction } from "@/actions/accounts";
import { formatServerCode } from "@/lib/utils";

interface AddAccountDialogProps {
  labels: {
    addAccountBtn: string;
    addModalTitle: string;
    addModalDesc: string;
    uidLabel: string;
    uidPlaceholder: string;
    verifying: string;
    addSuccess: string;
    confirm: string;
    cancel: string;
  };
}

export function AddAccountDialog({ labels }: AddAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numeric digits up to 20 chars
    const val = e.target.value.replace(/\D/g, "").slice(0, 20);
    setUid(val);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uid.length < 10) {
      setError("UID phải có tối thiểu 10 chữ số");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);

      const res = await linkAccountAction(uid);

      if (res.success && res.data) {
        const msg = labels.addSuccess
          .replace("{nickname}", res.data.nickname || uid)
          .replace("{server}", res.data.server_id ? formatServerCode(res.data.server_id) : "Global");

        setSuccessMsg(msg);
        setTimeout(() => {
          setOpen(false);
          setUid("");
          setSuccessMsg(null);
        }, 2000);
      } else {
        setError(res.error?.message || "Không thể xác thực UID này. Vui lòng kiểm tra lại số UID trong game.");
      }
    } catch (err: any) {
      setError(err?.message || "Đã có lỗi xảy ra trong quá trình xác thực.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 font-bold min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] active:scale-95 transition-all">
          <Plus className="h-4 w-4" />
          <span>{labels.addAccountBtn}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-950/95 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(124,58,237,0.2)] rounded-2xl">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-lg sm:text-xl font-black flex items-center gap-2 text-foreground">
            <Gamepad2 className="h-5 w-5 text-purple-400" />
            {labels.addModalTitle}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-400">
            {labels.addModalDesc}
          </DialogDescription>
        </DialogHeader>

        {successMsg ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="text-sm font-bold text-foreground">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="game-uid" className="text-xs font-bold text-slate-300">
                {labels.uidLabel}
              </Label>
              <Input
                id="game-uid"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={labels.uidPlaceholder}
                value={uid}
                onChange={handleInputChange}
                className="font-mono text-sm tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:font-normal min-h-[44px] rounded-xl bg-slate-900/60 border-white/10 focus:border-purple-500 focus:ring-purple-500/30"
                disabled={loading}
                autoFocus
              />
              <p className="text-[11px] text-muted-foreground">
                Mở game Top Heroes → Chạm Avatar góc trên bên trái → Sao chép dãy số UID.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <DialogFooter className="pt-2 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="min-h-[44px] rounded-xl border-white/10 hover:bg-white/5"
              >
                {labels.cancel}
              </Button>
              <Button
                type="submit"
                disabled={uid.length < 10 || loading}
                className="gap-2 font-bold min-h-[44px] rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{labels.verifying}</span>
                  </>
                ) : (
                  <span>{labels.confirm}</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
