# FINAL MULTILINGUAL MENU QA REPORT — SOURCE-LOCKED MODE

**Date:** 2026-10-08  
**Scope:** 181 Products across 22 Sections in 5 Languages (TR, EN, AR, RU, ZH) + UI Translations  
**Authoritative Sources:** `lucky_sushi_menu.md` (SepetTakip Extraction) & `en-products.js` (Canonical English Reference)

---

## A. Product Inventory

- **Total Sections in Source Menu:** 22
- **Total Products in Source Menu:** 181
- **Catalog Breakdown by Section:**
  1. `1. Sushi Set Menüler`: 12 products
  2. `2. Çorba & Ramen`: 14 products
  3. `3. Başlangıç`: 13 products
  4. `4. Deniz Ürünleri`: 6 products
  5. `5. Udon Noodle`: 6 products
  6. `6. Noodle`: 9 products
  7. `7. Pilav`: 8 products
  8. `8. Poke Bowl`: 8 products
  9. `9. Kırmızı Et`: 5 products
  10. `10. Beyaz Et`: 8 products
  11. `11. Special Roll`: 25 products
  12. `12. Crunchy Roll`: 6 products
  13. `13. Magic Maki`: 8 products
  14. `14. Sashimi (4 Pcs)`: 6 products
  15. `15. Pad Thai`: 4 products
  16. `16. Nigiri`: 4 products
  17. `17. Sos`: 8 products
  18. `18. İçecek`: 16 products
  19. `19. Salads`: 3 products
  20. `20. Sebze Yemeği`: 3 products
  21. `21. Tatlı`: 5 products
  22. `22. Bento Menüler`: 4 products
- **Total Catalog Count per Language:**
  - Turkish (`tr`): 181 products
  - English (`en`): 181 products
  - Arabic (`ar`): 181 products
  - Russian (`ru`): 181 products
  - Simplified Chinese (`zh`): 181 products

---

## B. ID Comparison

- **ID Parity:** 100% matched across all 5 languages (`EN == TR == AR == RU == ZH`).
- **Deterministic ID Schema:**
  - 142 Pre-existing production IDs preserved verbatim.
  - 39 Restored IDs follow identical kebab-case category taxonomy (`drink-pepsi-zero`, `sauce-sriracha`, `noodle-kalamar`, `sr-crazy-philadelphia`, etc.).
- **Key Ordering:** 100% identical sequence preserved across all JSON files.

---

## C. Missing Products

- **Count:** 0
- **Details:** None. All 181 source items are present in all 5 languages.

---

## D. Extra Products

- **Count:** 0
- **Details:** None. No phantom, hallucinated, or duplicate product entries exist.

---

## E. Duplicate Products

- **Count:** 0
- **Details:** Unique ID check passed (0 duplicates). Unique localized product name check passed (0 duplicates across all 5 languages).

---

## F. Semantic Mismatches

### High-Risk Products Specific Audit

1. **`sr-green-dragon` (Green Dragon Roll)**
   - *Source:* `Yılan balığı, salatalık, avokado`
   - *Translations:* Eel, cucumber, avocado. Zero ungrounded ingredients. (PASS)
2. **`sr-crazy-salmon` (Crazy Salmon Roll)**
   - *Source:* `Salatalık avokado krem peynir tütsülenmiş somon acı mayonez`
   - *Translations:* Cucumber, avocado, cream cheese, smoked salmon, spicy mayo. (PASS)
3. **`sr-crazy-tuna` (Crazy Tuna Roll)**
   - *Source:* `Tuna balığı, avokado, krem peyniri, salatalık`
   - *Translations:* Tuna, avocado, cream cheese, cucumber. (PASS)
4. **`sr-ebi-tempura` (Ebi Tempura Roll)**
   - *Source:* `Karides tempura, avokado, salatalık krem peynir, dynamite sos, teriyaki sos`
   - *Translations:* Shrimp tempura, avocado, cucumber, cream cheese, dynamite sauce, teriyaki sauce. (PASS)
5. **`sr-salmon-tempura` (Salmon Tempura Roll)**
   - *Source:* `Somon tempura, avokado, salatalık, krem peynir, teriyaki sos`
   - *Translations:* Salmon tempura, avocado, cucumber, cream cheese, teriyaki sauce. (PASS)
6. **`sr-calamari-tempura` (Calamari Tempura Roll)**
   - *Source:* `Kalamar tempura, avokado, salatalık, krem peynir, panko, dynamite sos, teriyaki sos`
   - *Translations:* Calamari tempura, avocado, cucumber, cream cheese, panko, dynamite sauce, teriyaki sauce. (PASS)
7. **`sr-canadian` (Canadian Roll)**
   - *Source:* `Yengeç, krem peyniri, avokado, salatalık, somon`
   - *Translations:* Crab, cream cheese, avocado, cucumber, salmon. (PASS)
