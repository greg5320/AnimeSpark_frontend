"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Header } from "@/app/components/header"

const mockThread = {
  id: "318053795",
  board: "a",
  date: "24/03/25",
  time: "14:15:15",
  subject: "Обсуждение весеннего сезона аниме 2025",
  text: 'Какие аниме этого сезона вы смотрите? Делимся впечатлениями и рекомендациями. Я начну: \n\n1. "Sword Art Online: Новое поколение" - неплохо, но до оригинала не дотягивает\n2. "Re:Zero 3 сезон" - наконец-то вышел, оправдывает ожидания\n3. "Моя геройская академия: Финал" - достойное завершение серии',
  image: {
    name: "season_spring.jpg",
    size: "704Кб",
    dimensions: "2642x1128",
    url: "/placeholder.svg?height=300&width=400&text=Весенний+сезон+2025",
  },
}

const mockReplies = [
  {
    id: "318053817",
    date: "24/03/25",
    time: "14:56:59",
    text: '>>318053795 (OP)\nА еще советую обратить внимание на "Атаку титанов: Альтернативная концовка". Говорят, там исправили все косяки оригинального финала.',
    image: null,
  },
  {
    id: "318053864",
    date: "24/03/25",
    time: "14:58:18",
    text: '>>318053795 (OP)\nЯ смотрю только "Блич: Новая кровь". Остальное в этом сезоне - шлак.',
    image: {
      name: "bleach.jpg",
      size: "256Кб",
      dimensions: "1280x720",
      url: "/placeholder.svg?height=200&width=300&text=Блич",
    },
  },
  {
    id: "318056840",
    date: "24/03/25",
    time: "15:40:52",
    text: '>>318053795 (OP)\nА кто-нибудь смотрит "Ван Пис: Финальная сага"? Неужели они наконец-то закончат этот бесконечный сериал?',
    image: null,
  },
  {
    id: "318056841",
    date: "24/03/25",
    time: "15:42:15",
    text: ">>318056840\nНе надейся, они просто перезапустят его под новым названием.",
    image: null,
  },
  {
    id: "318056842",
    date: "24/03/25",
    time: "15:45:33",
    text: 'Из нового сезона могу порекомендовать "Тёмный дворецкий: Возвращение". Неожиданно хорошо для продолжения старой серии.',
    image: {
      name: "butler.jpg",
      size: "320Кб",
      dimensions: "1440x810",
      url: "/placeholder.svg?height=200&width=300&text=Темный+дворецкий",
    },
  },
]

export default function ThreadPage() {
  const params = useParams()
  const { board, threadId } = params

  const [replyText, setReplyText] = useState("")
  const [replies, setReplies] = useState(mockReplies)
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()

    if (!replyText.trim()) return

    const newReply = {
      id: `31805${Math.floor(Math.random() * 10000)}`,
      date: new Date()
        .toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
        .replace(/\./g, "/"),
      time: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      text: replyText,
      image: null,
    }

    
    setReplies([...replies, newReply])
    setReplyText("")
    setShowReplyForm(false)
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Header />

      <div className="container mx-auto px-4 py-4">
        <div className="bg-gray-800 p-4 mb-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">
              /{board}/ - Тред №{threadId}
            </h1>
            <Link href="/imageboard" className="text-red-500 hover:underline">
              Назад к списку тредов
            </Link>
          </div>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            {showReplyForm ? "Отменить" : "Ответить в тред"}
          </button>

          {showReplyForm && (
            <form onSubmit={handleSubmitReply} className="mt-4 bg-gray-700 p-4 rounded-lg">
              <div className="mb-4">
                <label htmlFor="reply" className="block text-gray-300 mb-2">
                  Текст сообщения:
                </label>
                <textarea
                  id="reply"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                  rows={5}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-300 mb-2">
                  Изображение (опционально):
                </label>
                <input
                  type="file"
                  id="image"
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                  accept="image/*"
                />
              </div>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-red-600">
                Отправить
              </button>
            </form>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          {/* тут пост Опа */}
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <div className="text-gray-400">
                Аноним {mockThread.date} {mockThread.time} №{mockThread.id}
              </div>
              <div>
                <button
                  onClick={() => {
                    setReplyText(`>>${mockThread.id} (OP)\n`)
                    setShowReplyForm(true)
                  }}
                  className="text-red-500 hover:underline"
                >
                  Ответить
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="text-red-500 font-medium">{mockThread.image.name}</div>
                <div className="text-gray-400 text-sm">
                  {mockThread.image.size}, {mockThread.image.dimensions}
                </div>
                <Image
                  src={mockThread.image.url || "/placeholder.svg"}
                  alt={mockThread.subject}
                  width={200}
                  height={150}
                  className="mt-1 border border-gray-600"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">{mockThread.subject}</h3>
                <p className="text-gray-300 whitespace-pre-line">{mockThread.text}</p>
              </div>
            </div>
          </div>

          {/* тут ответы анонов */}
          <div className="space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="bg-gray-600 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="text-gray-400">
                    Аноним {reply.date} {reply.time} №{reply.id}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setReplyText(`>>${reply.id}\n`)
                        setShowReplyForm(true)
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Ответить
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  {reply.image && (
                    <div className="flex-shrink-0">
                      <div className="text-red-500 font-medium">{reply.image.name}</div>
                      <div className="text-gray-400 text-sm">
                        {reply.image.size}, {reply.image.dimensions}
                      </div>
                      <Image
                        src={reply.image.url || "/placeholder.svg"}
                        alt="Прикрепленное изображение"
                        width={150}
                        height={100}
                        className="mt-1 border border-gray-600"
                      />
                    </div>
                  )}

                  <div className="flex-grow">
                    <p className="text-gray-300 whitespace-pre-line">
                      {reply.text.split("\n").map((line, i) => {
                        //ссылки 
                        if (line.startsWith(">>")) {
                          const parts = line.split(" ")
                          return (
                            <span key={i}>
                              <span className="text-red-500">{parts[0]} </span>
                              <span>{parts.slice(1).join(" ")}</span>
                              <br />
                            </span>
                          )
                        }
                        return (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        )
                      })}
                    </p>
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

