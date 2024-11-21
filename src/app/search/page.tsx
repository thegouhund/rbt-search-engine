"use client";

import React, { useEffect } from "react";
import GoogleText from "../components/GoogleText";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "next/navigation";
import { Node } from "@/app/types/node";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = React.useState<Node[]>();

  useEffect(() => {
    const fetchResults = async () => {
      const request = await fetch(`/api/search?q=${query}`);
      const data = await request.json();
      console.log("Fetched results:", data);

      if (request.ok) {
        setResults(data);
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="py-6 px-8 border-b border-gray-600">
          <GoogleText />
        </header>

        <main className="p-8">
          <div className="flex justify-center">
            <SearchBar />
          </div>

          <h2 className="text-xl text-foreground">No Search Results</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-6 px-8 border-b border-gray-600">
        <GoogleText />
      </header>

      <main className="p-8">
        <div className="flex justify-center">
          <SearchBar />
        </div>

        <h2 className="text-xl text-foreground">Search Results</h2>
        <div className="flex">
          <div className="w-full space-y-6">
            {results?.map((result, index) => (
              <div key={index} className="border-b border-gray-600 pb-4">
                <a
                  href={result.key}
                  className="text-[#8FB5EC] text-lg font-medium hover:underline"
                >
                  {result.value}
                </a>
                <p className="text-green-600">{result.key}</p>
                <p className="text-gray-300">
                  {result.description ?? "lorem ipsum dolor sit amet consectur"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
