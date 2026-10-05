'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import SaudiRiyalIcon from './SaudiRiyalIcon';

export default function CurrencySwitcher() {
  const { currency, changeCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentCurrencyObj = currencies.find((c) => c.code === currency) || currencies[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const renderSymbol = (code, symbol) => {
    if (code === 'SAR') {
      return <SaudiRiyalIcon style={{ width: '13px', height: '13px' }} />;
    }
    return symbol;
  };

  return (
    <div className="header__currency-container" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current Currency: ${currency}`}
        aria-expanded={isOpen}
        className="header__currency-btn"
      >
        <span className="header__currency-symbol" aria-hidden="true">
          {renderSymbol(currentCurrencyObj.code, currentCurrencyObj.symbol)}
        </span>
        <span className="header__currency-code">{currency}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`header__currency-chevron ${isOpen ? 'open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="header__currency-menu" role="menu">
          <div className="header__currency-header">
            Döviz / Currency
          </div>
          <div className="header__currency-list">
            {currencies.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    changeCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`header__currency-item ${isSelected ? 'active' : ''}`}
                >
                  <div className="header__currency-item-left">
                    <span className="header__currency-icon-badge" aria-hidden="true">
                      {renderSymbol(c.code, c.symbol)}
                    </span>
                    <span className="header__currency-item-code">{c.code}</span>
                    <span className="header__currency-item-name">{c.label}</span>
                  </div>
                  {isSelected && <span className="header__currency-check" aria-hidden="true">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
