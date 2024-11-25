import { NextRequest, NextResponse } from "next/server";
import { tree } from "../../search/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } },
) {
  const { key } = await params;
  const result = tree.search(key);

  if (result) return NextResponse.json(result, { status: 200 });
  else return NextResponse.json({ message: "Not found" }, { status: 404 });
}
