import type { Career } from "@/lib/data";
import { CAREERS } from "@/lib/data";

export const DIMENSIONS = [
  "analyse",
  "creativite",
  "communication",
  "empathie",
  "ambition",
] as const;

export type DimensionKey = (typeof DIMENSIONS)[number];

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  analyse: "Analyse & Logique",
  creativite: "Créativité",
  communication: "Communication & Leadership",
  empathie: "Empathie & Collaboration",
  ambition: "Ambition & Entrepreneuriat",
};

export type QuizOption = {
  label: string;
  letter: "A" | "B" | "C" | "D";
  dimension: DimensionKey;
};

export type QuizQuestion = {
  q: string;
  dimensionGroup: string;
  options: QuizOption[];
};

export const PERSONALITY_QUIZ: QuizQuestion[] = [
  {
    dimensionGroup: "Analyse & Logique",
    q: "Quand tu dois résoudre un problème compliqué, tu préfères :",
    options: [
      { letter: "A", label: "Analyser les données et trouver la solution logique", dimension: "analyse" },
      { letter: "B", label: "Demander l'avis des autres", dimension: "empathie" },
      { letter: "C", label: "Essayer différentes approches créatives", dimension: "creativite" },
      { letter: "D", label: "Agir rapidement sans trop réfléchir", dimension: "ambition" },
    ],
  },
  {
    dimensionGroup: "Analyse & Logique",
    q: "Tes amis te décrivent comme quelqu'un qui :",
    options: [
      { letter: "A", label: "Comprend facilement les concepts complexes", dimension: "analyse" },
      { letter: "B", label: "Est toujours prêt à aider", dimension: "empathie" },
      { letter: "C", label: "Pense différemment et propose des idées originales", dimension: "creativite" },
      { letter: "D", label: "Fonce et prend des risques", dimension: "ambition" },
    ],
  },
  {
    dimensionGroup: "Analyse & Logique",
    q: "Dans tes études, tu excelles surtout en :",
    options: [
      { letter: "A", label: "Mathématiques, sciences, informatique", dimension: "analyse" },
      { letter: "B", label: "Littérature, langues, histoire", dimension: "communication" },
      { letter: "C", label: "Arts, musique, design", dimension: "creativite" },
      { letter: "D", label: "Sports, leadership, projets", dimension: "ambition" },
    ],
  },
  {
    dimensionGroup: "Créativité & Innovation",
    q: "Quand on te propose un projet, tu aimes :",
    options: [
      { letter: "A", label: "Suivre les instructions exactement", dimension: "analyse" },
      { letter: "B", label: "Proposer une approche complètement nouvelle", dimension: "creativite" },
      { letter: "C", label: "Collaborer avec d'autres pour trouver la meilleure solution", dimension: "empathie" },
      { letter: "D", label: "Prendre le leadership et diriger le projet", dimension: "communication" },
    ],
  },
  {
    dimensionGroup: "Créativité & Innovation",
    q: "Ta façon de penser est plutôt :",
    options: [
      { letter: "A", label: "Logique et structurée", dimension: "analyse" },
      { letter: "B", label: "Créative et imaginative", dimension: "creativite" },
      { letter: "C", label: "Empathique et intuitive", dimension: "empathie" },
      { letter: "D", label: "Ambitieuse et compétitive", dimension: "ambition" },
    ],
  },
  {
    dimensionGroup: "Créativité & Innovation",
    q: "Ton environnement idéal de travail serait :",
    options: [
      { letter: "A", label: "Un bureau calme où je peux me concentrer", dimension: "analyse" },
      { letter: "B", label: "Un espace créatif avec des gens innovants", dimension: "creativite" },
      { letter: "C", label: "Un environnement collaboratif et bienveillant", dimension: "empathie" },
      { letter: "D", label: "Un environnement dynamique et compétitif", dimension: "ambition" },
    ],
  },
  {
    dimensionGroup: "Communication & Leadership",
    q: "En groupe, tu aimes naturellement :",
    options: [
      { letter: "A", label: "Analyser les données et proposer des solutions", dimension: "analyse" },
      { letter: "B", label: "Proposer des idées créatives", dimension: "creativite" },
      { letter: "C", label: "Prendre la parole et diriger", dimension: "communication" },
      { letter: "D", label: "Écouter et soutenir les autres", dimension: "empathie" },
    ],
  },
  {
    dimensionGroup: "Communication & Leadership",
    q: "Quand il y a un désaccord, tu :",
    options: [
      { letter: "A", label: "Présentes les faits objectivement", dimension: "analyse" },
      { letter: "B", label: "Cherches une solution créative", dimension: "creativite" },
      { letter: "C", label: "Écoutes les deux côtés et cherches un compromis", dimension: "empathie" },
      { letter: "D", label: "Prends une décision rapide et avances", dimension: "communication" },
    ],
  },
  {
    dimensionGroup: "Communication & Leadership",
    q: "Tes collègues te voient comme :",
    options: [
      { letter: "A", label: "La personne fiable et organisée", dimension: "analyse" },
      { letter: "B", label: "La personne créative et originale", dimension: "creativite" },
      { letter: "C", label: "Le leader naturel", dimension: "communication" },
      { letter: "D", label: "La personne empathique et supportive", dimension: "empathie" },
    ],
  },
  {
    dimensionGroup: "Empathie & Collaboration",
    q: "Quand un ami a un problème, tu :",
    options: [
      { letter: "A", label: "Proposes une solution logique", dimension: "analyse" },
      { letter: "B", label: "L'écoutes vraiment et le soutiens", dimension: "empathie" },
      { letter: "C", label: "Essaies de le motiver et le pousser à agir", dimension: "ambition" },
      { letter: "D", label: "Partages une expérience similaire", dimension: "communication" },
    ],
  },
  {
    dimensionGroup: "Empathie & Collaboration",
    q: "Tu aimes travailler :",
    options: [
      { letter: "A", label: "Seul sur des projets individuels", dimension: "analyse" },
      { letter: "B", label: "En équipe où chacun apporte ses talents", dimension: "empathie" },
      { letter: "C", label: "Avec des gens que tu peux inspirer", dimension: "communication" },
      { letter: "D", label: "Avec des gens créatifs et innovants", dimension: "creativite" },
    ],
  },
  {
    dimensionGroup: "Empathie & Collaboration",
    q: "Ce qui te motive le plus au travail est :",
    options: [
      { letter: "A", label: "Résoudre des problèmes complexes", dimension: "analyse" },
      { letter: "B", label: "Aider les gens et faire une différence", dimension: "empathie" },
      { letter: "C", label: "Créer quelque chose de nouveau", dimension: "creativite" },
      { letter: "D", label: "Réussir et progresser rapidement", dimension: "ambition" },
    ],
  },
  {
    dimensionGroup: "Ambition & Entrepreneuriat",
    q: "Ton rêve de carrière est plutôt :",
    options: [
      { letter: "A", label: "Devenir expert dans ton domaine", dimension: "analyse" },
      { letter: "B", label: "Créer ta propre entreprise", dimension: "ambition" },
      { letter: "C", label: "Aider les gens à travers ton travail", dimension: "empathie" },
      { letter: "D", label: "Innover et changer les choses", dimension: "creativite" },
    ],
  },
  {
    dimensionGroup: "Ambition & Entrepreneuriat",
    q: "Face à un risque, tu :",
    options: [
      { letter: "A", label: "Analyses les conséquences avant de décider", dimension: "analyse" },
      { letter: "B", label: "Fonces si tu crois au projet", dimension: "ambition" },
      { letter: "C", label: "Cherches le conseil des autres", dimension: "empathie" },
      { letter: "D", label: "Cherches une approche créative pour minimiser le risque", dimension: "creativite" },
    ],
  },
  {
    dimensionGroup: "Ambition & Entrepreneuriat",
    q: "Dans 5 ans, tu te vois :",
    options: [
      { letter: "A", label: "Expert reconnu dans ton domaine", dimension: "analyse" },
      { letter: "B", label: "Entrepreneur avec ta propre business", dimension: "ambition" },
      { letter: "C", label: "Leader d'une équipe ou organisation", dimension: "communication" },
      { letter: "D", label: "Créateur/innovateur dans ton secteur", dimension: "creativite" },
    ],
  },
];

