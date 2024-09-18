'use client';

import { useOnAttendeeInfo } from 'Bookings/hooks';
import { BouncingThreeDotsLoading, Button, ErrorMessage, TimeCard } from 'Common/components';
import { ProfileTag } from 'Profile/components';
import { CiCalendar } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';
import InputMask from 'react-input-mask';

type props = {
  userTag: string;
  agendaTag: string;
  date: string;
}

export function AttendeeInfoView({ userTag, agendaTag, date }: props) {
  const { isLoading, isLoadingBooking, agenda, profile, attendee, onSubmit, onChangeProperty } = useOnAttendeeInfo(userTag, agendaTag, date);

  return (
    (
      <div className="flex min-w-[600px] shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
        <div className="flex gap-3 flex-col w-[500px]">
          {
            isLoading
              ? <div className="m-auto"><BouncingThreeDotsLoading /></div>
              : (
                <>
                  {
                    profile === undefined
                      ? <ErrorMessage message="Falha ao carregar dados do usuário" />
                      : <ProfileTag profile={profile} />
                  }
                  {
                    agenda === undefined 
                      ? <ErrorMessage message="Falha ao carregar informações da agenda" />
                      : (
                        <>
                          <h1>{agenda.name}</h1>
                          <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
                          <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
                            <FcGoogle className="size-8" />Google meet
                          </div>
                          <div className="border rounded-lg p-4 flex items-center gap-6">
                            <HiOutlineGlobeAsiaAustralia className="size-8" />
                            Horário de Brasília
                          </div>
                          <div className="border rounded-lg p-4 flex items-center gap-6">
                            <CiCalendar className="size-8" />
            
                          </div>
                        </>
                      )  
                  }
                </>
              )
          }
        </div>
        <div className="border-r w-1"></div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-[500px]" >
          <h2>Preencha os Campos</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Nome *</label>
            <input className="p-2 border rounded-xl" id="name" value={attendee.name} onChange={onChangeProperty('name')} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">E-mail *</label>
            <input type="email" className="p-2 border rounded-xl" id="email" value={attendee.email} onChange={onChangeProperty('email')} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone-number" className="font-semibold">Celular *</label>
            <InputMask 
              mask="(99) 99999-9999" 
              type="tel" 
              className="p-2 border rounded-xl" 
              id="phone-number" 
              value={attendee.phoneNumber} onChange={onChangeProperty('phoneNumber')} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">Por favor, compartilhe qualquer coisa que possa ser útil para a preparação da nossa reunião.</label>
            <textarea className="p-2 border rounded-xl" id="description" value={attendee.otherInfo} onChange={onChangeProperty('otherInfo')} />
          </div>
          <Button type="submit" disabled={isLoadingBooking} className="disabled:opacity-100">{ 
            isLoadingBooking 
              ? <BouncingThreeDotsLoading variant="secondary" />
              : 'Agendar Evento' 
          }</Button>
        </form>
      </div>
    )
  );
}