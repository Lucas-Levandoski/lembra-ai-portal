'use client';

import { cancelEvent } from 'Bookings/services';
import { useState } from 'react';


export function useOnOwnerCancel(onReloadAll = () => {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string>();

  const handleCancellation = (_bookingId?: string) => {
    if(_bookingId) setBookingId(_bookingId);
    setIsOpen(true);
  };

  const handleConfirmCancellation = async (_bookingId?: string) => {
    setIsLoading(true);

    try {
      const id = bookingId || _bookingId;

      if(id)
        await cancelEvent(id, 'Evento cancelado pelo proprietário');
      else
        console.error('Missing bookingId on cancelEvent method');

    } finally {
      setIsOpen(false);
      setIsLoading(false);
      onReloadAll();
    }
  };

  const handleCancelCancellation = () => {
    setIsOpen(false);
  };

  return {
    isLoading,
    isOpen,
    handleCancelCancellation,
    handleCancellation,
    handleConfirmCancellation,
  };
}