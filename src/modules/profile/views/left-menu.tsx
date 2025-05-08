import { Link } from 'Common';

type props = {
  children: React.ReactNode;
}

export function ProfileLeftMenuView({ children }: props) {
  return (
    <div className="w-full h-[calc(100%-76px)] m-auto grid grid-cols-5">
      <div className="flex flex-col justify-start gap-4 col-span-1 my-auto border-r p-4 min-h-[75vh] mt-0">
        <Link isStrictURL route="/portal/profile">Perfil</Link>
        <Link isStrictURL route="/portal/profile/visual-identity">Identidade Visual</Link>
        <Link isStrictURL route="/portal/profile/my-link">Meu Link</Link>
        <Link isStrictURL route="/portal/profile/manage-connections">Gerenciar Conexões</Link>
      </div>
      <div className="h-full overflow-auto col-span-4 flex justify-center">
        {children}
      </div>
    </div>
  );
}