export interface BoxProps {
  id: string;
  minCols: number;
  minRows: number;
  preferredCols: number;
  preferredRows: number;
  priority: number;
  label: string;
}

export const Box: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={`border border-current border-solid rounded-sm p-1 ${className}`}
    >
      {children}
    </div>
  );
};
