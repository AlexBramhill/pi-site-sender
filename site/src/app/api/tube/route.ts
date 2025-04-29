import { NextResponse } from "next/server";
import { getLineStatus } from "./tube";
import { config } from "@/app/config/config";

export async function GET() {
  try {
    const status = await getLineStatus(config.HOME_TUBE_LINE_NAME);
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching line status:", error);
    return NextResponse.json(
      { error: "Failed to fetch line status" },
      { status: 500 }
    );
  }
}
