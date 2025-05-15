import { NextResponse } from "next/server";
import { weatherDataRetriever } from "@/app/services/data-retrievers";

export async function GET() {
  try {
    const status = await weatherDataRetriever.getData();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
