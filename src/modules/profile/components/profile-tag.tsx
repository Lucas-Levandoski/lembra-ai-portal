import { envVars } from 'Common';
import { IShortProfile } from 'Profile';
import Image from 'next/image';


type props = {
  profile: IShortProfile;
}

export function ProfileTag({ profile }: props) {
  return (
    <div className="flex w-full h-24 p-4 gap-6 items-center">
      <Image
        className="rounded-full"
        height={60}
        width={60}
        loading="lazy"
        src={
          profile.profilePictureUrl
            ? `${envVars.saProfilesUrl}/${profile.profilePictureUrl}`
            : `${envVars.saAssetsUrl}/user_placeholder.png`
        }
        alt="profile" />
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