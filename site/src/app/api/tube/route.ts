import { NextResponse } from "next/server";
import { tubeDataRetriever } from "@/app/services/data-retrievers";

export async function GET() {
  try {
    const tubeModal = await tubeDataRetriever.getData();
    return NextResponse.json(tubeModal);
  } catch (error) {
    console.error("Error fetching line status:", error);
    return NextResponse.json(
      { error: "Failed to fetch line status" },
      { status: 500 }
    );
  }
}
