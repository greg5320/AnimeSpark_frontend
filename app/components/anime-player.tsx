"use client"
import { useState, useEffect } from "react"
import { Share2, Settings, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoData {
  number: string
  iframe_url: string
  data: { player: string; dubbing: string }
}

interface AnimePlayerProps {
  videos: VideoData[]
  title: string
}

export function AnimePlayer({ videos, title }: AnimePlayerProps) {
  const [activeTab, setActiveTab] = useState<"video" | "trailers" | "similar">("video")
  const [currentEpisode, setCurrentEpisode] = useState<VideoData | null>(null)
  const [selectedDubbing, setSelectedDubbing] = useState<string>("")
  const [selectedPlayer, setSelectedPlayer] = useState<string>("")
  const [dubbingOptions, setDubbingOptions] = useState<string[]>([])
  const [playerOptions, setPlayerOptions] = useState<string[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([])


  useEffect(() => {
    if (videos && videos.length > 0) {
      const dubbings = [...new Set(videos.map((v) => v.data.dubbing))].filter(Boolean)
      const players = [...new Set(videos.map((v) => v.data.player))].filter(Boolean)

      setDubbingOptions(dubbings)
      setPlayerOptions(players)
      if (dubbings.length > 0) setSelectedDubbing(dubbings[0])
      if (players.length > 0) setSelectedPlayer(players[0])
     
      setCurrentEpisode(videos[0])
    }
  }, [videos])

  useEffect(() => {
    if (videos) {
      let filtered = [...videos]

      if (selectedDubbing) {
        filtered = filtered.filter((v) => v.data.dubbing === selectedDubbing)
      }

      if (selectedPlayer) {
        filtered = filtered.filter((v) => v.data.player === selectedPlayer)
      }

      setFilteredVideos(filtered)

      if (
        filtered.length > 0 &&
        currentEpisode &&
        !filtered.some(
          (v) =>
            v.number === currentEpisode.number &&
            v.data.dubbing === currentEpisode.data.dubbing &&
            v.data.player === currentEpisode.data.player,
        )
      ) {
        setCurrentEpisode(filtered[0])
      }
    }
  }, [selectedDubbing, selectedPlayer, videos, currentEpisode])

  const handleEpisodeSelect = (episode: VideoData) => {
    setCurrentEpisode(episode)
  }

  const groupedEpisodes = filteredVideos.reduce<Record<string, VideoData>>((acc, video) => {
    acc[video.number] = video
    return acc
  }, {})

  if (!videos || videos.length === 0) {
    return <div className="text-center p-8 bg-gray-800 rounded-lg">Нет доступных видео</div>
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Верхняя панель с вкладками */}
      <div className="flex bg-gray-900">
        <button
          className={cn(
            "px-6 py-3 flex items-center gap-2",
            activeTab === "video" ? "bg-red-500 text-white" : "bg-gray-800 text-white",
          )}
          onClick={() => setActiveTab("video")}
        >
          <span>📹</span> ВИДЕО
        </button>
        <button
          className={cn(
            "px-6 py-3 flex items-center gap-2",
            activeTab === "trailers" ? "bg-red-500 text-white" : "bg-gray-800 text-white",
          )}
          onClick={() => setActiveTab("trailers")}
        >
          <span>🎬</span> ТРЕЙЛЕРЫ
        </button>
        <button
          className={cn(
            "px-6 py-3 flex items-center gap-2",
            activeTab === "similar" ? "bg-red-500 text-white" : "bg-gray-800 text-white",
          )}
          onClick={() => setActiveTab("similar")}
        >
          <span>≡</span> ПОХОЖИЕ АНИМЕ
        </button>
        <div className="ml-auto flex items-center px-4">
          <button className="p-2 text-white">
            <Lightbulb size={20} />
          </button>
          <button className="p-2 text-white">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Панель выбора озвучки и плеера */}
      <div className="p-4 bg-gray-700">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <select
              value={selectedDubbing}
              onChange={(e) => setSelectedDubbing(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            >
              {dubbingOptions.map((dubbing) => (
                <option key={dubbing} value={dubbing}>
                  {dubbing} ({videos.filter((v) => v.data.dubbing === dubbing).length} эп.)
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            >
              {playerOptions.map((player) => (
                <option key={player} value={player}>
                  Плеер {player} ({videos.filter((v) => v.data.player === player).length} эп.)
                </option>
              ))}
            </select>
          </div>
          {/* <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center justify-center">
            <span className="text-green-600">✓</span> Подписка
          </button> */}
        </div>
      </div>

      {/* Нумерация эпизодов */}
      <div className="p-4 bg-gray-700 mt-[-10px]">
        <div className="flex flex-wrap gap-2">
          {Object.entries(groupedEpisodes).map(([episodeNumber, episode]) => (
            <button
              key={episodeNumber}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-md font-medium",
                currentEpisode && currentEpisode.number === episodeNumber
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-600",
              )}
              onClick={() => handleEpisodeSelect(episode)}
            >
              {episodeNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Плеер */}
      {currentEpisode && (
        <div className="relative aspect-video bg-black">
          <iframe
            src={currentEpisode.iframe_url}
            className="w-full h-full"
            allowFullScreen
            title={`${title} - Серия ${currentEpisode.number}`}
          ></iframe>
          <button className="absolute top-2 right-2 bg-black bg-opacity-70 p-2 rounded-full text-white">
            <Share2 size={20} />
          </button>
        </div>
      )}

      {/* Информация о текущем эпизоде */}
      {currentEpisode && (
        <div className="p-4 bg-gray-800 text-white">
          <h3 className="text-xl font-bold mb-2">
            {title} - Серия {currentEpisode.number}
          </h3>
          <p className="text-gray-400">
            Озвучка: {currentEpisode.data.dubbing} | Плеер: {currentEpisode.data.player}
          </p>
        </div>
      )}
    </div>
  )
}

