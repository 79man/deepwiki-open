import React, { useState } from "react";
import { usePromptLog } from "@/contexts/PromptLogContext";
import Markdown from "@/components/Markdown";

const PromptLogFloatingPanel: React.FC = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const { promptLog } = usePromptLog();
  const [markdownMode, setMarkdownMode] = useState<Record<number, boolean>>({});
  const toggleMode = (idx: number) => {
    setMarkdownMode((m) => ({ ...m, [idx]: !m[idx] }));
  };

  // Filter logs by source and model substring (case-insensitive)
  const filteredLog = promptLog.filter(
    (entry) =>
      (sourceFilter.trim() === "" ||
        (entry.source &&
          entry.source.toLowerCase().includes(sourceFilter.toLowerCase()))) &&
      (modelFilter.trim() === "" ||
        (entry.model &&
          entry.model.toLowerCase().includes(modelFilter.toLowerCase())))
  );

  return (
    <>
      {!panelOpen && (
        <button
          className="fixed bottom-24 right-6 z-50 bg-[var(--accent-primary)] text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl transition duration-150 hover:scale-105 active:scale-95"
          title="Show Prompt Log"
          onClick={() => setPanelOpen(true)}
          aria-label="Show Prompt Log"
        >
          📋
        </button>
      )}

      <div
        className={`fixed z-50 top-0 right-0 h-full w-[420px] bg-white dark:bg-[var(--background)] shadow-2xl border-l border-[var(--border-color)] transition-transform duration-300
          ${panelOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ maxWidth: "98vw" }}
      >
        <div className="flex items-center justify-between border-b p-4">
          <span className="font-bold text-lg">Prompt Session Log</span>
          <button
            className="text-2xl hover:text-[var(--danger)]"
            onClick={() => setPanelOpen(false)}
            aria-label="Close Log Panel"
          >
            ×
          </button>
        </div>
        {/* Filter Bar */}
        <div className="border-b p-4 bg-[var(--background)]">
          <div className="grid grid-cols-2 gap-3 items-center">
            {/* Source Filter */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                <span>Source filter</span>
                <span role="img" aria-label="source" className="text-sm">
                  🗂️
                </span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="text-xs rounded border px-2 py-1 bg-white dark:bg-[var(--background)] text-[var(--foreground)] w-full pr-7"
                  placeholder="Type source..."
                />
                {sourceFilter && (
                  <button
                    type="button"
                    onClick={() => setSourceFilter("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--accent-primary)] px-1"
                    title="Clear source filter"
                    aria-label="Clear source filter"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.707 6.293a1 1 0 011.414 0L10 8.172l1.879-1.88a1 1 0 111.415 1.415L11.415 9.586l1.879 1.88a1 1 0 01-1.415 1.415L10 11.001l-1.879 1.88a1 1 0 11-1.415-1.415l1.88-1.88-1.88-1.88a1 1 0 01.001-1.415z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {/* Model Filter */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                <span>Model filter</span>
                <span role="img" aria-label="model" className="text-sm">
                  🤖
                </span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={modelFilter}
                  onChange={(e) => setModelFilter(e.target.value)}
                  className="text-xs rounded border px-2 py-1 bg-white dark:bg-[var(--background)] text-[var(--foreground)] w-full pr-7"
                  placeholder="Type model..."
                />
                {modelFilter && (
                  <button
                    type="button"
                    onClick={() => setModelFilter("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--accent-primary)] px-1"
                    title="Clear model filter"
                    aria-label="Clear model filter"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6.707 6.293a1 1 0 011.414 0L10 8.172l1.879-1.88a1 1 0 111.415 1.415L11.415 9.586l1.879 1.88a1 1 0 01-1.415 1.415L10 11.001l-1.879 1.88a1 1 0 11-1.415-1.415l1.88-1.88-1.88-1.88a1 1 0 01.001-1.415z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[80%] p-2">
          {filteredLog.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              No prompts for this filter.
            </div>
          )}
          {filteredLog.map((entry, i) => (
            <div
              key={i}
              className="mb-6 bg-[var(--card-bg)] rounded shadow p-3"
            >
              <div className="text-xs text-gray-400 mb-2 flex justify-between items-center">
                <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <span className="text-[var(--accent-primary)] font-semibold">
                  {entry.source}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1 flex justify-between">
                <span>
                  Model:{" "}
                  {entry.model ? (
                    <b>{entry.model}</b>
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </span>
                <span>
                  {typeof entry.timeTaken === "number" ? (
                    <>
                      Time Taken: <b>{entry.timeTaken.toFixed(2)}</b> s
                    </>
                  ) : (
                    <span className="text-gray-400 italic">Time Taken: -</span>
                  )}
                </span>
              </div>
              <div className="font-bold text-sm mb-1 text-[var(--accent-primary)]">
                Prompt:
              </div>
              <pre className="bg-[var(--background)] rounded p-2 text-xs overflow-x-auto whitespace-pre-wrap">
                {entry.prompt}
              </pre>
              <div className="font-bold text-sm mt-2 mb-1">Response:</div>
              <div className="mb-6 bg-[var(--card-bg)] rounded shadow p-3">
                {/* other info: timestamp/source/model/etc */}
                <div className="font-bold text-sm mb-1 text-[var(--accent-primary)]">
                  Response:
                </div>

                {/* Response display with top-right toggle button */}
                <div className="relative bg-[var(--background)] rounded p-2 text-xs overflow-x-auto whitespace-pre-wrap">
                  <button
                    onClick={() => toggleMode(i)}
                    className="absolute top-2 right-2 text-2xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-[var(--accent-primary)]/20 transition"
                    aria-label={
                      markdownMode[i] ? "Show plain text" : "Show markdown"
                    }
                    title={
                      markdownMode[i] ? "Show plain text" : "Show markdown"
                    }
                    type="button"
                  >
                    {
                      markdownMode[i] ? (
                        <>≡</> // 3 horizontal lines for "plain"
                      ) : (
                        <>{"{}"}</>
                      ) // curly braces for markdown
                    }
                  </button>

                  {markdownMode[i] ? (
                    <Markdown content={entry.response} />
                  ) : (
                    <pre>{entry.response}</pre>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PromptLogFloatingPanel;
