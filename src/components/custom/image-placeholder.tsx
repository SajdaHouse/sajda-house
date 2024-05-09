"use client";
import Image from "next/image";
import { useState } from "react";

export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="relative">
      {imageLoading && (
        <Image
          className="absolute top-0 right-0 w-full h-full z-50  object-cover"
          width={width}
          height={height}
          alt="placeholder"
          src="/store/placeholder.png"
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
