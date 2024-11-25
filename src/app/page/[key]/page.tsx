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

  return (
    <div className="mt-8 flex h-dvh justify-center">
      <div className="flex w-[800px] flex-col gap-8 rounded">
        <button
          className="self-start text-blue-500 hover:underline"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h1 className="text-4xl">{node?.key}</h1>
        <div className="flex flex-col gap-4">
          {node?.content
            .split("\n")
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  );
};

export default WebsitePage;
