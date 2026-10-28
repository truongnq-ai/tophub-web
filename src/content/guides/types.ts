export type GuideLocale = "vi" | "en";

export type GuideZoneId =
  | "zone_onboarding_meta"
  | "zone_events_roadmap"
  | "zone_systems_economy";

export type GuideBadgeType = "FREE" | "PRO" | "HOT";

export type CalloutVariant = "danger" | "warning" | "tip" | "rule";

export type GuideCategoryIconName =
  | "Sprout"
  | "ShieldAlert"
  | "CalendarClock"
  | "Map"
  | "Swords"
  | "Sparkles"
  | "ShoppingBag"
  | "Castle"
  | "Flame";

export interface LocalizedText {
  vi: string;
  en: string;
}

/**
 * Khối 🎯 Tóm tắt 30 Giây (TL;DR Actionable Box) chuẩn v2.0
 */
export interface GuideTldrSummary {
  coreRule: LocalizedText;
  immediateAction: LocalizedText;
  strictTaboo: LocalizedText;
}

export interface GuideCalloutBlock {
  type: "callout";
  variant: CalloutVariant;
  title: LocalizedText;
  content: LocalizedText;
}

export interface GuideTableBlock {
  type: "table";
  caption?: LocalizedText;
  headers: LocalizedText[];
  rows: LocalizedText[][];
  footnote?: LocalizedText;
}

export interface GuideListBlock {
  type: "list";
  ordered?: boolean;
  items: LocalizedText[];
}

export interface GuideParagraphBlock {
  type: "paragraph";
  text: LocalizedText;
}

export interface GuideRoadmapStep {
  badge: LocalizedText;
  title: LocalizedText;
  timing: LocalizedText;
  description: LocalizedText;
}

export interface GuideRoadmapBlock {
  type: "roadmap";
  steps: GuideRoadmapStep[];
}

/**
 * Khối Sơ đồ Trực quan (Visual Diagram / Code UI Flowchart & Infographic)
 * Thay thế Mermaid thô bằng giao diện RPG Card sắc nét trên cả Desktop & Mobile
 */
export type VisualDiagramVariant =
  | "hub_pillars"
  | "comparison_split"
  | "timeline_phases"
  | "decision_flow"
  | "metric_bars";

export interface VisualDiagramNode {
  id: string;
  badge?: LocalizedText;
  title: LocalizedText;
  subtitle?: LocalizedText;
  metrics?: LocalizedText[];
  tone?: "gold" | "emerald" | "rose" | "blue" | "slate";
}

export interface VisualDiagramBranch {
  title: LocalizedText;
  badge?: LocalizedText;
  tone: "emerald" | "rose" | "gold" | "blue";
  steps: VisualDiagramNode[];
  outcome: LocalizedText;
}

export interface GuideVisualDiagramBlock {
  type: "visual_diagram";
  mediaCode?: string;
  variant: VisualDiagramVariant;
  title: LocalizedText;
  subtitle?: LocalizedText;
  centerNode?: VisualDiagramNode;
  nodes?: VisualDiagramNode[];
  branches?: VisualDiagramBranch[];
  footnote?: LocalizedText;
}

/**
 * Khối Checklist Tương tác (Interactive Checklist / Graduation Criteria)
 * Lưu trạng thái tích chọn của người chơi vào localStorage theo checklistId
 */
export interface GuideChecklistItem {
  id: string;
  label: LocalizedText;
  detail: LocalizedText;
  badge?: LocalizedText;
}

export interface GuideChecklistBlock {
  type: "checklist";
  checklistId: string;
  title: LocalizedText;
  description?: LocalizedText;
  items: GuideChecklistItem[];
}

/**
 * Khối Kịch bản Thực chiến / Phẫu thuật Tài khoản (Case Study / Recovery Card)
 */
export interface CaseStudyMetricComparison {
  label: LocalizedText;
  before: LocalizedText;
  after: LocalizedText;
  delta?: LocalizedText;
}

