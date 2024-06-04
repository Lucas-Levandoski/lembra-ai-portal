import { Button } from 'Common';
import { PiPlusCircle } from 'react-icons/pi';

export function Agendas() {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between">
        <h2 className="font-bold">Agendas</h2>
        <Button className='flex items-center gap-2 font-normal'>
          <PiPlusCircle className='size-8' /> Nova agenda
        </Button>
      </div>
      <hr className="my-6"/>
    </div>
  )
}