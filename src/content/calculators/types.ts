export type CalculatorLocale = "vi" | "en";

export type CalculatorCategoryIconName =
  | "Star"
  | "BookOpen"
  | "Shield"
  | "Swords"
  | "Crown"
  | "Gem"
  | "PawPrint"
  | "Castle"
  | "Trophy";

export type CalculatorMaterialRarity =
  | "mythic"
  | "legendary"
  | "epic"
  | "rare"
  | "common";

export type CalculatorMaterialFaction =
  | "league"
  | "horde"
  | "nature"
  | "neutral";

export interface CalculatorMaterialRef {
  /** ID vật phẩm gốc trong bảng item của game (manifest.json) */
  gameId: number;
  /** Tên gốc Tiếng Việt từ public/images/items/manifest.json */
  nameVi: string;
  /** Tên gốc Tiếng Anh từ public/images/items/manifest.json */
  nameEn: string;
  /** Đường dẫn ảnh .webp trong public/images/items/ */
  iconPath: string;
  /** Phẩm chất hiển thị viền <GameAssetFrame> (mythic=Đỏ, legendary=Cam, epic=Tím, rare=Lam, common=Xám) */
  rarity: CalculatorMaterialRarity;
  /** Phe phái tùy chọn (League / Horde / Nature) hiển thị huy hiệu góc trên <GameAssetFrame> */
  faction?: CalculatorMaterialFaction;
}

export interface CalculatorExampleCase {
  /** Câu hỏi bài toán thực tế điển hình */
  question: string;
  /** Mô phỏng thông số đầu vào (Input) */
  inputPreview: string;
  /** Mô phỏng kết quả đầu ra định lượng (Output) */
  outputPreview: string;
}

export interface CalculatorToolItem {
  /** Mã thứ tự hiển thị (VD: "1.1", "4.2", "8.1") */
  code: string;
  /** Slug định danh URL (/calculators/[categorySlug]/[slug]) */
  slug: string;
  /** Slug của nhóm cha (1 trong 9 nhóm) */
  categorySlug: string;
  /** Phase triển khai tương ứng trong Master Plan (1 -> 9) */
  phaseNumber: number;
  /** Tên ngắn hiển thị trên Menu Sidebar */
  title: Record<CalculatorLocale, string>;
  /** Tiêu đề đầy đủ hiển thị trong phần Body Page */
  fullTitle: Record<CalculatorLocale, string>;
  /** Mô tả công thức & phạm vi tính toán */
  summary: Record<CalculatorLocale, string>;
  /** Nguồn tab dữ liệu định lượng trong TopHeroes Tables - Max (song ngữ vi/en) */
  dataSourceTab: Record<CalculatorLocale, string>;
  /** Danh sách vật phẩm gốc trong game được tính toán bởi công cụ này */
  materials: CalculatorMaterialRef[];
  /** Ví dụ bài toán thực tế & khung mô phỏng Input -> Output (UX-UPGRADE-05) */
  exampleCase: Record<CalculatorLocale, CalculatorExampleCase>;
  /** Trạng thái triển khai ("coming_soon" ở Phase 0, "ready" khi hoàn tất Phase tương ứng) */
  status: "coming_soon" | "ready";
}

export interface CalculatorCategory {
  /** Số thứ tự nhóm (1 -> 9) */
  order: number;
  /** Phase triển khai tương ứng (Phase 1 -> Phase 9) */
  phaseNumber: number;
  /** Slug nhóm trên URL (/calculators/[slug]/...) */
  slug: string;
  /** Mã phân khu cha */
  zoneId: string;
  /** Tên icon Lucide hiển thị trên Sidebar & Icon Rail w-14 */
  iconName: CalculatorCategoryIconName;
  /** Tên nhóm ngắn gọn trên Menu Sidebar (kèm số thứ tự, VD: "1. Anh Hùng") */
  title: Record<CalculatorLocale, string>;
  /** Mô tả ngắn về nhóm công cụ */
  description: Record<CalculatorLocale, string>;
  /** Danh sách các công cụ tính toán con trong nhóm */
  tools: CalculatorToolItem[];
}

export interface CalculatorZone {
  /** Mã phân khu ("zone-1" | "zone-2" | "zone-3") */
  id: string;
  /** Nhãn phân khu hiển thị chữ in hoa trên Sidebar */
  label: Record<CalculatorLocale, string>;
  /** Danh sách các nhóm Accordion thuộc phân khu */
  categories: CalculatorCategory[];
}
