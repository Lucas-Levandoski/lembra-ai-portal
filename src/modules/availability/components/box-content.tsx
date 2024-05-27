'use client';

import { Tabs } from 'Common';
import { useEffect, useState } from 'react';
import { AvailabilityContent } from '.';
import { useAvailability } from '../hooks';

export function BoxContent() {
  const { getAvailability } = useAvailability();

  const [selectedTab, setSelectedTab] = useState('availability');

  useEffect(() => {
    getAvailability();
  }, [])

  return (
    <div>
      <Tabs 
        selectedId={selectedTab} 
        onChangeTab={(id) => setSelectedTab(id)}
        items={[{
          id: 'availability',
          label: 'Disponível (7)',
          content: (<AvailabilityContent />)
        }, {
          id: 'unvailability',
          label: 'Não disponível (0)',
          content: (<div>tab2</div> )
        }]} />

      
    </div>
  )
}