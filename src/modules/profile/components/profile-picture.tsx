import { envVars } from 'Common';
import Image from 'next/image';
import { IProfileDetails, IShortProfile } from 'Profile/models';

type props = {
  profile: IShortProfile | IProfileDetails;
}

export function ProfilePicture({ profile }: props) {
  return (
    <Image
      className="rounded-full"
      height={100}
      width={100}
      src={
        profile?.profilePictureUrl
          ? `${envVars.saProfilesUrl}/${profile.profilePictureUrl}`
          : `${envVars.saAssetsUrl}/user_placeholder.png`
      }
      alt="profile" 
    />
  );
}