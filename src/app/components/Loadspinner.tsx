export function LoadSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-lg">Loading, please wait...</p>
    </div>
  )
}
