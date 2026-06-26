import { useEffect, useState } from "react";

const storageKey = (userId: string) => `alitche_explored_careers_${userId}`;

export function getExploredCareers(userId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(userId));
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function markCareerExplored(userId: string, slug: string): number {
  const explored = new Set(getExploredCareers(userId));
  explored.add(slug);
  const next = [...explored];
  localStorage.setItem(storageKey(userId), JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("explored-careers-changed", { detail: { userId } }));
  return next.length;
}

export function useExploredCareersCount(userId: string) {
  const [count, setCount] = useState(() => getExploredCareers(userId).length);

  useEffect(() => {
    const sync = (e?: Event) => {
      const detail = (e as CustomEvent<{ userId?: string }> | undefined)?.detail;
      if (detail?.userId && detail.userId !== userId) return;
      setCount(getExploredCareers(userId).length);
    };
    sync();
    window.addEventListener("explored-careers-changed", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("explored-careers-changed", sync);
      window.removeEventListener("focus", sync);
    };
  }, [userId]);

  return count;
}
