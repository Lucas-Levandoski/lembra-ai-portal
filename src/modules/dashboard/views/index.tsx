import { Agendas, Calendar, UserInfo } from '../components';

export function DashboardView() {
  return (
    <div className="grid grid-cols-7 gap-6">
      <div className="flex flex-col col-span-5 gap-8">
        <UserInfo /> 
        <Agendas />
      </div>
      <div className='col-span-2'>
        <Calendar />
      </div>
    </div>
  )
}