import { BoxConfig } from "../grid/box-config";
import Date from "../time/date";
import Day from "../time/day";
import DigitalClock from "../time/digital-clock";

const datetimeContent: React.ReactNode = (
  <div>
    <DigitalClock />
    <Day />
    <Date />
  </div>
);
export const datetimeBoxConfig: BoxConfig = {
  key: "datetime",
  minCols: 1,
  minRows: 1,
  preferredCols: 1,
  preferredRows: 1,
  content: datetimeContent,
};
