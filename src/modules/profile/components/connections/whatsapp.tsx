'use client';

import { Button, CirclingFourDotsLoading, ErrorMessage, StatusMessage } from 'Common';
import { useWhatsLogin } from 'Profile/hooks';
import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useStore } from 'Store';


export function WhatsappConnection() {

  const { qr, onLogin, onLogout } = useWhatsLogin();
  const { profile, isProfileLoading } = useStore(state => ({
    profile: state.profile,
    isProfileLoading: state.isProfileLoading,
  }));

  useEffect(() => {
    if(profile && !profile.connections.whatsapp.isConnected)
      onLogin();
  }, [profile]);

  return (
    <>
      <h1>Whatsapp</h1>

      {
        isProfileLoading && <CirclingFourDotsLoading />
      }

      {
        !profile 
          ? <ErrorMessage message="Falha ao carregar dados de usuário" />
          : (
            profile.connections.whatsapp.isConnected 
              ? (
                <div className="flex flex-col gap-3 justify-center">
                  <StatusMessage message={profile.connections.whatsapp.phoneNumber + ' conectado'} />
                  <Button variant="danger" onClick={onLogout} >Desconectar</Button>
                </div>
              )
              : (
                <>
                  <h3>Leia o QR code no seu whatsapp</h3>
                  <div className="p-4 rounded-lg bg-white size-[300px] border">
                    <QRCode
                      value={qr}
                    />
                  </div>
                </>
              )
          )
      }
    </>
  );
}