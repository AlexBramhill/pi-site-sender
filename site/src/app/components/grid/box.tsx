export type GetBoxFragment = ({
  key,
  gridColumnStart,
  gridColumnSpan,
  gridRowStart,
  gridRowSpan,
}: {
  key: string;
  gridColumnStart: number;
  gridColumnSpan: number;
  gridRowStart: number;
  gridRowSpan: number;
}) => React.ReactNode;

export const Box: React.FC<{
  key: string;
  gridColumnStart: number;
  gridColumnSpan: number;
  gridRowStart: number;
  gridRowSpan: number;
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className,
  gridColumnStart,
  gridColumnSpan,
  gridRowStart,
  gridRowSpan,
}) => {
  console.log("Box rendered", {
    gridColumnStart,
    gridColumnSpan,
    gridRowStart,
    gridRowSpan,
  });
  const gridClasses = [
    `col-start-${gridColumnStart}`,
    `col-span-${gridColumnSpan}`,
    `row-start-${gridRowStart}`,
    `row-span-${gridRowSpan}`,
  ].join(" ");

  return (
    <div
      className={`
        border
        border-current
        border-solid
        rounded-sm
        p-1
        flex
        items-center 
        justify-center     
        col-start-${gridColumnStart} 
        col-span-${gridColumnSpan} 
        row-start-${gridRowStart} 
        row-span-${gridRowSpan}  
        ${className || ""}
    `}
    >
      {children}
    </div>
  );
};
