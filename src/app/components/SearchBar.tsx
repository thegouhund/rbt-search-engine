"use client";

import { redirect, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    redirect(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center rounded-full overflow-hidden w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="Search here..."
        name="q"
        defaultValue={query}
        className="px-4 py-2 w-full focus:outline-none bg-[#4B4F55]"
        autoComplete={"off"}
      />
      <button className="px-4 py-2 bg-blue-500 text-white">Search</button>
    </form>
  );
};

export default SearchBar;
