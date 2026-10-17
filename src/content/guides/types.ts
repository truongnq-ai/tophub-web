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
  | "Castle";

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
  | "shop_safety_floor_explorer";

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

