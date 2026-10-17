# Bi-Weekly Rotation (`#3.1`) Gacha Decoupling & Business Documentation Synchronization Implementation Plan (v2.0 — Hardened via `/review-plan`)

**Goal:** Eliminate the legacy hard-coded coupling of *"Tuần A (Đua Bang Hội + Xúc Xắc) / Tuần B (GAR / KvK + Vòng Quay)"* and *"Tích trữ 13 Ngày, Bùng nổ đúng Ngày"* across Web UI (`src/`), Glossary SSoT (`glossary.ts`), Standardized Blueprints (`docs/06-game-guides/07-standardized-web-guides/`), and Core Strategy Docs (`tophub-web/docs/06-game-guides/`), aligning 100% with the NotebookLM ground truth (2-Phase Server Evolution + Independent 3-Week / S0 Server-Age Gacha Cycle + Week B Days 3–4 Lord Gear Scoring).

**Architecture:** Synchronize the Single Source of Truth (SSoT) TypeScript guide definition (`3.1-biweekly-rotation.ts`), interactive planner widget (`biweekly-calendar-widget.tsx`), and multi-language glossary (`glossary.ts`) with the Markdown Blueprint (`3.1-biweekly-rotation.md`) and upstream NotebookLM strategy documents (`topic-6-biweekly-event-schedule-week-a-b.md`, `top-heroes-event-schedule-studio.md`, `master-dashboard-7-topics.md`). Lock in regression protection via Vitest (`tests/group-3-content.test.ts` + `tests/guides-phase3-widgets.test.tsx`) and PowerShell quality gates (`verify-standardized-guides.ps1`) while strictly preserving Wave 3 scannability (`<= 220 chars/line`, `0` emojis in articles) and Wave 5 bilingual purity (`0` Vietnamese diacritics in `.en`).

**Tech Stack:** Next.js 15 App Router, TypeScript 5.7, React 18, `next-intl`, Vitest 2.1, PowerShell 7 Quality Gate CLI, Markdown (GFM + Mermaid + KaTeX-safe escaped `\$`).

---

## 1. Multi-Skill Audit, `/review-plan` Hardening & Impact Assessment

### 1.1. Codebase & Documentation Audit Summary (`common/architecture-audit` • `/review-plan`)

```yaml
summary: "Hardened v2.0 implementation plan after 12-Point Senior Tech Lead Audit (/review-plan), closing 5 gaps across widget tests, glossary SSoT, Article 3.1 subtle phrasing, and exact drop-in replacement blocks for all 3 internal strategy docs."
risks:
  - "Wave 3 Scannability Gate (tests/wave3-content-scannability.test.ts) enforces <= 220 chars/line on list.items[], single-line list items, **Bold Lead**, and 0 pictographic emojis across Article 3.1."
  - "Wave 5 Bilingual Purity Gate (tests/guides-bilingual-purity.test.ts) enforces 0 Vietnamese diacritics in any .en field across all 31 articles, 8 widgets, and GUIDE_GLOSSARY."
  - "Standardized Markdown Gate (verify-standardized-guides.ps1) enforces KaTeX-safe escaped \\$ currency symbols and <br/> inside Mermaid blocks, while preserving valid 14-day Group B case study math."
next_checks:
  - "npx vitest run tests/group-3-content.test.ts tests/guides-phase3-widgets.test.tsx tests/wave3-content-scannability.test.ts tests/guides-bilingual-purity.test.ts"
  - "pwsh -NoProfile -ExecutionPolicy Bypass -File d:\\GitHub\\top-hero\\docs\\06-game-guides\\07-standardized-web-guides\\scripts\\verify-standardized-guides.ps1"
```

### 1.2. Categorized Findings & Hardened Gaps (`common/code-review` • `/review-plan`)

