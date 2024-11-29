"use client";

import React, { use, useEffect, useState } from "react";
import tree from "@/app/tree";
import Node from "@/app/class/Node";

type Params = Promise<{ key: string }>;

const WebsitePage = ({ params }: { params: Params }) => {
  const { key } = use(params);
  const [node, setNode] = useState<Node | null>(null);

  useEffect(() => {
    const decodedKey = decodeURIComponent(key); // from URI to normal string eg: "how%20to" => "how to"
    const data = tree.search(decodedKey) as Node | null;
    setNode(data);
  }, [key]);

  if (!node) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 flex h-dvh justify-center">
      <div className="flex w-[800px] flex-col gap-8 rounded max-lg:mx-4">
        <button
          className="self-start text-blue-500 hover:underline"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h1 className="text-4xl">{node?.key}</h1>
        <div className="flex flex-col gap-4">
          {node?.value
            .split("\n")
            .map((paragraph, index) => (
              <p className="text-justify" key={index}>
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WebsitePage;
