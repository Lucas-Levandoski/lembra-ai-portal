import { envVars } from 'Common';
import { IShortProfile } from 'Profile';
import Image from 'next/image';


type props = {
  profile: IShortProfile;
}

export function ProfileTag({ profile }: props) {
  return (
    <div className="flex w-full h-24 p-4 gap-6 items-center">
      <Image className="rounded-full" height={60} width={60} src={profile.profilePictureUrl ?? `${envVars.saAssetsUrl}/user_placeholder.png`} alt="profile" />
      <div className="h-10 border-r"></div>
      <div className="flex flex-col">
        <Image height={30} width={200} src={profile.companyPictureUrl ?? `${envVars.saAssetsUrl}/company_placeholder.png`} alt="company-logo" />
        <b>{profile.name}</b>
      </div> 
    </div>
  );
}