#### 🔴 `[BLOCKER-01]` Self-Contradictory Article Summary & Phase 2 Mode Labels in `#3.1`
- **Files**:
  - [`tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts#L13-L16) (lines `13–16`, `96–99`, `126–134`, `210–217`, `511–514`, `809–810`, `918–919`)
  - [`docs/06-game-guides/07-standardized-web-guides/group-3-events-double-dip/3.1-biweekly-rotation.md`](file:///d:/GitHub/top-hero/docs/06-game-guides/07-standardized-web-guides/group-3-events-double-dip/3.1-biweekly-rotation.md#L9-L10) (lines `9–10`, `49–55`, `93`, `103`, `158`, `176`)
- **Issue**: `summary` and Phase 2 headings hard-code *"Tuần A (Đua Bang Hội + Xúc Xắc) và Tuần B (Chạy Đua Vũ Trang / KvK + Vòng Quay), cùng nguyên tắc sống còn 'Tích trữ 13 Ngày, Bùng nổ đúng Ngày'"*, directly contradicting the updated v2.0 body (`tldr`, `sec-1-two-phase-server-evolution`, `sub-1-3-five-second-calendar-check`) and NotebookLM ground truth (`TopHeroes Tables - Max` Tab `🛒Shops`: `Wheel`, `Hero Gacha`, and `Dice of Fate` each rotate **Every 3rd Week** or by Server Age in S0).

#### 🟠 `[MAJOR-01]` English Locale Mode Label Drift in `BiweeklyCalendarWidget` & Missing Widget Regression Test (`GAP-01`)
- **Files**:
  - [`tophub-web/src/components/guides/widgets/biweekly-calendar-widget.tsx`](file:///d:/GitHub/top-hero/tophub-web/src/components/guides/widgets/biweekly-calendar-widget.tsx#L147) (lines `121`, `147`, `176`)
  - [`tophub-web/tests/guides-phase3-widgets.test.tsx`](file:///d:/GitHub/top-hero/tophub-web/tests/guides-phase3-widgets.test.tsx#L191-L238) (lines `191–238`)
- **Issue**: `LABELS.en.modes.weekA` still displays `"🛡️ Week A: Guild Race (Dice)"` whereas `LABELS.vi.modes.weekA` (line `91`) was already updated to `"🛡️ Tuần A: Thi Đấu Hội (Guild Race)"`. Additionally, `phase1Satellites[2]` omits `Hero Gacha (1,000 KC — Bộ Lạc)` and the 3-week independent rotation rule, and `guides-phase3-widgets.test.tsx` lacked an English-locale assertion verifying `BiweeklyCalendarWidget` is free of `(Dice)`.

#### 🟠 `[MAJOR-02]` Glossary SSoT Drift in `src/content/guides/glossary.ts` (`GAP-02`)
- **File**: [`tophub-web/src/content/guides/glossary.ts`](file:///d:/GitHub/top-hero/tophub-web/src/content/guides/glossary.ts#L808-L896) (lines `808–816`, `878–896`)
- **Issue**: `event-guild-race` defines Guild Race only as a `"Sự kiện Tuần A..."` without mentioning that it runs consecutively every week in Phase 1 (New Server); `event-fortune-wheel` and `event-dice-of-fate` describe a 2-event alternation (`"Sự kiện luân phiên với Vòng Quay May Mắn..."`) instead of the 3-week independent rotation (`Fortune Wheel` `750` Diamonds League ➔ `Hero Gacha` `1,000` Diamonds Horde ➔ `Dice of Fate` `800` Diamonds Nature, or by Server Age in S0).

#### 🟠 `[MAJOR-03]` Outdated Week B `Lord Gear` Scoring Day & Missing 2-Phase / 3-Week Gacha Rules in Project Docs (`GAP-03`)
- **Files**:
  - [`tophub-web/docs/06-game-guides/01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md`](file:///d:/GitHub/top-hero/tophub-web/docs/06-game-guides/01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md#L23-L40) (lines `23–40`, `201–210`, `561–576`, `795–799`)
  - [`tophub-web/docs/06-game-guides/05-events-and-community-guides/top-heroes-event-schedule-studio.md`](file:///d:/GitHub/top-hero/tophub-web/docs/06-game-guides/05-events-and-community-guides/top-heroes-event-schedule-studio.md#L1-L124) (lines `1–35`, `78–93`, `108–116`)
  - [`tophub-web/docs/06-game-guides/00-master-dashboard/master-dashboard-7-topics.md`](file:///d:/GitHub/top-hero/tophub-web/docs/06-game-guides/00-master-dashboard/master-dashboard-7-topics.md#L306-L313) (lines `306–313`, `437–504`)
- **Issue**:
  1. `topic-6-biweekly-event-schedule-week-a-b.md` and `master-dashboard-7-topics.md` still instruct players to spend `Trang bị Lãnh chúa (Lord Gear)` on `Thứ 7 (Ngày 6)` of Week B (`GAR / KvK`), whereas `Lord Gear` scores `0 points` on Day 6 and must be spent on **Days 3 & 4 (`Thứ Tư` & `Thứ Năm`) of Week B** (or Day 5 in `KvK`, or Days 5–7 of Week A `Guild Race`).
  2. `top-heroes-event-schedule-studio.md` is the legacy Week 2 export that conflates `GAR`, `Top Lord`, and `Guild Race` into a single fixed 7-day schedule and tells players to hoard Blacksmith `Hero Gear` ore until Saturday.
  3. All three internal docs lack the explicit distinction between the **2-Phase Server Evolution** (`Phase 1` continuous `Guild Race` vs. `Phase 2` `Week A ⇄ Week B`) and the **independent 3-Week Gacha Rotation** (`Wheel` `750 KC` League ➔ `Hero Gacha` `1,000 KC` Horde ➔ `Dice of Fate` `800 KC` Nature).

### 1.3. 5-Dimension Technical Impact Analysis (`common/impact-analysis`)

| Dimension | Impact Level | Details & Mitigation |
| :--- | :---: | :--- |
| **1. API & Contract Impact** | **Low (Safe)** | `GuideArticle` interface (`src/content/guides/types.ts`), `GlossaryEntry` count in `glossary.ts`, and route slugs (`/guides/events/biweekly-rotation`) remain 100% unchanged. |
| **2. Database & State Impact** | **None** | Static TypeScript content modules and Markdown documentation only; checklist `localStorage` key (`biweekly-daily-discipline-v2`) is untouched. |
| **3. Security & Privacy Impact** | **None** | Zero-Personalization Gate (`tests/group-3-content.test.ts` lines `177–185`) remains strictly enforced (`0` account names or server IDs). |
| **4. Performance & Scalability** | **None** | Guide search index latency remains `< 50ms` (`tests/group-3-content.test.ts` lines `164–175`). |
| **5. Testing & Quality Gates** | **High (Enforced)** | All replacement strings are pre-verified against `wave3-content-scannability.test.ts` (`<= 220` chars/line, `0` emojis), `guides-bilingual-purity.test.ts` (`0` VI diacritics in `.en`), `guides-phase3-widgets.test.tsx`, and `verify-standardized-guides.ps1`. |

---

## 2. File Structure & Modification Map

| Task | File Path | Action | Responsibility |
| :---: | :--- | :---: | :--- |
| **Task 1** | `tophub-web/tests/group-3-content.test.ts` & `tophub-web/tests/guides-phase3-widgets.test.tsx` | Modify | Add TDD regression assertions banning legacy Week A/B Gacha coupling strings in `#3.1` and `BiweeklyCalendarWidget` (`vi` + `en`) and verifying 3-week independent Gacha rotation metadata. |
| **Task 2** | `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts` | Modify | Update `summary`, `MED-3.1-01` `description` & annotation #3, `sub-1-2-phase-2-biweekly-rotation` list items, `sub-2-2-three-faction-sync` item #1, and `MED-3.1-03` branch titles in `vi` and `en`. |
| **Task 3** | `tophub-web/src/components/guides/widgets/biweekly-calendar-widget.tsx` & `tophub-web/src/content/guides/glossary.ts` | Modify | Remove `(Dice)` from `LABELS.en.modes.weekA`, update `phase1Satellites[2]` in `vi` and `en`, and synchronize `event-guild-race`, `event-fortune-wheel`, and `event-dice-of-fate` definitions in `glossary.ts`. |
| **Task 4** | `docs/06-game-guides/07-standardized-web-guides/group-3-events-double-dip/3.1-biweekly-rotation.md` & `docs/06-game-guides/07-standardized-web-guides/scripts/verify-standardized-guides.ps1` | Modify | Synchronize the `#3.1` Markdown Blueprint (`summary_vi`, `summary_en`, Phase 2 headings, ASCII box, Faction Sync bullet, Mermaid flowchart) and add forbidden legacy patterns to the PowerShell gate script. |
| **Task 5** | `tophub-web/docs/06-game-guides/01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md`, `tophub-web/docs/06-game-guides/05-events-and-community-guides/top-heroes-event-schedule-studio.md`, `tophub-web/docs/06-game-guides/00-master-dashboard/master-dashboard-7-topics.md` | Modify | Synchronize the 3 internal strategy docs with exact drop-in replacement blocks for the 2-Phase Server Evolution, Independent 3-Week Gacha Rotation (`Wheel` / `Hero Gacha` / `Dice`), and Week B Days 3–4 `Lord Gear` scoring rule. |
| **Task 6** | Full Test & Quality Gate Verification | Verify | Run Vitest (`group-3-content`, `guides-phase3-widgets`, `wave3-content-scannability`, `guides-bilingual-purity`), PowerShell `verify-standardized-guides.ps1`, and zero-residue regex audit. |

---

## 3. Bite-Sized TDD Implementation Tasks (`common/writing-plans`)

### Task 1: Add Failing Regression Assertions in `tests/group-3-content.test.ts` & `tests/guides-phase3-widgets.test.tsx` (RED Phase)

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\tests\group-3-content.test.ts` (lines `105–121`)
- Modify: `d:\GitHub\top-hero\tophub-web\tests\guides-phase3-widgets.test.tsx` (lines `214–238`)

- [x] **Step 1.1: Add negative assertions against legacy Week A/B Gacha coupling and positive assertions for the 3-week Gacha cycle in `tophub-web/tests/group-3-content.test.ts`**

Replace lines `105–121` in `d:\GitHub\top-hero\tophub-web\tests\group-3-content.test.ts` with:

```ts
    // 2. Article 3.1: 2-Phase Server Evolution, Independent 3-Week Gacha Cycle, Fixed 2-Day Guild Rush & 8 Rotating Sub-Events
    const s31 = JSON.stringify(getArticleBySlug("events", "biweekly-rotation"));
    expect(s31).not.toContain("Đua Bang Hội + Xúc Xắc");
    expect(s31).not.toContain("Guild Race + Dice");
    expect(s31).not.toContain("KvK + Vòng Quay");
    expect(s31).not.toContain("KvK + Wheel");
    expect(s31).not.toContain("4 Nations + Wheel");
    expect(s31).not.toContain("Tích trữ 13 Ngày, Bùng nổ đúng Ngày");
    expect(s31).not.toContain("Hoard for 13 Days, Burst on the Right Day");
    expect(s31).not.toContain("Dice Event (Week A) & Lucky Wheel (Week B)");
    expect(s31).not.toContain("+ DICE +");
    expect(s31).not.toContain("+ WHEEL +");
    expect(s31).toContain("3 tuần/lần");
    expect(s31).toContain("every 3rd week");
    expect(s31).toContain("Hero Gacha");
    expect(s31).toContain("09:00");
    expect(s31).toContain("Đế Quốc Hắc Ám");
    expect(s31).toContain("Tập Kích Cự Ma");
    expect(s31).toContain("Guild Rush");
    expect(s31).toContain("Ultimate Power");
    expect(s31).toContain("Lord's Set");
    expect(s31).toContain("Hero Development");
    expect(s31).toContain("Rush Top");
    expect(s31).toContain("Decorations");
    expect(s31).toContain("Soul Stone");
    expect(s31).toContain("Pet Power");
    expect(s31).toContain("Relic Power");
    expect(s31).toContain("3,850");
```

- [x] **Step 1.2: Add English & Vietnamese widget assertions in `tophub-web/tests/guides-phase3-widgets.test.tsx` (`GAP-01`)**

In `d:\GitHub\top-hero\tophub-web\tests\guides-phase3-widgets.test.tsx`, replace lines `208–220` and add an English-locale test inside `Suite 2: BiweeklyCalendarWidget`:

```tsx
      // Switch to Phase 1 (New Server)
      fireEvent.click(screen.getByTestId("calendar-phase-phase1"));
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Đế Quốc Hắc Ám|Bắt Bướm|Thi Đấu Hội/i
      );
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Hero Gacha.*3 Tuần\/Lần/i
      );

      // Switch to Week A (Guild Race)
      fireEvent.click(screen.getByTestId("calendar-phase-weekA"));
      expect(screen.getByTestId("calendar-phase-weekA").textContent).not.toMatch(
        /Dice|Xúc Xắc/i
      );
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toMatch(
        /Guild Rush|Nhiệm vụ Huyền Thoại/i
      );
    });

    it("renders English mode labels without legacy (Dice) coupling and displays the 3-week Gacha cycle in Phase 1", () => {
      render(
        <BiweeklyCalendarWidget
          article={ARTICLE_3_1_BIWEEKLY_ROTATION}
          locale="en"
        />
      );

      const weekAButton = screen.getByTestId("calendar-phase-weekA");
      expect(weekAButton.textContent).toBe("🛡️ Week A: Guild Race");
      expect(weekAButton.textContent).not.toContain("(Dice)");

      fireEvent.click(screen.getByTestId("calendar-phase-phase1"));
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toContain(
        "Hero Gacha (1,000 Diamonds — Horde)"
      );
      expect(screen.getByTestId("widget-biweekly-calendar").textContent).toContain(
        "Every 3rd Week"
      );
    });
