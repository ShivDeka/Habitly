import React, { useState } from "react";

/**
 * TodoList
 *
 * Matches the dark rounded "TO-DO-LIST" card from the dashboard template.
 * Ships with local state + dummy tasks so it's fully functional out of
 * the box, but every data-touching bit is isolated so it's easy to swap
 * for real user data later (see "Future scope" notes below each spot).
 *
 * Props (all optional — component is self-sufficient without them):
 * - tasks: array of { id, text, time, done } — pass this once tasks live
 *   in your backend/global state, instead of the internal default list.
 * - onAdd(text, time): called when the user adds a task. Wire this to
 *   your API call (e.g. POST /api/todos) once the backend exists.
 * - onToggle(id): called when a checkbox is clicked. Wire to a
 *   PATCH /api/todos/:id call to persist completion state.
 * - onDelete(id): called when a task's delete (x) is clicked. Wire to
 *   DELETE /api/todos/:id.
 *
 * If tasks/onAdd/onToggle/onDelete aren't passed in, the component
 * manages everything itself with useState — handy for local dev/demo
 * before the backend is ready.
 */

const defaultTasks = [
  { id: 1, text: "take out the trash", time: "9:00 AM", done: false },
  { id: 2, text: "do homework", time: "12:00 PM", done: true },
  { id: 3, text: "go to grocery store", time: "1:00 PM", done: false },
  { id: 4, text: "run 5 kilometers", time: "4:20 PM", done: false },
  { id: 5, text: "load the dishwasher", time: "9:00 PM", done: false },
];

const TodoList = ({ tasks, onAdd, onToggle, onDelete }) => {
  // Falls back to local state when no external tasks/handlers are given.
  const isControlled = Array.isArray(tasks);
  const [localTasks, setLocalTasks] = useState(defaultTasks);
  const [newText, setNewText] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const list = isControlled ? tasks : localTasks;

  const handleToggle = (id) => {
    if (onToggle) {
      onToggle(id);
      return;
    }
    setLocalTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
      return;
    }
    setLocalTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    if (onAdd) {
      onAdd(newText.trim(), newTime.trim());
    } else {
      setLocalTasks((prev) => [
        ...prev,
        {
          id: Date.now(), // Future scope: real id will come from the DB
          text: newText.trim(),
          time: newTime.trim() || "—",
          done: false,
        },
      ]);
    }

    setNewText("");
    setNewTime("");
    setShowAddForm(false);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-5 flex flex-col h-full max-h-[420px] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold tracking-wide uppercase">
          To-Do List
        </h2>
        <button
          type="button"
          onClick={() => setShowAddForm((v) => !v)}
          aria-label="Add task"
          className="text-teal-400 hover:text-teal-300 text-2xl leading-none transition-colors"
        >
          {showAddForm ? "×" : "+"}
        </button>
      </div>

      {/* Add-task form — future scope: this is where new tasks get created */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="mb-3 flex flex-col gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="New task"
            autoFocus
            className="rounded-lg bg-slate-800 text-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400 placeholder:text-slate-500"
          />
          <div className="flex gap-2">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="flex-1 rounded-lg bg-slate-800 text-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 text-sm font-semibold px-4 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Task list */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        {list.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-6">
            No tasks yet — add one above to get started.
          </p>
        )}

        {list.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between bg-white rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => handleToggle(task.id)}
                aria-label={task.done ? "Mark as not done" : "Mark as done"}
                className={`shrink-0 size-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.done
                    ? "bg-green-500 border-green-500"
                    : "border-slate-300 hover:border-teal-400"
                }`}
              >
                {task.done && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="white"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
                  </svg>
                )}
              </button>
              <span
                className={`truncate text-sm font-medium ${
                  task.done ? "line-through text-slate-400" : "text-slate-800"
                }`}
              >
                {task.text}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                {task.time}
              </span>
              {/* Future scope: swap for a proper confirm dialog before delete */}
              <button
                type="button"
                onClick={() => handleDelete(task.id)}
                aria-label="Delete task"
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
