import { Skeleton } from "./ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex items-center space-x-4 p-4 border-b">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[90px]" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border-b">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[90px]" />
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-4 w-[140px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
