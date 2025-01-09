'use client';

import { CirclingFourDotsLoading, Tabs } from 'Common';
import { CanceledEvents, NextEvents, PastEvents } from 'Events/components';
import { useEvents } from 'Events/hooks';

export function EventsView() {
  const { isLoading, events, selectedTab, counts, onSelectTab, handleReloadAll } = useEvents();

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
                  content: <NextEvents events={events.booked} onReloadAll={handleReloadAll} />
                },
                {
                  id: 'canceled',
                  label: `Cancelados (${counts.canceled})`,
                  content: (
                    <CanceledEvents events={events.canceled} />
                  )
                },
                {
                  id: 'past',
                  label: `Passados (${counts.show + counts['no-show'] + counts.unanswered})`,
                  content: (
                    <PastEvents events={[...events['no-show'], ...events.show, ...events.unanswered]} />
                  )
                }
              ]} />
          )
      }

    </div>
  );
}