export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-semibold">No predictions yet</h2>
      <p className="text-gray-600">Once you make predictions, they will appear here</p>
    </div>
  );
} 