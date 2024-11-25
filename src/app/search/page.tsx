"use client";

import React, { Suspense, useEffect } from "react";
import GoogleText from "../components/GoogleText";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "next/navigation";
import { Node } from "@/app/types/node";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gray-600 px-8 py-6">
        <GoogleText />
      </header>

      <main className="p-8">
        <div className="flex justify-center">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        {!results || results.length === 0 ? (
          <h2 className="text-xl text-foreground">No Result</h2>
        ) : (
          <>
            <h2 className="text-xl text-foreground">Search Results</h2>
            <div className="flex">
              <div className="w-full space-y-6">
                {results?.map((result, index) => (
                  <div key={index} className="border-b border-gray-600 pb-4">
                    <Link
                      href={`page/${result.key}`}
                      className="text-lg font-medium text-[#8FB5EC] hover:underline"
                    >
                      <p>{result.key}</p>
                    </Link>
                    {result.value}
                    <p className="text-green-600">
                      {result.content.slice(0, 200)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
