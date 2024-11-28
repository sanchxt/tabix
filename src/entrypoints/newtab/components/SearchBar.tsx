import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // For holding the search query
  const [selectedOption, setSelectedOption] = useState("google"); // For holding the selected option (google or youtube)

  // Handle input change (search query)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Handle dropdown change (search engine selection)
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  // Handle the form submission (search)
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the page from refreshing on form submit

    let url = "";
    if (selectedOption === "google") {
      // Redirect to Google search
      url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else if (selectedOption === "youtube") {
      // Redirect to YouTube search
      url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`;
    }

    if (url) {
      // Redirect to the appropriate search URL
      window.location.href = url;
    }
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />

        {/* Dropdown for selecting search engine */}
        <select
          value={selectedOption}
          onChange={handleDropdownChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="google">Google</option>
          <option value="youtube">YouTube</option>
        </select>

        {/* Search button */}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
