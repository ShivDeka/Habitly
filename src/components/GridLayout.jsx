import Todolist from "./dashboard/Todolist";
import TodaysRun from "./dashboard/TodaysRun";
import WeeklyTable from "./dashboard/WeeklyTable";
import MonthCalendar from "./dashboard/MonthCalendar";

export default function Gridlayout() {
  return (
    // pt-40: pushes content below the fixed navbar so nothing is hidden
    // under it on load. Adjust this number to match your navbar's actual
    // rendered height (inspect it in devtools — if the navbar is taller
    // or shorter than expected, this is the only number to change here).
    // Because Navbar is `fixed`, this padding is what makes the grid
    // "start where the nav ends" — the grid itself scrolls normally
    // underneath the navbar's blurred glass effect once padded past it.
    <div className="pt-40 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* Grid Container */}
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Left Column (spans 2 rows) — To-do list */}
          <div className="relative lg:row-span-2 h-[500px] lg:h-auto">
            <Todolist />
          </div>

          {/* Middle Column (spans 2 rows) — Today's activities, overlapping
              illustration background */}
          <div
            className="relative lg:row-span-2 rounded-lg overflow-hidden h-[500px] lg:h-auto bg-cover bg-center flex items-start p-4"
            style={{ backgroundImage: "url('/park-runner-bg.png')" }}
          >
            <TodaysRun />
          </div>

          {/* Right Top — This week's habit table */}
          <div className="relative h-[340px] lg:h-auto">
            <WeeklyTable />
          </div>

          {/* Right Bottom — Mini month calendar */}
          <div className="relative h-[400px] lg:h-auto">
            <MonthCalendar
              onDayClick={(day, month, year) => console.log(day, month, year)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
