import { ContinuousCalendar } from "./ContinuousCalendar";

export default function Gridlayout() {
  return (
    <div className="py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* Header Section */}
        <h2 className="text-center text-base/7 font-semibold text-indigo-400">
          Dashboard
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          overview
        </p>

        {/* Grid Container */}
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Left Column (Spans 2 rows) - Calendar */}
          <div className="relative lg:row-span-2 rounded-lg bg-gray-800 border border-gray-700/50 overflow-hidden h-[400px] lg:h-400px">
            <ContinuousCalendar
              onClick={(day, month, year) => console.log(day, month, year)}
            />
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

          {/* Right Column (Spans 2 rows) */}
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
