import { NextResponse } from "next/server";
import { tubeArrivalsDataRetriever } from "@/app/services/data-retrievers";

export async function GET() {
  try {
    const tubeModal = await tubeArrivalsDataRetriever.getData();
    return NextResponse.json(tubeModal);
  } catch (error) {
    console.error("Error fetching tube arrivals:", error);
    return NextResponse.json(
      { error: "Failed to fetch tube arrivals" },
      { status: 500 }
    );
  }
}
