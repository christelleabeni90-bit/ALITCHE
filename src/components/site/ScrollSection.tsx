import { useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 90, damping: 22 };

type SectionBridgeProps = {
  label: string;
  className?: string;
};

/** Pont animé entre deux sections — annonce la section suivante au scroll */
export function SectionBridge({ label, className = "" }: SectionBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6, margin: "-8% 0px" });

  return (
    <div ref={ref} className={`relative py-10 sm:py-14 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/8 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      <div className="mx-auto max-w-3xl px-4 flex flex-col items-center gap-5">
        <motion.div
          className="h-px w-full max-w-xs sm:max-w-md origin-center bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-primary text-center leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(10px)" }}
          transition={{ ...spring, delay: 0.12 }}
        >
          {label}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ ...spring, delay: 0.35 }}
        >
          <motion.div
            animate={inView ? { y: [0, 6, 0] } : { y: 0 }}
            transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

type ScrollSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Section avec révélation fluide au scroll */
export function ScrollSection({ children, className = "", id }: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.12, margin: "-5% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      <motion.div style={{ y: parallaxY }} className="will-change-transform">
        {children}
      </motion.div>
    </motion.section>
  );
}

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 56, scale: 0.97, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { ...spring, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type AnimatedSectionHeaderProps = {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  className?: string;
};

/** Titre de section avec apparition mot par mot */
export function AnimatedSectionHeader({ title, subtitle, badge, className = "" }: AnimatedSectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5, margin: "-10% 0px" });
  const words = title.split(" ");

  return (
    <div ref={ref} className={`text-center max-w-2xl mx-auto ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ ...spring, delay: 0.05 }}
          className="mb-4"
        >
          {badge}
        </motion.div>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-bold">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-[0.28em] last:mr-0"
            initial={{ opacity: 0, y: 36, rotateX: -25 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 36, rotateX: -25 }}
            transition={{ ...spring, delay: 0.08 + i * 0.045 }}
            style={{ transformPerspective: 600 }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          className="mt-3 text-muted-foreground"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(6px)" }}
          transition={{ ...spring, delay: 0.08 + words.length * 0.045 + 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  index?: number;
};

/** Carte / bloc enfant avec décalage au scroll */
export function StaggerItem({ children, className = "", index = 0 }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25, margin: "-5% 0px" }}
      transition={{ ...spring, delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}
