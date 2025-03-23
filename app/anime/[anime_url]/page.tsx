"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { notFound } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Eye, Cloud, Flag, RotateCcw, Share2, Edit, QrCode, Heart, Bug, BookOpen } from "lucide-react"
import { AnimePlayer } from "../../components/anime-player"
import {secret_token} from "../../consts"



interface AnimeData {
  title: string
  anime_url: string
  description: string
  poster: {
    fullsize: string
    big: string
    small: string
    medium: string
    huge: string
  }
  year: number
  min_age: {
    value: number
    titleLong: string
    title: string
  }
  views: number
  season: number
  type: {
    name: string
    shortname: string
  }
  anime_status: {
    title: string
  }
  rating: {
    average: number
    shikimori_rating: number
    worldart_rating: number
    myanimelist_rating: number
    kp_rating: number
  }
  genres: { title: string }[]
  videos: {
    number: string
    iframe_url: string
    data: { player: string; dubbing: string }
  }[]
  studio?: string
  director?: string
  episodes?: number
  translation?: string[]
  voiceActing?: string[]
}

export default function AnimePage() {
  const pathname = usePathname()
  const anime_url = pathname.split("/").pop()
  const [anime, setAnime] = useState<AnimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [topPosition, setTopPosition] = useState<number | null>(null)

  useEffect(() => {
    if (!anime_url) return

    const fetchAnime = async () => {
      try {
        const response = await axios.get(`https://api.yani.tv/anime/${anime_url}?need_videos=true`, {
          headers: {
            "X-Application": secret_token,
            Accept: "application/json",
          },
        })

        setAnime(response.data.response)

        
        setTopPosition(Math.floor(Math.random() * 100) + 1)
      } catch (error) {
        console.error("Ошибка загрузки данных аниме:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [anime_url])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    )

  if (!anime) return notFound()

  
  const getSeason = (season: number) => {
    switch (season) {
      case 1:
        return "Зима"
      case 2:
        return "Весна"
      case 3:
        return "Лето"
      case 4:
        return "Осень"
      default:
        return ""
    }
  }

  return (
    <main className="bg-gray-900 text-white pb-8">
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

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="НАЙТИ АНИМЕ ПО НАЗВАНИЮ"
              className="w-full bg-gray-800 text-white rounded-md px-4 py-2 pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <button className="bg-gray-800 text-white rounded-md px-4 py-2 flex items-center gap-2 whitespace-nowrap">
            <span>⚙️</span>
            РАСКРЫТЬ ФИЛЬТР
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">{anime.anime_url}</span>
            {/* Японское название может отсутствовать в API, поэтому проверяем */}
            {anime.anime_url && (
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {/* Здесь должно быть японское название из API */}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-2xl">★</span>
            <span className="bg-yellow-500 text-white font-bold px-3 py-1 rounded text-xl">
              {anime.rating.average.toFixed(2)}
            </span>
            <span className="text-gray-400">{anime.views.toLocaleString()} просмотров</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            <div className="flex items-center bg-gray-700 px-3 py-1 rounded-md">
              <span className="text-gray-400 mr-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </span>
              <span className="font-bold">{anime.rating.shikimori_rating.toFixed(2)}</span>
            </div>
            <div className="flex items-center bg-red-800 px-3 py-1 rounded-md">
              <span className="text-gray-200 mr-2">WA</span>
              <span className="font-bold">{anime.rating.worldart_rating.toFixed(2)}</span>
            </div>
            <div className="flex items-center bg-orange-600 px-3 py-1 rounded-md">
              <span className="text-gray-200 mr-2">КП</span>
              <span className="font-bold">{anime.rating.kp_rating.toFixed(2)}</span>
            </div>
            <div className="flex items-center bg-blue-700 px-3 py-1 rounded-md">
              <span className="text-gray-200 mr-2">MAL</span>
              <span className="font-bold">{anime.rating.myanimelist_rating.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row-reverse gap-8 items-start">
            <div className="lg:w-[256px] flex flex-col mt-[-200px]">
              <div className="relative">
                <Image
                  src={`https:${anime.poster.medium}`}
                  alt={anime.title}
                  width={350}
                  height={500}
                  className="w-full rounded-md object-cover"
                  priority
                />
                {topPosition && (
                  <div className="absolute bottom-0 left-0 bg-purple-700 text-white px-2 py-1 text-sm">
                    {topPosition} МЕСТО В ТОП-100 СЕРИАЛОВ
                  </div>
                )}
              </div>

              <div className="flex justify-between my-4">
                <button className="p-2 bg-gray-700 rounded-md">
                  <Eye size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <Cloud size={20} />
                </button>
                <button className="p-2 bg-green-500 text-white rounded-md">
                  <Flag size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <RotateCcw size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <Share2 size={20} />
                </button>
              </div>

              <div className="flex justify-between">
                <button className="p-2 bg-gray-700 rounded-md">
                  <Edit size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <QrCode size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <Heart size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <Bug size={20} />
                </button>
                <button className="p-2 bg-gray-700 rounded-md">
                  <BookOpen size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-gray-400">Статус:</div>
                <div>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded">
                    {anime.anime_status.title}
                  </span>
                </div>

                <div className="text-gray-400">Тип:</div>
                <div>{anime.type.name}</div>

                <div className="text-gray-400">Год выхода:</div>
                <div className="text-red-400">
                  {getSeason(anime.season)} {anime.year}
                </div>

                <div className="text-gray-400">Возрастной рейтинг:</div>
                <div>
                  <span className="inline-block px-2 py-1 bg-gray-800 text-white text-xs rounded border border-gray-600">
                    {anime.min_age.title}
                  </span>
                </div>

                <div className="text-gray-400">Жанры:</div>
                <div className="flex flex-wrap gap-1">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre.title}
                      className="inline-block px-2 py-1 bg-gray-800 text-white text-xs rounded border border-gray-600"
                    >
                      {genre.title}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 mb-6 text-sm">{anime.description}</p>

              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                <span>▼</span> Порядок просмотра
              </button>
            </div>
          </div>
        </div>

        {/* Плеер */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Смотреть {anime.title}</h2>
          {anime.videos && anime.videos.length > 0 ? (
            <AnimePlayer videos={anime.videos} title={anime.title} />
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p>Нет доступных видео для просмотра</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

