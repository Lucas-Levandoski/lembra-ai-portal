'use client';

import { BoxContent } from 'Availability';
import { getSchedules } from 'modules/availability/services/scheduler';

export function AvailabilityView() {
  getSchedules();

  return(
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1>Disponibilidade</h1>
      <div>
        <BoxContent />
      </div>
    </div>
  )
}