import { BoxConfig } from "../grid/box-config";
import TubeStatusOverlay from "../tube/tube-status";

const tubeStatusContent: React.ReactNode = <TubeStatusOverlay />;

export const tubeStatusBoxConfig: BoxConfig = {
  key: "tubeStatus",
  minCols: 1,
  minRows: 1,
  preferredCols: 2,
  preferredRows: 2,
  content: tubeStatusContent,
};
