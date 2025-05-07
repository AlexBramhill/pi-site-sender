export default function PicoGrid({
  children,
  direction = "row",
  wrap = "nowrap",
  gap = "1rem",
  style = {},
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string;
  style?: React.CSSProperties;
}) {
  const flexStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    gap: gap,
    ...style,
  };

  return <div style={flexStyle}>{children}</div>;
}