export interface CaseStudyActionStep {
  stepNumber: string;
  title: LocalizedText;
  detail: LocalizedText;
  impactBadge?: LocalizedText;
}

export interface GuideCaseStudyBlock {
  type: "case_study";
  badge: LocalizedText;
  title: LocalizedText;
  profileSummary: LocalizedText;
  metrics?: CaseStudyMetricComparison[];
  diagnostics?: LocalizedText[];
  recoverySteps: CaseStudyActionStep[];
  conclusion?: LocalizedText;
}

/**
 * Khối Media Minh họa 4 Tầng (Tier 1 Faction Strip, Tier 2 Annotated UI, Tier 4 YouTube Reference)
 */
export type MediaSpotlightTier =
  | "tier1_faction_loop"
  | "tier2_annotated_ui"
  | "tier4_youtube_ref";

export interface MediaAnnotationPin {
  kind: "do" | "dont" | "info";
  label: LocalizedText;
  detail: LocalizedText;
}

export interface GuideMediaSpotlightBlock {
  type: "media_spotlight";
  mediaCode: string;
  tier: MediaSpotlightTier;
  title: LocalizedText;
  description: LocalizedText;
  imageSrc?: string;
  annotations?: MediaAnnotationPin[];
  videoChannel?: string;
  videoTitle?: string;
  videoTimestamp?: string;
  videoUrl?: string;
}

export type GuideWidgetType =
  | "hero_encyclopedia"
  | "biweekly_event_calendar"
  | "master_data_tables"
  | "account_traps_triage"
  | "tactical_formation_board"
  | "horde_pivot_stepper"
  | "blacksmith_anvil_matrix"
  | "shop_safety_floor_explorer"
  | "event_playbook_explorer";

export interface GuideWidgetBlock {
  type: "widget";
  widgetType: GuideWidgetType;
}

export type GuideContentBlock =
  | GuideParagraphBlock
  | GuideListBlock
  | GuideCalloutBlock
  | GuideTableBlock
  | GuideRoadmapBlock
  | GuideVisualDiagramBlock
  | GuideChecklistBlock
  | GuideCaseStudyBlock
  | GuideMediaSpotlightBlock
  | GuideWidgetBlock;

/**
 * Mục con cấp H3 (ví dụ: 1.1, 1.2, 2.1, hoặc Cạm bẫy #1 ➔ #10)
 */
export interface GuideSubSection {
  id: string;
  title: LocalizedText;
  badge?: LocalizedText;
  blocks: GuideContentBlock[];
}

export interface GuideSection {
  id: string;
  title: LocalizedText;
  isPro?: boolean;
  blocks: GuideContentBlock[];
  subSections?: GuideSubSection[];
}

export interface GuideArticle {
  code: string;
  slug: string;
  categorySlug: string;
  badge: GuideBadgeType;
  readingMinutes: number;
  title: LocalizedText;
  summary: LocalizedText;
  tldr?: GuideTldrSummary;
  keyTakeaways: LocalizedText[];
  keywords: string[];
  sourceFiles: string[];
  freeSections: GuideSection[];
  proSections: GuideSection[];
}

export interface GuideCategory {
  order: number;
  slug: string;
  zoneId: GuideZoneId;
  iconName: GuideCategoryIconName;
  title: LocalizedText;
  description: LocalizedText;
  articles: GuideArticle[];
}

export interface GuideZone {
  id: GuideZoneId;
  title: LocalizedText;
  categories: GuideCategory[];
}

// ============================================================================
// GUIDES HUB v4.0 — VISUAL MEDIA & ASSET REGISTRY CONTRACTS (ZERO `any`)
// ============================================================================

export type AssetRarity =
  | "mythic"
  | "legendary"
  | "epic"
  | "rare"
  | "uncommon"
  | "common";

export type AssetFaction = "horde" | "league" | "nature" | "neutral";

