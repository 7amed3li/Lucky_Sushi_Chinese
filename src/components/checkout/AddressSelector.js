'use client';

import { useDelivery } from '@/context/DeliveryContext';
import { useBranch } from '@/context/BranchContext';
import SearchableSelect from './SearchableSelect';
import { FaLocationDot, FaCheck, FaTruckFast, FaTriangleExclamation } from 'react-icons/fa6';

export default function AddressSelector({ lang = 'tr', isRtl = false }) {
  const {
    districts,
    neighborhoods,
    districtId,
    neighborhoodId,
    streetDetails,
    validationState,
    selectDistrict,
    selectNeighborhood,
    updateStreetDetail,
  } = useDelivery();

  const { selectedBranch } = useBranch();

  const labels = {
    title: {
      tr: 'Teslimat Adresi',
      en: 'Delivery Address',
      ar: 'عنوان التوصيل',
      ru: 'Адрес доставки',
      zh: '送餐地址',
    },
    cityLabel: { tr: 'Şehir', en: 'City', ar: 'المدينة', ru: 'Город', zh: '城市' },
    districtLabel: { tr: 'İlçe', en: 'District', ar: 'المنطقة / القضاء', ru: 'Район', zh: '区/县' },
    districtPlaceholder: {
      tr: 'İlçe seçiniz...',
      en: 'Select district...',
      ar: 'اختر المنطقة...',
      ru: 'Выберите район...',
      zh: '请选择区...',
    },
    neighborhoodLabel: { tr: 'Mahalle', en: 'Neighborhood', ar: 'الحي', ru: 'Микрорайон', zh: '街区' },
    neighborhoodPlaceholder: {
      tr: 'Önce ilçe seçiniz...',
      en: 'Select neighborhood...',
      ar: 'اختر الحي...',
      ru: 'Выберите микрорайон...',
      zh: '请选择街区...',
    },
    streetLabel: { tr: 'Cadde / Sokak', en: 'Street', ar: 'الشارع', ru: 'Улица', zh: '街道' },
    streetPlaceholder: {
      tr: 'Örn: Çırçır Cd. No: 25',
      en: 'e.g. Main St. No: 25',
      ar: 'مثال: شارع رئيسي رقم 25',
      ru: 'Например: ул. Чырчыр, д. 25',
      zh: '例如: 主街25号',
    },
    buildingLabel: { tr: 'Bina No', en: 'Building No', ar: 'رقم المبنى', ru: 'Дом', zh: '楼号' },
    floorLabel: { tr: 'Kat', en: 'Floor', ar: 'الطابق', ru: 'Этаж', zh: '楼层' },
    aptLabel: { tr: 'Daire No', en: 'Apt No', ar: 'رقم الشقة', ru: 'Кв.', zh: '门牌号' },
    nameLabel: { tr: 'Ad Soyad', en: 'Full Name', ar: 'الاسم الكامل', ru: 'Имя и фамилия', zh: '姓名' },
    phoneLabel: { tr: 'Telefon Numarası', en: 'Phone Number', ar: 'رقم الهاتف', ru: 'Номер телефона', zh: '电话号码' },
    noteLabel: { tr: 'Kurye / Adres Notu', en: 'Delivery Note', ar: 'ملاحظة للسائق / العنوان', ru: 'Примечание к заказу', zh: '配送备注' },
    notePlaceholder: {
      tr: 'Zil çalışmıyor, kapıya bırakın vb.',
      en: 'Doorbell broken, leave at door, etc.',
      ar: 'الجرس معطل، اترك الطلب عند الباب إلخ.',
      ru: 'Звонок не работает и т.д.',
      zh: '门铃故障、放置门口等',
    },
    freeDeliveryBadge: {
      tr: 'Ücretsiz Teslimat',
      en: 'Free Delivery',
      ar: 'توصيل مجاني',
      ru: 'Бесплатная доставка',
      zh: '免费配送',
    },
    servicedBy: {
      tr: 'servis eder',
      en: 'servicing branch',
      ar: 'الفرع المخدّم',
      ru: 'обслуживает',
      zh: '负责配送',
    },
    unsupportedZone: {
      tr: 'Bu mahalleye henüz doğrudan paket servisimiz bulunmamaktadır.',
      en: 'We do not yet deliver to this specific neighborhood directly.',
      ar: 'لا تتوفر خدمة التوصيل المباشر لهذا الحي حالياً.',
      ru: 'В данный микрорайон доставка пока не осуществляется.',
      zh: '该街区暂未开通外送服务。',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.tr || '';

  // Format districts for SearchableSelect
  const districtOptions = districts.map((d) => ({
    value: d.id,
    label: d[`name_${lang}`] || d.name_tr,
  }));

  // Format neighborhoods for SearchableSelect
  const neighborhoodOptions = neighborhoods.map((n) => ({
    value: n.id,
    label: n.name_tr,
  }));

  return (
    <div
      className="address-selector-container"
      style={{
        marginTop: '1rem',
        marginBottom: '1rem',
        textAlign: isRtl ? 'right' : 'left',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          marginBottom: '0.75rem',
        }}
      >
        <FaLocationDot style={{ color: '#eab308' }} size={15} />
        <span
          style={{
            fontSize: '0.84rem',
            fontWeight: 700,
            color: '#a3a3a3',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {l('title')}
        </span>
      </div>

      {/* Row 1: City (Locked) & District */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '0.65rem',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('cityLabel')}
          </label>
          <input
            type="text"
            value="İstanbul"
            disabled
            style={{
              width: '100%',
              minHeight: '46px',
              padding: '0.65rem 0.9rem',
              backgroundColor: '#121212',
              border: '1px solid #262626',
              borderRadius: '8px',
              color: '#737373',
              fontSize: '0.9rem',
              cursor: 'not-allowed',
            }}
          />
        </div>

        <div>
          <SearchableSelect
            label={l('districtLabel')}
            options={districtOptions}
            value={districtId}
            onChange={selectDistrict}
            placeholder={l('districtPlaceholder')}
            searchPlaceholder={l('districtPlaceholder')}
            required
            isRtl={isRtl}
          />
        </div>
      </div>

      {/* Row 2: Neighborhood */}
      <SearchableSelect
        label={l('neighborhoodLabel')}
        options={neighborhoodOptions}
        value={neighborhoodId}
        onChange={selectNeighborhood}
        placeholder={
          districtId ? l('neighborhoodPlaceholder') : 'Önce ilçe seçiniz'
        }
        searchPlaceholder="Mahalle ara..."
        disabled={!districtId || neighborhoods.length === 0}
        required
        isRtl={isRtl}
      />

      {/* Zone Validation Status Banner */}
      {validationState.isValid && (
        <div
          style={{
            padding: '0.75rem 0.9rem',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            marginBottom: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCheck style={{ color: '#22c55e', flexShrink: 0 }} size={13} />
            <span style={{ fontSize: '0.82rem', color: '#f5f5f5' }}>
              <strong>{selectedBranch?.name_tr || 'Lucky Sushi'}</strong> {l('servicedBy')}
            </span>
          </div>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              backgroundColor: '#22c55e',
              color: '#000000',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <FaTruckFast size={11} /> {l('freeDeliveryBadge')}
          </span>
        </div>
      )}

      {neighborhoodId && !validationState.isValid && (
        <div
          style={{
            padding: '0.75rem 0.9rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            marginBottom: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FaTriangleExclamation style={{ color: '#ef4444', flexShrink: 0 }} size={14} />
          <span style={{ fontSize: '0.82rem', color: '#fca5a5' }}>
            {l('unsupportedZone')}
          </span>
        </div>
      )}

      {/* Row 3: Street & Building No */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2.5fr 1fr',
          gap: '0.65rem',
          marginBottom: '0.85rem',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('streetLabel')} <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={streetDetails.street}
            onChange={(e) => updateStreetDetail('street', e.target.value)}
            placeholder={l('streetPlaceholder')}
            style={{
              width: '100%',
              minHeight: '46px',
              padding: '0.65rem 0.9rem',
              backgroundColor: '#171717',
              border: '1px solid #333333',
              borderRadius: '8px',
              color: '#f5f5f5',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('buildingLabel')} <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={streetDetails.buildingNo}
            onChange={(e) => updateStreetDetail('buildingNo', e.target.value)}
            placeholder="No: 12"
            style={{
              width: '100%',
              minHeight: '46px',
              padding: '0.65rem 0.9rem',
              backgroundColor: '#171717',
              border: '1px solid #333333',
              borderRadius: '8px',
              color: '#f5f5f5',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Row 4: Floor & Apartment No */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.65rem',
          marginBottom: '0.85rem',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('floorLabel')}
          </label>
          <input
            type="text"
            value={streetDetails.floor}
            onChange={(e) => updateStreetDetail('floor', e.target.value)}
            placeholder="Kat: 3"
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '0.6rem 0.9rem',
              backgroundColor: '#171717',
              border: '1px solid #333333',
              borderRadius: '8px',
              color: '#f5f5f5',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('aptLabel')}
          </label>
          <input
            type="text"
            value={streetDetails.apartmentNo}
            onChange={(e) => updateStreetDetail('apartmentNo', e.target.value)}
            placeholder="Daire: 8"
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '0.6rem 0.9rem',
              backgroundColor: '#171717',
              border: '1px solid #333333',
              borderRadius: '8px',
              color: '#f5f5f5',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Row 5: Name & Phone */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.65rem',
          marginBottom: '0.85rem',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('nameLabel')} <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={streetDetails.name}
            onChange={(e) => updateStreetDetail('name', e.target.value)}
            placeholder="Ad Soyad"
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '0.6rem 0.9rem',
              backgroundColor: '#171717',
              border: '1px solid #333333',
              borderRadius: '8px',
              color: '#f5f5f5',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#a3a3a3',
              marginBottom: '0.35rem',
            }}
          >
            {l('phoneLabel')} <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="tel"
            value={streetDetails.phone}
            onChange={(e) => updateStreetDetail('phone', e.target.value)}
            placeholder="05xx xxx xx xx"
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '0.6rem 0.9rem',
              backgroundColor: '#171717',
              border: '1px solid #333333',
              borderRadius: '8px',
              color: '#f5f5f5',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Row 6: Delivery Note */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#a3a3a3',
            marginBottom: '0.35rem',
          }}
        >
          {l('noteLabel')}
        </label>
        <input
          type="text"
          value={streetDetails.note}
          onChange={(e) => updateStreetDetail('note', e.target.value)}
          placeholder={l('notePlaceholder')}
          style={{
            width: '100%',
            minHeight: '44px',
            padding: '0.6rem 0.9rem',
            backgroundColor: '#171717',
            border: '1px solid #333333',
            borderRadius: '8px',
            color: '#f5f5f5',
            fontSize: '0.88rem',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}
