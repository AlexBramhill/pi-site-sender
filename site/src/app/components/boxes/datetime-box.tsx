import { BoxConfig } from "../grid/box-config";
import { ColumnFill } from "../layout/column-fill";
import Date from "../time/date";
import Day from "../time/day";
import DigitalClock from "../time/digital-clock";

const datetimeContent: React.ReactNode = (
  <ColumnFill>
    <DigitalClock />
    <Day />
    <Date />
  </ColumnFill>
);
export const datetimeBoxConfig: BoxConfig = {
  key: "datetime",
  minCols: 1,
  minRows: 1,
  preferredCols: 1,
  preferredRows: 1,
  content: datetimeContent,
};
