import React, { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Search icon from react-icons

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("google");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    let url = "";
    if (selectedOption === "google") {
      url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else if (selectedOption === "youtube") {
      url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`;
    }

    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="w-full h-full grid place-items-center py-1 md:py-4 md:px-1 lg:p-8">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-4 shadow-md rounded-full lg:px-4 sm:py-2"
      >
        <div className="relative">
          <select
            value={selectedOption}
            onChange={handleDropdownChange}
            className="bg-gray-500/20 text-white rounded-full sm:px-4 py-2 text-[0.6rem] sm:text-xs md:text-sm 2xl:text-base focus:ring-1 focus:ring-gray-500 focus:outline-none appearance-none min-w-24 sm:min-w-32 md:min-w-40 text-center"
          >
            <option value="google" className="bg-gray-800 text-white">
              google.com /
            </option>
            <option value="youtube" className="bg-gray-800 text-white">
              youtube.com /
            </option>
          </select>
          <span className="absolute inset-y-0 right-1 md:right-2 flex items-center pointer-events-none text-gray-300">
            ▼
          </span>
        </div>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="flex-grow bg-transparent focus:outline-none text-white placeholder-gray-400 text-xs md:text-sm sm:min-w-80 md:min-w-52 lg:min-w-96"
          placeholder="Search something..."
        />

        <button
          type="submit"
          className="text-white bg-blue-500/30 hover:bg-blue-600 p-1 sm:p-2 rounded-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          <FiSearch className="text-base sm:text-lg md:text-xl xl:text-2xl" />
        </button>
      </form>

      <h3 className="text-slate-300 pt-6 font-bold italic text-sm sm:text-base md:text-lg sm:tracking-widest">
        what's cookin' good lookin'
      </h3>
    </div>
  );
};

export default SearchBar;
