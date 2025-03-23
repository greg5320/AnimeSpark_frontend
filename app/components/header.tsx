import Link from "next/link"

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="flex items-center">
          <div className="header-logo">
            <Link href="/" className="text-black">
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

          <nav className="hidden md:flex ml-auto">
            <Link href="/" className="px-4 py-2 hover:text-red-400">
              ГЛАВНАЯ
            </Link>
            <Link href="/anime" className="px-4 py-2 hover:text-red-400">
              АНИМЕ
            </Link>
            <Link href="/top-100" className="px-4 py-2 hover:text-red-400">
              ТОП-100
            </Link>
            <Link href="/random" className="px-4 py-2 hover:text-red-400">
              СЛУЧАЙНОЕ
            </Link>
            <Link href="/community" className="px-4 py-2 hover:text-red-400">
              СООБЩЕСТВО
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

