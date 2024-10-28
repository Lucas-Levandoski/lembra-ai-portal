'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES, Routes } from 'Generic/models';

type props = {
  children: ReactNode;
};

const BreadcrumbContext = createContext<{title: string, breadcrumbs: ({url: string, key: string, value: string | undefined})[]}>({title: '', breadcrumbs: [] });

export const BreadcrumbProvider = ({ children }: props) => {
  const [breadcrumbs, setBreadcrumbs] =  useState<({url: string, key: string, value: string | undefined})[]>([]);
  const [title, setTitle] =  useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    readPaths();
  }, [pathname]);

  const readPaths = () => {
    const paths = pathname.split('/') as Routes[];
    let currentPath = '';
    const mappedPath: typeof breadcrumbs = [];

    for(const path of paths) {
      if(!path) continue;

      currentPath += `/${path}`;

      mappedPath.push({ key: path, value: ROUTES.get(path), url: currentPath });
    }

    setBreadcrumbs(mappedPath);

    setTitle(mappedPath.at(-1)?.value ?? '');
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, title }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};


export const useBreadcrumbs = () => useContext(BreadcrumbContext);