'use client';

import { useState } from 'react';


export function useConnectionsNavigation() {
  const [selectedId, setSelectedId] = useState('whats');

  const onChangeTab = (id: string) => {
    setSelectedId(id);
  };

  return {
    selectedId,
    onChangeTab,
  };
}