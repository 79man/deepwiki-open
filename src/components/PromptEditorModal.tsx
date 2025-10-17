import React, { useEffect, useRef, useState } from 'react';

export interface PromptEditorModalProps {
  isOpen: boolean;
  prompt: string;
  model: string;
  onApply: (editedPrompt: string) => void;
  onCancel: () => void;
}

const PromptEditorModal: React.FC<PromptEditorModalProps> = ({
  isOpen,
  prompt,
  model,
  onApply,
  onCancel,
}) => {
  const [editedPrompt, setEditedPrompt] = useState<string>(prompt);
  const [editedModel, setEditedModel] = useState<string>(model);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset edited prompt whenever modal opens or prompt changes
  useEffect(() => {
    if (isOpen) {
      setEditedPrompt(prompt);
      setEditedModel(model);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 200);
    }
  }, [isOpen, prompt, model]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-editor-title"
    >
      <div className="bg-[var(--card-bg)] rounded-lg shadow-xl w-[90vw] max-w-[1200px] min-h-[240px] p-6 relative border border-[var(--border-color)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2
            id="prompt-editor-title"
            className="text-lg font-semibold text-[var(--accent-primary)]"
          >
            Edit Generation Prompt
            <span className="text-xs font-normal ml-3 text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded border border-[var(--border-color)]/50">
              {editedPrompt.length} chars
            </span>
            <span className="text-xs font-normal ml-3 text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded border border-[var(--border-color)]/50">
              {editedModel}
            </span>
          </h2>
          <button
            aria-label="Close editor"
            className="text-[var(--muted)] hover:text-[var(--accent-primary)] p-1 transition-colors"
            onClick={onCancel}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-3 text-[var(--muted)] text-sm underline">
          Review and edit the prompt before sending. You can customize as needed.
        </div>

        {/* Prompt editor */}
        <textarea
          ref={textareaRef}
          className="w-full rounded border border-[var(--border-color)] bg-[var(--background)] p-3 font-mono text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)] resize-vertical min-h-[55vh] max-h-[85vh]"
          value={editedPrompt}
          onChange={e => setEditedPrompt(e.target.value)}
          spellCheck={false}
          autoFocus={true}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium rounded-md border border-[var(--border-color)]/50 text-[var(--muted)] bg-transparent hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium rounded-md border border-transparent bg-[var(--accent-primary)]/90 text-white hover:bg-[var(--accent-primary)] transition-colors"
            onClick={() => onApply(editedPrompt)}
          >
            Submit & Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptEditorModal;
