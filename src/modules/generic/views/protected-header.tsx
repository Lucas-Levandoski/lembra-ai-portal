import { getAccessToken, logout } from 'Common';

export async function ProtectedHeaderView() {
  console.log(await getAccessToken());

  return (
    <header className="border-b h-20 px-[12vw] flex justify-center items-center">
      <nav className="flex gap-6">
        <a href="/portal">Portal</a>
        <a href="/portal">Portal</a>
        <button onClick={() => logout()}> Logout </button>
      </nav>
    </header>
  )
}