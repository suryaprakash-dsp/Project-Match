import React from 'react';

function SkeletonBox({ className = '' }) {
  return <div className={`bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse ${className}`} />;
}

export function StudentCardSkeleton() {
  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-12 h-12 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <SkeletonBox className="h-4 w-3/4" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
      </div>
      <div className="flex gap-2">
        <SkeletonBox className="h-6 w-16 rounded-full" />
        <SkeletonBox className="h-6 w-20 rounded-full" />
        <SkeletonBox className="h-6 w-14 rounded-full" />
      </div>
      <SkeletonBox className="h-2 rounded-full" />
      <div className="flex gap-2">
        <SkeletonBox className="h-9 flex-1 rounded-xl" />
        <SkeletonBox className="h-9 flex-1 rounded-xl" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="card space-y-4">
      <SkeletonBox className="h-5 w-2/3" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-4/5" />
      <div className="flex gap-2">
        <SkeletonBox className="h-6 w-16 rounded-full" />
        <SkeletonBox className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonBox className="h-9 w-full rounded-xl" />
    </div>
  );
}

export default SkeletonBox;