```

- [x] **Step 1.3: Run Vitest to confirm both test suites fail as expected (RED)**

Run in `d:\GitHub\top-hero\tophub-web`:
```powershell
npx vitest run tests/group-3-content.test.ts tests/guides-phase3-widgets.test.tsx
```
Expected output: `FAIL` on `expect(s31).not.toContain("Đua Bang Hội + Xúc Xắc")` and `expect(weekAButton.textContent).toBe("🛡️ Week A: Guild Race")`.

---

### Task 2: Decouple Gacha from Week A/B in `tophub-web/src/content/guides/groups/group-3/3.1-biweekly-rotation.ts` (GREEN Phase Part 1)

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\src\content\guides\groups\group-3\3.1-biweekly-rotation.ts` (lines `13–16`, `96–99`, `125–134`, `210–217`, `511–514`, `808–811`, `917–920`)

- [x] **Step 2.1: Update `summary` (lines `13–16`) in `3.1-biweekly-rotation.ts`**

Replace lines `13–16` with:
```ts
  summary: {
    vi: "Giải mã lịch sự kiện 2 giai đoạn của Top Heroes: Từ chuỗi Thi Đấu Hội liên tiếp ở Server mới đến chu kỳ 14 ngày Tuần A (Bảng Nhiệm Vụ 9 Ô) ⇄ Tuần B (6 Ngày Chủ Đề GAR / KvK), lịch Gacha xoay tua 3 tuần/lần lệch pha và quy tắc kiểm tra Lịch Event 09:00 Thứ Hai.",
    en: "Decode Top Heroes' 2-phase event schedule: From continuous Guild Race on new servers to the 14-day Week A (9-Slot Task Board) ⇄ Week B (6-Stage GAR / KvK) loop, independent 3-week Gacha rotation, and the Monday 09:00 Event Calendar check.",
  },
```

- [x] **Step 2.2: Update `MED-3.1-01` `description` (lines `96–99`) and annotation #3 (lines `125–134`) in `3.1-biweekly-rotation.ts` (`GAP-04`)**

Replace lines `96–99` with:
```ts
          description: {
            vi: "Bộ biểu tượng nhận diện nhanh các sự kiện trụ cột quyết định nhịp đập tài nguyên: Thi Đấu Hội (Guild Race), Đua Vũ Trang (GAR / KvK) và cụm Gacha 3 tuần/lần (Lucky Wheel • Hero Gacha • Dice of Fate) (/images/guides/events/biweekly-icons.webp).",
            en: "Quick-identification visual icons for the pillar events governing your resource rhythm: Guild Race, Guild Arms Race (GAR / KvK), and the 3-week Gacha cycle (Lucky Wheel • Hero Gacha • Dice of Fate) (/images/guides/events/biweekly-icons.webp).",
          },
```
And replace lines `125–134` with:
```ts
            {
              kind: "info",
              label: {
                vi: "Chu Kỳ Gacha Xoay Tua 3 Tuần/Lần (Lucky Wheel • Hero Gacha • Dice of Fate)",
                en: "3-Week Rotating Gacha Cycle (Lucky Wheel • Hero Gacha • Dice of Fate)",
              },
              detail: {
                vi: "Vòng Quay (750 KC — Liên Minh), Hero Gacha (1,000 KC — Bộ Lạc) và Xúc Xắc (800 KC — Tự Nhiên) xoay tua 3 tuần/lần (hoặc theo Ngày tuổi Server ở S0), độc lập với Tuần A/B: chỉ xả KC khi mở tướng thuộc Phe Đội 1.",
                en: "Lucky Wheel (750 Diamonds — League), Hero Gacha (1,000 Diamonds — Horde), and Dice of Fate (800 Diamonds — Nature) rotate every 3rd week (or by Server Age in S0), independent of Week A/B: pull only when your Queue 1 faction appears.",
              },
            },
```

- [x] **Step 2.3: Update `sub-1-2-phase-2-biweekly-rotation` list items (lines `210–217`) and `sub-2-2-three-faction-sync` item #1 (lines `511–514`) in `3.1-biweekly-rotation.ts`**

*(Note: All `vi` and `en` strings are single-line, start with `**`, contain `0` emojis, and measure `194`–`217` characters (`<= 220` limit) to pass `wave3-content-scannability.test.ts` and `guides-bilingual-purity.test.ts`.)*

Replace lines `210–217` with:
```ts
                {
                  vi: "**Chế độ Tuần A (Thi Đấu Hội / Guild Race — Bảng 9 Ô):** Chạy `09:00` Thứ Hai ➔ `09:00` Thứ Hai; chủ động bấm `Accept` nhiệm vụ (ưu tiên `2 Ô Độc quyền`) để lấy Rương mốc cá nhân và Điểm Vinh Dự mua Hồn Đá Đỏ.",
                  en: "**Week A Mode (Guild Race — 9-Slot Task Board):** Runs `09:00` Mon ➔ `09:00` Mon; tap `Accept` on board tasks (prioritizing `2 Exclusive slots`) before acting to claim Personal Chests and Guild Honor for Soul Stones.",
                },
                {
                  vi: "**Chế độ Tuần B (GAR / KvK — 6 Ngày Chủ Đề):** Luân phiên **GAR** (Tuần B1) và **KvK / 4 Nations** (Tuần B2) theo `6 Ngày Chủ Đề` cố định (T2 Xây dựng, T3 Nghiên cứu, T4 Thể lực/Mỏ, T5 Tướng, T6 Lính, T7 Diệt Địch).",
                  en: "**Week B Mode (GAR / KvK — 6 Daily Stages):** Alternates **GAR** (Week B1) and **KvK / 4 Nations** (Week B2) across `6 Fixed Themes` (Mon Build, Tue Tech, Wed Stamina/Mines, Thu Heroes, Fri Troops, Sat Kill Event).",
                },
```
And replace lines `511–514` with:
```ts
                {
                  vi: "**Phe Liên Minh (League):** Dùng rương mốc **Thi Đấu Hội** gom Kim Cương mỗi tuần và chỉ xả vào **Lucky Wheel / Hero Gacha / Dice** đúng kỳ xuất hiện `Paragon`, `Rose Princess` hoặc `Bishop`.",
                  en: "**League Faction:** Use weekly **Guild Race** milestone chests to stockpile Diamonds, then spend on **Lucky Wheel / Hero Gacha / Dice** strictly when `Paragon`, `Rose Princess`, or `Bishop` appears.",
                },
```

