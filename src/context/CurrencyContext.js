'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import SaudiRiyalIcon from '@/components/SaudiRiyalIcon';

const CurrencyContext = createContext(null);

export const SUPPORTED_CURRENCIES = [
  { code: 'TRY', label: 'Türk Lirası', symbol: '₺' },
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'SAR', label: 'ريال سعودي', symbol: 'ر.س' },
  { code: 'RUB', label: 'Российский рубль', symbol: '₽' },
];

const HARDCODED_FALLBACK = {
  TRY: { symbol: '₺', rate: 1 },
  USD: { symbol: '$', rate: 0.02121 },
  EUR: { symbol: '€', rate: 0.01855 },
  GBP: { symbol: '£', rate: 0.01579 },
  RUB: { symbol: '₽', rate: 2.65 },
  SAR: { symbol: 'ر.س', rate: 0.0795 },
};

const RATES_STORAGE_KEY = 'lucky_last_rates';
const CURRENCY_STORAGE_KEY = 'lucky_currency';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function getLastKnownRates() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(RATES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.rates?.TRY) return parsed;
    }
  } catch (_) {}
  return null;
}

function saveRatesToStorage(rates, source, lastUpdated) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      RATES_STORAGE_KEY,
      JSON.stringify({ rates, source, lastUpdated, savedAt: new Date().toISOString() })
    );
  } catch (_) {}
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('TRY');
  const [exchangeRates, setExchangeRates] = useState(HARDCODED_FALLBACK);

  // Initialize currency from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
        setCurrency(saved);
      }
    } catch (_) {}

    const lastKnown = getLastKnownRates();
    if (lastKnown?.rates) {
      setExchangeRates(lastKnown.rates);
    }
  }, []);

  // Fetch live exchange rates
  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch('/api/rates');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data?.rates?.TRY) {
        setExchangeRates(data.rates);
        saveRatesToStorage(data.rates, data.source, data.lastUpdated);
      }
    } catch (err) {
      console.warn('Live rates fetch failed, using fallback/cached:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const changeCurrency = useCallback((code) => {
    if (SUPPORTED_CURRENCIES.some((c) => c.code === code)) {
      setCurrency(code);
      try {
        localStorage.setItem(CURRENCY_STORAGE_KEY, code);
      } catch (_) {}
    }
  }, []);

  const convertPrice = useCallback(
    (priceInTRY) => {
      if (priceInTRY == null) return null;
      const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency] || { rate: 1 };
      const rate = rateData.rate || 1;
      if (currency === 'TRY') {
        return priceInTRY;
      }
      if (currency === 'RUB') {
        return Math.round(priceInTRY * rate);
      }
      return Number((priceInTRY * rate).toFixed(2));
    },
    [currency, exchangeRates]
  );

  const getCurrencySymbol = useCallback(() => {
    if (currency === 'SAR') {
      return <SaudiRiyalIcon className="inline-block" />;
    }
    const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency];
    return rateData?.symbol || '₺';
  }, [currency, exchangeRates]);

  const formatPrice = useCallback(
    (priceInTRY) => {
      if (priceInTRY == null) return '';
      const converted = convertPrice(priceInTRY);
      if (currency === 'TRY') {
        return `${converted.toLocaleString('tr-TR')} ₺`;
      }
      if (currency === 'USD') {
        return `$${converted.toFixed(2)}`;
      }
      if (currency === 'EUR') {
        return `€${converted.toFixed(2)}`;
      }
      if (currency === 'GBP') {
        return `£${converted.toFixed(2)}`;
      }
      if (currency === 'RUB') {
        return `${converted.toLocaleString('ru-RU')} ₽`;
      }
      if (currency === 'SAR') {
        return `${converted.toFixed(2)} ر.س`;
      }
      return `${converted} ${currency}`;
    },
    [currency, convertPrice]
  );

  const value = {
    currency,
    changeCurrency,
    exchangeRates,
    convertPrice,
    formatPrice,
    getCurrencySymbol,
    currencies: SUPPORTED_CURRENCIES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Graceful fallback if used outside CurrencyProvider
    return {
      currency: 'TRY',
      changeCurrency: () => {},
      convertPrice: (p) => p,
      formatPrice: (p) => (p != null ? `${p} ₺` : ''),
      getCurrencySymbol: () => '₺',
      currencies: SUPPORTED_CURRENCIES,
    };
  }
  return ctx;
}
