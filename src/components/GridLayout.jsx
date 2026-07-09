export default function Gridlayout() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* Header Section */}
        <h2 className="text-center text-base/7 font-semibold text-indigo-400">
          Dashboard Layout
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Overview
        </p>

        {/* Grid Container */}
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Left Column (Spans 2 rows) */}
          <div className="relative lg:row-span-2 rounded-lg bg-gray-800 p-8 flex flex-col justify-center items-center border border-gray-700/50">
            <p className="text-xl font-medium text-white">Calender</p>
          </div>

          {/* Middle Top Column */}
          <div className="relative rounded-lg bg-gray-800 p-8 flex flex-col justify-center items-center border border-gray-700/50">
            <p className="text-xl font-medium text-white">
              Performance Metrics
            </p>
          </div>

          {/* Middle Bottom Column */}
          <div className="relative rounded-lg bg-gray-800 p-8 flex flex-col justify-center items-center border border-gray-700/50">
            <p className="text-xl font-medium text-white">
              weekly performance{" "}
            </p>
          </div>

          {/* Right Column (Spans 2 rows) - Calendar */}
          <div className="relative lg:row-span-2 rounded-lg bg-gray-800 p-8 flex flex-col justify-center items-center border border-gray-700/50">
            <p className="text-xl font-medium text-indigo-400 font-semibold">
              performance Metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