- [x] **Step 2.4: Update `MED-3.1-03` visual_diagram branch titles (lines `808–811` & `917–920`) in `3.1-biweekly-rotation.ts`**

Replace lines `808–811` with:
```ts
                  title: {
                    vi: "TUẦN A: THI ĐẤU HỘI (GUILD RACE — BẢNG 9 Ô) + GUILD RUSH 2 NGÀY",
                    en: "WEEK A: GUILD RACE (9-SLOT TASK BOARD) + 2-DAY GUILD RUSH",
                  },
```
And replace lines `917–920` with:
```ts
                  title: {
                    vi: "TUẦN B: CHẠY ĐUA VŨ TRANG (GAR / KvK — 6 NGÀY) + GUILD RUSH 2 NGÀY",
                    en: "WEEK B: GUILD ARMS RACE (GAR / KvK — 6 STAGES) + 2-DAY GUILD RUSH",
                  },
```

---

### Task 3: Align `BiweeklyCalendarWidget` Labels & `glossary.ts` Definitions (GREEN Phase Part 2)

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\src\components\guides\widgets\biweekly-calendar-widget.tsx` (lines `121`, `147`, `176`)
- Modify: `d:\GitHub\top-hero\tophub-web\src\content\guides\glossary.ts` (lines `808–816`, `878–896`)

- [x] **Step 3.1: Remove `(Dice)` from `LABELS.en.modes.weekA` and update `phase1Satellites[2]` in both `vi` and `en` in `biweekly-calendar-widget.tsx`**

In `d:\GitHub\top-hero\tophub-web\src\components\guides\widgets\biweekly-calendar-widget.tsx`:
1. Replace line `121` (`LABELS.vi.phase1Satellites[2]`):
```ts
      "Chu Kỳ Gacha Độc Lập (3 Tuần/Lần Hoặc Theo Ngày Tuổi Server S0): Vòng Quay (750 KC — Liên Minh), Hero Gacha (1,000 KC — Bộ Lạc) & Xúc Xắc (800 KC — Tự Nhiên) — Tích KC chờ tướng Đỏ Đội 1 (Ngày 21+)",
```
2. Replace line `147` (`LABELS.en.modes.weekA`):
```ts
      weekA: "🛡️ Week A: Guild Race",
```
3. Replace line `176` (`LABELS.en.phase1Satellites[2]`):
```ts
      "Independent Gacha Cycle (Every 3rd Week / S0 Server Age): Lucky Wheel (750 Diamonds — League), Hero Gacha (1,000 Diamonds — Horde) & Dice of Fate (800 Diamonds — Nature) — Hoard Diamonds for Queue 1 Mythics (Day 21+)",
```

- [x] **Step 3.2: Update `event-guild-race`, `event-fortune-wheel`, and `event-dice-of-fate` definitions in `src/content/guides/glossary.ts` (`GAP-02`)**

In `d:\GitHub\top-hero\tophub-web\src\content\guides\glossary.ts`:
1. Replace lines `808–816` (`event-guild-race`):
```ts
  {
    id: "event-guild-race",
    category: "events",
    term: { vi: "Thi Đấu Hội (Guild Race — Tuần A)", en: "Guild Race (Week A)" },
    aliases: { vi: ["Tuần A", "Đua Bang"], en: ["Guild Race", "Week A"] },
    definition: {
      vi: "Sự kiện Bảng Nhiệm vụ 9 Ô (có 2 Ô Độc quyền) chạy liên tiếp hàng tuần ở Server mới (Pha 1) và luân phiên ở Tuần A (Pha 2) để cày Điểm Vinh Dự mua Hồn Đá Đỏ.",
      en: "9-Slot Task Board alliance event (with 2 Exclusive Gold Slots) running weekly on new servers (Phase 1) and on Week A (Phase 2) to farm Guild Honor for Red Soul Stones.",
    },
  },
```
2. Replace lines `878–896` (`event-fortune-wheel` & `event-dice-of-fate`):
```ts
  {
    id: "event-fortune-wheel",
    category: "events",
    term: { vi: "Vòng Quay May Mắn (Fortune Wheel)", en: "Fortune Wheel" },
    aliases: { vi: ["Vòng Quay Tướng Đỏ"], en: ["Wheel", "Mythic Wheel"] },
    definition: {
      vi: "Sự kiện Gacha Kim Cương (750 KC/lượt, tiệm mảnh Liên Minh) xoay tua 3 tuần/lần cùng Hero Gacha và Xúc Xắc, độc lập với Tuần A/B.",
      en: "Diamond Gacha event (750 Diamonds/spin, League token shop) rotating every 3rd week alongside Hero Gacha and Dice of Fate, independent of Week A/B.",
    },
  },
  {
    id: "event-dice-of-fate",
    category: "events",
    term: { vi: "Xúc Xắc Định Mệnh (Dice of Fate)", en: "Dice of Fate" },
    aliases: { vi: ["Sự Kiện Xúc Xắc"], en: ["Dice Event"] },
    definition: {
      vi: "Sự kiện Gacha Kim Cương (800 KC/lượt, tiệm mảnh Tự Nhiên) xoay tua 3 tuần/lần cùng Vòng Quay và Hero Gacha (1,000 KC — Bộ Lạc), độc lập với Tuần A/B.",
      en: "Diamond Gacha event (800 Diamonds/roll, Nature token shop) rotating every 3rd week alongside Fortune Wheel and Hero Gacha (1,000 Diamonds — Horde), independent of Week A/B.",
    },
  },
```

- [x] **Step 3.3: Run Vitest across Group 3, Phase 3 Widgets, Wave 3 Scannability, and Wave 5 Bilingual Purity suites (GREEN)**

Run in `d:\GitHub\top-hero\tophub-web`:
```powershell
npx vitest run tests/group-3-content.test.ts tests/guides-phase3-widgets.test.tsx tests/wave3-content-scannability.test.ts tests/guides-bilingual-purity.test.ts
```
Expected output: `PASS` across all 4 test suites (`0` errors, `0` leaks, `0` line-length violations).

---

### Task 4: Synchronize Standardized Web Blueprint (`3.1-biweekly-rotation.md`) & Quality Gate Script (`verify-standardized-guides.ps1`)

**Files:**
- Modify: `d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides\group-3-events-double-dip\3.1-biweekly-rotation.md` (lines `9–10`, `21`, `49–55`, `93`, `103`, `158`, `176`)
- Modify: `d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides\scripts\verify-standardized-guides.ps1` (lines `8–21`)

- [x] **Step 4.1: Add forbidden legacy patterns to `verify-standardized-guides.ps1` (`GAP-05` safe patterns)**

In `d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides\scripts\verify-standardized-guides.ps1`, replace lines `8–21` with:
```powershell
$forbiddenPatterns = @(
    "\[GAS\]Max",
    "10956",
    "acc của anh",
    "tài khoản của anh",
    "anh đang có",
    "acc anh",
    "của anh hiện tại",
    "রương",
    "烤肉",
    "Tổng:\s*1,155\s*mảnh",
    "35,600",
    "38,400",
    "Đua Bang Hội \+ Xúc Xắc",
    "Guild Race \+ Dice",
    "KvK \+ Vòng Quay",
    "KvK \+ Wheel",
    "Tích trữ 13 Ngày, Bùng nổ đúng Ngày",
    "Hoard for 13 Days, Burst on the Right Day"
)
```

- [x] **Step 4.2: Update `3.1-biweekly-rotation.md` frontmatter, Phase 2 headings, ASCII diagram, Faction Sync bullet, and Mermaid subgraphs**

In `d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides\group-3-events-double-dip\3.1-biweekly-rotation.md`:
1. Replace lines `9–10` and `21`:
```yaml
summary_vi: "Giải mã lịch sự kiện 2 giai đoạn của Top Heroes: Từ chuỗi Thi Đấu Hội liên tiếp ở Server mới đến chu kỳ 14 ngày Tuần A (Bảng Nhiệm Vụ 9 Ô) ⇄ Tuần B (6 Ngày Chủ Đề GAR / KvK), lịch Gacha xoay tua 3 tuần/lần lệch pha và quy tắc kiểm tra Lịch Event 09:00 Thứ Hai."
summary_en: "Decode Top Heroes' 2-phase event schedule: From continuous Guild Race on new servers to the 14-day Week A (9-Slot Task Board) ⇄ Week B (6-Stage GAR / KvK) loop, independent 3-week Gacha rotation, and the Monday 09:00 Event Calendar check."
```
and set `last_verified: "2026-10-17"`.
2. Replace lines `49–55` (Phase 2 Mode descriptions + Independent 3-Week Gacha Note):
```markdown
1. **Chế độ Tuần A — Tuần Thi Đấu Hội (`Guild Race` — Bảng Nhiệm Vụ 9 Ô + 2 Ô Độc Quyền):**
   - **Sự kiện Bang hội chính:** **Thi Đấu Hội (`Guild Race`)** kéo dài từ `09:00 Thứ Hai` đến `09:00 Thứ Hai` tuần kế tiếp. Cơ chế tính điểm hoàn toàn dựa trên việc người chơi chủ động bấm **"Nhận (`Accept`)"** từng nhiệm vụ trên bảng (ưu tiên 2 ô **Độc quyền / Exclusive** ở góc trên) rồi mới thực hiện hành động tương ứng.
   - **Mục tiêu tối thượng:** Lấy trọn các mốc **Thưởng Cá Nhân** (Kim Cương + Mảnh Vàng Vạn Năng) và tích lũy **Điểm Vinh Dự Bang (`Guild Honor`)** để đổi **Hồn Đá Đỏ (`Soul Stones`)**.
