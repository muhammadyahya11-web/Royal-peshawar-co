import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="border rounded-lg p-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-300 h-48 w-full rounded-md" />

      {/* Title Skeleton */}
      <div className="mt-3 h-4 bg-gray-300 rounded w-3/4" />

      {/* Price Skeleton */}
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
