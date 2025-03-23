"use client"
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import {secret_token} from "./consts"

interface Anime {
  title: string;
  animeURL: string;
  posterURL: string;
  views: number;
  rating: number;
}


export default function Home() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    async function fetchAndParseAnime() {
      try {
        const response = await axios.get("https://api.yani.tv/anime/catalog", {
          headers: {
            "X-Application": secret_token,
            Accept: "application/json",
          },
        });

        const data = response.data.response.data.map((anime: any) => ({
          title: anime.title,
          animeURL: anime.anime_url,
          posterURL: anime.poster.big,
          views: anime.views,
          rating: anime.rating.average,
        }));

        setAnimeList(data);
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    }

    fetchAndParseAnime();
  }, []);

  return (
    <main>
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
          </div>
        </div>
      </header>

      <div className="container">
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <input type="text" placeholder="НАЙТИ АНИМЕ ПО НАЗВАНИЮ" className="w-full bg-gray-800 text-white rounded-md px-4 py-2 pr-10" />
          <button className="bg-gray-800 text-white rounded-md px-4 py-2 flex items-center gap-2 whitespace-nowrap">
            <span>⚙️</span>
            РАСКРЫТЬ ФИЛЬТР
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Добро пожаловать на Anime Spark</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeList.length > 0 ? (
            animeList.map((anime) => (
              <Link key={anime.animeURL} href={`/anime/${anime.animeURL}`} className="anime-card hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="aspect-[3/4] bg-gray-700 rounded-md mb-3 overflow-hidden">
                    <Image
                      src={`https:${anime.posterURL}`}
                      alt={anime.title}
                      width={225}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-bold mb-2">{anime.title}</h2>
                  <div className="rating mb-2">
                    <span>★</span>
                    <span>{anime.rating.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    {anime.views} просмотров
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Загрузка аниме...</p>
          )}
        </div>
      </div>
    </main>
  );
}
