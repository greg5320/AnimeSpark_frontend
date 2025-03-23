"use client"
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { secret_token } from "./consts"
import { Header } from "@/app/components/header"
import { SearchBar } from "@/app/components/search-bar"

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
      <Header />

      <div className="container">
        <SearchBar/>

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
