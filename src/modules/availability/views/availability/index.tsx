'use client';

import { BoxContent } from 'Availability';

export function AvailabilityView() {
  return(
    <div className="shadow-lg bg-white rounded-2xl p-6">
      <h1>Disponibilidade</h1>
      <div>
        <BoxContent />
      </div>
    </div>
  );
}