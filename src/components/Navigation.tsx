import { cookies } from "next/headers";
import Link from "next/link";

export async function Navigation() {
  const jar = await cookies();
  const isAuthenticated = jar.has("keystatic-gh-access-token");

  return (
    <nav className="bg-primary-container w-full border-b-[3px] border-ink shadow-brutal flex justify-between items-center px-margin-page py-4 sticky top-0 z-50">
      <Link
        href="/"
        className="font-sans text-headline-lg font-black tracking-tighter text-on-surface hover:scale-95 transition-transform"
      >
        kanaka.pages
      </Link>

      <div className="hidden md:flex items-center gap-gap-lg">
        <Link
          href="/"
          className="text-on-surface font-bold underline decoration-[3px] font-label-mono text-label-mono hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-100"
        >
          Latest
        </Link>
        <Link
          href="#"
          className="text-on-surface-variant font-medium hover:text-on-surface font-mono text-label-mono transition-colors"
        >
          Newsletter
        </Link>
        <Link
          href="#"
          className="text-on-surface-variant font-medium hover:text-on-surface font-mono text-label-mono transition-colors"
        >
          About
        </Link>
      </div>

      <div className="flex items-center gap-gap-sm">
        {/* TODO: Implement search functionality */}
        {/* <div className="hidden lg:flex items-center bg-surface-container-lowest border-[3px] border-ink px-3 py-2 focus-within:shadow-brutal transition-shadow">
          <input
            className="bg-transparent border-none focus:ring-0 font-mono text-label-mono placeholder:text-on-surface-variant w-40 outline-none"
            placeholder="Search..."
            type="text"
          />
          <span className="text-ink text-sm ml-1">🔍</span>
        </div> */}
        {isAuthenticated && (
          <Link
            href="/keystatic"
            className="bg-action text-white font-mono text-label-mono uppercase font-bold border-[3px] border-ink px-4 py-2 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-100 whitespace-nowrap"
          >
            Write Post
          </Link>
        )}
      </div>
    </nav>
  );
}
