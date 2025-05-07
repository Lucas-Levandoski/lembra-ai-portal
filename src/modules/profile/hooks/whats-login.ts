'use client';

import { disconnectMyWhatsapp, whatsLogin } from 'Profile/services';
import { useState } from 'react';
import readStream from 'ndjson-readablestream';
import { useInitializeUser } from './initialize-user';
import { useStore } from 'Store';

export function useWhatsLogin() {
  const [qr, setQr] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { refresh } = useInitializeUser();
  const { profile } = useStore((store) => ({ profile: store.profile }));

  const onLogin = async () => {
    const response = await whatsLogin();

    if(!response) return;

    for await (const res of readStream(response)){
      if(res.qr) setQr(res.qr);
      if(res.isSuccess) {
        setIsSuccess(res.isSuccess);
        refresh();
      }
    }
  };

  const onLogout = async () => {
    if(!profile) return;
    await disconnectMyWhatsapp(profile.id);
    refresh();
  };

  return {
    qr,
    isSuccess,
    onLogin,
    onLogout,
  };
};