import React, { useState } from "react";

/**
 * TodaysRun
 *
 * Matches the semi-transparent dark card from the template that overlaps
 * the runner illustration — "Today's run" header, a list of activities
 * each with a Start/End pill button and a status icon (✓ / ✗).
 *
 * Future scope: an activity's lifecycle is Not Started → In Progress → Done.
 * Right now that's modeled with local state per activity; once a backend
 * exists, swap the internal state for props the same way TodoList does
 * (activities / onStart / onEnd passed in, falls back to local state
 * if not provided).
 *
 * Props (all optional):
 * - activities: array of { id, name, status } where status is
 *   "pending" | "active" | "done" | "failed".
 * - onStart(id): called when Start is clicked — wire to your API to mark
 *   an activity in-progress (e.g. PATCH /api/activities/:id { status: "active" }).
 * - onEnd(id): called when End is clicked — wire to mark it complete.
 */

const defaultActivities = [
  { id: 1, name: "Running 5 km", status: "pending" },
  { id: 2, name: "Yoga 1 hour", status: "failed" },
  { id: 3, name: "Gym 2 hours", status: "pending" },
  { id: 4, name: "Exmplen", status: "pending" },
  { id: 5, name: "Example", status: "pending" },
];

const StatusIcon = ({ status }) => {
  if (status === "done") {
    return (
      <span className="flex items-center justify-center size-6 rounded-full bg-green-500 shrink-0">
        <svg
          viewBox="0 0 20 20"
          fill="white"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
        </svg>
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="flex items-center justify-center size-6 rounded-full bg-red-500 shrink-0">
        <svg
          viewBox="0 0 20 20"
          fill="white"
          className="size-3"
          aria-hidden="true"
        >
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 10l-4.72 4.72a.75.75 0 1 0 1.06 1.06L10 11.06l4.72 4.72a.75.75 0 1 0 1.06-1.06L11.06 10l4.72-4.72a.75.75 0 0 0-1.06-1.06L10 8.94 5.28 4.22Z" />
        </svg>
      </span>
    );
  }
  // pending / active — neutral outline, nothing failed or completed yet
  return (
    <span className="flex items-center justify-center size-6 rounded-full border-2 border-slate-400 shrink-0" />
  );
};

const TodaysRun = ({ activities, onStart, onEnd }) => {
  const isControlled = Array.isArray(activities);
  const [localActivities, setLocalActivities] = useState(defaultActivities);

  const list = isControlled ? activities : localActivities;

  const handleStart = (id) => {
    if (onStart) {
      onStart(id);
      return;
    }
    setLocalActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "active" } : a)),
    );
  };

  const handleEnd = (id) => {
    if (onEnd) {
      onEnd(id);
      return;
    }
    setLocalActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "done" } : a)),
    );
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-xl">
      <style>{`
        .todays-run-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .todays-run-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .todays-run-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.5); /* slate-400 @ 50% */
          border-radius: 9999px;
        }
        .todays-run-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(148, 163, 184, 0.8);
        }
        .todays-run-scroll {
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
        }
      `}</style>
      <h2 className="text-white text-lg font-bold mb-4">Today's run</h2>

      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2 todays-run-scroll">
        {list.length === 0 && (
          <p className="text-slate-300 text-sm text-center py-4">
            Nothing planned yet.
          </p>
        )}

        {list.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-teal-300 font-semibold text-sm truncate">
              {activity.name}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {activity.status === "active" ? (
                <button
                  type="button"
                  onClick={() => handleEnd(activity.id)}
                  className="rounded-full bg-slate-900 text-white text-xs font-semibold px-4 py-1.5 hover:bg-slate-950 transition-colors"
                >
                  End
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStart(activity.id)}
                  disabled={activity.status === "done"}
                  className="rounded-full bg-cyan-400 text-slate-900 text-xs font-semibold px-4 py-1.5 hover:bg-cyan-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Start
                </button>
              )}

              <StatusIcon status={activity.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysRun;
