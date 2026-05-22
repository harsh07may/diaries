import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-primary-container w-full border-b-[3px] border-black shadow-[4px_4px_0px_0px_#000000] flex justify-between items-center px-margin-page py-4 sticky top-0 z-50">
      <Link
        href="/"
        className="font-headline-lg text-headline-lg font-black tracking-tighter uppercase text-on-surface hover:scale-95 transition-transform"
      >
        NEOBLOG
      </Link>

      <div className="hidden md:flex items-center gap-gap-lg">
        <Link
          href="/"
          className="text-on-surface font-bold underline decoration-[3px] font-label-mono text-label-mono hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
        >
          Latest
        </Link>
        <Link
          href="#"
          className="text-on-surface-variant font-medium hover:text-on-surface font-label-mono text-label-mono transition-colors"
        >
          Categories
        </Link>
        <Link
          href="#"
          className="text-on-surface-variant font-medium hover:text-on-surface font-label-mono text-label-mono transition-colors"
        >
          Newsletter
        </Link>
        <Link
          href="#"
          className="text-on-surface-variant font-medium hover:text-on-surface font-label-mono text-label-mono transition-colors"
        >
          About
        </Link>
      </div>

      <div className="flex items-center gap-gap-sm">
        <div className="hidden lg:flex items-center bg-surface-container-lowest border-[3px] border-ink px-3 py-2 focus-within:shadow-brutal transition-shadow">
          <input
            className="bg-transparent border-none focus:ring-0 font-label-mono text-label-mono placeholder:text-on-surface-variant w-40 outline-none"
            placeholder="Search..."
            type="text"
          />
          <span className="text-ink text-sm ml-1">🔍</span>
        </div>
        <button className="bg-action text-white font-label-mono text-label-mono uppercase font-bold border-[3px] border-ink px-4 py-2 shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 whitespace-nowrap">
          Write Post
        </button>
      </div>
    </nav>
  );
}
