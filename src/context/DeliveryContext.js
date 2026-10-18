'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getDistricts, getNeighborhoods, validateDeliveryAddress } from '@/services/deliveryZoneService';
import { useBranch } from './BranchContext';

const DeliveryContext = createContext(null);

const DELIVERY_STORAGE_KEY = 'lucky_customer_address_v2';

export function DeliveryProvider({ children }) {
  const { selectBranch, selectedBranchId } = useBranch();

  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState('');
  const [neighborhoodId, setNeighborhoodId] = useState('');
  const [neighborhoods, setNeighborhoods] = useState([]);

  // Free-text detailed fields
  const [streetDetails, setStreetDetails] = useState({
    name: '',
    street: '',
    buildingNo: '',
    floor: '',
    apartmentNo: '',
    note: '',
    phone: '',
  });

  const [validationState, setValidationState] = useState({
    isValid: false,
    reason: null,
    branchId: null,
    neighborhoodName: '',
    minOrderTl: 500,
    deliveryFeeTl: 0,
  });

  const [isLoadingZones, setIsLoadingZones] = useState(true);

  // Load districts on mount
  useEffect(() => {
    let mounted = true;
    getDistricts().then((list) => {
      if (mounted) {
        setDistricts(list);
        setIsLoadingZones(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Load saved address from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DELIVERY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.districtId) setDistrictId(parsed.districtId);
        if (parsed.neighborhoodId) setNeighborhoodId(parsed.neighborhoodId);
        if (parsed.streetDetails) {
          setStreetDetails((prev) => ({ ...prev, ...parsed.streetDetails }));
        }
      }
    } catch (_) {}
  }, []);

  // Update neighborhoods list whenever district changes
  useEffect(() => {
    if (!districtId) {
      setNeighborhoods([]);
      return;
    }
    let mounted = true;
    getNeighborhoods(districtId).then((list) => {
      if (mounted) {
        setNeighborhoods(list);
      }
    });
    return () => {
      mounted = false;
    };
  }, [districtId]);

  // Validate address and reconcile branch whenever district or neighborhood changes
  useEffect(() => {
    if (!districtId || !neighborhoodId) {
      setValidationState({
        isValid: false,
        reason: 'INCOMPLETE',
        branchId: null,
        neighborhoodName: '',
        minOrderTl: 500,
        deliveryFeeTl: 0,
      });
      return;
    }

    let mounted = true;
    validateDeliveryAddress(districtId, neighborhoodId).then((result) => {
      if (mounted) {
        setValidationState(result);

        // Auto-align fulfilling branch if valid
        if (result.isValid && result.branchId && result.branchId !== selectedBranchId) {
          selectBranch(result.branchId);
        }

        // Save valid address to localStorage
        if (result.isValid) {
          try {
            localStorage.setItem(
              DELIVERY_STORAGE_KEY,
              JSON.stringify({
                districtId,
                neighborhoodId,
                neighborhoodName: result.neighborhoodName,
                streetDetails,
              })
            );
          } catch (_) {}
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [districtId, neighborhoodId, selectBranch, selectedBranchId, streetDetails]);

  // Handle setting district (resets neighborhood if changed)
  const handleSelectDistrict = useCallback((newDistrictId) => {
    setDistrictId(newDistrictId);
    setNeighborhoodId('');
  }, []);

  // Handle setting neighborhood
  const handleSelectNeighborhood = useCallback((newNeighborhoodId) => {
    setNeighborhoodId(newNeighborhoodId);
  }, []);

  // Handle updating text fields
  const updateStreetDetail = useCallback((field, val) => {
    setStreetDetails((prev) => {
      const updated = { ...prev, [field]: val };
      try {
        localStorage.setItem(
          DELIVERY_STORAGE_KEY,
          JSON.stringify({
            districtId,
            neighborhoodId,
            streetDetails: updated,
          })
        );
      } catch (_) {}
      return updated;
    });
  }, [districtId, neighborhoodId]);

  const value = useMemo(
    () => ({
      districts,
      neighborhoods,
      districtId,
      neighborhoodId,
      streetDetails,
      validationState,
      isLoadingZones,
      selectDistrict: handleSelectDistrict,
      selectNeighborhood: handleSelectNeighborhood,
      updateStreetDetail,
    }),
    [
      districts,
      neighborhoods,
      districtId,
      neighborhoodId,
      streetDetails,
      validationState,
      isLoadingZones,
      handleSelectDistrict,
      handleSelectNeighborhood,
      updateStreetDetail,
    ]
  );

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>;
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return ctx;
}
