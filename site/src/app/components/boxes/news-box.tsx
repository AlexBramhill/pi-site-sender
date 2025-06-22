import { BoxConfig } from "../grid/box-config";
import Newsfeed from "../news/newsfeed";

const newsfeedContent: React.ReactNode = <Newsfeed />;

export const newsfeedBoxConfig: BoxConfig = {
  key: "newsfeed",
  minCols: 2,
  minRows: 1,
  preferredCols: 2,
  preferredRows: 1,
  content: newsfeedContent,
};
