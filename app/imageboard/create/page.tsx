"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/app/components/header"


const mockBoards = [
  { id: "a", name: "Аниме" },
  { id: "b", name: "Бред" },
  { id: "vg", name: "Видеоигры" },
  { id: "mu", name: "Музыка" },
  { id: "tv", name: "Сериалы" },
  { id: "news", name: "Новости" },
]

export default function CreateThreadPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultBoard = searchParams.get("board") || "a"

  const [board, setBoard] = useState(defaultBoard)
  const [subject, setSubject] = useState("")
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject.trim() || !text.trim()) return

    //добавить апи бекенда!
    alert("Тред успешно создан!")
    router.push(`/imageboard/${board}`)
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Header />

      <div className="container mx-auto px-4 py-4">
        <div className="bg-gray-800 p-4 mb-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Создание нового треда</h1>
            <Link href="/imageboard" className="text-red-500 hover:underline">
              Назад к списку тредов
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-lg">
            <div className="mb-4">
              <label htmlFor="board" className="block text-gray-300 mb-2">
                Доска:
              </label>
              <select
                id="board"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
              >
                {mockBoards.map((b) => (
                  <option key={b.id} value={b.id}>
                    /{b.id}/ - {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-300 mb-2">
                Тема:
              </label>
              <input
                type="text"
                id="subject"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-300 mb-2">
                Текст сообщения:
              </label>
              <textarea
                id="text"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-300 mb-2">
                Изображение:
              </label>
              <input
                type="file"
                id="image"
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                accept="image/*"
                required
              />
            </div>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Создать тред
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

