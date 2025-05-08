import { envVars } from 'Common';
import { IShortProfile } from 'Profile/models';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ProfilePicture } from './profile-picture';


type props = {
  profile: IShortProfile;
  className?: string;
}

export function ProfileTag({ profile, className }: props) {
  return (
    <div className={twMerge('flex w-full min-h-24 p-4 gap-6 items-center', className)}>
      <ProfilePicture profile={profile} />
      <div className="h-10 border-r"></div>
      <div className="flex flex-col">
        <Image
          height={30}
          width={200}
          className="max-h-[100px] object-cover"
          loading="lazy"
          src={
            profile.companyPictureUrl
              ? `${envVars.saCompaniesUrl}/${profile.companyPictureUrl}`
              : `${envVars.saAssetsUrl}/company_placeholder.png`
          }
          alt="company-logo"
        />
        <b>{profile.name}</b>
      </div> 
    </div>
  );
}