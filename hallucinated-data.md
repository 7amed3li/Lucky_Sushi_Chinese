# HALLUCINATED DATA AUDIT REPORT

This report audits information that was hallucinated, inferred from outside culinary recipes, or added beyond the authoritative source (`lucky_sushi_menu.md`):

### 1. `sr-green-dragon`
- **Field:** ingredients / description
- **Source Value:** `Yılan balığı, salatalık, avokado (Eel, cucumber, avocado)`
- **Hallucinated Value:** `Shrimp tempura, avocado, cucumber, cream cheese, teriyaki sauce, sesame`
- **Problem:** Invented shrimp tempura, cream cheese, teriyaki sauce, and sesame. Common sushi recipe hallucination.

### 2. `sr-crazy-salmon`
- **Field:** ingredients / description
- **Source Value:** `Salatalık, avokado, krem peynir, tütsülenmiş somon, acı mayonez`
- **Hallucinated Value:** `Salmon tempura, avocado, cucumber, cream cheese, panko, dynamite sauce, teriyaki sauce`
- **Problem:** Replaced smoked salmon and spicy mayo with salmon tempura, panko, dynamite sauce, and teriyaki sauce.

### 3. `sr-crazy-tuna`
- **Field:** ingredients / description
- **Source Value:** `Tuna balığı, avokado, krem peyniri, salatalık`
- **Hallucinated Value:** `Tuna, avocado, cucumber, cream cheese, spicy mayo, sesame`
- **Problem:** Invented spicy mayo and sesame.

### 4. `sr-vegan`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Avocado, cucumber, carrot, pickled vegetables, sesame`
- **Problem:** Invented entire 5-ingredient recipe from general vegan sushi conventions.

### 5. `sr-wakame`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Wakame seaweed, avocado, cucumber, sesame`
- **Problem:** Invented avocado, cucumber, and sesame.

### 6. `sr-osaka`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Salmon, avocado, cucumber, cream cheese, teriyaki sauce`
- **Problem:** Invented entire recipe without source backing.

### 7. `soup-tom-yum`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Lemongrass, kaffir lime leaf, galangal, shrimp, mushroom, chili`
- **Problem:** Invented traditional Thai recipe components not present in restaurant data.

### 8. `soup-sebzeli-ramen`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Vegetable broth, ramen noodles, seasonal vegetables, nori`
- **Problem:** Invented ingredient list.

### 9. `soup-deniz-mahsulleri`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Mixed seafood, spring onion, ginger`
- **Problem:** Invented ginger and spring onion.

### 10. `soup-sebzeli-udon`
- **Field:** ingredients / description
- **Source Value:** `غير مذكور في بيانات الموقع. (No ingredients in source)`
- **Hallucinated Value:** `Udon noodles, seasonal vegetables, vegetable broth`
- **Problem:** Invented ingredient list.

### 11. `start-dynamite-shrimp`
- **Field:** ZH translation
- **Source Value:** `Dynamite Shrimp (6 Adet) - Acılı karides tempura`
- **Hallucinated Value:** `爆炸虾 (Explosion shrimp)`
- **Problem:** Machine-translation artifact violating restaurant naming conventions.

### 12. `start-dynamite-chicken`
- **Field:** ZH translation
- **Source Value:** `Dynamite Chicken - Acılı dynamite soslu çıtır tavuk`
- **Hallucinated Value:** `爆炸鸡 (Explosion chicken)`
- **Problem:** Machine-translation artifact violating restaurant naming conventions.

### 13. `sr-rainbow`
- **Field:** AR & RU translation
- **Source Value:** `Yengeç, avokado, krem peynir, salatalık, somon, levrek`
- **Hallucinated Value:** `AR: لوت (Meagre/Argyrosomus) instead of قاروص; RU: морской окунь (Perch) instead of сибас`
- **Problem:** Seafood species misidentification/hallucination.

