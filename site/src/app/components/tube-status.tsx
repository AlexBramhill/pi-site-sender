"use client";
import { useTubeStatus } from "../hooks/use-tube-status";
import styles from "./../page.module.css";

type TubeStatusOverlayProps = {
  lineId: string;
};

export default function TubeStatusOverlay({ lineId }: TubeStatusOverlayProps) {
  const { data: lineStatus, loading, error } = useTubeStatus(lineId);

  if (loading) return <div className={styles.overlay}>Loading...</div>;
  if (error) return <div className={styles.overlay}>Error: {error}</div>;
  if (!lineStatus) return <div className={styles.overlay}>No data found</div>;

  return (
    <div className={styles.overlay}>
      <h2>{lineStatus.name}</h2>
      {lineStatus.lineStatuses.map(
        (status: {
          statusSeverity: string;
          statusSeverityDescription: string;
        }) => (
          <span key={status.statusSeverity}>
            {status.statusSeverityDescription}
          </span>
        )
      )}
    </div>
  );
}
