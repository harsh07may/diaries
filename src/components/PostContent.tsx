'use client';

import React from 'react';

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-black text-ink">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-surface-container border border-outline-variant px-1.5 py-0.5 font-mono text-[13px] rounded">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function PostContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  function flushList() {
    if (listBuffer.length === 0) return;
    const Tag = listType === 'ol' ? 'ol' : 'ul';
    const cls = listType === 'ol' ? 'list-decimal' : 'list-disc';
    elements.push(
      <Tag key={`list-${elements.length}`} className={`${cls} ml-6 space-y-1 mb-4 font-sans text-body-md text-ink`}>
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </Tag>
    );
    listBuffer = [];
    listType = null;
  }

  lines.forEach((line, idx) => {
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={idx} className="font-sans text-headline-lg font-black text-ink mt-gap-lg mb-4 leading-tight">
          {renderInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={idx} className="font-sans text-headline-md font-black text-ink mt-gap-lg mb-3 border-b-2 border-outline-variant pb-2">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="font-sans text-[20px] font-bold text-ink mt-6 mb-2">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote
          key={idx}
          className="bg-caution p-gap-md border-[3px] border-ink shadow-brutal rotate-[0.5deg] my-gap-sm font-sans text-body-lg italic"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
    } else if (line.startsWith('- ')) {
      if (listType !== 'ul') { flushList(); listType = 'ul'; }
      listBuffer.push(line.slice(2));
    } else if (/^\d+\. /.test(line)) {
      if (listType !== 'ol') { flushList(); listType = 'ol'; }
      listBuffer.push(line.replace(/^\d+\. /, ''));
    } else if (line.startsWith('```')) {
      flushList();
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p key={idx} className="font-sans text-body-md text-ink mb-4 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    } else {
      flushList();
      elements.push(<div key={idx} className="mb-2" />);
    }
  });

  flushList();

  return (
    <div className="flex flex-col gap-1">
      {elements}
    </div>
  );
}
