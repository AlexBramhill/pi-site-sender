"use client";
import useTubeStatus from "../../hooks/use-tube-status";
import ApiStatusWrapper from "../api-status-wrapper";

export default function TubeStatusOverlay() {
  const apiResult = useTubeStatus();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => (
        <div className="flex flex-col justify-center box-border text-center h-full">
          <h2>{dto.data.name}</h2>
          {dto.data.lineStatuses.map(
            (status: {
              statusSeverity: number;
              statusSeverityDescription: string;
            }) => (
              <span key={status.statusSeverity}>
                {status.statusSeverityDescription}
              </span>
            )
          )}
        </div>
      )}
    </ApiStatusWrapper>
  );
}
