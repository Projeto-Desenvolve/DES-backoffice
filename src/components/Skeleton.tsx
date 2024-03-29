/**
 * Renders a skeleton screen component for loading states.
 *
 * @returns {JSX.Element} A skeleton screen with animated placeholders to indicate loading content.
 */
function Skeleton(): JSX.Element {
  return (
    <div className="mx-auto w-full rounded-md border border-gray-400 bg-gray-400 p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-600"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-600"></div>
              <div className="col-span-1 h-2 rounded bg-gray-600"></div>
            </div>
            <div className="h-2 rounded bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton };
