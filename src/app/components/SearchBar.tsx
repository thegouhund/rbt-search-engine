"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Search, X } from "react-bootstrap-icons";
import { useState } from "react";
import debounce from "lodash/debounce";
import tree from "@/app/tree";
import Node from "../class/Node";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const paramsQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState<string>(paramsQuery);
  const [suggestions, setSuggestions] = useState<Node[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    setShowSuggestions(false);
    redirect(`/search?q=${query}`);
  };

  const fetchSuggestions = async (query: string) => {
    const data = tree.searchByKeySubstring(query);
    setSuggestions(data);
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newQuery = (e.target as HTMLInputElement).value;
    setQuery(newQuery);
    debouncedFetchSuggestions(newQuery);

    if (newQuery.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const onSuggestionClick = (key: string) => {
    setQuery(key);
    setShowSuggestions(false);
    redirect(`/search?q=${key}`);
  };

  const onClearClick = () => {
    setQuery("");
    setShowSuggestions(false);
    redirect("/");
  };

  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      <form
        onSubmit={onSubmit}
        className={`flex w-full items-center overflow-hidden transition-all ${
          showSuggestions && suggestions.length >= 1
            ? "rounded-t-lg"
            : "rounded-full"
        }`}
      >
        <input
          type="text"
          placeholder="Search here..."
          name="q"
          onChange={onChange}
          value={query}
          className="w-full bg-secondary px-4 py-2 text-sm focus:outline-none sm:text-base"
          autoComplete="off"
        />
        {showSuggestions && (
          <button
            type="button"
            onClick={onClearClick}
            className="h-auto bg-secondary px-2 py-2 text-white sm:px-4"
          >
            <X color="#fff" size={20} className="sm:h-6 sm:w-6" />
          </button>
        )}
        <button
          type="submit"
          className="h-auto bg-blue-400 px-2 py-2 text-white sm:px-4"
        >
          <Search size={20} color="#fff" className="sm:h-6 sm:w-6" />
        </button>
      </form>

      <div
        className={`absolute left-0 w-full overflow-y-auto rounded-b-lg bg-secondary transition-all ${
          showSuggestions && suggestions.length >= 1
            ? "max-h-[300px]"
            : "hidden max-h-0"
        }`}
      >
        <ul>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.key)}
              className="flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-[#3B3F43] sm:text-base"
            >
              <div className="flex items-center justify-center">
                <Search size={16} color="#fff" className="sm:h-5 sm:w-5" />
              </div>
              <p className="truncate">{suggestion.key}</p>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