2. **Chế độ Tuần B — Tuần Chạy Đua Vũ Trang / Chiến Sự (`Guild Arms Race / KvK / 4 Nations` — 6 Ngày Chủ Đề):**
   - **Sự kiện Máy chủ chính:** Luân phiên giữa **Chạy Đua Vũ Trang Bang Hội (`Guild Arms Race — GAR`)** ở Tuần B1 và **Chiến Tranh Vương Quốc / Liên Server (`Kingdom Duel — KvK / 4 Nations League / SvS`)** ở Tuần B2.
   - **Cơ chế tính điểm:** Cố định theo **6 Ngày Chủ Đề (`6 Daily Stages`)** từ Thứ Hai đến Thứ Bảy cho toàn bộ máy chủ (Thứ Hai Xây dựng, Thứ Ba Nghiên cứu, Thứ Tư Thể lực/Thu thập, Thứ Năm Tướng, Thứ Sáu Lính, Thứ Bảy Diệt Địch).
3. **Chu Kỳ Sự Kiện Gacha Xoay Tua 3 Tuần/Lần (Độc Lập & Lệch Pha Với Tuần A / Tuần B):**
   - Theo dữ liệu gốc `TopHeroes Tables` (Tab `🛒Shops`), 3 sự kiện Gacha Kim Cương gồm **`Vòng Quay May Mắn (Wheel — 750 KC/lượt, tiệm mảnh Liên Minh)`**, **`Gacha Anh Hùng (Hero Gacha — 1,000 KC/lượt, tiệm mảnh Bộ Lạc)`** và **`Xúc Xắc Vận Mệnh (Dice of Fate — 800 KC/lượt, tiệm mảnh Tự Nhiên)`** xoay tua theo chu kỳ **3 tuần/lần (`Every 3rd Week`)** (hoặc mở theo mốc Ngày tuổi Server `Ngày 21, 27, 35, 41, 46` ở `Pre-Season S0`). Vì chu kỳ Gacha (3 tuần) lệch pha với chu kỳ Sự kiện Điểm số (2 tuần), tuyệt đối không mặc định cứng `Tuần A = Xúc Xắc` hay `Tuần B = Vòng Quay`.
```
3. Replace line `93` in the ASCII box:
```
| CHẾ ĐỘ TUẦN B: GUILD ARMS RACE (GAR) / KvK 6 NGÀY CHỦ ĐỀ + GUILD RUSH 2 NGÀY      |
```
4. Replace line `103` (`GAP-04` League Faction Sync bullet):
```markdown
- **Đối với người chơi Phe Liên Minh (`League`):** Các kỳ `Lucky Wheel`, `Hero Gacha` và `Dice of Fate` xoay tua 3 tuần/lần (hoặc theo Ngày tuổi Server ở `S0`). Hãy dùng các kỳ `Thi Đấu Hội` hàng tuần để gom Kim Cương từ rương mốc cá nhân, sau đó chỉ xả Kim Cương vào kỳ Gacha xuất hiện `Paragon`, `Rose Princess` hoặc `Bishop`.
```
5. Replace lines `158` and `176` in the Mermaid block:
```mermaid
    subgraph WEEK_A ["TUẦN A: THI ĐẤU HỘI (GUILD RACE — BẢNG 9 Ô) + GUILD RUSH 2 NGÀY"]
```
and
```mermaid
    subgraph WEEK_B ["TUẦN B: CHẠY ĐUA VŨ TRANG (GAR / KvK — 6 NGÀY) + GUILD RUSH 2 NGÀY"]
```

- [x] **Step 4.3: Run `verify-standardized-guides.ps1` to verify 31/31 Markdown blueprints pass**

Run:
```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File "d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides\scripts\verify-standardized-guides.ps1"
```
Expected output: `PASS: All checked files meet 100% verification gates!`.

---

### Task 5: Synchronize Core Business Strategy Docs in `tophub-web/docs/06-game-guides/` (`GAP-03` Exact Drop-In Blocks)

**Files:**
- Modify: `d:\GitHub\top-hero\tophub-web\docs\06-game-guides\01-core-strategic-topics\topic-6-biweekly-event-schedule-week-a-b.md` (lines `23–40`, `201–210`, `561–576`, `795–799`)
- Modify: `d:\GitHub\top-hero\tophub-web\docs\06-game-guides\05-events-and-community-guides\top-heroes-event-schedule-studio.md` (lines `1–35`, `78–93`, `108–116`)
- Modify: `d:\GitHub\top-hero\tophub-web\docs\06-game-guides\00-master-dashboard\master-dashboard-7-topics.md` (lines `306–313`, `437–504`)

- [x] **Step 5.1: Update `topic-6-biweekly-event-schedule-week-a-b.md` with exact replacement blocks**

In `d:\GitHub\top-hero\tophub-web\docs\06-game-guides\01-core-strategic-topics\topic-6-biweekly-event-schedule-week-a-b.md`:

1. **Replace lines `23–40`** (Introductory Server Evolution & 3-Week Independent Gacha Cycle):
```markdown
Hệ thống lịch sự kiện của mỗi máy chủ vận hành qua **2 Pha Tiến Hóa (2-Phase Server Evolution)** đi kèm **Chu kỳ Gacha 3 Tuần Độc Lập**:

