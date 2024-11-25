import React from "react";
import Node from "../class/Node";
import Result from "./Result";
import { GimmickNode } from "../class/gimmick/GimmickNode";

const SearchResults = ({ results }: { results: Node[] }) => {
  const firstResult = results[0];

  if (results.length === 0)
    return <h2 className="text-xl text-foreground">No Result</h2>;

  return (
    <div>
      <h2 className="text-xl">Search Results</h2>
      {firstResult instanceof GimmickNode && (
        <>{(firstResult as GimmickNode).gimmickComponent()}</>
      )}
      <div className="flex">
        <div className="w-full space-y-6">
          {results.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
