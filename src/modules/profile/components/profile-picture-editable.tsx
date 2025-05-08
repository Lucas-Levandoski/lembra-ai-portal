import { envVars } from 'Common';
import Image from 'next/image';
import { IProfile } from 'Profile/models';
import { ChangeEvent } from 'react';
import { BiEditAlt } from 'react-icons/bi';

type props = {
  changedProfilePicture?: File,
  profile: IProfile,
  onChangeProfilePicture: (event: ChangeEvent<HTMLInputElement>) => {},
}

export function ProfilePictureEditable({ changedProfilePicture, profile, onChangeProfilePicture }: props) {
  return (
    <div className="flex items-center justify-center gap-4">    
      <div className="rounded-full overflow-hidden h-fit w-fit relative group">
        {
          changedProfilePicture 
            ? (
              <Image
                height={100}
                width={100}
                src={URL.createObjectURL(changedProfilePicture)}
                alt="profile" 
              />
            )
            : (
              <Image
                height={100}
                width={100}
                src={
                  profile.details.profilePictureUrl
                    ? `${envVars.saProfilesUrl}/${profile.details.profilePictureUrl}`
                    : `${envVars.saAssetsUrl}/user_placeholder.png`
                }
                alt="profile" 
              />
            )
        }
        <div className="flex justify-center items-center absolute left-0 w-full h-full bg-gray-500 top-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-70">
          <BiEditAlt className="margin-auto size-10 text-black"/>
        </div>
        <input 
          className="h-full w-full opacity-0 absolute left-0 top-0 cursor-pointer" 
          type="file" 
          accept=".jpg,.jpeg,.png" 
          onChange={onChangeProfilePicture}
        />
      </div>
    </div>
  );
}