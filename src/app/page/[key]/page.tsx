"use client";

import React, { use, useEffect, useState } from "react";
import { Node } from "../../types/node";
import { redirect } from "next/navigation";

type Params = Promise<{ key: string }>;

const WebsitePage = ({ params }: { params: Params }) => {
  const { key } = use(params);
  const [node, setNode] = useState<Node | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(`/api/node/${key}`, { cache: "force-cache" });
      const data: Node = await request.json();
      console.log(data);
      setNode(data);
      if (!request.ok) redirect("/404");
    };

    fetchData();
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