export type CodexCategoryId =
  | "heroes"
  | "items"
  | "equipment"
  | "relics"
  | "pets-behemoths"
  | "buildings-decor"
  | "skills-tech"
  | "troops"
  | "events-seasons"
  | "monsters"
  | "cosmetics"
  | "shop-vip";

export interface GameAssetEntry {
  readonly id: string;
  readonly gameId: number | null;
  readonly glossaryId: string | null;
  readonly category: CodexCategoryId;
  readonly iconPath: string;
  readonly portraitPath?: string;
  readonly rarity: AssetRarity;
  readonly faction?: AssetFaction;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly inGameNameVi?: string;
  readonly inGameNameEn?: string;
  readonly descVi?: string;
  readonly descEn?: string;
  readonly aliases: readonly string[];
}

export interface HeroVisualProfile {
  readonly id: string;
  readonly gameId: number;
  readonly glossaryId: string | null;
  readonly faction: Exclude<AssetFaction, "neutral">;
  readonly rarity: Exclude<AssetRarity, "uncommon" | "common">;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly inGameNameVi: string;
  readonly inGameNameEn: string;
  readonly avatarPath: string;
  readonly portraitPath?: string;
  readonly exclusiveWeaponPath?: string;
  readonly exclusiveWeaponNameVi?: string;
  readonly exclusiveWeaponNameEn?: string;
  readonly isAwakenable?: boolean;
  readonly isEconomyPassive?: boolean;
}

export interface MediaShowcaseItem {
  readonly assetId: string;
  readonly iconPath: string;
  readonly rarity: AssetRarity;
  readonly faction?: AssetFaction;
  readonly labelVi: string;
  readonly labelEn: string;
  readonly badgeText?: string;
}

export interface DiagramNodeLookupInput {
  readonly titleVi?: string;
  readonly titleEn?: string;
  readonly subtitleVi?: string;
  readonly subtitleEn?: string;
  readonly nodeId?: string;
  readonly mediaCode?: string;
}

export interface CodexEntityRecord {
  readonly id: string;
  readonly gameId: number | null;
  readonly glossaryId: string | null;
  readonly category: CodexCategoryId;
  readonly subCategory: string;
  readonly path: string;
  readonly portraitPath?: string;
  readonly galleryPaths?: readonly string[];
  readonly extraTags?: readonly string[];
  readonly nameVi: string;
  readonly nameEn: string;
  readonly communityNameVi: string | null;
  readonly communityNameEn: string | null;
  readonly descVi: string;
  readonly descEn: string;
  readonly rarity: AssetRarity;
  readonly faction: AssetFaction;
  readonly relatedArticleSlugs: readonly string[];
}

export interface CodexSearchIndexItem {
  readonly id: string;
  readonly gameId: number | null;
  readonly glossaryId: string | null;
  readonly category: CodexCategoryId;
  readonly subCategory?: string;
  readonly path: string;
  readonly portraitPath?: string;
  readonly galleryPaths?: readonly string[];
  readonly extraTags?: readonly string[];
  readonly nameVi: string;
  readonly nameEn: string;
  readonly communityNameVi: string | null;
  readonly communityNameEn: string | null;
  readonly descVi: string;
  readonly descEn: string;
  readonly rarity: AssetRarity;
  readonly faction: AssetFaction;
  readonly relatedArticleSlugs: readonly string[];
}

export interface CodexCategoryShardPayload {
  readonly category: CodexCategoryId;
  readonly total: number;
  readonly items: readonly CodexEntityRecord[];
}

export interface CodexSearchIndexPayload {
  readonly version: string;
  readonly totalEntities: number;
  readonly indexedEntities: number;
  readonly categoryCounts: Readonly<Record<CodexCategoryId, number>>;
  readonly items: readonly CodexSearchIndexItem[];
}

export type CodexMenuZoneId =
  | "zone_combat"
  | "zone_gear"
  | "zone_economy"
  | "zone_world";

