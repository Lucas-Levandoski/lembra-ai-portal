import { IShortAgendaProps } from 'Agenda/models';

type props = {
  agenda: IShortAgendaProps;
}

export function ShortAgendaCard({ agenda }: props) {
  return (
    <div className="flex gap-2 p-4 items-center w-fit rounded-xl shadow-lg">
      <span className={`rounded-full h-5 w-5 bg-${agenda.colorName}-500`}></span>
      <h3 className="text-nowrap">{agenda.name}</h3>
    </div>
  );
}