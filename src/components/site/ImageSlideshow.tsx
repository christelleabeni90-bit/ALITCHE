import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ImageSlideshowProps = {
  images: string[];
  intervalMs?: number;
  className?: string;
  overlayClassName?: string;
};

export function ImageSlideshow({
  images,
  intervalMs = 5000,
  className = "",
  overlayClassName = "bg-primary/45",
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
