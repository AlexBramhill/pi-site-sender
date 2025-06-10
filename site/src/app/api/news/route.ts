import { NextResponse } from "next/server";
import { bbcDataRetriever } from "@/app/services/data-retrievers";

export async function GET() {
  try {
    const news = await bbcDataRetriever.getData();
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
