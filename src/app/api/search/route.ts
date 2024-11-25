import { NextRequest, NextResponse } from "next/server";
import { RedBlackTree } from "../RedBlackTree";
import { faker } from "@faker-js/faker";

import webData from "../webs.json";

export const tree = new RedBlackTree();
webData.forEach((web) => {
  tree.insert(web.key, web.url, faker.lorem.paragraphs({ min: 20, max: 50 }));
});

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";
  const results = tree.searchByKeySubstring(query);
  console.log(query, results[0]);

  if (results) return NextResponse.json(results, { status: 200 });
  else return NextResponse.json({ message: "Not found" }, { status: 404 });
}
