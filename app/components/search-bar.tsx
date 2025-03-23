export function SearchBar() {
  return (
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
  )
}

