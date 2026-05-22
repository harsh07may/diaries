'use client';

import React from 'react';

export function PostContent({ content }: { content: string }) {
  // Simple markdown-like rendering (will be replaced with proper MDX later)
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-4xl font-black text-ink mt-gap-lg mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-2xl font-bold text-ink mt-gap-lg mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-xl font-bold text-ink mt-6 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={idx} className="ml-6 text-ink">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.startsWith('1. ')) {
        elements.push(
          <li key={idx} className="ml-6 text-ink list-decimal">
            {line.replace(/\d+\. /, '')}
          </li>
        );
      } else if (line.startsWith('```')) {
        // Skip code fence markers
      } else if (line.trim()) {
        elements.push(
          <p key={idx} className="text-ink mb-4 leading-relaxed">
            {line}
          </p>
        );
      } else {
        elements.push(<div key={idx} className="mb-4" />);
      }
    });

    return elements;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-gap-lg">
      <article className="prose prose-sm text-ink">
        {renderContent(content)}
      </article>
    </div>
  );
}