- **Pha 1 — Máy chủ Mới / Pre-Season Sơ kỳ (Tuần 1–3+, Cấp Hội `D ➔ C ➔ B`):** Sau sự kiện mở màn **Lãnh Chúa Mạnh Nhất (Strongest Lord)**, máy chủ chạy chuỗi **Thi Đấu Hội (`Guild Race`) nối tiếp hàng tuần** (`09:00` Thứ Hai ➔ `09:00` Thứ Hai tuần kế tiếp) kết hợp 2 cặp sự kiện vệ tinh luân phiên (**Đế Quốc Hắc Ám Xâm Nhập ⇄ Khiêu Chiến Của Đội Quân Hắc Ám** và **Bắt Bướm ⇄ Tập Kích Cự Ma**).
- **Pha 2 — Máy chủ Trưởng thành (Khi mở khóa Ghép Cặp Liên Bang & Liên Server):** Hệ thống chuyển sang **Chu kỳ Luân phiên 2 Tuần (`Tuần A ⇄ Tuần B`)**: **Tuần A: Thi Đấu Hội (`Guild Race` — Bảng 9 Ô)** ➔ **Tuần B1: Đua Vũ Trang (`GAR` — 6 Ngày Chủ Đề)** ➔ **Tuần A: Thi Đấu Hội** ➔ **Tuần B2: Chiến Tranh Vương Quốc (`KvK / 4 Nations` — 6 Ngày Chủ Đề)**.
- **Chu kỳ Gacha Kim Cương Xoay Tua 3 Tuần/Lần (Độc lập & Lệch pha với Tuần A/B):** Theo bảng dữ liệu gốc `TopHeroes Tables` (Tab `🛒Shops`), 3 sự kiện Gacha gồm **Vòng Quay May Mắn (`Wheel` — `750 KC/lượt`, tiệm mảnh Liên Minh)**, **Gacha Anh Hùng (`Hero Gacha` — `1,000 KC/lượt`, tiệm mảnh Bộ Lạc)** và **Xúc Xắc Vận Mệnh (`Dice of Fate` — `800 KC/lượt`, tiệm mảnh Tự Nhiên)** xoay tua **3 tuần/lần (`Every 3rd Week`)** (hoặc mở theo mốc Ngày tuổi Server `Ngày 21, 27, 35, 41, 46` ở `S0`). Tuyệt đối không gán cứng `Tuần A = Xúc Xắc` hay `Tuần B = Vòng Quay`.
```

2. **Replace lines `201–210`** (Section 1 Quick Comparison Table — Week B Items):
```markdown
- **Nguyên liệu Trang bị Lãnh chúa (`Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng`)**: Xả vào **Thứ 4 & Thứ 5 (Ngày 3 & Ngày 4 của GAR/KvK)** (hoặc Ngày 5 của `KvK`; tuyệt đối không chờ Thứ 7 Ngày 6 vì Ngày 6 tính `0 điểm` Lord Gear!).

<br>

- **Huân chương Quân trang (`Glory Medals`) & Trang trí (`Decor Tokens`)** (Thứ 7 - Ngày 6).
```

3. **Replace lines `561–576`** (Section 3.1 Table — `Thứ 7 (Vòng 6)`):
```markdown
Thứ 7 (Vòng 6)

Chiến Sự (Kill Event) / Quân Trang & Trang Trí

**Huân chương Quân trang (`Glory Medals`)**, **Xu Trang trí (`Decor Tokens`)**, Thức ăn Thú cưng, Tăng tốc Chữa trị/Vạn năng, Bật Khiên bảo vệ. *(Lưu ý: Nguyên liệu Trang bị Lãnh chúa phải xả từ Thứ 4 – Thứ 5 vì Thứ 7 tính `0 điểm` Lord Gear!)*
```

4. **Replace lines `795–799`** (Section 4 Cheat Sheet Item #2 — `Trang bị Lãnh Chúa`):
```markdown
TRONG TUẦN B (GAR / KvK): XẢ VÀO THỨ 4 & THỨ 5 (Ngày 3 & Ngày 4 của GAR/KvK, hoặc Ngày 5 của KvK) để ăn mốc rương + sự kiện phụ `Lord's Set Rush`.

Đây mới là loại Trang bị ăn điểm Sự kiện cực lớn! Tuyệt đối không bấm Cường hóa lẻ tẻ khi chưa nhận nhiệm vụ (Tuần A) và tuyệt đối không chờ đến Thứ 7 (Ngày 6) của Tuần B vì Ngày 6 tính `0 điểm` Trang bị Lãnh chúa.
```

- [x] **Step 5.2: Update `top-heroes-event-schedule-studio.md` with exact replacement blocks**

In `d:\GitHub\top-hero\tophub-web\docs\06-game-guides\05-events-and-community-guides\top-heroes-event-schedule-studio.md`:

1. **Replace lines `1–17`** (Add v2.0 Standardization Callout & Fix Rule #1 on Blacksmith Gear):
```markdown
# Lịch Trình Tích Trữ & Xả Vật Phẩm Tuần Sự Kiện Top Heroes

> [!IMPORTANT]
> **ĐÍNH CHÍNH & CHUẨN HÓA CƠ CHẾ v2.0 (Cập nhật 2026-10-17):**
> 1. **Tiến hóa 2 Pha theo Tuổi Máy chủ:** Ở **Pha 1 (Server mới / Pre-Season đầu game)**, sau sự kiện *Lãnh Chúa Mạnh Nhất*, máy chủ chạy **Thi Đấu Hội (`Guild Race` — Bảng Nhiệm Vụ 9 Ô)** nối tiếp nhau hàng tuần. Khi bước sang **Pha 2 (Server trưởng thành)**, máy chủ mới luân phiên **Tuần A (`Thi Đấu Hội` — Bảng 9 Ô)** ⇄ **Tuần B (`GAR / KvK` — 6 Ngày Chủ Đề cố định)**. Bảng lịch trình cố định Thứ Hai ➔ Chủ Nhật dưới đây áp dụng cho **Chế độ Tuần B (`GAR / KvK / Top Lord`)**.
> 2. **Chu kỳ Gacha 3 Tuần Độc lập:** Ba sự kiện Gacha Kim Cương gồm **Vòng Quay (`Wheel` — `750 KC`, Liên Minh)**, **Gacha Anh Hùng (`Hero Gacha` — `1,000 KC`, Bộ Lạc)** và **Xúc Xắc (`Dice of Fate` — `800 KC`, Tự Nhiên)** xoay tua **3 tuần/lần (`Every 3rd Week`)** (hoặc theo Ngày tuổi Server ở `S0`), độc lập với Tuần A/B.
> 3. **Phân biệt rõ Trang bị Tướng (`Hero Gear`) vs Trang bị Lãnh Chúa (`Lord Gear`):** Quặng đúc Trang bị Tướng trong Lò rèn và Đá cường hóa thường (`+10/+20/+30/+40`) tính **`0 điểm`** sự kiện ➔ Đúc và nâng cấp ngay lập tức cho Đội 1. Chỉ **Nguyên liệu Trang bị Lãnh Chúa (`Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng`)** mới tính điểm sự kiện (xả vào **Ngày 5–7 của Tuần A** hoặc **Ngày 3–4 của Tuần B**).

Trong trò chơi chiến thuật **Top Heroes**, sự chênh lệch lực chiến và cấp độ giữa người chơi không chỉ phụ thuộc vào lượng tài nguyên sở hữu mà nằm ở **thời điểm xả tài nguyên**. Việc chi tiêu tự do các vật phẩm tính điểm ngoài thời gian sự kiện sẽ làm thất thoát đến 60%–80% lượng phần thưởng rương tích lũy.

---

## 1. Nguyên Tắc Tích Trữ Cốt Lõi Trước Khi Vào Tuần Sự Kiện

Để chuẩn bị tốt nhất cho chuỗi sự kiện hàng tuần, người chơi cần tuân thủ 4 quy tắc quản lý kho vật phẩm nghiêm ngặt:

