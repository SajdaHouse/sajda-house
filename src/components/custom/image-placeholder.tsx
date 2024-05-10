"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
      src: string;
      alt: string;
      width: number;
      height: number;
      priority?: boolean;
}
export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}:ButtonProps ) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className={cn("relative",className)} {...props}>
      {imageLoading && (
        <Image
          className="absolute top-0 right-0 w-full h-full z-50  object-cover"
          width={width}
          height={height}
          alt="placeholder"
          src="data:image/png;base64,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"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => {
          setImageLoading(false);
        }}
        priority={priority}
        className="w-full"
      />
    </div>
  );
}
