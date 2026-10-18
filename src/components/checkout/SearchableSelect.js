'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { FaChevronDown, FaMagnifyingGlass, FaCheck, FaXmark } from 'react-icons/fa6';

export default function SearchableSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Seçiniz...',
  searchPlaceholder = 'Listede ara...',
  emptyMessage = 'Sonuç bulunamadı',
  disabled = false,
  required = false,
  isRtl = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listboxRef = useRef(null);
  const selectId = useId();

  // Selected option display text
  const selectedOption = options.find((opt) => opt.value === value);

  // Filtered options based on search query
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase().trim())
  );

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlightedIndex(0);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keep highlighted item in view
  useEffect(() => {
    if (isOpen && listboxRef.current && listboxRef.current.children[highlightedIndex]) {
      const activeEl = listboxRef.current.children[highlightedIndex];
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          onChange(filteredOptions[highlightedIndex].value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`searchable-select-wrap ${disabled ? 'disabled' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: '0.85rem',
        textAlign: isRtl ? 'right' : 'left',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {label && (
        <label
          id={`${selectId}-label`}
          style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#a3a3a3',
            marginBottom: '0.35rem',
            letterSpacing: '0.02em',
          }}
        >
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}

      {/* Button trigger */}
      <button
        type="button"
        id={selectId}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${selectId}-label ${selectId}` : selectId}
        style={{
          width: '100%',
          minHeight: '46px',
          padding: '0.65rem 0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          backgroundColor: '#171717',
          border: isOpen ? '1.5px solid #eab308' : '1px solid #333333',
          borderRadius: '8px',
          color: selectedOption ? '#f5f5f5' : '#737373',
          fontSize: '0.92rem',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          boxShadow: isOpen ? '0 0 0 3px rgba(234, 179, 8, 0.15)' : 'none',
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: selectedOption ? 500 : 400,
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <FaChevronDown
          size={12}
          style={{
            color: '#9ca3af',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#1f1f1f',
            border: '1px solid #3b3b3b',
            borderRadius: '8px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.65)',
            overflow: 'hidden',
          }}
        >
          {/* Search box inside dropdown */}
          <div
            style={{
              padding: '0.5rem',
              borderBottom: '1px solid #2d2d2d',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaMagnifyingGlass
              size={13}
              style={{
                position: 'absolute',
                [isRtl ? 'right' : 'left']: '0.9rem',
                color: '#737373',
                pointerEvents: 'none',
              }}
            />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              style={{
                width: '100%',
                padding: '0.45rem 1.8rem',
                backgroundColor: '#121212',
                border: '1px solid #333333',
                borderRadius: '6px',
                color: '#f5f5f5',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  [isRtl ? 'left' : 'right']: '0.9rem',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <FaXmark size={12} />
              </button>
            )}
          </div>

          {/* Listbox */}
          <ul
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              margin: 0,
              padding: '0.35rem 0',
              listStyle: 'none',
            }}
          >
            {filteredOptions.length === 0 ? (
              <li
                style={{
                  padding: '0.75rem 1rem',
                  color: '#737373',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                }}
              >
                {emptyMessage}
              </li>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    style={{
                      padding: '0.6rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      color: isSelected ? '#eab308' : isHighlighted ? '#ffffff' : '#d4d4d4',
                      backgroundColor: isHighlighted ? '#2a2a2a' : 'transparent',
                      fontWeight: isSelected ? 600 : 400,
                      transition: 'background-color 0.1s ease',
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <FaCheck size={12} style={{ color: '#eab308' }} />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
