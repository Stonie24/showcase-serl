"use client";

import { useState } from 'react';

export default function ImageWithFallback({ src, alt, fallbackSrc, ...props }: { src: string, alt: string, fallbackSrc: string, [key: string]: any }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
}
