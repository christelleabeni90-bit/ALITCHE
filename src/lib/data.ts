// Shared data — métiers, institutions, mentors
export type { Career, Institution } from "@/lib/careers-benin";
export { BENIN_CAREERS as CAREERS, BENIN_INSTITUTIONS as INSTITUTIONS, CAREER_CATEGORIES } from "@/lib/careers-benin";

export const MENTORS = [
  { name: "Dr. Komla A.", role: "Data Scientist Senior", years: 8, available: true, emoji: "👨🏿‍💻" },
  { name: "Aïcha S.", role: "Architecte Logicielle", years: 10, available: true, emoji: "👩🏿‍💻" },
  { name: "Prof. Mensah", role: "Ingénieur Civil — Enseignant", years: 15, available: false, emoji: "👨🏿‍🏫" },
  { name: "Dr. Fatou B.", role: "Médecin & Mentor santé", years: 12, available: true, emoji: "👩🏿‍⚕" },
];

// Legacy profile keys (homepage demo)
export const PROFILES = ["Analytique", "Créatif", "Social", "Entrepreneurial", "Pratique"] as const;
export type ProfileKey = (typeof PROFILES)[number];