export const PREFERRED_DOMAINS = [
  "Tech & Informatique",
  "Santé & Social",
  "Business & Management",
  "Arts & Design",
  "Sciences & Ingénierie",
  "Éducation & Communication",
  "Agriculture & Environnement",
] as const;

export type ProfileTypeId = "analyste" | "creatif" | "leader" | "empathique" | "entrepreneur";

export const PROFILE_TYPES: Record<
  ProfileTypeId,
  { label: string; description: string; strengths: string[]; develop: string[]; careers: string[] }
> = {
  analyste: {
    label: "L'Analyste",
    description: "Tu excelles dans la logique, l'analyse et la résolution de problèmes complexes.",
    strengths: ["Rigueur", "Esprit analytique", "Capacité de concentration"],
    develop: ["Communication en équipe", "Prise de risque calculée"],
    careers: ["developpeur-web-mobile", "data-scientist", "ingenieur-civil", "comptable"],
  },
  creatif: {
    label: "Le Créatif",
    description: "Tu vois le monde différemment et tu aimes innover et créer.",
    strengths: ["Imagination", "Originalité", "Adaptabilité"],
    develop: ["Organisation", "Suivi de processus"],
    careers: ["designer-graphique", "responsable-marketing", "entrepreneur", "professeur"],
  },
  leader: {
    label: "Le Leader",
    description: "Tu inspires, tu communiques et tu prends naturellement les devants.",
    strengths: ["Communication", "Vision", "Influence"],
    develop: ["Écoute active", "Patience analytique"],
    careers: ["manager", "consultant-gestion", "responsable-marketing", "entrepreneur"],
  },
  empathique: {
    label: "L'Empathique",
    description: "Tu comprends les autres et tu crées des liens forts en équipe.",
    strengths: ["Empathie", "Collaboration", "Écoute"],
    develop: ["Assertivité", "Décision rapide"],
    careers: ["infirmier", "psychologue", "professeur", "medecin"],
  },
  entrepreneur: {
    label: "L'Entrepreneur",
    description: "Tu es ambitieux, audacieux et tu veux construire ta propre voie.",
    strengths: ["Ambition", "Initiative", "Résilience"],
    develop: ["Planification long terme", "Gestion du stress"],
    careers: ["entrepreneur", "consultant-gestion", "responsable-marketing", "comptable"],
  },
};

