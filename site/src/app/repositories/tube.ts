import {
  LineStatusFailureModel,
  LineStatusFailureModelSchema,
  LineStatusSuccessModel,
  LineStatusSuccessModelSchema,
} from "../schemas/line-status";
import db from "./database";

// Can be abstracted
export const saveTubeStatus = async (
  data: LineStatusSuccessModel | LineStatusFailureModel
) => {
  const { fetchedAt, isSuccess } = data;
  const lineStatus = isSuccess ? JSON.stringify(data.lineStatus) : null;
  const saveTubeData = db.prepare(
    `INSERT INTO tube (last_fetched, is_success, lineStatus) VALUES (?, ?, ?)`
  );

  saveTubeData.run(fetchedAt, isSuccess, lineStatus);
};

export function getLatestTubeData() {
  const getLatestTubeData = db.prepare(`
      SELECT * FROM tube ORDER BY last_fetched DESC LIMIT 1
    `);
  return getLatestTubeData.get();
}

export const getLatestSuccessfulTubeData = (): LineStatusSuccessModel => {
  const getLatestTubeData = db.prepare(`
      SELECT * FROM tube WHERE is_success = 1 ORDER BY last_fetched DESC LIMIT 1
    `);

  if (!getLatestTubeData) {
    throw new Error("No successful tube data found");
  }

  return LineStatusSuccessModelSchema.parse(getLatestTubeData.get());
};

export const getLatestFailedTubeData = (): LineStatusFailureModel => {
  const getLatestTubeData = db.prepare(`
      SELECT * FROM tube WHERE is_success = 0 ORDER BY last_fetched DESC LIMIT 1
    `);

  if (!getLatestTubeData) {
    throw new Error("No failed tube data found");
  }

  return LineStatusFailureModelSchema.parse(getLatestTubeData.get());
};
