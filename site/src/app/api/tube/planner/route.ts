import { NextResponse } from "next/server";
import { tubePlannerDataRetriever } from "@/app/services/data-retrievers";
import { GetPlannedJourneyRequestQuerySchema } from "@/app/schemas/planned-journey-request";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const validatedParams =
      GetPlannedJourneyRequestQuerySchema.parse(queryParams);

    const tubeModal = await tubePlannerDataRetriever.getData(validatedParams);

    return NextResponse.json(tubeModal);
  } catch (error) {
    console.error("Error fetching planner:", error);
    return NextResponse.json(
      { error: "Failed to fetch planner" },
      { status: 500 }
    );
  }
}
