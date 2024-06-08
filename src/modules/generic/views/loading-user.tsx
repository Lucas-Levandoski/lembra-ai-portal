import { CirclesAroundRingLoading } from 'Common';

export function LoadingUserView() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      <CirclesAroundRingLoading />
      <h1 className="text-blue-600">Carregando Usuário</h1>
    </div>
  )
}