export interface CodexMenuZone {
  readonly id: CodexMenuZoneId;
  readonly iconName: "Swords" | "Shield" | "Package" | "Globe";
  readonly title: LocalizedText;
  readonly subtitle: LocalizedText;
  readonly categories: readonly CodexCategoryId[];
}

export interface CodexFilterOption {
  readonly id: string;
  readonly label: LocalizedText;
}

export interface CodexCategoryFilterConfig {
  readonly category: CodexCategoryId;
  readonly zoneId: CodexMenuZoneId;
  readonly subCategories: readonly CodexFilterOption[];
  readonly supportsFaction: boolean;
  readonly allowedFactions?: readonly AssetFaction[];
  readonly factionSubCategories?: readonly string[];
  readonly allowedRarities: readonly AssetRarity[];
  readonly extraFilterLabel?: LocalizedText;
  readonly extraFilters?: readonly CodexFilterOption[];
}

export type CodexSearchScope = "category" | "all";

export interface CodexFilterState {
  readonly category: CodexCategoryId | "all";
  readonly subCategory?: string;
  readonly rarity: AssetRarity | "all";
  readonly faction: AssetFaction | "all";
  readonly extraFilter?: string;
  readonly searchScope?: CodexSearchScope;
  readonly query: string;
  readonly page: number;
}

// ============================================================================
// ZONE II PART 3 — EVENT PLAYBOOK EXPLORER CONTRACTS (S0 ➔ S4, ZERO `any`)
// ============================================================================

export type EventSeasonTag = "ALL" | "S0" | "S1" | "S2" | "S3" | "S4";

export type EventPlaybookArticleCode = "9.1" | "9.2" | "9.3";

export interface EventPlaybookHoardItem {
  readonly id: string;
  readonly name: LocalizedText;
  readonly iconPath: string;
  readonly rarity: AssetRarity;
  readonly targetAmount: LocalizedText;
  readonly freezeWindow: LocalizedText;
  readonly dumpTiming: LocalizedText;
}

export interface EventPlaybookDayStage {
  readonly dayNumber: number;
  readonly label: LocalizedText;
  readonly theme: LocalizedText;
  readonly goldenWindow: LocalizedText;
  readonly primaryScoring: LocalizedText;
  readonly proTip: LocalizedText;
  readonly doubleDipTarget: LocalizedText;
}

export interface EventPlaybookBudgetTier {
  readonly tierId: "f2p" | "low_mid" | "whale";
  readonly label: LocalizedText;
  readonly budgetRange: LocalizedText;
  readonly strategy: LocalizedText;
  readonly targetMilestone: LocalizedText;
}

export interface EventPlaybookShopItem {
  readonly id: string;
  readonly tier: "S" | "A" | "F";
  readonly itemName: LocalizedText;
  readonly iconPath: string;
  readonly rarity: AssetRarity;
  readonly costAndCap: LocalizedText;
  readonly verdict: LocalizedText;
}

export interface EventPlaybookRecord {
  readonly id: string;
  readonly articleCode: EventPlaybookArticleCode;
  readonly seasons: readonly ("S0" | "S1" | "S2" | "S3" | "S4")[];
  readonly iconPath: string;
  readonly rarity: AssetRarity;
  readonly faction?: AssetFaction;
  readonly name: LocalizedText;
  readonly cadenceBadge: LocalizedText;
  readonly s0TimingBadge: LocalizedText;
  readonly overview: {
    readonly summary: LocalizedText;
    readonly coreLoop: LocalizedText;
    readonly carryoverRule: LocalizedText;
    readonly goldenRule: LocalizedText;
  };
  readonly hoardingItems: readonly EventPlaybookHoardItem[];
  readonly dailyStages: readonly EventPlaybookDayStage[];
  readonly economy: {
    readonly preBuyStrategy: LocalizedText;
    readonly diamondCeiling: LocalizedText;
    readonly budgetTiers: readonly EventPlaybookBudgetTier[];
    readonly shopTierList: readonly EventPlaybookShopItem[];
  };
}
