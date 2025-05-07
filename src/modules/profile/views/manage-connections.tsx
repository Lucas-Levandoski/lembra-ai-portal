'use client';

import { Tabs } from 'Common';
import { GoogleAccount, WhatsappConnection } from 'Profile/components';
import { useConnectionsNavigation } from 'Profile/hooks';


export function ManageConnectionsView() {
  const { onChangeTab, selectedId } = useConnectionsNavigation();

  return (
    <div className="flex w-full max-w-[500px] mx-auto">
      <Tabs
        onChangeTab={onChangeTab}
        selectedId={selectedId}
        items={[
          {
            content: <WhatsappConnection key="whats"/>,
            id: 'whats',
            label: 'Whatsapp'
          },
          {
            content: <GoogleAccount key="google"/>,
            id: 'google',
            label: 'Conta Google'
          }
        ]}
      />
    </div>
  );
}