*   **Không xả vật phẩm tính điểm lẻ tẻ**: Tất cả các loại bình tăng tốc, thẻ chiêu mộ, mảnh tướng, sách kỹ năng, thức ăn thú cưng và **nguyên liệu Trang bị Lãnh chúa (`Lord Gear`)** phải được tích giữ và chỉ bấm sử dụng vào đúng ngày có chủ đề tương ứng (hoặc khi đã bấm Nhận nhiệm vụ Vàng trên bảng `Thi Đấu Hội` ở Tuần A). Riêng **Trang bị Tướng (`Hero Gear` trong Lò rèn)** không tính điểm sự kiện nên hãy đúc và nâng cấp ngay cho Đội 1.
*   **Quy tắc "Chờ Guild Help trước khi dùng Tăng tốc"**: Mỗi khi bắt đầu một công trình xây dựng hoặc dự án nghiên cứu, luôn bấm nút yêu cầu Bang hội hỗ trợ (*Guild Help*). Chỉ khi thanh hỗ trợ đạt tối đa mới bắt đầu cắn các bình tăng tốc (*Speedups*).
*   **Bảo tồn Mảnh vạn năng Huyền Thoại (Universal Legendary Shards)**: Mảnh vạn năng Vàng là tài nguyên quý hiếm nhất. Tuyệt đối không dùng cho các tướng Vàng thường (vì có thể cày miễn phí trong Quán Rượu). Hãy tích trữ toàn bộ cho các tướng **Thần Thoại (Mythic)** hoặc Tướng Vàng Thức Tỉnh trụ cột của Đội 1.
*   **Quản lý Kim Cương thông minh**: Kim Cương chỉ dành để thuê Hàng chờ xây dựng thứ 2 (`500 KC`/2 ngày), mua Thể lực/Tăng tốc trong Shop VIP và nghiên cứu nhánh *Quyền Năng Tối Thượng*, hoặc dồn quay `Wheel` / `Hero Gacha` / `Dice of Fate` khi mở tướng Đỏ thuộc Phe Đội 1. Không dùng Kim Cương để chiêu mộ tướng trong Quán Rượu hay mua tăng tốc lẻ.
```

2. **Replace lines `28–32`** (Section 2 Table — Days 3, 4, 5, 6, 7):
```markdown
| **Thứ 4** | Thể Lực, Mỏ & Trang Bị Lãnh Chúa (Kỳ 1) | Bình Thể lực (*Stamina Potions*), Cuộn Tiền thưởng (*Bounty*), Nguyên liệu Trang bị Lãnh chúa (*Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng*) | Chạy đủ 50 trận Rally Boss mỗi ngày, thu hoạch mỏ cấp cao và xả đợt 1 Nguyên liệu Trang bị Lãnh chúa. |
| **Thứ 5** | Bùng Nổ Tướng & Trang Bị Lãnh Chúa (Kỳ 2) | Thẻ chiêu mộ (*Recruitment Tokens*), Mảnh tướng, Đá linh hồn (*Soul Stones*), Sách kỹ năng, Vũ khí Độc quyền, Nguyên liệu Trang bị Lãnh chúa | Xả thẻ chiêu mộ trong Quán Rượu, nâng sao/kỹ năng tướng Đội 1 và hoàn tất xả Nguyên liệu Trang bị Lãnh chúa trùng giờ *Lord's Set Rush*. |
| **Thứ 6** | Huấn Luyện Lính, Thú Cưng & Cự Thú | Tăng tốc Huấn luyện Lính, Thức ăn Thú cưng (*Pet Food*), Linh Hồn Anh Hùng (*Heroic Spirit*), Nguyên liệu Cự Thú (*Behemoth*) | Áp dụng *Thăng Cấp Lính Bậc Thang* (`T(n-1) ➔ T(n)`) và dồn Thức ăn Thú cưng nâng cấp Pet chính của Đội 1. |
| **Thứ 7** | Chiến Sự (Kill Event), Quân Trang & Trang Trí | Huân chương Quân trang (*Glory Medals*), Xu Trang trí (*Decor Tokens*), Tăng tốc Chữa trị/Vạn năng, Khiên bảo vệ (*Peace Shield*) | Bật Khiên bảo vệ hoặc tham chiến KvK; xả Huân chương Quân trang và Xu Trang trí. *(Trang bị Lò rèn không tính điểm nên đúc ngay trong tuần).* |
| **Chủ Nhật** | Chốt Sổ Bảng Nhiệm Vụ / Chuẩn Bị Chu Kỳ Mới | Kiểm tra `Event ➔ Lịch Event` lúc `09:00`, treo sẵn Nhà/Nghiên cứu/Lính dài ngày cho Thứ Hai tuần kế tiếp | Bấm vào cột Thứ Hai trên `Lịch Event` để xác định tuần tới là `Thi Đấu Hội` (Bảng 9 Ô) hay `GAR / KvK` (6 Ngày Chủ Đề). |
```

3. **Replace lines `78–93`** (Sections `3.5` and `3.6`):
```markdown
### 3.5. Thứ 6 — Huấn Luyện Lính Bậc Thang, Thú Cưng & Cự Thú
Giai đoạn bứt phá điểm số quân sự thông qua việc thăng cấp lính bậc thang kết hợp nâng cấp Thú cưng (*Pets*) và Cự Thú (*Behemoth*).

1.  **Mục tiêu trọng tâm**: Thăng cấp lính từ cấp thấp lên cấp cao nhất (`T(n-1) ➔ T(n)`), đồng thời tăng cấp và tiến hóa Thú cưng Đội 1.
2.  **Vật phẩm xả**: *Tăng tốc Huấn luyện Lính (Training Speedups)*, *Thức ăn Thú cưng (Pet Food)*, *Linh Hồn Anh Hùng (Heroic Spirit)*, *Nguyên liệu Cự Thú (Behemoth)*.
3.  **Chiến thuật ăn điểm**: Huấn luyện sẵn lính bậc `T(n-1)` trong tuần và dùng bình Tăng tốc Huấn luyện vào Thứ 6 (khung giờ `21:00–01:00` trùng *Rush Top*) để thăng cấp lên `T(n)`, đồng thời xả toàn bộ Thức ăn Thú cưng cho Pet chủ lực.

### 3.6. Thứ 7 — Chiến Sự (Kill Event), Quân Trang & Trang Trí (Lưu Ý Tách Bạch Trang Bị)
Ngày cuối của chuỗi 6 ngày chủ đề Tuần B tập trung vào Chiến sự Liên Server (`KvK`) cùng các vật phẩm Quân trang và Trang trí.

1.  **Mục tiêu trọng tâm**: Tham chiến hoặc bật Khiên bảo vệ tài nguyên trong ngày *Kill Event*, đồng thời nâng cấp Quân trang (*Troop Skins*) và Bộ sưu tập Trang trí (*Decorations*).
2.  **Vật phẩm xả**: *Huân chương Quân trang (Glory Medals)*, *Xu Trang trí (Decor Tokens)*, *Thức ăn Thú cưng*, *Tăng tốc Chữa trị/Vạn năng*.
3.  **Quy tắc sống còn về 2 hệ thống Trang bị**:
    *   **Trang bị Lãnh Chúa (`Lord Gear`: Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng)**: Tính điểm cực lớn vào **Thứ 4 & Thứ 5 (Ngày 3–4 của Tuần B)** hoặc **Ngày 5–7 của Tuần A (`Thi Đấu Hội`)**, nhưng tính **`0 điểm` vào Thứ 7 (Ngày 6)**. Tuyệt đối không giữ nguyên liệu Lãnh chúa sang Thứ 7!
    *   **Trang bị Tướng (`Hero Gear` trong Lò rèn)**: Quặng đúc đồ và Đá cường hóa thường (`+10/+20/+30/+40`) hoàn toàn **không tính điểm sự kiện** (chỉ *Đá Thăng Cấp / Tinh Hoa Rồng* đập đồ Thần Thoại mới tính điểm vào Thứ 2–Thứ 3 của `KvK`). Hãy đúc bộ 4 món Vàng và đập lên Cấp `10/20/30/40` cho Đội 1 ngay khi đủ quặng.
