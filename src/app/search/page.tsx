"use client";

import React, { Suspense, useEffect } from "react";
import GoogleText from "../components/GoogleText";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "next/navigation";
import tree from "../tree";
import SearchResults from "./SearchResults";
import Node from "../class/Node";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = React.useState<Node[]>([]);

  useEffect(() => {
    const data = tree.searchByKeySubstring(query);
    console.log("Search results:", data);
    setResults(data);
  }, [query]);

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <header className="border-b border-gray-600 px-8 py-6">
        <GoogleText />
      </header>

      <main className="p-8">
        <div className="flex justify-center">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
        <SearchResults results={results} />
      </main>
    </div>
  );
}
