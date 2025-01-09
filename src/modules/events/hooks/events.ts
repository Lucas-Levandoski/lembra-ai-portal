import { CountBookingsByStatus } from 'Bookings';
import { getBookingsByStatus, getCountByStatus } from 'Bookings/services';
import { AllEvents } from 'Events/models';
import { useEffect, useState } from 'react';


export function useEvents() {
  const [selectedTab, setSelectedTab] = useState('booked');
  const [counts, setCounts] = useState<CountBookingsByStatus>({ 'no-show': 0, booked: 0, canceled: 0, rescheduled: 0, show: 0, unanswered: 0 });
  const [events, setEvents] = useState<AllEvents>({ 'no-show': [], booked: [], canceled: [], rescheduled: [], show: [], unanswered: [] });
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    loadEvents();
  }, []);

  const onSelectTab = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const loadEvents = async () => {
    setIsLoading(true);

    try {
      await getCountByStatus().then(setCounts);

      await getBookingsByStatus(['no-show', 'booked', 'canceled', 'show', 'unanswered']).then(res => setEvents({...events, ...res}));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReloadAll = () => {
    loadEvents();
  };

  return {
    isLoading,
    selectedTab,
    events,
    counts,
    onSelectTab,
    handleReloadAll,
  };
}