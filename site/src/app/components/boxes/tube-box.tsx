import { BoxConfig } from "../grid/box-config";
import TubeStatusOverlay from "../tube/tube-status";
import TubeArrivalsOverlay from "../tube/tube-arrivals";

const tubeContent: React.ReactNode = (
  <div className="overflow-hidden h-full">
    <TubeStatusOverlay />
    <TubeArrivalsOverlay />
  </div>
);

export const tubeStatusBoxConfig: BoxConfig = {
  key: "tubeStatus",
  minCols: 1,
  minRows: 1,
  preferredCols: 2,
  preferredRows: 2,
  content: tubeContent,
};
