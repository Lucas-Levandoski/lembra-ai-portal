'use client';

import { Tabs } from 'Common';
import { GoogleAccount, WhatsappConnection } from 'Profile/components';
import { useConnectionsNavigation } from 'Profile/hooks';


export function ManageConnectionsView() {
  const { onChangeTab, selectedId } = useConnectionsNavigation();

  return (
    <div className="flex flex-col gap-8">
      <Tabs 
        onChangeTab={onChangeTab}
        selectedId={selectedId}
        items={[
          {
            content: <WhatsappConnection/>,
            id: 'whats',
            label: 'Whatsapp'
          },
          {
            content: <GoogleAccount/>,
            id: 'google',
            label: 'Conta Google'
          }
        ]}
      />
    </div>
  );
}