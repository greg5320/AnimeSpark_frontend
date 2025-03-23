import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-xl mb-8">Аниме, которое вы ищете, не существует или было удалено.</p>
      <Link href="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors">
        Вернуться на главную
      </Link>
    </div>
  )
}

