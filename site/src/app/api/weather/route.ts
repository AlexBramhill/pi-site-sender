import { NextResponse } from "next/server";
import { getWeather } from "./weather";

export async function GET() {
  try {
    const status = await getWeather();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
