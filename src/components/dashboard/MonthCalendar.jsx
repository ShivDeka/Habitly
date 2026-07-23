import React, { useState } from "react";

/**
 * MonthCalendar
 *
 * A standard single-month calendar view — shows only the current month's
 * weeks/days (padded with the tail end of the previous month and the
 * start of the next, like any normal calendar grid), with prev/next
 * month navigation. Unlike ContinuousCalendar, this never renders more
 * than one month at a time, so it fits neatly into a small card.
 *
 * Future scope: events are currently just an in-memory object keyed by
 * date. Swap `events`/`onAddEvent` for real props once you have a
 * backend — e.g. GET /api/events?month=... to populate `events`, and
 * POST /api/events for onAddEvent.
 *
 * Props (all optional):
 * - events: { "YYYY-M-D": [{ id, title, color }] } — dots/bars shown on
 *   that day. Falls back to a couple of sample events if not passed.
 * - onDayClick(day, month, year): called when a day cell is clicked.
 * - onAddEvent(): called when "+ Add Event" is clicked.
 */

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const defaultEvents = {
  "2025-0-6": [{ id: 1, title: "Kickoff", color: "bg-pink-300" }],
  "2025-0-10": [{ id: 2, title: "Review", color: "bg-green-400" }],
  "2025-0-13": [{ id: 3, title: "Sprint", color: "bg-sky-300" }],
  "2025-0-24": [{ id: 4, title: "Demo", color: "bg-amber-300" }],
};

const MonthCalendar = ({ events, onDayClick, onAddEvent }) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const eventMap = events || defaultEvents;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const handleToday = () => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

  // Build a single month's grid: leading days from prev month, all days
  // of this month, trailing days from next month — enough to fill full
  // weeks (rows of 7), same as any normal calendar.
  const buildMonthGrid = () => {
    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    // Leading days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, inMonth: false, month: month - 1 });
    }
    // This month's days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, inMonth: true, month });
    }
    // Trailing days to complete the last week
    const remainder = cells.length % 7;
    if (remainder > 0) {
      const needed = 7 - remainder;
      for (let d = 1; d <= needed; d++) {
        cells.push({ day: d, inMonth: false, month: month + 1 });
      }
    }

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  };

  const weeks = buildMonthGrid();

  const eventKey = (day, cellMonth) => {
    // Normalize month index for prev/next-month spillover cells
    let m = cellMonth;
    let y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-slate-800 font-bold text-base">
          {monthNames[month]} {year}
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="rounded-full border border-slate-300 p-1 hover:bg-slate-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-4 text-slate-800" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleToday}
            className="rounded-lg border border-gray-300 px-2 py-1 text-xs font-medium text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="rounded-full border border-slate-300 p-1 hover:bg-slate-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-4 text-slate-800" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={onAddEvent}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-gradient-to-bl transition-colors whitespace-nowrap"
        >
          + Add Event
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center text-slate-500 text-xs font-semibold border-b border-slate-200 pb-1.5 mb-1">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Month grid — only this month's weeks, nothing else */}
      <div className="flex-1 flex flex-col gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 flex-1">
            {week.map(({ day, inMonth, month: cellMonth }, di) => {
              const isToday =
                inMonth &&
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;

              const key = eventKey(day, cellMonth);
              const dayEvents = eventMap[key] || [];

              return (
                <button
                  key={`${wi}-${di}`}
                  type="button"
                  onClick={() => inMonth && onDayClick && onDayClick(day, month, year)}
                  className={`relative rounded-lg border text-left p-1 flex flex-col justify-between transition-colors ${
                    inMonth
                      ? "border-slate-200 hover:border-cyan-400 cursor-pointer"
                      : "border-transparent cursor-default"
                  }`}
                >
                  <span
                    className={`text-xs font-medium ${
                      isToday
                        ? "bg-blue-500 text-white rounded-full size-5 flex items-center justify-center"
                        : inMonth
                        ? "text-slate-800"
                        : "text-slate-300"
                    }`}
                  >
                    {day}
                  </span>

                  {dayEvents.length > 0 && (
                    <div className="flex flex-col gap-0.5">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <span
                          key={ev.id}
                          className={`h-1.5 rounded-full ${ev.color}`}
                          title={ev.title}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;