import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ─── Headings ──────────────────────────────────────────────────────────
    h1: ({ children }) => (
      <h1 className="font-sans text-headline-lg font-black text-ink mt-gap-lg mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-sans text-headline-md font-black text-ink mt-gap-lg mb-3 border-b-[3px] border-ink pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans text-[20px] font-bold text-ink mt-8 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-[18px] font-bold text-ink mt-6 mb-2">
        {children}
      </h4>
    ),

    // ─── Body ──────────────────────────────────────────────────────────────
    p: ({ children }) => (
      <p className="font-sans text-body-md text-ink mb-4 leading-relaxed">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-black text-ink">{children}</strong>
    ),

    em: ({ children }) => <em className="italic">{children}</em>,

    // ─── Links ─────────────────────────────────────────────────────────────
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-secondary font-bold underline decoration-4 hover:bg-secondary hover:text-white transition-colors px-0.5"
      >
        {children}
      </Link>
    ),

    // ─── Blockquote ────────────────────────────────────────────────────────
    blockquote: ({ children }) => (
      <blockquote className="bg-caution p-gap-md border-[3px] border-ink shadow-brutal rotate-[0.5deg] my-gap-sm font-sans text-body-lg italic">
        {children}
      </blockquote>
    ),

    // ─── Lists ─────────────────────────────────────────────────────────────
    ul: ({ children }) => (
      <ul className="list-disc ml-6 space-y-1.5 mb-4 font-sans text-body-md text-ink">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 space-y-1.5 mb-4 font-sans text-body-md text-ink">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),

    // ─── Code ──────────────────────────────────────────────────────────────
    code: ({ children }) => (
      <code className="bg-surface-container border border-outline-variant px-1.5 py-0.5 font-mono text-[13px] rounded-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-surface-container-high p-gap-md border-[3px] border-ink shadow-brutal overflow-x-auto my-gap-sm font-mono text-sm leading-relaxed">
        {children}
      </pre>
    ),

    // ─── Horizontal Rule ───────────────────────────────────────────────────
    hr: () => (
      <hr className="border-t-[3px] border-ink my-gap-md" />
    ),

    // ─── Images ────────────────────────────────────────────────────────────
    img: (props) => (
      <span className="block my-gap-sm">
        <Image
          {...(props as ImageProps)}
          alt={props.alt ?? ""}
          width={800}
          height={450}
          className="w-full border-[3px] border-ink shadow-brutal"
        />
      </span>
    ),

    // ─── Spread caller-provided overrides ──────────────────────────────────
    ...components,
  };
}
