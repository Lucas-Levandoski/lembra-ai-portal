'use client';

import { useBreadcrumbs } from 'Generic/contexts';
import { MdArrowForwardIos  } from 'react-icons/md';
import Link from 'next/link';


export function Breadcrumbs() {
  const { title, breadcrumbs } = useBreadcrumbs();

  return (
    <div className="flex flex-col gap-2 mb-5">
      <h1>{title}</h1>
      <span className="flex items-center gap-3">
        {
          breadcrumbs.map((breadcrumb, i) => (
            <>
              <Link className="text-blue-700" key={breadcrumb.key} href={breadcrumb.url}>{breadcrumb.value}</Link>
              { i >= 0 && i < breadcrumbs.length -1 && <span><MdArrowForwardIos  /></span>}
            </>
          ))}
      </span>
    </div>
  );

};