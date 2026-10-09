'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { branchesData, DEFAULT_BRANCH_ID } from '@/data/branchesData';

const BranchContext = createContext(null);

const BRANCH_STORAGE_KEY = 'lucky_selected_branch_id_v2';

export function BranchProvider({ children }) {
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load selected branch from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BRANCH_STORAGE_KEY);
      if (saved && branchesData.some((b) => b.id === saved)) {
        setSelectedBranchId(saved);
      }
    } catch (_) {}
    setIsLoaded(true);
  }, []);

  // Save selected branch to localStorage
  const selectBranch = useCallback((branchId) => {
    if (!branchId) return;
    const exists = branchesData.some((b) => b.id === branchId);
    if (!exists) return;
    
    setSelectedBranchId(branchId);
    try {
      localStorage.setItem(BRANCH_STORAGE_KEY, branchId);
    } catch (_) {}
    
    setIsBranchModalOpen(false);

    if (pendingCallback) {
      const cb = pendingCallback;
      setPendingCallback(null);
      setTimeout(() => {
        cb(branchesData.find((b) => b.id === branchId));
      }, 50);
    }
  }, [pendingCallback]);

  // Open the selection modal, optionally queuing an action upon selection
  const openBranchModal = useCallback((callback = null) => {
    if (typeof callback === 'function') {
      setPendingCallback(() => callback);
    } else {
      setPendingCallback(null);
    }
    setIsBranchModalOpen(true);
  }, []);

  const closeBranchModal = useCallback(() => {
    setIsBranchModalOpen(false);
    setPendingCallback(null);
  }, []);

  // Active branch object
  const selectedBranch = useMemo(() => {
    if (!selectedBranchId) return null;
    return branchesData.find((b) => b.id === selectedBranchId) || null;
  }, [selectedBranchId]);

  // Fallback branch for informational displays before choice
  const defaultBranch = useMemo(() => {
    return branchesData.find((b) => b.id === DEFAULT_BRANCH_ID) || branchesData[0];
  }, []);

  return (
    <BranchContext.Provider
      value={{
        branches: branchesData,
        selectedBranchId,
        selectedBranch,
        defaultBranch,
        isBranchSelected: Boolean(selectedBranchId),
        selectBranch,
        isBranchModalOpen,
        openBranchModal,
        closeBranchModal,
        isLoaded,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return ctx;
}