```

4. **Replace lines `108–116`** (Section 4 Cheat Sheet):
```markdown
*   **Tăng tốc Xây dựng**: Dùng vào **Thứ 2 Tuần B** (hoặc khi nhận Nhiệm vụ Vàng Xây dựng ở **Tuần A**).
*   **Tăng tốc Nghiên cứu**: Dùng vào **Thứ 3 Tuần B** (hoặc khi nhận Nhiệm vụ Vàng Nghiên cứu ở **Tuần A**).
*   **Bình Thể lực & Cuộn Tiền thưởng**: Dùng vào **Thứ 4 Tuần B** (GAR/KvK Ngày 3).
*   **Nguyên liệu Trang bị Lãnh chúa (`Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng`)**: Dùng vào **Thứ 4 & Thứ 5 Tuần B** (GAR/KvK Ngày 3–4) hoặc **Thứ 6–CN Tuần A** (khi xoay ra Nhiệm vụ Độc quyền Vàng Trang bị Lãnh chúa).
*   **Thẻ chiêu mộ, Mảnh tướng, Sách kỹ năng & Hồn Đá Đỏ**: Chỉ dùng vào **Thứ 5 Tuần B** (GAR/KvK Ngày 4).
*   **Tăng tốc Huấn luyện Lính & Thức ăn Thú cưng**: Dùng vào **Thứ 6 Tuần B** (GAR/KvK Ngày 5).
*   **Huân chương Quân trang (`Glory Medals`) & Xu Trang trí (`Decor Tokens`)**: Dùng vào **Thứ 7 Tuần B** (GAR/KvK Ngày 6) hoặc **Thứ 2 Tuần B** (nếu áp dụng cho Trang trí).
*   **Quặng Lò rèn & Trang bị Tướng (`Hero Gear` `+10/+20/+30/+40`)**: **Không tính điểm sự kiện** ➔ Đúc và nâng cấp ngay cho Đội 1, không cần tích trữ.
*   **Đá rồng (*Dragon Essence*)**: Dùng vào **Thứ 2** (Công trình Viện Tinh Hoa) hoặc **Thứ 2–Thứ 3 của tuần KvK** (khi đập Trang bị Thần Thoại Tướng).
```

- [x] **Step 5.3: Update `master-dashboard-7-topics.md` with exact replacement blocks**

In `d:\GitHub\top-hero\tophub-web\docs\06-game-guides\00-master-dashboard\master-dashboard-7-topics.md`:

1. **Replace lines `306–313`** (`TOPIC 3 — Trang bị Lãnh Chúa`):
```markdown
Tuần B (GAR / KvK)

, xả vào 

Thứ 4 & Thứ 5 (Ngày 3 & Ngày 4 của GAR/KvK, hoặc Ngày 5 của KvK; tuyệt đối không chờ Thứ 7 Ngày 6 vì Ngày 6 tính 0 điểm Lord Gear)

.
```

2. **Replace lines `437–504`** (`TOPIC 6`):
```markdown
6. TOPIC 6: Chiến Thuật Sự Kiện Theo 2 Pha Tiến Hóa Máy Chủ & Chu Kỳ Tuần A ⇄ Tuần B (Đã chuẩn hóa v2.0)

Quy luật 2 Pha Tiến Hóa & Gacha 3 Tuần Độc Lập:

- **Pha 1 (Server Mới / Pre-Season Sơ kỳ):** Chạy chuỗi **Thi Đấu Hội (`Guild Race`) nối tiếp hàng tuần** kèm 2 cặp sự kiện vệ tinh (*Đế Quốc Hắc Ám ⇄ Đội Quân Hắc Ám* và *Bắt Bướm ⇄ Tập Kích Cự Ma*).
- **Pha 2 (Server Trưởng Thành):** Luân phiên **Tuần A (`Thi Đấu Hội` — Bảng 9 Ô)** ⇄ **Tuần B (`GAR / KvK` — 6 Ngày Chủ Đề)**.
- **Chu kỳ Gacha 3 Tuần/Lần (Độc lập với Tuần A/B):** `Wheel` (`750 KC`, Liên Minh), `Hero Gacha` (`1,000 KC`, Bộ Lạc) và `Dice of Fate` (`800 KC`, Tự Nhiên) xoay tua **3 tuần/lần (`Every 3rd Week`)** (hoặc theo Ngày tuổi Server ở `S0`). Luôn mở `Event ➔ Lịch Event` lúc `09:00` Thứ Hai để kiểm tra lịch thực tế.

Tuần A — Chế độ "Thi Đấu Hội" (Guild Race — Bảng Nhiệm Vụ 9 Ô):

Xoay 2 ô Nhiệm vụ Độc quyền miễn phí mỗi 10 phút, chỉ bấm `Accept` 

Nhiệm vụ Vàng

 trước khi hành động.

Ngày 5, 6, 7 (Thứ 6 – CN): Săn Nhiệm vụ Độc quyền Vàng 

Trang bị Lãnh chúa

, 

Công trình

, 

Công nghệ

.

Cấm kỵ ở Tuần A:

 Không nhận nhiệm vụ 

Quay 80 vé

 hoặc 

Tiêu 40 mảnh Cam

!

Tuần B — Chế độ "Đua Vũ Trang (GAR)" / "KvK" / "Top Lord" (6 Ngày Chủ Đề cố định):

Xả theo đúng 6 giai đoạn cố định kết hợp khung giờ 

Double-Dip

: 

Thứ 2

 Xây dựng (13h–17h) | 

Thứ 3

 Nghiên cứu & Cổ Ngữ (17h–21h) | 

Thứ 4

 Thể lực, Mỏ & Trang bị Lãnh chúa Kỳ 1 (17h–21h) | 

Thứ 5

 Bùng nổ Tướng, Vé quay & Trang bị Lãnh chúa Kỳ 2 (17h–21h) | 

Thứ 6

 Lính Bậc Thang & Thú cưng/Behemoth (21h–01h) | 

Thứ 7

 Quân trang (`Glory Medals`), Trang trí (`Decor Tokens`) & Khiên KvK *(Lưu ý: Trang bị Lãnh chúa đã xả từ Thứ 4–Thứ 5 vì Thứ 7 tính 0 điểm)*.
```

---

### Task 6: Full Verification & Regression Gate

- [x] **Step 6.1: Run targeted & full Vitest suites in `tophub-web`**

```powershell
npx vitest run tests/group-3-content.test.ts tests/guides-phase3-widgets.test.tsx tests/wave3-content-scannability.test.ts tests/guides-bilingual-purity.test.ts
npx vitest run
```
Expected output: All test suites pass (`100%` green).

- [x] **Step 6.2: Run PowerShell Standardized Markdown Quality Gate**

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File "d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides\scripts\verify-standardized-guides.ps1"
```
Expected output: `PASS: All checked files meet 100% verification gates!`.

- [x] **Step 6.3: Run zero-residue grep check across `src/`, `docs/07-standardized-web-guides/`, and `tophub-web/docs/06-game-guides/`**

```powershell
Get-ChildItem -Path "d:\GitHub\top-hero\tophub-web\src","d:\GitHub\top-hero\docs\06-game-guides\07-standardized-web-guides" -Recurse -File | Select-String -Pattern "Đua Bang Hội \+ Xúc Xắc|Guild Race \+ Dice|Week A: Guild Race \(Dice\)|Tích trữ 13 Ngày, Bùng nổ đúng Ngày|Hoard for 13 Days, Burst on the Right Day|KvK \+ Vòng Quay|KvK \+ Wheel|4 Nations \+ Wheel|\+ DICE \+|\+ WHEEL \+|Dice Event \(Week A\)"
```
Expected output: Empty (`0` matches).

---

## 4. 12-Point Senior Tech Lead Audit Sign-Off (`/review-plan`)

1. **No Placeholders Law**: Verified `0` `TODO`, `TBD`, or prose-only instructions; every file edit across `src/`, `tests/`, `docs/07-standardized-web-guides/`, and `tophub-web/docs/06-game-guides/` includes exact line ranges and complete drop-in replacement blocks.
2. **Widget TDD Coverage (`GAP-01`)**: Added explicit `vi` and `en` rendering assertions for `BiweeklyCalendarWidget` in `tests/guides-phase3-widgets.test.tsx`.
3. **Glossary SSoT Alignment (`GAP-02`)**: Updated `event-guild-race`, `event-fortune-wheel`, and `event-dice-of-fate` in `src/content/guides/glossary.ts` while preserving `GUIDE_GLOSSARY.length` and `0` Vietnamese diacritics in `.en`.
4. **Wave 3 Scannability Compliance**: Verified that all `list.items[]` in `3.1-biweekly-rotation.ts` are single-line, start with `**Bold Lead**`, contain `0` emojis, and measure `194`–`217` chars (`<= 220` limit).
5. **Wave 5 Bilingual Purity Compliance**: Verified `0` Vietnamese diacritics inside any `.en` replacement string in `3.1-biweekly-rotation.ts`, `biweekly-calendar-widget.tsx`, and `glossary.ts`.
6. **KaTeX & Mermaid Compliance**: Verified all Markdown updates preserve escaped `\$` and `<br/>` syntax inside Mermaid nodes.
7. **Rollback Path**: All changes are isolated to static content/documentation and test files, cleanly reversible via `git checkout -- <file>`.
