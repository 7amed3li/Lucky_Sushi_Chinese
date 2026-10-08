export function formatPortion(portion, lang) {
  if (!portion) return '';
  const match = portion.match(/^(\d+)\s*(?:pcs|adet|قطعة|шт\.?|件)$/i);
  if (match) {
    const num = match[1];
    if (lang === 'ar') return `${num} قطعة`;
    if (lang === 'tr') return `${num} Adet`;
    if (lang === 'ru') return `${num} шт.`;
    if (lang === 'zh') return `${num}件`;
    return `${num} pcs`;
  }
  const low = portion.trim().toLowerCase();
  if (low === '1 bowl') {
    if (lang === 'ar') return 'وعاء واحد';
    if (lang === 'tr') return '1 Kase';
    if (lang === 'ru') return '1 порция';
    if (lang === 'zh') return '1碗';
    return '1 bowl';
  }
  if (low === '1 portion') {
    if (lang === 'ar') return 'وجبة واحدة';
    if (lang === 'tr') return '1 Porsiyon';
    if (lang === 'ru') return '1 порция';
    if (lang === 'zh') return '1份';
    return '1 portion';
  }
  return portion;
}
