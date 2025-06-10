import useNews from "@/app/hooks/use-news";
import ApiStatusWrapper from "../api-status-wrapper";
import { ColumnFill } from "../layout/column-fill";
import { getTime } from "@/app/converters/to-two-digit-time";
import { HorizontalLine } from "../layout/horizontal-line";

export default function Newsfeed() {
  const apiResult = useNews();

  return (
    <ApiStatusWrapper apiResult={apiResult} className="h-full">
      {(dto) => (
        <ColumnFill>
          {dto.data.map((newsItem, i) => (
            <>
              {i >= 1 && <HorizontalLine className="my-1" />}
              <div key={newsItem.title}>
                <p>
                  {getTime(newsItem.pubDate)} - {newsItem.title}
                </p>
              </div>
            </>
          ))}
        </ColumnFill>
      )}
    </ApiStatusWrapper>
  );
}
