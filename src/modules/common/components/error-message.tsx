type props = {
  message: string
}

export function ErrorMessage({ message }: props) {
  return (
    <div className="rounded flex items-center text-center bg-red-200 p-4">
      <p className="text-red-600">{message}</p>
    </div>
  )
}