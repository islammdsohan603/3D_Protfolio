"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatImageUrl, FALLBACK_IMAGE_URL } from "@/lib/utils/formatImageUrl";

interface ProjectDetailHeroImageProps {
  src: string;
  alt: string;
}

export default function ProjectDetailHeroImage({ src, alt }: ProjectDetailHeroImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => formatImageUrl(src));
  const [isUnoptimized, setIsUnoptimized] = useState<boolean>(false);

  const handleError = () => {
    if (!isUnoptimized) {
      setIsUnoptimized(true);
    } else {
      setImgSrc(FALLBACK_IMAGE_URL);
    }
  };

  return (
    <div className="relative w-full h-80 sm:h-[480px] rounded-2xl overflow-hidden bg-[#0d1117] border border-white/[0.1] shadow-2xl">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        unoptimized={isUnoptimized}
        onError={handleError}
        className="object-cover object-top"
        priority
      />
    </div>
  );
}
