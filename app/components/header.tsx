import Link from "next/link"

export function Header() {
  return (
    <header className="bg-gray-800 py-3 mb-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="bg-red-400 p-2 rounded">
            <Link href="/" className="text-black font-bold">
              AS
            </Link>
          </div>
          <div className="ml-4">
            <Link href="/" className="text-xl font-bold">
              Anime Spark
            </Link>
            {/* <div className="text-sm">
              AS <span className="text-red-500">❤</span> anime
            </div> */}
          </div>

          <nav className="hidden md:flex ml-auto space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-red-400">
              ГЛАВНАЯ
            </Link>
            <Link href="/anime" className="text-sm font-medium hover:text-red-400">
              АНИМЕ
            </Link>
            <Link href="/top-100" className="text-sm font-medium hover:text-red-400">
              ТОП-100
            </Link>
            <Link href="/random" className="text-sm font-medium hover:text-red-400">
              СЛУЧАЙНОЕ
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-red-400">
              СООБЩЕСТВО
            </Link>
          </nav>
        </div>
      </header>
  )
}

