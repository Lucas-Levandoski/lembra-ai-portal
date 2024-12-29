import { CountBookingsByStatus } from 'Bookings';
import { getCountByStatus } from 'Bookings/services';
import { AllEvents } from 'Events/models';
import { useEffect, useState } from 'react';


export function useEvents() {
  const [selectedTab, setSelectedTab] = useState('');
  const [counts, setCounts] = useState<CountBookingsByStatus>({ 'no-show': 0, booked: 0, canceled: 0, rescheduled: 0, show: 0 });
  const [events, setEvents] = useState<AllEvents>({ 'no-show': [], booked: [], canceled: [], rescheduled: [], show: []});

  useEffect(() => {
    getEvents();
  }, []);

  const onSelectTab = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const getEvents = async () => {
    await getCountByStatus().then(setCounts);
  };

  return {
    selectedTab,
    onSelectTab,
    events,
    counts,
  };
}