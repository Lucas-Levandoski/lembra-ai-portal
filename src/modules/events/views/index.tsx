'use client';

import { CirclingFourDotsLoading, Tabs } from 'Common';
import { NextEvents } from 'Events/components';
import { useEvents } from 'Events/hooks';

export function EventsView() {
  const { isLoading, events, selectedTab, counts, onSelectTab } = useEvents();

  return (
    <div className="flex flex-col gap-5 p-5 shadow-lg rounded-lg">
      <h1>Lembretes de eventos</h1>

      {
        isLoading 
          ? <CirclingFourDotsLoading />
          : (
            <Tabs
              selectedId={selectedTab} 
              onChangeTab={(id) => onSelectTab(id)}
              items={[
                {
                  id: 'booked',
                  label: `Próximos (${counts.booked})`,
                  content: <NextEvents events={events.booked} />
                },
                {
                  id: 'canceled',
                  label: `Cancelados (${counts.canceled})`,
                  content: (
                    <div>
                      booked 
                    </div>
                  )
                },
                {
                  id: 'past',
                  label: `Passados (${counts.show + counts['no-show']})`,
                  content: (
                    <div>
                      booked 
                    </div>
                  )
                }
              ]} />
          )
      }

    </div>
  );
}