/** Poids idéaux par métier pour le calcul de compatibilité (0-100) */
const CAREER_DIMENSION_TARGETS: Record<string, Partial<Record<DimensionKey, number>>> = {
  "developpeur-web-mobile": { analyse: 85, creativite: 55, communication: 45, empathie: 35, ambition: 50 },
  "developpeur-fullstack": { analyse: 85, creativite: 60, communication: 50, empathie: 35, ambition: 55 },
  "data-scientist": { analyse: 90, creativite: 50, communication: 40, empathie: 30, ambition: 55 },
  "ingenieur-civil": { analyse: 80, creativite: 45, communication: 50, empathie: 40, ambition: 60 },
  "comptable": { analyse: 85, creativite: 30, communication: 45, empathie: 35, ambition: 50 },
  "designer-graphique": { analyse: 40, creativite: 90, communication: 55, empathie: 45, ambition: 50 },
  "responsable-marketing": { analyse: 50, creativite: 75, communication: 80, empathie: 55, ambition: 70 },
  "entrepreneur": { analyse: 55, creativite: 70, communication: 75, empathie: 50, ambition: 90 },
  "manager": { analyse: 55, creativite: 50, communication: 85, empathie: 65, ambition: 80 },
  "consultant-gestion": { analyse: 70, creativite: 55, communication: 80, empathie: 60, ambition: 75 },
  "infirmier": { analyse: 50, creativite: 35, communication: 60, empathie: 90, ambition: 40 },
  "psychologue": { analyse: 60, creativite: 45, communication: 70, empathie: 95, ambition: 45 },
  "professeur": { analyse: 55, creativite: 60, communication: 80, empathie: 85, ambition: 45 },
  "medecin": { analyse: 75, creativite: 40, communication: 65, empathie: 85, ambition: 55 },
  "ingenieur-agronome": { analyse: 70, creativite: 45, communication: 50, empathie: 55, ambition: 50 },
};

