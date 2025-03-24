import Link from "next/link"
import { Header } from "@/app/components/header"

export default function RulesPage() {
  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Header />

      <div className="container mx-auto px-4 py-4">
        <div className="bg-gray-800 p-4 mb-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Правила имиджборда</h1>
            <Link href="/imageboard" className="text-red-500 hover:underline">
              Назад к списку тредов
            </Link>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Общие правила:</h2>

            <ol className="list-decimal pl-6 space-y-2 text-gray-300">
              <li>Запрещено размещение контента, нарушающего законодательство.</li>
              <li>Запрещены оскорбления других пользователей.</li>
              <li>Запрещен спам и флуд.</li>
              <li>Запрещена реклама без согласования с администрацией.</li>
              <li>Запрещено создание тредов без изображений.</li>
              <li>Запрещено создание дубликатов существующих тредов.</li>
              <li>Администрация оставляет за собой право удалять любой контент без объяснения причин.</li>
            </ol>

            <h2 className="text-lg font-bold mt-6 mb-4">Правила для доски /a/ (Аниме):</h2>

            <ol className="list-decimal pl-6 space-y-2 text-gray-300">
              <li>Обсуждение только аниме, манги и связанных с ними тем.</li>
              <li>Запрещены спойлеры без соответствующей пометки.</li>
              <li>Запрещены вайп-треды и рейды на другие ресурсы.</li>
              <li>Запрещено обсуждение пиратских ресурсов.</li>
            </ol>

            <h2 className="text-lg font-bold mt-6 mb-4">Правила для доски /b/ (Бред):</h2>

            <ol className="list-decimal pl-6 space-y-2 text-gray-300">
              <li>Разрешено обсуждение любых тем, не нарушающих общие правила.</li>
              <li>Запрещены политические дискуссии.</li>
              <li>Запрещены треды с призывами к действиям, нарушающим законодательство.</li>
            </ol>

            <p className="mt-6 text-gray-400">
              Нарушение правил может привести к удалению постов, тредов или бану IP-адреса.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

