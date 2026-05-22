import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Two-column layout: image on the left, content on the right.
 * Matches the "Flat Visuals Rule" block in the Stitch post-view reference.
 *
 * Usage in MDX:
 * <ImageGrid src="/images/example.jpg" alt="Description" title="Section Title">
 *   Body text goes here as the children.
 * </ImageGrid>
 */
export function ImageGrid({
  src,
  alt,
  title,
  children,
}: {
  src: string;
  alt: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full border-[3px] border-ink shadow-brutal p-gap-md bg-surface-container-low my-gap-sm flex flex-col sm:flex-row gap-gap-md items-center">
      <div className="w-full sm:w-1/2 shrink-0">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className="w-full border-[3px] border-ink object-cover"
        />
      </div>
      <div className="w-full sm:w-1/2">
        {title && (
          <h3 className="font-sans text-headline-md font-bold mb-gap-sm">
            {title}
          </h3>
        )}
        <div className="font-sans text-body-md text-ink leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