export function emptyDimensionScores(): Record<DimensionKey, number> {
  return { analyse: 0, creativite: 0, communication: 0, empathie: 0, ambition: 0 };
}

export function addAnswerScore(scores: Record<DimensionKey, number>, dimension: DimensionKey) {
  return { ...scores, [dimension]: scores[dimension] + 20 };
}

/** Score 0-100 par dimension (max 60 pts bruts = 3 questions × 20) */
export function normalizeScores(raw: Record<DimensionKey, number>): Record<DimensionKey, number> {
  const out = { ...raw };
  for (const d of DIMENSIONS) {
    out[d] = Math.min(100, Math.round((raw[d] / 60) * 100));
  }
  return out;
}

export function detectProfileType(scores: Record<DimensionKey, number>): ProfileTypeId {
  const s = normalizeScores(scores);
  if (s.analyse >= 80 && s.creativite <= 65 && s.empathie <= 65) return "analyste";
  if (s.creativite >= 80 && s.analyse <= 65) return "creatif";
  if (s.communication >= 80 && s.ambition >= 70) return "leader";
  if (s.empathie >= 80 && s.analyse <= 65) return "empathique";
  if (s.ambition >= 80 && s.communication >= 70) return "entrepreneur";

  const ranked = (Object.entries(s) as [DimensionKey, number][]).sort((a, b) => b[1] - a[1]);
  const top = ranked[0][0];
  const map: Record<DimensionKey, ProfileTypeId> = {
    analyse: "analyste",
    creativite: "creatif",
    communication: "leader",
    empathie: "empathique",
    ambition: "entrepreneur",
  };
  return map[top];
}

export function careerCompatibility(
  careerSlug: string,
  scores: Record<DimensionKey, number>,
): number {
  const targets = CAREER_DIMENSION_TARGETS[careerSlug];
  if (!targets) return 50;
  const normalized = normalizeScores(scores);
  const entries = Object.entries(targets) as [DimensionKey, number][];
  const total = entries.reduce((sum, [dim, target]) => {
    const user = normalized[dim];
    const ratio = Math.min(1, user / target);
    return sum + ratio * 100;
  }, 0);
  return Math.round(total / entries.length);
}

export type RankedCareer = Career & { compatibility: number };

export function recommendTopCareers(
  scores: Record<DimensionKey, number>,
  limit = 10,
): RankedCareer[] {
  const profile = detectProfileType(scores);
  const profileSlugs = new Set(PROFILE_TYPES[profile].careers);

  return CAREERS.map((career) => ({
    ...career,
    compatibility: careerCompatibility(career.slug, scores),
  }))
    .sort((a, b) => {
      const boostA = profileSlugs.has(a.slug) ? 5 : 0;
      const boostB = profileSlugs.has(b.slug) ? 5 : 0;
      return b.compatibility + boostB - (a.compatibility + boostA);
    })
    .slice(0, limit);
}

export function getSecondaryDimension(scores: Record<DimensionKey, number>): DimensionKey {
  const normalized = normalizeScores(scores);
  const sorted = (Object.entries(normalized) as [DimensionKey, number][]).sort((a, b) => b[1] - a[1]);
  return sorted[1]?.[0] ?? "creativite";
}
