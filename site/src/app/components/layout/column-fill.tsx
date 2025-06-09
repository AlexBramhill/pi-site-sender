import React from "react";

export const ColumnFill = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative h-full overflow-hidden flex flex-col flex-wrap items-center justify-center ${className}`}
    >
      {React.Children.map(children, (child, idx) => (
        <div className="w-full" key={idx}>
          {child}
        </div>
      ))}
    </div>
  );
};
