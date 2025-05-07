'use client';

import { envVars, isGoogleAccountConnected } from 'Common';
import { useRouter } from 'next/navigation'; 
import { ReactNode, useEffect, useState } from 'react';

type props = {
  children: ReactNode
}

export function ConsentComponent({ children }: props) {
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    checkGoogleAccess();
  }, []);

  const checkGoogleAccess = async () => {
    const res = await isGoogleAccountConnected();

    if(res && !res.isConnected) push(envVars.googleConsentUrl);

    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading 
          ? <div></div>
          : children
      }
    </>
  );
}