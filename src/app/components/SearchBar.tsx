"use client";

import { redirect, useSearchParams } from "next/navigation";
import { Search, X } from "react-bootstrap-icons";
import { Node } from "@/app/types/node";
import { useState } from "react";
import debounce from "lodash/debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const paramsQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState<string>(paramsQuery);
  const [suggestions, setSuggestions] = useState<Node[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    redirect(`/search?q=${query}`);
  };

  const fetchSuggestions = async (query: string) => {
    const data = await (await fetch(`/api/search?q=${query}`)).json();
    setSuggestions(data);
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newQuery = (e.target as HTMLInputElement).value;
    setQuery(newQuery);
    debouncedFetchSuggestions(query);

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
    <div className="relative w-[800px]">
      <form
        onSubmit={onSubmit}
        className={`${showSuggestions && suggestions.length >= 1 ? "rounded-t-lg" : "rounded-full"} flex w-full items-center overflow-hidden transition-all`}
      >
        <input
          type="text"
          placeholder="Search here..."
          name="q"
          onChange={onChange}
          value={query}
          className="w-full bg-secondary px-4 py-2 focus:outline-none"
          autoComplete={"off"}
        />
        <button
          type="button"
          onClick={onClearClick}
          className="h-auto bg-secondary px-4 py-2 text-white"
        >
          <X color="#fff" size={24} />
        </button>
        <button
          type="submit"
          className="h-auto bg-blue-400 px-4 py-2 text-white"
        >
          <Search size={24} color="#fff" />
        </button>
      </form>
      <div
        className={`${showSuggestions && suggestions.length >= 1 ? "" : "hidden"} absolute max-h-[300px] w-full overflow-y-auto rounded-b-lg bg-secondary`}
      >
        <ul>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.key)}
              className="flex w-full items-center gap-2 px-2 py-1 hover:bg-[#3B3F43]"
            >
              <div className="flex items-center justify-center self-center">
                <Search size={18} color="#fff" />
              </div>
              <p>{suggestion.key}</p>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
