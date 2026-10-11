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
          .replace("{server}", res.data.server_id || "Global");

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
        <Button className="gap-2 font-bold shadow-sm">
          <Plus className="h-4 w-4" />
          <span>{labels.addAccountBtn}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border/80">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            {labels.addModalTitle}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {labels.addModalDesc}
          </DialogDescription>
        </DialogHeader>

        {successMsg ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="text-sm font-semibold text-foreground">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="game-uid" className="text-xs font-semibold">
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
                className="font-mono text-sm tracking-wider"
                disabled={loading}
                autoFocus
              />
              <p className="text-[11px] text-muted-foreground">
                Mở game Top Heroes → Chạm Avatar góc trên bên trái → Sao chép dãy số UID.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-xs text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                {labels.cancel}
              </Button>
              <Button
                type="submit"
                disabled={uid.length < 10 || loading}
                className="gap-2 font-semibold"
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