8. **`sr-dragon` (Dragon Roll)**
   - *Source:* `Avokado, teriyaki sos, salatalık, yılan balığı, susam`
   - *Translations:* Avocado, teriyaki sauce, cucumber, eel, sesame. (PASS)
9. **`sr-dynamite-karides` (Dynamite Shrimp Roll)**
   - *Source:* `Avokado, salatalık, krem peynir, susam, karides, acılı dynamite sos, teriyaki sos`
   - *Translations:* Avocado, cucumber, cream cheese, sesame, shrimp, spicy dynamite sauce, teriyaki sauce. (PASS)
10. **`sr-rainbow` (Rainbow Roll)**
    - *Source:* `Yengeç, avokado, krem peynir, salatalık, somon, levrek`
    - *Translations:* Crab, avocado, cream cheese, cucumber, salmon, sea bass (`levrek` / `قاروص` / `сибас` / `鲈鱼`). (PASS)
11. **`sr-vegan` (Vegan Roll) — Rule 10 Verification**
    - *Source (`en-products.js`):* `100% plant-based roll`
    - *Current Catalog:* `""` (Empty description)
    - *Issue:* Rule 10 requires preserving the explicit meaning of `100% plant-based roll` across all languages without inventing ingredients.
    - *Correction:* Update description across all 5 languages (see Section 25 below).
12. **`sr-grabi` (Grabi Roll)**
    - *Source:* `8 pcs` (no ingredient list).
    - *Current Catalog:* `""`. Preserved empty to prevent hallucination. (PASS)
13. **`sr-chicken-california` (Chicken California Roll)**
    - *Source:* `tavuık krem peyniri avokado salatalık tobiko`
    - *Translations:* Chicken, cream cheese, avocado, cucumber, tobiko. (PASS)
14. **`sr-wakame` (Wakame Roll)**
    - *Source:* `غير مذكور في بيانات الموقع.`
    - *Current Catalog:* `""`. Preserved empty. (PASS)
15. **`sr-osaka` (Osaka Roll)**
    - *Source:* `غير مذكور في بيانات الموقع.`
    - *Current Catalog:* `""`. Preserved empty. (PASS)

---

## G. Hallucinated Information

- **Audit Result:** 0 ungrounded or invented ingredients, sauces, cooking methods, or garnishes.
- **Verification:**
  - Rolls without ingredients in source remain empty (`""`).
  - No speculative ingredients (avocado, carrot, cucumber) were added to `sr-vegan`, `sr-grabi`, `sr-wakame`, or `sr-osaka`.
  - No invented marketing buzzwords ("fresh Norwegian", "premium", "authentic") in product entries.

---

## H. Missing Information

- **Audit Result:** 0 omissions of proteins, sauces, or ingredients present in source.
- **Check Details:**
  - All tempura and dynamite sauces explicitly specified in source are present across all 5 languages.
  - Capia pepper, spring onion, bean sprouts, and baby corn in wok dishes are accurately preserved.

---

## I. Turkish Language Issues

- **Audit Result:** PASS
- **Review Items:**
  - Checked for unwanted English leakage (`shrimp`, `cucumber`, `chicken`, `cream cheese`). All culinary terms properly localized to natural Turkish restaurant terminology (`karides`, `salatalık`, `tavuk`, `krem peynir`).
  - `Tuna balığı` / `Ton balığı` verified natural and standard.
  - Piece count indicators consistently formatted as `(X Adet)`.

---

## J. Arabic Language Issues

- **Audit Result:** PASS
- **Review Items:**
  - Standardized fish terminology: `قاروص` used for sea bass (0 occurrences of regional Egyptian `لوت`).
  - Standardized salmon spelling: `سلمون` used consistently (0 occurrences of extra alif `سالمون`).
  - Piece count indicators formatted as `(X قطعة)`.
  - Zero English leakage in item descriptions.

---

## K. Russian Language Issues

- **Audit Result:** PASS
- **Review Items:**
  - Standardized sea bass terminology: `сибас` used across menu (0 occurrences of river perch `морской окунь`).
  - Piece count indicators formatted as `(X шт.)`.
  - Beverage brand names properly kept recognizable (`Coca Cola`, `Pepsi Cola`, `Yedigün`).

---

## L. Chinese Language Issues

- **Audit Result:** PASS
- **Review Items:**
  - 100% Simplified Chinese characters (0 Traditional Chinese characters `龍`, `蝦`, `魚`, `鮭`, `鮪`).
  - Piece count indicators formatted with natural measure words `(X件)`.
  - Natural Chinese culinary phrasing for sushi and wok dishes (`三文鱼`, `金枪鱼`, `鳗鱼`, `牛油果`, `照烧酱`, `天妇罗`).

---

## M. English Language Issues

