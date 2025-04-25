import { NextRequest, NextResponse } from "next/server";
import { getLineStatus } from "./tube";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lineId = searchParams.get("lineId");

  if (!lineId) {
    return NextResponse.json(
      { error: "Missing lineId parameter" },
      { status: 400 }
    );
  }

  try {
    const status = await getLineStatus(lineId);
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching line status:", error);
    return NextResponse.json(
      { error: "Failed to fetch line status" },
      { status: 500 }
    );
  }
}
