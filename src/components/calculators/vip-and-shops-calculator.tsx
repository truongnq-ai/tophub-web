"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Crown,
  RotateCcw,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import {
  FACTION_AWAKENING_PLANS,
  GUILD_HONOR_SHOP_ITEMS,
  VIP_LEVEL_TABLE,
  VIP_POINT_ICON_PATH,
  calculateGuildHonorBudget,
  calculateVipProgression,
  type FactionAwakeningPlan,
  type GuildShopCurrencyEra,
  type HonorSafetyFloorMode,
  type VipAndShopsActiveTab,
} from "@/content/calculators/vip-and-shops-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Input } from "@/components/ui/input";
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { CalculatorInfoPopover } from "./calculator-info-popover";

export interface VipAndShopsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const VIP_BREAKPOINT_LEVELS = [4, 6, 8, 10, 15, 20] as const;

function buildDefaultCart(): Record<string, number> {
  const initial: Record<string, number> = {};
  for (const item of GUILD_HONOR_SHOP_ITEMS) {
    initial[item.id] = item.defaultCartQty;
  }
  return initial;
}

export function VipAndShopsCalculator({
  tool,
  locale,
}: VipAndShopsCalculatorProps) {
  const [activeTab, setActiveTab] =
    useState<VipAndShopsActiveTab>("vip_progression");

  // Tab 1: VIP 0 -> VIP 20 State (Default matches registry.ts exampleCase: VIP 8 -> VIP 10)
  const [fromVipLevel, setFromVipLevel] = useState<number>(8);
  const [toVipLevel, setToVipLevel] = useState<number>(10);
  const [customVipPointsInput, setCustomVipPointsInput] =
    useState<string>("6000");

  // Tab 2: Guild Honor Shop Budget Planner State
  const [currencyEra, setCurrencyEra] =
    useState<GuildShopCurrencyEra>("pre_season_honor");
  const [currentHonorInput, setCurrentHonorInput] = useState<string>("420000");
  const [weeklyIncomeInput, setWeeklyIncomeInput] = useState<string>("55000");
  const [safetyFloorMode, setSafetyFloorMode] =
    useState<HonorSafetyFloorMode>("full_awakening_9_stones");
  const [factionPlanId, setFactionPlanId] =
    useState<FactionAwakeningPlan>("horde");
  const [ownedSoulStones, setOwnedSoulStones] = useState<number>(3);
  const [cartQuantities, setCartQuantities] =
    useState<Record<string, number>>(buildDefaultCart);

  const parsedCustomVipPoints = useMemo(
    () => parseCompactNumberInput(customVipPointsInput),
    [customVipPointsInput]
  );

  const vipResult = useMemo(
    () =>
      calculateVipProgression({
        fromLevel: fromVipLevel,
        toLevel: toVipLevel,
        customCurrentPoints: parsedCustomVipPoints,
      }),
    [fromVipLevel, toVipLevel, parsedCustomVipPoints]
  );

  const parsedCurrentHonor = useMemo(
    () => parseCompactNumberInput(currentHonorInput),
    [currentHonorInput]
  );

  const parsedWeeklyIncome = useMemo(
    () => parseCompactNumberInput(weeklyIncomeInput),
    [weeklyIncomeInput]
  );

  const honorResult = useMemo(
    () =>
      calculateGuildHonorBudget({
        currencyEra,
        currentHonor: parsedCurrentHonor,
        weeklyIncome: parsedWeeklyIncome,
        safetyFloorMode,
        factionPlanId,
        ownedSoulStones,
        cartQuantities,
      }),
    [
      currencyEra,
      parsedCurrentHonor,
      parsedWeeklyIncome,
      safetyFloorMode,
      factionPlanId,
      ownedSoulStones,
      cartQuantities,
    ]
  );

  const handleSelectFromVip = (nextFrom: number) => {
    const clampedFrom = Math.max(0, Math.min(20, nextFrom));
    setFromVipLevel(clampedFrom);
    setCustomVipPointsInput(
      String(VIP_LEVEL_TABLE[clampedFrom].cumulativePoints)
    );
    if (toVipLevel < clampedFrom) {
      setToVipLevel(clampedFrom);
    }
  };

  const handleSelectToVip = (nextTo: number) => {
    const clampedTo = Math.max(fromVipLevel, Math.min(20, nextTo));
    setToVipLevel(clampedTo);
  };

  const handleReset = () => {
    setFromVipLevel(8);
    setToVipLevel(10);
    setCustomVipPointsInput("6000");
    setCurrencyEra("pre_season_honor");
    setCurrentHonorInput("420000");
    setWeeklyIncomeInput("55000");
    setSafetyFloorMode("full_awakening_9_stones");
    setFactionPlanId("horde");
    setOwnedSoulStones(3);
    setCartQuantities(buildDefaultCart());
  };

  const handleSwitchEra = (nextEra: GuildShopCurrencyEra) => {
    setCurrencyEra(nextEra);
    if (nextEra === "season1_glory_coin") {
      setCurrentHonorInput("60000");
      setWeeklyIncomeInput("10000");
    } else {
      setCurrentHonorInput("420000");
      setWeeklyIncomeInput("55000");
    }
  };

  const handleUpdateCartQty = (
    itemId: string,
    delta: number,
    maxLimit: number
  ) => {
    setCartQuantities((prev) => {
      const current = prev[itemId] ?? 0;
      const next = Math.max(0, Math.min(maxLimit, current + delta));
      return {
        ...prev,
        [itemId]: next,
      };
    });
  };

  const currencyLabel =
    currencyEra === "season1_glory_coin"
      ? locale === "vi"
        ? "Xu Vinh Quang S1"
        : "S1 Glory Coins"
      : locale === "vi"
      ? "Vinh Quang Hội"
      : "Guild Honor";

  return (
    <div
      data-testid="vip-and-shops-calculator"
      className="space-y-4 pb-8"
    >
      {/* 1. Compact Header with Standard CalculatorInfoPopover */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <CalculatorInfoPopover
              triggerTestId="open-vip-table-modal"
              title={
                locale === "vi"
                  ? "Bảng Toàn Tập VIP 0–20 & Kỷ Luật Sàn Đóng Băng 9 Đá"
                  : "Complete VIP 0–20 Table & 9-Soul-Stone Freeze Floor"
              }
              locale={locale} triggerLabel={
                locale === "vi"
                  ? "Xem bảng tra cứu VIP 0–20 và quy tắc Tiệm Vinh Quang Hội"
                  : "View VIP 0–20 reference table and Guild Honor Shop rules"
              }
            >
              <div className="space-y-4">
                <div className="rounded-xl bg-amber-500/10 p-3 text-sm leading-relaxed text-foreground/90">
                  {locale === "vi" ? (
                    <>
                      <strong>Quy tắc Sàn Đóng Băng 9 Đá Linh Hồn:</strong> Luôn
                      giữ sàn tối thiểu{" "}
                      <span className="font-mono">360K</span> Vinh Quang Hội (
                      hoặc <span className="font-mono">54K</span> Xu Vinh Quang
                      S1) để đảm bảo chuỗi mua{" "}
                      <span className="font-mono">9</span> Đá Linh Hồn thức tỉnh
                      1 Tướng Cam lên Đỏ không bao giờ đứt đoạn.{" "}
                      <strong>Cảnh báo bẫy đỏ:</strong> Tuyệt đối không mua{" "}
                      <strong>Quân Trang Cam Vạn Năng</strong> (
                      <span className="font-mono">72K</span> Vinh Quang /{" "}
                      <span className="font-mono">12K</span> Xu S1) nếu chưa sở
                      hữu sẵn Quân Trang Cam gốc (vật phẩm này chỉ dùng để nâng
                      sao, không mở khóa được Quân Trang mới).
                    </>
                  ) : (
                    <>
                      <strong>9-Soul-Stone Freeze Floor Rule:</strong> Always
                      maintain a minimum reserve of{" "}
                      <span className="font-mono">360K</span> Guild Honor (or{" "}
                      <span className="font-mono">54K</span> S1 Glory Coins) to
                      protect your 9-Soul-Stone Mythic Awakening chain.{" "}
                      <strong>Red Trap Warning:</strong> Never buy the{" "}
                      <strong>Universal Legendary Troop Skin</strong> (
                      <span className="font-mono">72K</span> Honor /{" "}
                      <span className="font-mono">12K</span> S1 Coins) expecting
                      a new skin unlock — it only upgrades stars on already
                      owned skins.
                    </>
                  )}
                </div>

                {/* Complete 21-Row VIP 0 -> VIP 20 Table */}
                <div className="space-y-2">
                  <h4 className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bảng Tra Cứu Toàn Tập VIP 0 ➔ VIP 20 ($1 = 6 VIP Pts)"
                      : "Complete VIP 0 ➔ VIP 20 Reference Table ($1 = 6 VIP Pts)"}
                  </h4>
                  <div className="-mx-1 overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-border/70 bg-muted/40 text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
                          <th className="py-2 px-3">VIP</th>
                          <th className="py-2 px-3 text-right">
                            {locale === "vi" ? "Điểm Tích Lũy" : "Cumulative Pts"}
                          </th>
                          <th className="py-2 px-3 text-right">
                            {locale === "vi" ? "Quy Đổi USD" : "USD Equiv."}
                          </th>
                          <th className="py-2 px-3 text-right">
                            {locale === "vi" ? "Mảnh Cam/Ngày" : "Shards/Day"}
                          </th>
                          <th className="py-2 px-3">
                            {locale === "vi"
                              ? "Đặc Quyền Trọng Tâm"
                              : "Key Privilege"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                        {VIP_LEVEL_TABLE.map((lvl) => (
                          <tr
                            key={lvl.level}
                            className="hover:bg-amber-500/[0.04] transition-colors"
                          >
                            <td className="py-2 px-3 font-bold text-foreground">
                              VIP <span className="font-mono">{lvl.level}</span>
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-amber-600 dark:text-amber-400">
                              <span
                                className="font-mono"
                                title={formatExactNumber(lvl.cumulativePoints)}
                              >
                                {formatCompactNumber(lvl.cumulativePoints)}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right text-foreground">
                              $
                              <span
                                className="font-mono"
                                title={formatExactNumber(lvl.cumulativeUsd)}
                              >
                                {formatCompactNumber(lvl.cumulativeUsd)}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                              <span className="font-mono">
                                +{lvl.dailyFreeGoldShards}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-xs text-muted-foreground">
                              {lvl.isGoldenBreakpoint ? (
                                <span className="mr-1.5 font-semibold text-amber-600 dark:text-amber-400">
                                  ★{" "}
                                  {locale === "vi"
                                    ? lvl.breakpointBadgeVi
                                    : lvl.breakpointBadgeEn}
                                  :
                                </span>
                              ) : null}
                              {
                                (locale === "vi"
                                  ? lvl.keyPerksVi
                                  : lvl.keyPerksEn)[0]
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="reset-vip-and-shops"
              onClick={handleReset}
              aria-label={locale === "vi" ? "Đặt lại" : "Reset"}
              className={CALC_MD3.iconButton}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* 2. Mode Switcher Tabs: VIP 0-20 Progression vs Guild Honor Shop Planner */}
      <div
        data-testid="vip-shops-mode-tabs"
        className={cn(
          CALC_MD3.surfaceCard,
          "grid grid-cols-1 gap-2 p-2 sm:grid-cols-2"
        )}
      >
        <button
          type="button"
          data-testid="tab-btn-vip"
          onClick={() => setActiveTab("vip_progression")}
          className={cn(
            CALC_MD3.chipButton,
            "justify-between px-4 py-2.5 text-xs",
            activeTab === "vip_progression"
              ? CALC_MD3.tileSelected
              : cn(
                  CALC_MD3.tonalTile,
                  "text-muted-foreground hover:text-foreground"
                )
          )}
        >
          <span className="flex items-center gap-2 font-sans font-semibold">
            <Crown className="h-4 w-4 text-amber-500" />
            <span>
              {locale === "vi"
                ? "1. Lộ Trình Đặc Quyền VIP (VIP 1 ➔ 20)"
                : "1. VIP Privilege Roadmap (VIP 1 ➔ 20)"}
            </span>
          </span>
          <span className="font-mono text-xs font-bold">
            VIP {vipResult.fromVip.level}➔{vipResult.toVip.level}
          </span>
        </button>

        <button
          type="button"
          data-testid="tab-btn-honor-shop"
          onClick={() => setActiveTab("guild_honor_shop")}
          className={cn(
            CALC_MD3.chipButton,
            "justify-between px-4 py-2.5 text-xs",
            activeTab === "guild_honor_shop"
              ? CALC_MD3.tileSelected
              : cn(
                  CALC_MD3.tonalTile,
                  "text-muted-foreground hover:text-foreground"
                )
          )}
        >
          <span className="flex items-center gap-2 font-sans font-semibold">
            <ShoppingBag className="h-4 w-4 text-emerald-500" />
            <span>
              {locale === "vi"
                ? "2. Ngân Sách Tiệm Vinh Quang Hội (Sàn 9 Đá)"
                : "2. Guild Honor Shop Planner (9-Stone Floor)"}
            </span>
          </span>
          <span className="font-mono text-xs font-bold">
            {formatCompactNumber(honorResult.remainingAfterCart)}
          </span>
        </button>
      </div>

      {/* 3. Active Workspace (Split-View 7/5) */}
      {activeTab === "vip_progression" ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN (7/12): VIP Level Steppers, Golden Breakpoints & Custom Points */}
          <div className="space-y-4 lg:col-span-7">
            <div className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4")}>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Chọn Cấp VIP Hiện Tại & Mục Tiêu"
                  : "Select Current & Target VIP Tier"}
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* From VIP Level */}
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "CẤP VIP HIỆN TẠI" : "CURRENT VIP LEVEL"}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <CalculatorStepperButton
                      direction="decrease"
                      testId="from-vip-decrease-btn"
                      onClick={() => handleSelectFromVip(fromVipLevel - 1)}
                      disabled={fromVipLevel <= 0}
                      ariaLabel={
                        locale === "vi"
                          ? "Giảm VIP hiện tại"
                          : "Decrease current VIP"
                      }
                    />
                    <div className="text-center">
                      <p
                        data-testid="from-vip-badge"
                        className="font-display text-lg font-bold text-foreground"
                      >
                        VIP {vipResult.fromVip.level}
                      </p>
                      <p
                        className="font-mono text-xs text-muted-foreground"
                        title={formatExactNumber(
                          vipResult.fromVip.cumulativePoints
                        )}
                      >
                        {formatCompactNumber(
                          vipResult.fromVip.cumulativePoints
                        )}{" "}
                        pts
                      </p>
                    </div>
                    <CalculatorStepperButton
                      direction="increase"
                      testId="from-vip-increase-btn"
                      onClick={() => handleSelectFromVip(fromVipLevel + 1)}
                      disabled={fromVipLevel >= 20}
                      ariaLabel={
                        locale === "vi"
                          ? "Tăng VIP hiện tại"
                          : "Increase current VIP"
                      }
                    />
                  </div>
                </div>

                {/* To VIP Level */}
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "CẤP VIP MỤC TIÊU" : "TARGET VIP LEVEL"}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <CalculatorStepperButton
                      direction="decrease"
                      testId="to-vip-decrease-btn"
                      onClick={() => handleSelectToVip(toVipLevel - 1)}
                      disabled={toVipLevel <= fromVipLevel}
                      ariaLabel={
                        locale === "vi"
                          ? "Giảm VIP mục tiêu"
                          : "Decrease target VIP"
                      }
                    />
                    <div className="text-center">
                      <p
                        data-testid="to-vip-badge"
                        className="font-display text-lg font-bold text-amber-600 dark:text-amber-400"
                      >
                        VIP {vipResult.toVip.level}
                      </p>
                      <p
                        className="font-mono text-xs text-muted-foreground"
                        title={formatExactNumber(
                          vipResult.toVip.cumulativePoints
                        )}
                      >
                        {formatCompactNumber(vipResult.toVip.cumulativePoints)}{" "}
                        pts
                      </p>
                    </div>
                    <CalculatorStepperButton
                      direction="increase"
                      testId="to-vip-increase-btn"
                      onClick={() => handleSelectToVip(toVipLevel + 1)}
                      disabled={toVipLevel >= 20}
                      ariaLabel={
                        locale === "vi"
                          ? "Tăng VIP mục tiêu"
                          : "Increase target VIP"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Golden Breakpoint Quick Chips */}
              <div className="space-y-2">
                <span className={CALC_MD3.eyebrow}>
                  {locale === "vi"
                    ? "MỐC BREAKPOINT CHIẾN LƯỢC (CHỌN NHANH MỤC TIÊU)"
                    : "STRATEGIC BREAKPOINTS (QUICK TARGET SELECT)"}
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {VIP_BREAKPOINT_LEVELS.map((bpLevel) => {
                    const bpDef = VIP_LEVEL_TABLE[bpLevel];
                    const isSelected = toVipLevel === bpLevel;
                    return (
                      <button
                        key={bpLevel}
                        type="button"
                        data-testid={`vip-bp-btn-${bpLevel}`}
                        onClick={() => {
                          if (fromVipLevel >= bpLevel) {
                            handleSelectFromVip(Math.max(0, bpLevel - 2));
                          }
                          setToVipLevel(bpLevel);
                        }}
                        className={cn(
                          "flex min-h-[52px] flex-col justify-between rounded-xl p-2.5 text-left transition-colors",
                          isSelected
                            ? CALC_MD3.tileSelected
                            : cn(CALC_MD3.tonalTile, "hover:bg-muted/65")
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-display text-sm font-bold">
                            VIP {bpLevel}
                          </span>
                          <span
                            className="font-mono text-xs text-muted-foreground"
                            title={formatExactNumber(bpDef.cumulativePoints)}
                          >
                            {formatCompactNumber(bpDef.cumulativePoints)}
                          </span>
                        </div>
                        <p className="line-clamp-1 font-sans text-xs text-muted-foreground">
                          {locale === "vi"
                            ? bpDef.breakpointBadgeVi
                            : bpDef.breakpointBadgeEn}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Newly Unlocked Privileges List */}
            <div className={cn(CALC_MD3.surfaceCard, "space-y-3 p-4")}>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? `Đặc Quyền Mở Khóa Mới (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`
                  : `Newly Unlocked Privileges (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`}
              </h2>
              <div
                data-testid="vip-unlocked-perks-list"
                className={CALC_MD3.dividedList}
              >
                {(vipResult.newlyUnlockedLevels.length > 0
                  ? vipResult.newlyUnlockedLevels
                  : [vipResult.toVip]
                ).map((lvl) => (
                  <div key={lvl.level} className="space-y-1.5 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-amber-500/20 px-2 py-0.5 font-display text-xs font-bold text-amber-600 dark:text-amber-400">
                          VIP {lvl.level}
                        </span>
                        {lvl.isGoldenBreakpoint && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <Sparkles className="h-3 w-3" />
                            <span>
                              {locale === "vi"
                                ? lvl.breakpointBadgeVi
                                : lvl.breakpointBadgeEn}
                            </span>
                          </span>
                        )}
                      </div>
                      <span
                        className="font-mono text-xs text-muted-foreground"
                        title={formatExactNumber(lvl.cumulativePoints)}
                      >
                        {formatCompactNumber(lvl.cumulativePoints)} pts ($
                        {formatCompactNumber(lvl.cumulativeUsd)})
                      </span>
                    </div>
                    <ul className="list-disc space-y-1 pl-5 font-sans text-xs text-foreground">
                      {(locale === "vi" ? lvl.keyPerksVi : lvl.keyPerksEn).map(
                        (perk, idx) => (
                          <li key={idx}>{perk}</li>
                        )
                      )}
                    </ul>
                    <p className="font-sans text-xs text-muted-foreground">
                      <strong className="text-foreground">
                        {locale === "vi" ? "Tiệm VIP: " : "VIP Shop: "}
                      </strong>
                      {locale === "vi"
                        ? lvl.vipShopHighlightsVi
                        : lvl.vipShopHighlightsEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5/12 Sticky): VIP Summary KPI Card (R5 3-Column Standard) */}
          <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-20">
            <div
              data-testid="vip-summary-card"
              className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4")}
            >
              <div className="flex items-center gap-2.5">
                <GameAssetFrame
                  src={VIP_POINT_ICON_PATH}
                  alt="VIP Points"
                  size="sm"
                  rarity="legendary"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? `Điểm VIP (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`
                      : `VIP Points (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`}
                  </div>
                  <div className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? "Tỷ giá chuẩn: $1.00 = 6 Điểm VIP • Tiệm Bang: 1K/tuần"
                      : "Standard rate: $1.00 = 6 VIP Pts • Guild Shop: 1K/wk"}
                  </div>
                </div>
              </div>

              {/* Standard R5 3-Column Resource Layout: Target Cumulative | Current Owned Input | Missing Points */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Col 1: Target Cumulative VIP Points */}
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Mốc đích yêu cầu" : "Target Points"}
                  </div>
                  <div
                    className="mt-1 font-mono text-xl font-black tabular-nums text-foreground"
                    title={formatExactNumber(vipResult.toVip.cumulativePoints)}
                  >
                    {formatCompactNumber(vipResult.toVip.cumulativePoints)}
                  </div>
                </div>

                {/* Col 2: Current Owned VIP Points Input */}
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <label
                    htmlFor="custom-vip-points-input"
                    className={cn(
                      CALC_MD3.eyebrow,
                      "block text-muted-foreground"
                    )}
                  >
                    {locale === "vi"
                      ? "Đang có (hỗ trợ K/M)"
                      : "Owned (K/M supported)"}
                  </label>
                  <div className="mt-1">
                    <Input
                      id="custom-vip-points-input"
                      type="text"
                      inputMode="decimal"
                      data-testid="custom-vip-points-input"
                      aria-label={
                        locale === "vi"
                          ? "Điểm VIP hiện tại"
                          : "Current VIP Points"
                      }
                      value={customVipPointsInput}
                      onChange={(e) => setCustomVipPointsInput(e.target.value)}
                      className={cn(CALC_MD3.dataInput, "w-full bg-card")}
                    />
                  </div>
                </div>

                {/* Col 3: Missing VIP Points */}
                <div
                  className={cn(
                    "rounded-xl p-2.5",
                    vipResult.pointsNeeded === 0
                      ? "bg-emerald-500/15"
                      : "bg-amber-500/15"
                  )}
                >
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Còn thiếu" : "Missing"}
                  </div>
                  <div
                    className="mt-1"
                    title={formatExactNumber(vipResult.pointsNeeded)}
                  >
                    <CalculatorMetricValue
                      testId="vip-points-needed-value"
                      value={formatCompactNumber(vipResult.pointsNeeded)}
                      unit="VIP Pts"
                      toneClassName={
                        vipResult.pointsNeeded === 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "grid grid-cols-2 gap-3")}>
                <div>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi"
                      ? "Quy đổi gói nạp ($1 = 6 VIP)"
                      : "Equivalent Pack Spend ($1 = 6)"}
                  </p>
                  <p
                    data-testid="vip-usd-needed-value"
                    title={formatExactNumber(vipResult.equivalentUsdNeeded)}
                    className="font-mono text-base font-bold text-foreground"
                  >
                    ${formatExactNumber(vipResult.equivalentUsdNeeded)}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi"
                      ? "Tích lũy miễn phí Tiệm Bang"
                      : "Free Guild Shop Timeline"}
                  </p>
                  <p className="font-sans text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="font-mono">
                      {vipResult.freeGuildShopWeeksNeeded}
                    </span>{" "}
                    <span>{locale === "vi" ? "tuần" : "weeks"}</span>
                  </p>
                </div>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                <p className="font-sans text-xs font-semibold text-foreground">
                  {locale === "vi"
                    ? `Quyền lợi tại đích VIP ${vipResult.toVip.level}:`
                    : `Target VIP ${vipResult.toVip.level} Core Stats:`}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className={CALC_MD3.tonalTile}>
                    <p className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                      +{vipResult.toVip.dailyFreeGoldShards}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {locale === "vi" ? "Mảnh Cam/ngày" : "Shards/day"}
                    </p>
                  </div>
                  <div className={CALC_MD3.tonalTile}>
                    <p className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      +{vipResult.toVip.marchQueuesBonus}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {locale === "vi" ? "Hàng Quân" : "March Queue"}
                    </p>
                  </div>
                  <div className={CALC_MD3.tonalTile}>
                    <p className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                      +{vipResult.toVip.constructionResearchSpeedBonusPct}%
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {locale === "vi" ? "Tốc Độ Xây/Tech" : "Build/Tech"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: GUILD HONOR SHOP BUDGET PLANNER */
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN (7/12): Wallet, Era, Faction Awakening Plan & Weekly Shopping Cart */}
          <div className="space-y-4 lg:col-span-7">
            {/* Wallet & Safety Floor Controls */}
            <div
              data-testid="honor-wallet-controls"
              className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4")}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "1. Kỷ nguyên tiền tệ & Ngân sách ví"
                    : "1. Currency Era & Wallet Balance"}
                </h2>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-muted/45 p-1">
                  <button
                    type="button"
                    data-testid="era-btn-pre-season"
                    onClick={() => handleSwitchEra("pre_season_honor")}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-3 text-xs",
                      currencyEra === "pre_season_honor"
                        ? "bg-amber-500 text-slate-950"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {locale === "vi"
                      ? "Vinh Quang Hội (Sàn 360K)"
                      : "Guild Honor (360K Floor)"}
                  </button>
                  <button
                    type="button"
                    data-testid="era-btn-season1"
                    onClick={() => handleSwitchEra("season1_glory_coin")}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-3 text-xs",
                      currencyEra === "season1_glory_coin"
                        ? "bg-amber-500 text-slate-950"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {locale === "vi"
                      ? "Xu Vinh Quang S1 (Sàn 54K)"
                      : "S1 Glory Coins (54K Floor)"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                  <label
                    htmlFor="current-honor-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi"
                      ? `SỐ DƯ ĐANG CÓ (${currencyLabel} • HỖ TRỢ K/M)`
                      : `CURRENT WALLET (${currencyLabel} • K/M SUPPORTED)`}
                  </label>
                  <Input
                    id="current-honor-input"
                    type="text"
                    inputMode="decimal"
                    data-testid="current-honor-input"
                    value={currentHonorInput}
                    onChange={(e) => setCurrentHonorInput(e.target.value)}
                    className={CALC_MD3.dataInput}
                  />
                </div>
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                  <label
                    htmlFor="weekly-honor-income-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi"
                      ? "THU NHẬP HÀNG TUẦN (HỖ TRỢ K/M)"
                      : "EXPECTED WEEKLY INCOME (K/M SUPPORTED)"}
                  </label>
                  <Input
                    id="weekly-honor-income-input"
                    type="text"
                    inputMode="decimal"
                    data-testid="weekly-honor-income-input"
                    value={weeklyIncomeInput}
                    onChange={(e) => setWeeklyIncomeInput(e.target.value)}
                    className={CALC_MD3.dataInput}
                  />
                </div>
              </div>

              {/* Faction Awakening Soul Stone Plan */}
              <div
                data-testid="faction-awakening-selector"
                className="space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi"
                      ? "LỘ TRÌNH THỨC TỈNH THEO PHE (9 / 18 / 27 ĐÁ LINH HỒN)"
                      : "FACTION AWAKENING PLAN (9 / 18 / 27 SOUL STONES)"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-xs text-muted-foreground">
                      {locale === "vi" ? "Đã có:" : "Owned:"}
                    </span>
                    <CalculatorStepperButton
                      direction="decrease"
                      testId="owned-stones-decrease-btn"
                      onClick={() =>
                        setOwnedSoulStones((prev) => Math.max(0, prev - 1))
                      }
                      disabled={ownedSoulStones <= 0}
                      ariaLabel="Decrease owned soul stones"
                    />
                    <span className="min-w-[36px] text-center font-mono text-xs font-bold">
                      {honorResult.ownedSoulStones}/
                      {honorResult.factionPlan.totalSoulStones}
                    </span>
                    <CalculatorStepperButton
                      direction="increase"
                      testId="owned-stones-increase-btn"
                      onClick={() =>
                        setOwnedSoulStones((prev) =>
                          Math.min(
                            honorResult.factionPlan.totalSoulStones,
                            prev + 1
                          )
                        )
                      }
                      disabled={
                        ownedSoulStones >=
                        honorResult.factionPlan.totalSoulStones
                      }
                      ariaLabel="Increase owned soul stones"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {FACTION_AWAKENING_PLANS.map((plan) => {
                    const isSelected = factionPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        data-testid={`faction-plan-btn-${plan.id}`}
                        onClick={() => setFactionPlanId(plan.id)}
                        className={cn(
                          "flex min-h-[52px] flex-col justify-between rounded-xl p-2.5 text-left transition-colors",
                          isSelected
                            ? CALC_MD3.tileSelected
                            : cn(CALC_MD3.tonalTile, "hover:bg-muted/65")
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-sans text-xs font-bold text-foreground">
                            {locale === "vi" ? plan.nameVi : plan.nameEn}
                          </span>
                          <span className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                            {plan.totalSoulStones}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-muted-foreground">
                          {locale === "vi" ? plan.heroesVi : plan.heroesEn}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Weekly Shopping Cart (Single-Layer divide-y) */}
            <div className={cn(CALC_MD3.surfaceCard, "space-y-3 p-4")}>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "2. Giỏ hàng Tiệm Vinh Quang Hội hàng tuần"
                  : "2. Weekly Guild Honor Shopping Cart"}
              </h2>

              <div
                data-testid="honor-shop-cart-list"
                className={CALC_MD3.dividedList}
              >
                {honorResult.cartItems.map((row) => {
                  const { item, quantity, unitCost, subtotalCost } = row;
                  const itemName = locale === "vi" ? item.nameVi : item.nameEn;
                  const isTrap = item.priorityTier === "F_TRAP";

                  return (
                    <div
                      key={item.id}
                      data-testid={`shop-row-${item.id}`}
                      className={cn(
                        "flex flex-col gap-2.5 p-3 sm:flex-row sm:items-center sm:justify-between",
                        isTrap && quantity > 0 && "bg-rose-500/10"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <GameAssetFrame
                          src={item.iconPath}
                          alt={itemName}
                          size="md"
                          rarity={item.rarity}
                        />
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-sans text-sm font-semibold text-foreground">
                              {itemName}
                            </span>
                            <span
                              className={cn(
                                "rounded px-1.5 py-0.5 font-mono text-xs font-bold",
                                isTrap
                                  ? "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                                  : item.priorityTier === "S++"
                                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                  : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                              )}
                            >
                              {item.priorityTier}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-muted-foreground">
                            {locale === "vi" ? "Đơn giá: " : "Unit cost: "}
                            <span
                              className="font-mono font-semibold text-foreground"
                              title={formatExactNumber(unitCost)}
                            >
                              {formatCompactNumber(unitCost)}
                            </span>{" "}
                            <span>•</span>{" "}
                            {locale === "vi" ? "Giới hạn: " : "Weekly cap: "}
                            <span className="font-mono">{item.weeklyLimit}</span>
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            {locale === "vi" ? item.guidanceVi : item.guidanceEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 sm:justify-end">
                        <div className="flex items-center gap-1.5">
                          <CalculatorStepperButton
                            direction="decrease"
                            testId={`cart-decrease-${item.id}`}
                            onClick={() =>
                              handleUpdateCartQty(item.id, -1, item.weeklyLimit)
                            }
                            disabled={quantity <= 0}
                            ariaLabel={`Decrease ${itemName}`}
                          />
                          <span
                            data-testid={`cart-qty-${item.id}`}
                            className="min-w-[40px] text-center font-mono text-sm font-bold"
                          >
                            {quantity}/{item.weeklyLimit}
                          </span>
                          <CalculatorStepperButton
                            direction="increase"
                            testId={`cart-increase-${item.id}`}
                            onClick={() =>
                              handleUpdateCartQty(item.id, 1, item.weeklyLimit)
                            }
                            disabled={quantity >= item.weeklyLimit}
                            ariaLabel={`Increase ${itemName}`}
                          />
                        </div>
                        <div className="min-w-[76px] text-right">
                          <p
                            title={formatExactNumber(subtotalCost)}
                            className="font-mono text-sm font-bold text-foreground"
                          >
                            -{formatCompactNumber(subtotalCost)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5/12 Sticky): Freeze Floor Audit & Trap Warnings */}
          <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-20">
            <div
              data-testid="honor-budget-audit-card"
              className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4")}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={CALC_MD3.eyebrow}>
                    {locale === "vi"
                      ? `SỐ DƯ SAU GIỎ HÀNG (${currencyLabel})`
                      : `REMAINING BALANCE AFTER CART (${currencyLabel})`}
                  </p>
                  <div
                    className="mt-1 space-y-1"
                    title={formatExactNumber(honorResult.remainingAfterCart)}
                  >
                    <CalculatorMetricValue
                      testId="honor-remaining-after-cart-value"
                      value={formatCompactNumber(honorResult.remainingAfterCart)}
                      unit={currencyLabel}
                      toneClassName={
                        honorResult.healthStatus === "SAFE_ABOVE_FULL_FLOOR"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : honorResult.healthStatus === "WARN_BELOW_FULL_FLOOR"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-rose-600 dark:text-rose-400"
                      }
                    />
                  </div>
                </div>
                <GameAssetFrame
                  src={CALCULATOR_MATERIALS.guildHonor.iconPath}
                  alt={currencyLabel}
                  size="md"
                  rarity="legendary"
                />
              </div>

              {/* Standard R5 3-Column Audit Bar: 9-Stone Freeze Floor | Cart Total | Safe Spendable Surplus */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/40 p-2.5">
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Sàn đóng băng 9 Đá" : "9-Stone Floor"}
                  </div>
                  <div
                    className="mt-1 font-mono text-lg font-black tabular-nums text-foreground"
                    title={formatExactNumber(honorResult.fullAwakeningFloor)}
                  >
                    {formatCompactNumber(honorResult.fullAwakeningFloor)}
                  </div>
                </div>

                <div className="rounded-xl bg-muted/40 p-2.5">
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Tổng giỏ hàng" : "Cart Cost"}
                  </div>
                  <div
                    className="mt-1 font-mono text-lg font-black tabular-nums text-amber-600 dark:text-amber-400"
                    title={formatExactNumber(honorResult.totalCartCost)}
                  >
                    -{formatCompactNumber(honorResult.totalCartCost)}
                  </div>
                </div>

                <div
                  className={cn(
                    "rounded-xl p-2.5",
                    honorResult.healthStatus === "SAFE_ABOVE_FULL_FLOOR"
                      ? "bg-emerald-500/15"
                      : "bg-amber-500/15"
                  )}
                >
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Lãi trên sàn" : "Safe Surplus"}
                  </div>
                  <div
                    className="mt-1 font-mono text-lg font-black tabular-nums text-emerald-700 dark:text-emerald-400"
                    title={formatExactNumber(
                      honorResult.spendableSurplusAboveFullFloor
                    )}
                  >
                    +{formatCompactNumber(
                      honorResult.spendableSurplusAboveFullFloor
                    )}
                  </div>
                </div>
              </div>

              {/* 3-State Safety Floor Banner */}
              <div
                data-testid="honor-health-status-banner"
                className={cn(
                  CALC_MD3.tonalGroup,
                  "space-y-1",
                  honorResult.healthStatus === "SAFE_ABOVE_FULL_FLOOR"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : honorResult.healthStatus === "WARN_BELOW_FULL_FLOOR"
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                )}
              >
                <div className="flex items-center gap-2 font-sans text-xs font-bold">
                  {honorResult.healthStatus === "SAFE_ABOVE_FULL_FLOOR" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                  )}
                  <span>
                    {honorResult.healthStatus === "SAFE_ABOVE_FULL_FLOOR"
                      ? locale === "vi"
                        ? "AN TOÀN TUYỆT ĐỐI • Đã Bảo Toàn Sàn Đóng Băng 9 Đá Linh Hồn"
                        : "SAFE SURPLUS • 9-Soul-Stone Freeze Floor Protected"
                      : honorResult.healthStatus === "WARN_BELOW_FULL_FLOOR"
                      ? locale === "vi"
                        ? "CẢNH BÁO • Xâm Phạm Sàn Đóng Băng 9 Đá Linh Hồn (360K / 54K)"
                        : "WARNING • Dipped Below 9-Soul-Stone Freeze Floor (360K / 54K)"
                      : locale === "vi"
                      ? "BÁO ĐỘNG ĐỎ • Đứt Chuỗi Mua Đá Linh Hồn Hàng Tuần!"
                      : "CRITICAL ALERT • Weekly Soul Stone Chain Broken!"}
                  </span>
                </div>
                <p className="font-sans text-xs">
                  {locale === "vi"
                    ? `Phần lãi tự do chi tiêu trên sàn 9 Đá: ${formatCompactNumber(
                        honorResult.spendableSurplusAboveFullFloor
                      )} ${currencyLabel}. Còn thiếu ${
                        honorResult.remainingSoulStonesForPlan
                      } viên Đá Linh Hồn (${
                        honorResult.weeksToCompleteAwakeningPlan
                      } tuần) cho lộ trình phe.`
                    : `Spendable surplus above 9-Stone floor: ${formatCompactNumber(
                        honorResult.spendableSurplusAboveFullFloor
                      )} ${currencyLabel}. ${
                        honorResult.remainingSoulStonesForPlan
                      } Soul Stones (${
                        honorResult.weeksToCompleteAwakeningPlan
                      } weeks) remaining for faction plan.`}
                </p>
              </div>

              {/* 12,000 Coin / 72,000 Honor Troop Skin Trap Alert */}
              {honorResult.hasTroopSkinTrapInCart && (
                <div
                  data-testid="troop-skin-trap-warning"
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "space-y-1 bg-rose-500/20 text-rose-700 dark:text-rose-300"
                  )}
                >
                  <div className="flex items-center gap-2 font-sans text-xs font-bold">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>
                      {locale === "vi"
                        ? "CẢNH BÁO BẪY QUÂN TRANG CAM VẠN NĂNG (72K / 12K XU)!"
                        : "UNIVERSAL LEGENDARY TROOP SKIN TRAP WARNING!"}
                    </span>
                  </div>
                  <p className="font-sans text-xs">
                    {locale === "vi"
                      ? "Món này chỉ nâng sao cho Quân Trang Cam đã sở hữu, hoàn toàn KHÔNG mở khóa được Quân Trang Cam mới!"
                      : "This item ONLY upgrades star levels of an already owned Legendary Troop Skin; it CANNOT unlock a new skin!"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
