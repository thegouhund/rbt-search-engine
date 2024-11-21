"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { Search } from "react-bootstrap-icons";
import { Node } from "@/app/types/node";
import { useState } from "react";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [suggestions, setSuggestions] = useState<Node[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    redirect(`/search?q=${query}`);
  };

  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value;

    const data = await (await fetch(`/api/search?q=${query}`)).json();
    setSuggestions(data);

    if (query.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
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
          defaultValue={query}
          className="w-full bg-secondary px-4 py-2 focus:outline-none"
          autoComplete={"off"}
        />
        <button className="bg-blue-500 px-4 py-2 text-white">Search</button>
      </form>
      <div
        className={`${showSuggestions && suggestions.length >= 1 ? "" : "hidden"} absolute w-full rounded-b-lg bg-secondary`}
      >
        <ul>
          {suggestions.map((suggestions, index) => (
            <Link
              key={index}
              href={`/search?q=${suggestions.key}`}
              className="flex items-center gap-2 px-2 py-1 hover:bg-[#3B3F43]"
            >
              <Search size={18} color="#fff" /> {suggestions.key}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
