"use client";
import useTubeStatus from "../../hooks/use-tube-status";
import ApiStatusWrapper from "../api-status-wrapper";

export default function TubeStatusOverlay() {
  const apiResult = useTubeStatus();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => (
        <>
          {dto.data.lineStatuses.map(
            (status: {
              statusSeverity: number;
              statusSeverityDescription: string;
            }) => (
              <h2 key={status.statusSeverity}>
                {status.statusSeverityDescription}
              </h2>
            )
          )}
        </>
      )}
    </ApiStatusWrapper>
  );
}
