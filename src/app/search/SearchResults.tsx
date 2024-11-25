import React from "react";
import Node from "../class/Node";
import Result from "./Result";

const SearchResults = ({ results }: { results: Node[] }) => {
  return (
    <>
      {results.length === 0 ? (
        <h2 className="text-xl text-foreground">No Result</h2>
      ) : (
        <>
          <h2 className="text-xl">Search Results</h2>
          <div className="flex">
            <div className="w-full space-y-6">
              {results.map((result, index) => (
                <Result key={index} result={result}></Result>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchResults;
