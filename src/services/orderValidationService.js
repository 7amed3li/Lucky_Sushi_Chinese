import { menuItems } from '@/data/menuData';

/**
 * Validates cart items against current menu data to ensure fresh prices.
 * Returns { isFresh: boolean, updatedCart: Array, priceChanges: Array }
 */
export function validateCartPrices(cart) {
  let isFresh = true;
  const priceChanges = [];

  const updatedCart = cart.map((entry) => {
    const catalogItem = menuItems.find((m) => m.id === entry.item.id);
    if (!catalogItem) return entry;

    if (catalogItem.price !== entry.item.price) {
      isFresh = false;
      priceChanges.push({
        id: entry.item.id,
        name: catalogItem.name_tr || entry.item.name,
        oldPrice: entry.item.price,
        newPrice: catalogItem.price,
      });
      return {
        ...entry,
        item: {
          ...entry.item,
          price: catalogItem.price,
        },
      };
    }
    return entry;
  });

  return { isFresh, updatedCart, priceChanges };
}

/**
 * Builds the comprehensive WhatsApp order payload.
 */
export function buildWhatsAppOrderUrl({
  branch,
  cart,
  cartSubtotal,
  deliveryAddress,
  paymentMethod = 'Kapıda Nakit',
}) {
  const branchName = branch ? branch.name_tr : 'Alibeyköy (Merkez)';
  const branchBadge = branch?.badge_tr ? ` (${branch.badge_tr})` : '';

  let msg = `🍣 *Lucky Sushi & Chinese — Yeni Sipariş*\n`;
  msg += `📍 *Şube:* ${branchName}${branchBadge}\n\n`;
  msg += `📋 *Sipariş Kalemleri:*\n`;

  cart.forEach(({ item, quantity }) => {
    const trName = item.name_tr || item.name || '';
    const itemTotal = (item.price * quantity).toFixed(0);
    msg += `• ${quantity}x ${trName} — ${itemTotal} ₺\n`;
  });

  msg += `\n💵 *Ara Toplam:* ${cartSubtotal.toFixed(0)} ₺`;
  msg += `\n🛵 *Teslimat Ücreti:* ÜCRETSİZ (0 ₺)`;
  msg += `\n💳 *Ödeme Yöntemi:* ${paymentMethod}`;
  msg += `\n💰 *Genel Toplam:* ${cartSubtotal.toFixed(0)} ₺\n`;

  if (deliveryAddress) {
    msg += `\n🏠 *Teslimat Adresi:*`;
    if (deliveryAddress.name?.trim()) msg += `\n• İsim: ${deliveryAddress.name.trim()}`;
    if (deliveryAddress.phone?.trim()) msg += `\n• Telefon: ${deliveryAddress.phone.trim()}`;
    msg += `\n• Şehir: İstanbul`;
    if (deliveryAddress.district?.trim()) msg += `\n• İlçe: ${deliveryAddress.district.trim()}`;
    if (deliveryAddress.neighborhood?.trim()) msg += `\n• Mahalle: ${deliveryAddress.neighborhood.trim()}`;
    if (deliveryAddress.street?.trim()) msg += `\n• Cadde / Sokak: ${deliveryAddress.street.trim()}`;
    if (deliveryAddress.buildingNo?.trim()) msg += `\n• Bina No: ${deliveryAddress.buildingNo.trim()}`;
    if (deliveryAddress.floor?.trim()) msg += `\n• Kat: ${deliveryAddress.floor.trim()}`;
    if (deliveryAddress.apartmentNo?.trim()) msg += `\n• Daire: ${deliveryAddress.apartmentNo.trim()}`;
    if (deliveryAddress.note?.trim()) msg += `\n• Sipariş / Adres Notu: ${deliveryAddress.note.trim()}`;
  }

  const rawPhone = branch?.whatsapp || branch?.phone || '905314863404';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}
