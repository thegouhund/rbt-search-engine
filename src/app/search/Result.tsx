import Link from "next/link";
import React from "react";
import Node from "../class/Node";

const Result = ({ result }: { result: Node }) => {
  return (
    <div className="border-b border-gray-600 pb-4">
      <Link
        href={`page/${result.key}`}
        className="text-lg font-medium text-[#8FB5EC] hover:underline"
      >
        <p className="font-semibold">{result.key}</p>
      </Link>
      {result.value}
      <p className="text-green-600">{result.content.slice(0, 200)}</p>
    </div>
  );
};

export default Result;
