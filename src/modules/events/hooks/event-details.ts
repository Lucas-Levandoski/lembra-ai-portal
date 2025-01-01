import { EventDetails } from 'Events/models';
import { useState } from 'react';


export function useEventDetails(events: EventDetails[]) {
  const [isOpen, setIsOpen] = useState<boolean[]>(new Array(events.length).fill(false));
  const [refresh, setRefresh] = useState(false);

  const onToggle = (id: number, status: boolean) => {
    isOpen[id] = status;

    setIsOpen(isOpen);
    setRefresh(!refresh);
  };

  return {
    isOpen,
    onToggle,
  };
}