import { ContinuousCalendar } from "../components/ContinuousCalendar";

const Calendar = () => (
  <div className="px-6 sm:px-12 lg:px-24 xl:px-40 py-10">
    <ContinuousCalendar
      onClick={(day, month, year) => console.log(day, month, year)}
    />
  </div>
);
export default Calendar;
