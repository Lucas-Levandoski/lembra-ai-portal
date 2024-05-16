'use client';

import { Tabs } from 'Common';
import { useState } from 'react';
import { AvailabilityContent } from './availability-content';

export function BoxContent() {
  const [selectedTab, setSelectedTab] = useState('availability');

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