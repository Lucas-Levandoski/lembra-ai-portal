'use client';

import { Tabs } from 'Common';
import { useEvents } from 'Events/hooks';



export function EventsView() {
  const { selectedTab, counts, onSelectTab } = useEvents();

  return (
    <div className="flex flex-col gap-5 p-5 shadow-lg rounded-lg">
      <h1>Lembretes de eventos</h1>
      <Tabs 
        selectedId={selectedTab} 
        onChangeTab={(id) => onSelectTab(id)}
        items={[
          {
            id: 'booked',
            label: `Booked (${counts.booked})`,
            content: (<div>booked content</div>)
          },
          {
            id: 'rescheduled',
            label: `Reagendados (${counts.rescheduled})`,
            content: (<div>rescheduled content</div>)
          },
          {
            id: 'canceled',
            label: `Cancelados (${counts.canceled})`,
            content: (<div>canceled content</div>)
          },
          {
            id: 'show',
            label: `Show (${counts.show})`,
            content: (<div>show content</div>)
          },
          {
            id: 'no-show',
            label: `No-Show (${counts['no-show']})`,
            content: (<div>no-show content</div>)
          }
        ]} />

    </div>
  );
}