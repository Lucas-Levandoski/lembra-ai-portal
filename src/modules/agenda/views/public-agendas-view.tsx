import { Calendar } from 'Common';

type props = {
  userTag: string;
}

export function PublicAgendasView({ userTag }: props) {
  
  
  return (
    <div className="flex gap-4 m-auto border h-[500px] w-2/3 rounded-xl p-8">
      <div className="flex w-2/3 justify-center items-center">
        {userTag}
      </div>
      {/* the div bellow is the vertical ruler */}
      <div className="h-full w-0 border-l"></div>
      <div className="">
        <Calendar />
      </div>
    </div>
  );
}