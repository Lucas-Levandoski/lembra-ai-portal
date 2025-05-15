'use client';

import { useEffect, useState } from 'react';
import { IGoogleConnected, isGoogleAccountConnected } from 'Common';

export function useCheckGoogleConnection() {
  const [connectionStatus, setConnectionStatus] = useState<IGoogleConnected>({
    connectedScopes: [],
    hasMissingScopes: false,
    isConnected: true,
    missingScopes: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getConnectionStatus();
  }, []);

  const getConnectionStatus = async() => {
    try {
      await isGoogleAccountConnected().then(setConnectionStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    connectionStatus,
  };
};