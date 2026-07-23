import React, { useState } from "react";

/**
 * WeeklyTable
 *
 * Matches the "This Week" card — a Notion-style table with one row per
 * day, a progress bar per row, a grid of habit checkboxes per column,
 * and an average row at the bottom.
 *
 * Future scope: habits are currently a fixed list of columns with a
 * single-letter/icon label. Once you have real habit data per user,
 * pass `habits` (column defs) and `rows` (day data) in as props instead
 * of relying on the defaults — the component renders whatever it's
 * given, so adding/removing habit columns from settings later just
 * means changing what you pass in, no changes needed here.
 *
 * Props (all optional):
 * - habits: array of { id, label } — one per checkbox column.
 * - rows: array of { date, progress, checks: { [habitId]: boolean } }
 * - onToggleCheck(date, habitId): called when a checkbox is clicked.
 *   Wire to PATCH /api/habits/:date/:habitId once backend exists.
 */

const defaultHabits = [
  { id: "water", label: "💧" },
  { id: "exercise", label: "🏃" },
  { id: "sleep", label: "😴" },
  { id: "read", label: "📖" },
  { id: "meds", label: "💊" },
  { id: "meditate", label: "🧘" },
  { id: "journal", label: "✏️" },
  { id: "diet", label: "🥗" },
];

const defaultRows = [
  { date: "August 31, 2025", progress: 90, checks: { water: true, exercise: true, sleep: true, read: false, meds: true, meditate: true, journal: true, diet: true } },
  { date: "September 1, 2025", progress: 100, checks: { water: true, exercise: true, sleep: true, read: true, meds: true, meditate: true, journal: true, diet: true } },
  { date: "September 2, 2025", progress: 90, checks: { water: true, exercise: true, sleep: true, read: true, meds: false, meditate: true, journal: true, diet: true } },
  { date: "September 3, 2025", progress: 70, checks: { water: true, exercise: true, sleep: false, read: true, meds: true, meditate: false, journal: false, diet: true } },
  { date: "September 4, 2025", progress: 0, checks: {} },
  { date: "September 5, 2025", progress: 0, checks: {} },
  { date: "September 6, 2025", progress: 0, checks: {} },
];

const WeeklyTable = ({ habits, rows, onToggleCheck }) => {
  const isControlled = Array.isArray(rows);
  const [localRows, setLocalRows] = useState(defaultRows);
  const habitList = habits || defaultHabits;
  const rowList = isControlled ? rows : localRows;

  const handleToggle = (date, habitId) => {
    if (onToggleCheck) {
      onToggleCheck(date, habitId);
      return;
    }
    setLocalRows((prev) =>
      prev.map((row) =>
        row.date === date
          ? { ...row, checks: { ...row.checks, [habitId]: !row.checks[habitId] } }
          : row
      )
    );
  };

  // Average completions per habit column, for the footer row.
  const averages = habitList.map((habit) => {
    const count = rowList.filter((row) => row.checks[habit.id]).length;
    return count;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-slate-800 font-bold text-base flex items-center gap-2">
          <span aria-hidden="true">🗓️</span> This Week
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span aria-hidden="true">▦</span> Table
        </button>
      </div>

      <table className="w-full text-xs border-collapse min-w-[520px]">
        <thead>
          <tr className="text-slate-500">
            <th className="text-left font-medium py-1.5 pr-3 whitespace-nowrap">Date</th>
            <th className="text-left font-medium py-1.5 pr-3 min-w-[100px]">Progress</th>
            {habitList.map((habit) => (
              <th key={habit.id} className="font-medium py-1.5 px-1 text-center" title={habit.id}>
                {habit.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowList.map((row) => (
            <tr key={row.date} className="border-t border-slate-100">
              <td className="py-2 pr-3 text-slate-700 whitespace-nowrap">{row.date}</td>
              <td className="py-2 pr-3">
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full transition-all"
                    style={{ width: `${row.progress}%` }}
                  />
                </div>
              </td>
              {habitList.map((habit) => (
                <td key={habit.id} className="py-2 px-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleToggle(row.date, habit.id)}
                    aria-label={`${habit.id} on ${row.date}`}
                    className={`size-4 rounded border transition-colors ${
                      row.checks[habit.id]
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300 hover:border-blue-400"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-slate-200">
            <td className="py-2 pr-3 text-slate-500 font-medium" colSpan={2}>
              Average
            </td>
            {averages.map((avg, i) => (
              <td key={habitList[i].id} className="py-2 px-1 text-center text-slate-500 font-medium">
                {avg}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WeeklyTable;
