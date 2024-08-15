import { IProfile } from 'Profile';
import Image from 'next/image';

type props = {
  profile: IProfile;
}

export function ProfileTag({ profile }: props) {
  return (
    <div className="flex w-full h-24 p-4 gap-6 items-center">
      <Image className="rounded-full" height={60} width={60} src={profile.details.profilePictureUrl} alt="profile" />
      <div className="h-10 border-r"></div>
      <div className="flex flex-col">
        <Image height={30} width={200} src={profile.details.companyPictureUrl} alt="company-logo" />
        <b>{profile.details.name}</b>
      </div> 
    </div>
  );
}