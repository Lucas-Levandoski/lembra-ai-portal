'use client';

import { BouncingThreeDotsLoading } from 'Common';
import { useStore } from 'Store';
import Link from 'next/link';

export function UserInfo() {
  const { profile, isProfileLoading } = useStore(state => ({ profile: state.profile, isProfileLoading: state.isProfileLoading }));

  const domain = window ? window.location.origin : '';

  return (
    <div className="flex gap-2 flex-col">
      <h1>{profile?.details.name}</h1>
      <div className="flex gap-3 items-center">
        <span className="bg-blue-100 rounded-lg text-blue-700 px-3 py-1 font-semibold">LINK</span>
        {
          isProfileLoading
            ? <BouncingThreeDotsLoading />
            : (
              <Link target="_blank" href={`/${profile?.tag}`} className="font-semibold text-blue-700">
                {domain}/{profile?.tag}
              </Link>
            )
        }
      </div>
    </div>
  );
}