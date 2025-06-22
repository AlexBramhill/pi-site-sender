type Arrival = {
  id: string;
  towards: string;
  timeToStation: number;
};

type ArrivalListProps = {
  title: string;
  arrivals: Arrival[];
};

export function TubeArrivalsColumn({ title, arrivals }: ArrivalListProps) {
  const maxLength = 7;
  return (
    <div className="flex-1">
      <h3>{title}</h3>
      <div className="space-y-1">
        {sortByTime(arrivals)
          .slice(0, maxLength)
          .map((arrival) => (
            <div key={arrival.id} className="flex">
              <span className="w-[4ch] pr-2">
                {Math.ceil(arrival.timeToStation / 60)}m
              </span>
              <span>{getShortenedName(arrival.towards)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

const sortByTime = (arrivals: Arrival[]) => {
  return arrivals.sort((a, b) => {
    const aTime = new Date(a.timeToStation).getTime();
    const bTime = new Date(b.timeToStation).getTime();
    return aTime - bTime;
  });
};

const getShortenedName = (name: string) => {
  const withBrackets = replaceViaWithBrackets(name);

  return replaceLongerNames(withBrackets);
};

const replaceViaWithBrackets = (name: string) => {
  const [main, via] = name.split(" via ");
  if (!via) return name;
  return `${main} (${via})`;
};

const replaceLongerNames = (name: string) => {
  const replacements: Record<string, string> = {
    "High Barnet": "H Barnet",
    "Mill Hill East": "Mill Hill",
    Bank: "B",
    Battersea: "Bttrsea",
  };
  return Object.entries(replacements).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(key, "g"), value);
  }, name);
};
