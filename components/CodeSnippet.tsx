'use client';

/**
 * Reusable code snippet component with syntax highlighting and copy functionality
 * Used in Integration Wizard and other places where code examples are displayed
 */

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeSnippetProps {
  code: string;
  language?: string;
  showCopyButton?: boolean;
  onCopy?: () => void;
}

export default function CodeSnippet({
  code,
  language = 'bash',
  showCopyButton = true,
  onCopy,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (onCopy) {
        onCopy();
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden">
      {/* Copy Button */}
      {showCopyButton && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-2 top-2 z-10 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-100 transition-all hover:bg-zinc-700 hover:scale-105 active:scale-95"
          aria-label="Copy code to clipboard"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      )}

      {/* Code Block */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem',
        }}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

