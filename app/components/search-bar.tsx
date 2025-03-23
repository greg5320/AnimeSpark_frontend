export function SearchBar() {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <input type="text" placeholder="НАЙТИ АНИМЕ ПО НАЗВАНИЮ" className="search-bar" />
        <button className="filter-button">
          <span>⚙️</span>
          РАСКРЫТЬ ФИЛЬТР
        </button>
      </div>
    </div>
  )
}

