"use client";
import useTubeStatus from "../hooks/use-tube-status";
import ApiStatusWrapper from "./api-status-wrapper";
import styles from "./inner-grid.module.css";

export default function TubeStatusOverlay() {
  const apiResult = useTubeStatus();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => (
        <div className={styles.container}>
          <h2 className="text-4xl">{dto.data.name}</h2>
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
