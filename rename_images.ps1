# rename_images.ps1
# ينقل صور lucky_sushi إلى public/images/ مع تحويل الأسماء إلى slugs إنجليزية

$srcRoot = "public\images\lucky_sushi_images\صور الأصناف"
$dstRoot = "public\images"

# قائمة الربط: المسار الأصلي (Category\FileName) → اسم الوجهة
$map = @{
  # Sushi Sets
  "Sushi Set Menüler\Sushi Set Menüler - Canada Set (32 Pcs).jpg"                     = "canada-set.jpg"
  "Sushi Set Menüler\Sushi Set Menüler - Combo Crunchy Set Menü (24 Pcs).jpg"         = "combo-crunchy-set.jpg"
  "Sushi Set Menüler\Sushi Set Menüler - Salmon Lover's (40 Pcs.).jpg"                = "salmon-lovers.jpg"
  "Sushi Set Menüler\Sushi Set Menüler - Cooked Mix (24 Pcs).jpg"                     = "cooked-mix.jpg"
  "Sushi Set Menüler\Sushi Set Menüler - Moriawase Set (20 Pcs).jpg"                  = "moriawase-set.jpg"
  "Sushi Set Menüler\Sushi Set Menüler - İstanbul Set (32 Pcs.).jpg"                  = "istanbul-set.jpg"
  "Sushi Set Menüler\Sushi Set Menüler - Lucky Set.png"                               = "lucky-set.png"
  "Sushi Set Menüler\Sushi Set Menüler - Chicken Lovers (40 Pcs).png"                 = "chicken-lovers.png"
  "Sushi Set Menüler\Sushi Set Menüler - Lucky Prestige Roll Set (56 Pcs).jpeg"       = "lucky-prestige-roll-set.jpeg"
  "Sushi Set Menüler\Sushi Set Menüler - California Sushi Set (16 Pcs).jpeg"          = "california-sushi-set.jpeg"
  "Sushi Set Menüler\Sushi Set Menüler - Philadelphia Sushi Set (16 Pcs).jpeg"        = "philadelphia-sushi-set.jpeg"
  "Sushi Set Menüler\Sushi Set Menüler - Sakura Maki Set (40 Pcs).png"                = "sakura-maki-set.png"

  # Çorba & Ramen
  "Çorba & Ramen\Çorba & Ramen - Acılı Ekşili Çorba.jpg"           = "hot-sour-soup.jpg"
  "Çorba & Ramen\Çorba & Ramen - Miso Çorbası.jpg"                  = "miso-soup.jpg"
  "Çorba & Ramen\Çorba & Ramen - Karidesli Ramen.jpg"               = "shrimp-ramen.jpg"
  "Çorba & Ramen\Çorba & Ramen - Etli Ramen.jpg"                    = "beef-ramen.jpg"
  "Çorba & Ramen\Çorba & Ramen - Tavuklu Ramen.jpg"                 = "chicken-ramen.jpg"
  "Çorba & Ramen\Çorba & Ramen - Sebze Çorbası.jpg"                 = "vegetable-soup.jpg"
  "Çorba & Ramen\Çorba & Ramen - Tavuklu Mısır Çorbası.jpg"         = "chicken-corn-soup.jpg"
  "Çorba & Ramen\Çorba & Ramen - Tavuklu Udon Çorbası.jpeg"         = "chicken-udon-soup.jpeg"
  "Çorba & Ramen\Çorba & Ramen - Etli Udon Çorbası.jpeg"            = "beef-udon-soup.jpeg"
  "Çorba & Ramen\Çorba & Ramen - Karidesli Udon Çorbası.jpeg"       = "shrimp-udon-soup.jpeg"
  "Çorba & Ramen\Çorba & Ramen - Tom Yum Çorbası.png"               = "tom-yum.png"
  "Çorba & Ramen\Çorba & Ramen - Sebzeli Ramen.jpeg"                = "vegetable-ramen.jpeg"

  # Başlangıç
  "Başlangıç\Başlangıç - Steamed Dumplig (4 Adet).jpg"              = "steamed-dumpling.jpg"
  "Başlangıç\Başlangıç - Dana Etli Gyoza.jpg"                       = "beef-gyoza.jpg"
  "Başlangıç\Başlangıç - Shanghai Mantı Tabağı (6 Pcs.).jpg"        = "shanghai-dumplings.jpg"
  "Başlangıç\Başlangıç - Dynamite Shrimp (6 Adet).jpg"              = "dynamite-shrimp.jpg"
  "Başlangıç\Başlangıç - Edamame.jpg"                               = "edamame.jpg"
  "Başlangıç\Başlangıç - Chili Garlic Soslu Edamame.jpg"            = "chili-edamame.jpg"
  "Başlangıç\Başlangıç - Teryaki Soslu Edemame.jpg"                 = "teriyaki-edamame.jpg"
  "Başlangıç\Başlangıç - Çıtır Tavuk.jpg"                           = "crispy-chicken.jpg"
  "Başlangıç\Başlangıç - Sebzeli Çin Böreği ( Spring Rolls ) 2.Pcs.jpg" = "spring-rolls.jpg"
  "Başlangıç\Başlangıç - Prown Cracers ( Karides Cips).jpg"         = "prawn-crackers.jpg"
  "Başlangıç\Başlangıç - Karides Shots (3 Pcs ).jpg"                = "shrimp-shots.jpg"
  "Başlangıç\Başlangıç - Dynamite Chicken.jpg"                      = "dynamite-chicken.jpg"
  "Başlangıç\Başlangıç - Tempura Karides (Pcs.).jpg"                = "shrimp-tempura.jpg"

  # Special Roll
  "Special Roll\Special Roll - California Roll (8 Pcs).jpg"         = "california-roll.jpg"
  "Special Roll\Special Roll - California (4 Pcs).jpg"              = "california-4.jpg"
  "Special Roll\Special Roll - Philadelphia Roll (8 Pcs).jpg"       = "philly-roll.jpg"
  "Special Roll\Special Roll - Philladelphia (4 Pcs).jpg"           = "philly-4.jpg"
  "Special Roll\Special Roll - Green Dragon Roll (8 Pcs).jpg"       = "green-dragon-roll.jpg"
  "Special Roll\Special Roll - Crazy Salmon Roll (8 Pcs).jpg"       = "crazy-salmon-roll.jpg"
  "Special Roll\Special Roll - Crazy Tuna Roll (8 Pcs).jpg"         = "crazy-tuna-roll.jpg"
  "Special Roll\Special Roll - Ebi Tempura Roll (8 Pcs).jpg"        = "ebi-tempura-roll.jpg"
  "Special Roll\Special Roll - Somon Tempura Roll (8 Pcs).jpg"      = "salmon-tempura-roll.jpg"
  "Special Roll\Special Roll - Calamar Tempura Roll (8 Pcs).jpg"    = "calamari-tempura-roll.jpg"
  "Special Roll\Special Roll - Canadian Roll ( 8 Pcs).jpg"          = "canadian-roll.jpg"
  "Special Roll\Special Roll - Dragon Roll (8 Pcs).jpg"             = "dragon-roll.jpg"
  "Special Roll\Special Roll - Dynamite Karides Roll (8 Pcs).jpg"   = "dynamite-karides-roll.jpg"
  "Special Roll\Special Roll - Crazy Philadelphia Roll (8 Pcs).jpg" = "crazy-philly-roll.jpg"
  "Special Roll\Special Roll - Philly Roll (8 Pcs).jpg"             = "philly-tuna-roll.jpg"
  "Special Roll\Special Roll - Raınbow Roll (8 Pcs).jpg"            = "rainbow-roll.jpg"
  "Special Roll\Special Roll - Vegan Roll.jpg"                      = "vegan-roll.jpg"
  "Special Roll\Special Roll - Grabi Roll.jpeg"                     = "grabi-roll.jpeg"
  "Special Roll\Special Roll - Chicken California Roll.jpeg"        = "chicken-california-roll.jpeg"
  "Special Roll\Special Roll - Dynamite Ckicken Roll.png"           = "dynamite-chicken-roll.png"
  "Special Roll\Special Roll - Wakame Roll.jpeg"                    = "wakame-roll.jpeg"
  "Special Roll\Special Roll - Osaka Roll.jpeg"                     = "osaka-roll.jpeg"

  # Crunchy Roll
  "Crunchy Roll\Crunchy Roll - Crispy Crunchy California (8 Pcs).jpg"    = "crispy-crunchy-california.jpg"
  "Crunchy Roll\Crunchy Roll - Crispy Crunchy Philadelphia (8 Pcs).jpg"  = "crispy-crunchy-philadelphia.jpg"
  "Crunchy Roll\Crunchy Roll - Crispy Crunchy Shrimp (8 Pcs).jpg"        = "crispy-crunchy-shrimp.jpg"
  "Crunchy Roll\Crunchy Roll - Crispy Crunchy Dragon (8 Pcs).jpg"        = "crispy-crunchy-dragon.jpg"

  # Magic Maki
  "Magic Maki\Magic Maki - Kani Maki (8 Pcs).jpg"             = "kani-maki.jpg"
  "Magic Maki\Magic Maki - Sake Maki (8 Pcs).jpg"             = "sake-maki.jpg"
  "Magic Maki\Magic Maki - Kappa Maki (8 Pcs).jpg"            = "kappa-maki.jpg"
  "Magic Maki\Magic Maki - Avokado Sake Maki (8 Pcs).jpg"     = "avocado-sake-maki.jpg"
  "Magic Maki\Magic Maki - Ebi Maki (8 Pcs).jpg"              = "ebi-maki.jpg"
  "Magic Maki\Magic Maki - Avokado Maki (8 Pcs).jpg"          = "avocado-maki.jpg"
  "Magic Maki\Magic Maki - Spicy Tuna Maki (8 Pcs).jpg"       = "spicy-tuna-maki.jpg"

  # Nigiri
  "Nigiri\Nigiri - Sake Nigiri (2 Pcs).jpg"          = "sake-nigiri.jpg"
  "Nigiri\Nigiri - Unagi Nigiri (2 Pcs).jpg"         = "unagi-nigiri.jpg"
  "Nigiri\Nigiri - Ebi Nigiri (2 Pcs ).jpg"          = "ebi-nigiri.jpg"
  "Nigiri\Nigiri - Suzuki Nigiri (2 Pcs).jpg"        = "sea-bass-nigiri.jpg"

  # Sashimi
  "Sashimi (4 Pcs)\Sashimi (4 Pcs) - Sake Sashimi (4 Pcs).jpg"       = "sake-sashimi.jpg"
  "Sashimi (4 Pcs)\Sashimi (4 Pcs) - Tataki Salmon Sashimi.jpg"      = "tataki-salmon.jpg"
  "Sashimi (4 Pcs)\Sashimi (4 Pcs) - Ebi Sashimi.jpg"                = "ebi-sashimi.jpg"
  "Sashimi (4 Pcs)\Sashimi (4 Pcs) - Unagi Sashimi.jpg"              = "unagi-sashimi.jpg"
  "Sashimi (4 Pcs)\Sashimi (4 Pcs) - Tuna Sashimi.jpg"               = "tuna-sashimi.jpg"
  "Sashimi (4 Pcs)\Sashimi (4 Pcs) - Levrek Sashimi.jpg"             = "sea-bass-sashimi.jpg"

  # Deniz Ürünleri
  "Deniz Ürünleri\Deniz Ürünleri - Tatlı Ekşi Soslu Karides.png"      = "sweet-sour-shrimp.png"
  "Deniz Ürünleri\Deniz Ürünleri - Acılı Kalamar.jpeg"                = "spicy-calamari.jpeg"
  "Deniz Ürünleri\Deniz Ürünleri - Karışık Sebzeli Karides.jpeg"      = "mixed-vegetable-shrimp.jpeg"
  "Deniz Ürünleri\Deniz Ürünleri - Acı Soslu Karides.jpeg"            = "spicy-shrimp.jpeg"
  "Deniz Ürünleri\Deniz Ürünleri - Tatlı Ekşi Soslu Somon.jpeg"       = "sweet-sour-salmon.jpeg"
  "Deniz Ürünleri\Deniz Ürünleri - Teriyaki Soslu Somon.jpeg"         = "teriyaki-salmon.jpeg"

  # Udon Noodle
  "Udon Noodle\Udon Noodle - Etli Udon Noodle.jpeg"      = "beef-udon-noodle.jpeg"
  "Udon Noodle\Udon Noodle - Tavuklu Udon Noodle.jpeg"   = "chicken-udon-noodle.jpeg"
  "Udon Noodle\Udon Noodle - Karidesli Udon Noodle.jpeg" = "shrimp-udon-noodle.jpeg"
  "Udon Noodle\Udon Noodle - Sebzeli Udon Noodle.jpeg"   = "vegetable-udon-noodle.jpeg"

  # Noodle
  "Noodle\Noodle - Sebzeli Noodle.jpg"                           = "vegetable-noodle.jpg"
  "Noodle\Noodle - Tavuklu Noodle.jpg"                           = "chicken-noodle.jpg"
  "Noodle\Noodle - Etli Noodle.jpg"                              = "beef-noodle.jpg"
  "Noodle\Noodle - Karidesli Noodle.jpg"                         = "shrimp-noodle.jpg"
  "Noodle\Noodle - Singapur Noodle.jpg"                          = "singapore-noodle.jpg"
  "Noodle\Noodle - Kalamar Noodle.jpg"                           = "calamari-noodle.jpg"
  "Noodle\Noodle - Deniz Mahsülleri Noodle.jpg"                  = "seafood-noodle.jpg"
  "Noodle\Noodle - Teriyaki Soslu Brokolili Etli Noodle.jpg"     = "teriyaki-beef-noodle.jpg"

  # Pad Thai
  "Pad Thai\Pad Thai - Pad Thai Chicken.jpg"   = "pad-thai-chicken.jpg"
  "Pad Thai\Pad Thai - Pad Thai Dana.jpg"      = "pad-thai-beef.jpg"
  "Pad Thai\Pad Thai - Pad Thai Karides.jpg"   = "pad-thai-shrimp.jpg"
  "Pad Thai\Pad Thai - Pad Thai Sebzeli.jpg"   = "pad-thai-vegetable.jpg"

  # Poke Bowl
  "Poke Bowl\Poke Bowl - Poke Bowl Shrimp.jpg"             = "poke-shrimp.jpg"
  "Poke Bowl\Poke Bowl - Salmon Poke Bowl.jpg"             = "poke-salmon.jpg"
  "Poke Bowl\Poke Bowl - Maguro Poke Bowl.jpg"             = "poke-tuna.jpg"
  "Poke Bowl\Poke Bowl - Vegetarian Poke Bowl.jpeg"        = "poke-vegetarian.jpeg"
  "Poke Bowl\Poke Bowl - Salmon Tempura Poke Bowl.jpeg"    = "poke-salmon-tempura.jpeg"
  "Poke Bowl\Poke Bowl - Ckicken Poke Bowl.jpeg"           = "poke-chicken.jpeg"
  "Poke Bowl\Poke Bowl - Grabi Poke Bowl.jpeg"             = "poke-grabi.jpeg"
  "Poke Bowl\Poke Bowl - Tso Poke Bowl.jpeg"               = "poke-tso.jpeg"

  # Kırmızı Et
  "Kırmızı Et\Kırmızı Et - Tatlı Ekşi Soslu Dana Eti.jpg"     = "sweet-sour-beef.jpg"
  "Kırmızı Et\Kırmızı Et - Mançuryan Usulü Dana Eti.jpg"      = "manchurian-beef.jpg"
  "Kırmızı Et\Kırmızı Et - Brokolili Dana Eti.jpg"            = "beef-broccoli.jpg"
  "Kırmızı Et\Kırmızı Et - Karışık Sebzeli Dana Eti.jpg"      = "mixed-vegetable-beef.jpg"
  "Kırmızı Et\Kırmızı Et - Yeşil Biberli Dana Eti.jpg"        = "green-pepper-beef.jpg"

  # Beyaz Et
  "Beyaz Et\Beyaz Et - Brokoli Tavuk.jpg"               = "chicken-broccoli.jpg"
  "Beyaz Et\Beyaz Et - General Tso.jpg"                 = "general-tso.jpg"
  "Beyaz Et\Beyaz Et - Mancuryan Usulü Tavuk.jpg"       = "manchurian-chicken.jpg"
  "Beyaz Et\Beyaz Et - Tatlı Ekşi Soslu Tavuk.jpg"      = "sweet-sour-chicken.jpg"
  "Beyaz Et\Beyaz Et - Acı Biberli Tavuk.jpg"           = "spicy-pepper-chicken.jpg"
  "Beyaz Et\Beyaz Et - Teriyaki Soslu Tavuk.jpg"        = "teriyaki-chicken.jpg"
  "Beyaz Et\Beyaz Et - Moğol Usulü Tavuk.jpg"           = "mongolian-chicken.jpg"

  # Pilav
  "Pilav\Pilav - Sebzeli Yumurtalı Pilav.png"   = "egg-fried-rice.png"
  "Pilav\Pilav - Tavuklu Pilav.jpg"             = "chicken-fried-rice.jpg"
  "Pilav\Pilav - Etli Pilav.jpg"                = "beef-fried-rice.jpg"
  "Pilav\Pilav - Karidesli Pilav.jpg"           = "shrimp-fried-rice.jpg"
  "Pilav\Pilav - Stim Rice.jpg"                 = "steamed-rice.jpg"

  # Salads
  "Salads\Salads - Çin Salatası.jpg"          = "chinese-salad.jpg"
  "Salads\Salads - Acı Lahana Salatası.jpg"   = "spicy-cabbage-salad.jpg"
  "Salads\Salads - Wakame Salad.jpeg"         = "wakame-salad.jpeg"

  # Sebze Yemeği
  "Sebze Yemeği\Sebze Yemeği - Sarımsak Soslu Brokoli.jpg"  = "garlic-broccoli.jpg"
  "Sebze Yemeği\Sebze Yemeği - Karışık Sebze.jpg"           = "mixed-vegetables.jpg"

  # Tatlı
  "Tatlı\Tatlı - Kızarmış Ananas.jpeg"      = "fried-pineapple.jpeg"
  "Tatlı\Tatlı - Kızarmış Dondurma.jpeg"   = "fried-ice-cream.jpeg"
  "Tatlı\Tatlı - Nutella Roll.jpeg"         = "nutella-roll.jpeg"
  "Tatlı\Tatlı - Kızarmış Muz.jpeg"         = "fried-banana.jpeg"

  # Sos
  "Sos\Sos - Dynamite Sos.jpg"       = "sauce-dynamite.jpg"
  "Sos\Sos - Sweet Chili Sos.jpg"    = "sauce-sweet-chili.jpg"
  "Sos\Sos - Sriracha Sos.jpg"       = "sauce-sriracha.jpg"
  "Sos\Sos - Wasabi.jpg"             = "sauce-wasabi.jpg"

  # İçecek
  "İçecek\İçecek - Pepsi Cola (330).png"              = "pepsi.png"
  "İçecek\İçecek - Coca Cola (330 Ml).jpg"            = "coca-cola.jpg"
  "İçecek\İçecek - Fanta (330 Ml).jpg"                = "fanta.jpg"
  "İçecek\İçecek - Su (330 Ml).jpg"                   = "water.jpg"
  "İçecek\İçecek - Soda (200 Ml).jpg"                 = "soda.jpg"

  # Bento (if images exist — use sushi set folder placeholder)
}

$copied = 0
$missing = 0

foreach ($entry in $map.GetEnumerator()) {
  $src = Join-Path $srcRoot $entry.Key
  $dst = Join-Path $dstRoot $entry.Value

  if (Test-Path $src) {
    Copy-Item $src $dst -Force
    Write-Host "✅ $($entry.Value)"
    $copied++
  } else {
    Write-Host "⚠️  NOT FOUND: $($entry.Key)" -ForegroundColor Yellow
    $missing++
  }
}

Write-Host ""
Write-Host "Done: $copied copied, $missing missing" -ForegroundColor Cyan
