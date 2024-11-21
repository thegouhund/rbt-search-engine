import { NextRequest, NextResponse } from "next/server";
import { RedBlackTree } from "../RedBlackTree";

const tree = new RedBlackTree();
tree.insert("google", "https://www.google.com");
tree.insert("facebook", "https://www.facebook.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook1", "https://www.facebook1.com");
tree.insert("facebook", "https://www.facebook.com");
tree.insert("twitter", "https://www.twitter.com");
tree.insert("github", "https://www.github.com");
tree.insert("stackoverflow", "https://stackoverflow.com");
tree.insert("youtube", "https://www.youtube.com");

export async function GET(request: NextRequest) {
  tree.printTree();
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = tree.searchByKeySubstring(query);

  if (results) return NextResponse.json(results, { status: 200 });
  else return NextResponse.json({ message: "Not found" }, { status: 404 });
}
