"use client";

import React, { useCallback, useState } from "react";
import { CheckCircle2, Info, Sparkles } from "lucide-react";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  LORD_GEAR_MASTERY_TIERS,
  type LordGearMasteryEvaluation,
  type LordGearQualityCode,
} from "@/content/calculators/lord-gear-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { formatCompactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import { CALC_MD3 } from "./calculator-md3-primitives";

export interface LordGearMasteryTableProps {
  readonly mastery: LordGearMasteryEvaluation;
  readonly showExtended: boolean;
  readonly locale: CalculatorLocale;
}

const QUALITY_TEXT_COLORS: Readonly<Record<LordGearQualityCode, string>> = {
  0: "text-muted-foreground",
  2: "text-emerald-600 dark:text-emerald-400",
  3: "text-sky-600 dark:text-sky-400",
  4: "text-purple-600 dark:text-purple-400",
  5: "text-amber-600 dark:text-amber-400",
  6: "text-rose-600 dark:text-rose-400",
};

export function LordGearMasteryTable({
  mastery,
  showExtended,
  locale,
}: LordGearMasteryTableProps): React.JSX.Element {
  const isVi = locale === "vi";
  const [activeTab, setActiveTab] = useState<"3pc" | "6pc">("3pc");

  const handleSelect3Pc = useCallback((): void => {
    setActiveTab("3pc");
  }, []);

  const handleSelect6Pc = useCallback((): void => {
    setActiveTab("6pc");
  }, []);

  const visibleTiers = showExtended
    ? LORD_GEAR_MASTERY_TIERS
    : LORD_GEAR_MASTERY_TIERS.filter((t) => t.requiredLevel <= 103);

  const { active3Piece, next3Piece, active6Piece, next6Piece } = mastery;

  return (
    <section
      data-testid="lord-gear-mastery-section"
      className={cn(CALC_MD3.surfaceCard, "space-y-4")}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className={cn(CALC_MD3.eyebrow, "text-amber-500")}>
            {isVi ? "Cộng Hưởng Bậc Thầy (lord_equip_master)" : "Mastery Resonance"}
          </span>
          <h2 className={CALC_MD3.sectionTitle}>
            {isVi
              ? "Tổng Quan Thuộc Tính Bậc Thầy (3 Món & 6 Món)"
              : "Mastery Attribute Overview (3-Piece & 6-Piece)"}
          </h2>
        </div>
        <span className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
          <span>{isVi ? "Lực chiến Cộng Hưởng:" : "Resonance Power:"}</span>{" "}
          <span className="font-mono">
            +{formatCompactNumber(mastery.totalMasteryFightForce)}
          </span>
        </span>
      </div>

      {/* Active 3-Piece & 6-Piece Status Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* 3-Piece Resonance Card */}
        <div
          data-testid="mastery-card-3pc"
          className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}
        >
          <div className="flex items-center gap-3">
            <GameAssetFrame
              src="/images/cosmetics/avatar-frames/icon_lord_equip3.webp"
              alt={isVi ? "Cộng Hưởng 3 Món" : "3-Piece Resonance"}
              size="sm"
              shape="item"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-heading font-bold text-foreground">
                  {isVi
                    ? "Cộng Hưởng 3 Món (equip_num = 3)"
                    : "3-Piece Mastery (equip_num = 3)"}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  <span>{isVi ? "Món thứ 3:" : "3rd Piece:"}</span>{" "}
                  <span className="font-mono">Lv.{mastery.top3MinLevel}</span>
                </span>
              </div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {active3Piece
                  ? active3Piece.label[locale]
                  : isVi
                    ? "Chưa kích hoạt (Cần 3 món đạt Hiếm Lv.3)"
                    : "Inactive (Needs 3 pieces at Rare Lv.3)"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-lg bg-background/60 p-2 text-xs">
            <div>
              <span className="block text-muted-foreground">
                {isVi ? "HP tất cả Anh Hùng" : "All Heroes HP"}
              </span>
              <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
                +{(active3Piece?.threePieceHeroHpPct ?? 0).toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="block text-muted-foreground">
                {isVi ? "Tấn Công tất cả Lính" : "All Soldiers ATK"}
              </span>
              <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
                +{(active3Piece?.threePieceAllSoldierAtkPct ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>

          {next3Piece ? (
            <p className="text-xs text-muted-foreground">
              <Sparkles className="mr-1 inline h-3.5 w-3.5 text-amber-500" />
              {isVi
                ? `Mốc kế tiếp: ${next3Piece.label.vi} (Lv.${next3Piece.requiredLevel}) ➔ +${next3Piece.threePieceHeroHpPct.toFixed(2)}% HP Tướng`
                : `Next tier: ${next3Piece.label.en} (Lv.${next3Piece.requiredLevel}) ➔ +${next3Piece.threePieceHeroHpPct.toFixed(2)}% Hero HP`}
            </p>
          ) : null}
        </div>

        {/* 6-Piece Resonance Card */}
        <div
          data-testid="mastery-card-6pc"
          className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}
        >
          <div className="flex items-center gap-3">
            <GameAssetFrame
              src="/images/cosmetics/avatar-frames/icon_lord_equip6.webp"
              alt={isVi ? "Cộng Hưởng 6 Món" : "6-Piece Resonance"}
              size="sm"
              shape="item"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-heading font-bold text-foreground">
                  {isVi
                    ? "Cộng Hưởng 6 Món (equip_num = 6)"
                    : "6-Piece Mastery (equip_num = 6)"}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  <span>{isVi ? "Món thấp nhất:" : "Lowest Piece:"}</span>{" "}
                  <span className="font-mono">Lv.{mastery.all6MinLevel}</span>
                </span>
              </div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {active6Piece
                  ? active6Piece.label[locale]
                  : isVi
                    ? "Chưa kích hoạt (Cần đủ 6 món đạt Hiếm Lv.3)"
                    : "Inactive (Needs all 6 pieces at Rare Lv.3)"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg bg-background/60 p-2 text-xs">
            <div>
              <span className="block text-muted-foreground">
                {isVi ? "ATK Anh Hùng" : "All Heroes ATK"}
              </span>
              <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
                +{(active6Piece?.sixPieceHeroAtkPct ?? 0).toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="block text-muted-foreground">
                {isVi ? "ATK Lính" : "Soldiers ATK"}
              </span>
              <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
                +{(active6Piece?.sixPieceAllSoldierAtkPct ?? 0).toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="block text-muted-foreground">
                {isVi ? "HP Lính" : "Soldiers HP"}
              </span>
              <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
                +{(active6Piece?.sixPieceAllSoldierHpPct ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>

          {next6Piece ? (
            <p className="text-xs text-muted-foreground">
              <Sparkles className="mr-1 inline h-3.5 w-3.5 text-amber-500" />
              {isVi
                ? `Mốc kế tiếp: ${next6Piece.label.vi} (Lv.${next6Piece.requiredLevel}) ➔ +${next6Piece.sixPieceHeroAtkPct.toFixed(2)}% ATK Tướng`
                : `Next tier: ${next6Piece.label.en} (Lv.${next6Piece.requiredLevel}) ➔ +${next6Piece.sixPieceHeroAtkPct.toFixed(2)}% Hero ATK`}
            </p>
          ) : null}
        </div>
      </div>

      {/* Note about In-Game Localization Tab Swap */}
      <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <p>
          {isVi ? (
            <>
              <strong>Lưu ý đối chiếu trong game:</strong> Trong bảng{" "}
              <em>Tổng Quan Thuộc Tính Bậc Thầy</em> của bản dịch tiếng Việt,
              nhãn nút bấm 2 tab <code>Bonus 3 món</code> và{" "}
              <code>Bonus 6 món</code> bị hiển thị ngược trạng thái nút đang
              chọn. Theo dữ liệu gốc <code>Meta.bytes (lord_equip_master)</code>:
              <strong> 3 món (equip_num = 3)</strong> cộng{" "}
              <strong>HP Anh Hùng + Tấn Công Lính</strong>, còn{" "}
              <strong>6 món (equip_num = 6)</strong> cộng{" "}
              <strong>ATK Anh Hùng + Tấn Công Lính + HP Lính</strong>.
            </>
          ) : (
            <>
              <strong>In-game UI Note:</strong> Based on{" "}
              <code>Meta.bytes (lord_equip_master)</code>,{" "}
              <strong>3-Piece Mastery (equip_num = 3)</strong> grants{" "}
              <strong>Hero HP + Soldier ATK</strong>, while{" "}
              <strong>6-Piece Mastery (equip_num = 6)</strong> grants{" "}
              <strong>Hero ATK + Soldier ATK + Soldier HP</strong>.
            </>
          )}
        </p>
      </div>

      {/* Tab Switcher + 17-Tier Table */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          data-testid="tab-mastery-3pc"
          onClick={handleSelect3Pc}
          className={cn(
            CALC_MD3.chipButton,
            activeTab === "3pc"
              ? "bg-amber-500 text-slate-950 font-black"
              : "bg-muted/60 text-muted-foreground hover:text-foreground",
          )}
        >
          {isVi
            ? "Bảng Bonus 3 Món (HP Tướng + ATK Lính)"
            : "3-Piece Bonus Table (Hero HP + Soldier ATK)"}
        </button>
        <button
          type="button"
          data-testid="tab-mastery-6pc"
          onClick={handleSelect6Pc}
          className={cn(
            CALC_MD3.chipButton,
            activeTab === "6pc"
              ? "bg-amber-500 text-slate-950 font-black"
              : "bg-muted/60 text-muted-foreground hover:text-foreground",
          )}
        >
          {isVi
            ? "Bảng Bonus 6 Món (ATK Tướng + ATK/HP Lính)"
            : "6-Piece Bonus Table (Hero ATK + Soldier ATK/HP)"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-muted/50 text-xs font-bold uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2.5">
                {isVi ? "Yêu Cầu Phẩm Chất" : "Required Quality"}
              </th>
              <th className="px-3 py-2.5">
                {isVi ? "Mốc Cấp" : "Level"}
              </th>
              {activeTab === "3pc" ? (
                <>
                  <th className="px-3 py-2.5 text-right">
                    {isVi ? "HP Anh Hùng" : "Hero HP"}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {isVi ? "Tấn Công Tất Cả Lính" : "All Soldiers ATK"}
                  </th>
                </>
              ) : (
                <>
                  <th className="px-3 py-2.5 text-right">
                    {isVi ? "ATK Anh Hùng" : "Hero ATK"}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {isVi ? "Tấn Công Tất Cả Lính" : "All Soldiers ATK"}
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    {isVi ? "HP Tất Cả Lính" : "All Soldiers HP"}
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {visibleTiers.map((tier) => {
              const isCurrentActive =
                activeTab === "3pc"
                  ? active3Piece?.tierIndex === tier.tierIndex
                  : active6Piece?.tierIndex === tier.tierIndex;
              const qualityColor =
                QUALITY_TEXT_COLORS[tier.quality] ?? QUALITY_TEXT_COLORS[3];

              return (
                <tr
                  key={`mastery-row-${tier.tierIndex}`}
                  className={cn(
                    "transition-colors",
                    isCurrentActive
                      ? "bg-amber-500/15 font-bold"
                      : "hover:bg-muted/30",
                  )}
                >
                  <td className={cn("px-3 py-2 font-semibold", qualityColor)}>
                    <span className="inline-flex items-center gap-1.5">
                      {tier.label[locale]}
                      {isCurrentActive ? (
                        <span className="inline-flex items-center gap-0.5 rounded bg-amber-500 px-1.5 py-0.5 text-xs font-black text-slate-950">
                          <CheckCircle2 className="h-3 w-3" />
                          {isVi ? "Đang bật" : "Active"}
                        </span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">
                    Lv.{tier.requiredLevel}
                  </td>
                  {activeTab === "3pc" ? (
                    <>
                      <td className="px-3 py-2 text-right font-mono font-bold text-foreground">
                        {tier.threePieceHeroHpPct.toFixed(2)}%
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-foreground">
                        {tier.threePieceAllSoldierAtkPct.toFixed(2)}%
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-2 text-right font-mono font-bold text-foreground">
                        {tier.sixPieceHeroAtkPct.toFixed(2)}%
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-foreground">
                        {tier.sixPieceAllSoldierAtkPct.toFixed(2)}%
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-foreground">
                        {tier.sixPieceAllSoldierHpPct.toFixed(2)}%
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
