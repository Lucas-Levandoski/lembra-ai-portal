import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Agenda'
};


export default function EmptyEditAgenda() {
  return (
    <div className="flex justify-center items-center">
      <h1>
        É necessário identificar qual agenda será editada
      </h1>
    </div>
  )
} 