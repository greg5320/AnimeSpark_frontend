"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/app/components/header"

const mockBoards = [
  { id: "a", name: "Аниме" },
  { id: "b", name: "Бред" },
  { id: "vg", name: "Видеоигры" },
  { id: "mu", name: "Музыка" },
  { id: "tv", name: "Сериалы" },
  { id: "news", name: "Новости" },
]

const mockThreads = [
  {
    id: "318053795",
    board: "a",
    date: "24/03/25",
    time: "14:15:15",
    subject: "Обсуждение весеннего сезона аниме 2025",
    text: "Какие аниме этого сезона вы смотрите? Делимся впечатлениями и рекомендациями.",
    image: {
      name: "season_spring.jpg",
      size: "704Кб",
      dimensions: "2642x1128",
      url: "/placeholder.svg?height=300&width=400&text=Весенний+сезон+2025",
    },
    replies: 24,
    images: 8,
  },
  {
    id: "318053796",
    board: "a",
    date: "24/03/25",
    time: "14:18:22",
    subject: "Топ-10 аниме всех времен",
    text: "Составляем рейтинг лучших аниме всех времен по мнению анона. Пишите свои топы, в конце треда сделаем сводный рейтинг.",
    image: {
      name: "top10.jpg",
      size: "512Кб",
      dimensions: "1920x1080",
      url: "/placeholder.svg?height=300&width=400&text=Топ+10+аниме",
    },
    replies: 156,
    images: 42,
  },
  {
    id: "318053797",
    board: "a",
    date: "24/03/25",
    time: "14:22:45",
    subject: "Unpopular opinion thread",
    text: "Делимся непопулярными мнениями об аниме. Только без травли, пожалуйста.",
    image: {
      name: "unpopular.jpg",
      size: "256Кб",
      dimensions: "1280x720",
      url: "/placeholder.svg?height=300&width=400&text=Непопулярные+мнения",
    },
    replies: 87,
    images: 15,
  },
  {
    id: "318053798",
    board: "a",
    date: "24/03/25",
    time: "14:30:12",
    subject: "Обсуждаем мангу, которая никогда не получит аниме-адаптацию",
    text: "Какую мангу вы бы хотели видеть экранизированной, но понимаете, что этого никогда не произойдет?",
    image: {
      name: "manga.jpg",
      size: "480Кб",
      dimensions: "1600x900",
      url: "/placeholder.svg?height=300&width=400&text=Манга+без+аниме",
    },
    replies: 42,
    images: 18,
  },
]

export default function ImageboardPage() {
  const [selectedBoard, setSelectedBoard] = useState("a")

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Header />

      <div className="container mx-auto px-4 py-4">
        <div className="bg-gray-800 p-4 mb-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Имиджборд</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {mockBoards.map((board) => (
              <button
                key={board.id}
                className={`px-3 py-1 rounded-md ${selectedBoard === board.id ? "bg-primary text-white" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setSelectedBoard(board.id)}
              >
                /{board.id}/ - {board.name}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              href={`/imageboard/create?board=${selectedBoard}`}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Создать тред
            </Link>
            <Link href={`/imageboard/rules`} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Правила
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            /{selectedBoard}/ - {mockBoards.find((b) => b.id === selectedBoard)?.name}
          </h2>

          <div className="space-y-4">
            {mockThreads
              .filter((thread) => thread.board === selectedBoard)
              .map((thread) => (
                <div key={thread.id} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-400">
                      Аноним {thread.date} {thread.time} №{thread.id}
                    </div>
                    <div>
                      <Link href={`/imageboard/${selectedBoard}/${thread.id}`} className="text-red-500 hover:underline">
                        Ответ
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-red-500 font-medium">{thread.image.name}</div>
                      <div className="text-gray-400 text-sm">
                        {thread.image.size}, {thread.image.dimensions}
                      </div>
                      <Image
                        src={thread.image.url || "/placeholder.svg"}
                        alt={thread.subject}
                        width={200}
                        height={150}
                        className="mt-1 border border-gray-600"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-2">{thread.subject}</h3>
                      <p className="text-gray-300 mb-4">{thread.text}</p>
                      <div className="text-gray-400 text-sm">
                        Ответов: {thread.replies}, с картинками: {thread.images}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}