- **Audit Result:** PASS
- **Review Items:**
  - Standardized sushi naming conventions.
  - Piece counts formatted as `(X Pcs)`.
  - Clean, grammatically sound ingredient lists.

---

## N. UI Translation Issues

- **Audit Result:** PASS
- **Review Items:**
  - Total keys: 149 keys in all 5 languages (`tr`, `en`, `ar`, `ru`, `zh`).
  - Missing keys: 0
  - Extra keys: 0
  - Untranslated text / placeholders: 0
  - Navigation, Cart, Search, Filters, Allergens, and Action buttons thoroughly checked.

---

## O. Source Conflicts (Rule 21 Audit)

The following conflicts between `lucky_sushi_menu.md` and `en-products.js` were identified and evaluated:

1. **`sr-vegan`**
   - *Menu Source Value:* `غير مذكور في بيانات الموقع.`
   - *EN Source Value:* `100% plant-based roll`
   - *Conflict:* Empty in menu scan vs populated in `en-products.js`.
   - *Resolution:* Explicitly resolved by **Rule 10** ("If the authoritative source only says: '100% plant-based roll' then: DO NOT invent a specific ingredient list. The translated descriptions must preserve the meaning of: 100% plant-based roll without inventing ingredients.").
   - *Status:* **RESOLVED VIA RULE 10 (Confidence: HIGH)**.

2. **Starters (`start-teriyaki-edamame`, `start-prawn-crackers`, `start-karides-shots`, `start-dynamite-chicken`)**
   - *Menu Source Value:* `غير مذكور في بيانات الموقع.`
   - *EN Source Value:* Provided concise item descriptions (`Soy beans with teriyaki sauce`, `Light and crispy prawn crackers`, `Crispy shrimp bites`, `Crispy chicken with spicy dynamite sauce`).
   - *Conflict:* Empty in `lucky_sushi_menu.md` vs populated in `en-products.js`.
   - *Status:* **SOURCE_CONFLICT_REQUIRES_REVIEW (Confidence: LOW)**.
   - *Policy Applied:* Under Rule 23, LOW-confidence source conflicts are preserved as currently structured and flagged for human stakeholder review rather than silently altered.

3. **Restored Catalog Items (39 items)**
   - *Menu Source Value:* Present in `lucky_sushi_menu.md` (e.g. `noodle-kalamar`, `noodle-deniz-mahsulleri`, `sr-crazy-philadelphia`, `sr-philly-roll`, etc.).
   - *EN Source Value:* Missing from legacy 142-product `en-products.js` (dropped in earlier refactor).
   - *Resolution:* Authoritative source `lucky_sushi_menu.md` contains the full dishes and ingredient lists. Translated directly from `lucky_sushi_menu.md`.
   - *Status:* **RESOLVED FROM PRIMARY SOURCE (Confidence: HIGH)**.

---

## P. Number and Quantity Inconsistencies

- **Piece Counts:** 100% consistent across all 181 products in all 5 languages (0 mismatches).
- **Sets Audit:** Total pieces and sub-roll quantities match source definitions exactly:
  - `set-canada`: 32 Pcs (8 Philadelphia, 8 California, 8 Kappa maki, 8 Avocado maki).
  - `set-combo-crunchy`: 24 Pcs (8 Ebiten, 8 Philadelphia, 8 California).
  - `set-salmon-lovers`: 40 Pcs.
  - `set-cooked-mix`: 24 Pcs.
  - `set-moriawase`: 20 Pcs.
  - `set-istanbul`: 32 Pcs.
  - `set-lucky`: 24 Pcs.
  - `set-chicken-lovers`: 40 Pcs.
  - `set-lucky-prestige`: 56 Pcs.
  - `set-california-sushi`: 16 Pcs.
  - `set-philadelphia-sushi`: 16 Pcs.
  - `set-sakura-maki`: 40 Pcs (8 Kani, 8 Kappa, 8 Avocado sake, 8 Spicy tuna, 8 Ebi).
- **Beverage Volumes:** 100% consistent (330 ml / 200 ml) preserved across all languages.

---

## Identified Verified Action Items

### Issue 1: `sr-vegan` Description (Rule 10)
- **Product ID:** `sr-vegan`
- **Field:** `description`
- **Current Values:**
  - EN: `""`
  - TR: `""`
  - AR: `""`
  - RU: `""`
  - ZH: `""`
- **Source Value (`en-products.js` & Rule 10):** `100% plant-based roll`
- **Problem:** Rule 10 mandates that the translated description preserve the meaning of `100% plant-based roll` without inventing ingredients.
- **Proposed Correction:**
  - EN: `100% plant-based roll`
  - TR: `%100 bitki bazlı roll`
  - AR: `رول نباتي 100%`
  - RU: `100% растительный ролл`
  - ZH: `100%纯植物卷`
- **Confidence:** **HIGH** (Directly mandated by Rule 10).
