"use-client";
import useTubeArrivals from "@/app/hooks/use-tube-arrivals";
import ApiStatusWrapper from "../api-status-wrapper";
import { ArrivalsClientResponse } from "@/app/schemas/arrivials";
import { TubeArrivalsColumn } from "./tube-arrivals-column";

export default function TubeArrivalsOverlay() {
  const apiResult = useTubeArrivals();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { inbound, outbound } = splitByDirection(dto.data);
        return (
          <div className="flex w-full gap-2 h-full">
            <TubeArrivalsColumn title="South" arrivals={inbound} />
            <TubeArrivalsColumn title="North" arrivals={outbound} />
          </div>
        );
      }}
    </ApiStatusWrapper>
  );
}

const splitByDirection = (arrivals: ArrivalsClientResponse) => {
  return arrivals.reduce<{
    inbound: typeof arrivals;
    outbound: typeof arrivals;
  }>(
    (acc, arrival) => {
      const dir = arrival.direction.toLowerCase();
      if (dir === "inbound") {
        acc.inbound.push(arrival);
      } else if (dir === "outbound") {
        acc.outbound.push(arrival);
      }
      return acc;
    },
    { inbound: [], outbound: [] }
  );
};
