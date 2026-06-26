export type Career = {
  slug: string;
  title: string;
  field: string;
  description: string;
  missions: string[];
  skills: string[];
  salaryMin: number;
  salaryMax: number;
  marketDemand: string;
  growth: "Élevée" | "Forte" | "Stable" | "Moyenne" | "Faible";
  programs: string[];
  institutions: string[];
  emoji: string;
};

export type Institution = {
  key: string;
  name: string;
  full: string;
  city: string;
  programs: string[];
  duration?: string;
  costMin?: number;
  costMax?: number;
};

type Growth = Career["growth"];

function c(
  slug: string,
  title: string,
  field: string,
  emoji: string,
  salaryMin: number,
  salaryMax: number,
  marketDemand: string,
  growth: Growth,
  skills: string[],
  programs: string[],
  institutions: string[],
  description: string,
): Career {
  return {
    slug,
    title,
    field,
    emoji,
    salaryMin,
    salaryMax,
    marketDemand,
    growth,
    skills,
    programs,
    institutions,
    description,
    missions: [
      `Exercer le métier de ${title.toLowerCase()} au Bénin`,
      "Développer des compétences recherchées sur le marché",
      "Évoluer vers des postes à plus forte responsabilité",
    ],
  };
}

export const BENIN_CAREERS: Career[] = [
  // TECHNOLOGIE & INFORMATIQUE (10)
  c("developpeur-web-mobile", "Développeur Web/Mobile", "Technologie & Informatique", "📱", 250_000, 500_000, "Très élevée (croissance 40%/an)", "Élevée", ["Logique", "Créativité", "Communication"], ["Informatique", "Génie Logiciel"], ["EPAC", "UNSTIM", "ENSI"], "Conception d'applications web et mobiles pour entreprises et startups."),
  c("data-scientist", "Data Scientist / Analyste de Données", "Technologie & Informatique", "📊", 300_000, 600_000, "Très élevée (croissance 50%/an)", "Élevée", ["Analyse & Logique", "Créativité"], ["Informatique", "Mathématiques", "Statistiques"], ["UNSTIM", "ENSI", "UAC"], "Analyse de données pour guider les décisions stratégiques."),
  c("ingenieur-ia", "Ingénieur IA / Machine Learning", "Technologie & Informatique", "🤖", 400_000, 800_000, "Très élevée (croissance 60%/an)", "Élevée", ["Analyse & Logique", "Créativité", "Ambition"], ["Informatique", "Génie Logiciel", "Mathématiques"], ["UNSTIM", "ENSI"], "Développement de modèles d'intelligence artificielle et d'apprentissage automatique."),
  c("admin-reseau", "Administrateur Réseau / Système", "Technologie & Informatique", "🖥️", 200_000, 400_000, "Élevée (croissance 25%/an)", "Forte", ["Analyse & Logique", "Communication"], ["Informatique", "Réseaux"], ["EPAC", "UNSTIM"], "Gestion et sécurisation des infrastructures informatiques."),
  c("developpeur-fullstack", "Développeur Full Stack", "Technologie & Informatique", "💻", 280_000, 550_000, "Très élevée (croissance 45%/an)", "Élevée", ["Logique", "Créativité", "Ambition"], ["Informatique", "Génie Logiciel"], ["EPAC", "UNSTIM", "ENSI"], "Développement complet front-end et back-end d'applications."),
  c("consultant-it", "Consultant IT", "Technologie & Informatique", "🔧", 350_000, 700_000, "Élevée (croissance 30%/an)", "Forte", ["Analyse & Logique", "Communication", "Ambition"], ["Informatique", "Gestion"], ["UNSTIM", "UAC"], "Conseil en transformation digitale et systèmes d'information."),
  c("cybersecurite", "Spécialiste Cybersécurité", "Technologie & Informatique", "🔐", 350_000, 700_000, "Très élevée (croissance 55%/an)", "Élevée", ["Analyse & Logique", "Ambition"], ["Informatique", "Cybersécurité"], ["UNSTIM", "ENSI"], "Protection des systèmes contre les cybermenaces."),
  c("dev-jeux-video", "Développeur Jeux Vidéo", "Technologie & Informatique", "🎮", 200_000, 450_000, "Moyenne (croissance 20%/an)", "Stable", ["Créativité", "Logique", "Ambition"], ["Informatique", "Design Graphique"], ["EPAC", "UNSTIM"], "Création de jeux vidéo et expériences interactives."),
  c("architecte-logiciel", "Architecte Logiciel", "Technologie & Informatique", "🏛️", 400_000, 800_000, "Élevée (croissance 35%/an)", "Forte", ["Analyse & Logique", "Communication", "Ambition"], ["Informatique", "Génie Logiciel"], ["UNSTIM", "ENSI"], "Conception de l'architecture technique des systèmes logiciels."),
  c("cloud-computing", "Spécialiste Cloud Computing", "Technologie & Informatique", "☁️", 300_000, 600_000, "Très élevée (croissance 50%/an)", "Élevée", ["Analyse & Logique", "Communication"], ["Informatique", "Réseaux"], ["UNSTIM", "ENSI"], "Déploiement et gestion de solutions cloud pour les entreprises."),

  // DONNÉES & STATISTIQUES (5)
  c("statisticien", "Statisticien", "Données & Statistiques", "📈", 250_000, 500_000, "Élevée (croissance 30%/an)", "Forte", ["Analyse & Logique", "Communication"], ["Mathématiques", "Statistiques"], ["UAC", "UP"], "Collecte et analyse statistique pour la recherche et les entreprises."),
  c("analyste-financier", "Analyste Financier", "Données & Statistiques", "💹", 300_000, 600_000, "Élevée (croissance 25%/an)", "Forte", ["Analyse & Logique", "Ambition"], ["Finance", "Économie", "Mathématiques"], ["UAC", "ENEAM"], "Analyse des marchés financiers et aide à la décision d'investissement."),
  c("economiste", "Économiste", "Données & Statistiques", "📉", 250_000, 500_000, "Moyenne (croissance 15%/an)", "Stable", ["Analyse & Logique", "Communication"], ["Économie", "Gestion"], ["UAC", "UP"], "Étude des phénomènes économiques et élaboration de politiques."),
  c("actuaire", "Actuaire", "Données & Statistiques", "🧮", 350_000, 700_000, "Moyenne (croissance 20%/an)", "Stable", ["Analyse & Logique", "Ambition"], ["Mathématiques", "Actuariat"], ["UAC"], "Évaluation des risques financiers et assurance."),
  c("chercheur-maths", "Chercheur en Mathématiques", "Données & Statistiques", "🔢", 200_000, 400_000, "Faible (croissance 10%/an)", "Faible", ["Analyse & Logique", "Créativité"], ["Mathématiques", "Recherche"], ["UAC", "UNSTIM"], "Recherche fondamentale et appliquée en mathématiques."),

  // INGÉNIERIE & CONSTRUCTION (8)
  c("ingenieur-civil", "Ingénieur Civil", "Ingénierie & Construction", "🏗️", 250_000, 500_000, "Élevée (croissance 25%/an)", "Forte", ["Analyse & Logique", "Communication", "Ambition"], ["Génie Civil", "Construction"], ["EPAC", "UNSTIM", "UAC"], "Conception et supervision de projets de construction et d'infrastructure."),
  c("ingenieur-electricien", "Ingénieur Électricien", "Ingénierie & Construction", "⚡", 250_000, 500_000, "Élevée (croissance 20%/an)", "Forte", ["Analyse & Logique", "Communication"], ["Génie Électrique", "Électronique"], ["EPAC", "UNSTIM"], "Conception de systèmes électriques et électroniques."),
  c("ingenieur-mecanique", "Ingénieur Mécanique", "Ingénierie & Construction", "⚙️", 250_000, 500_000, "Élevée (croissance 22%/an)", "Forte", ["Analyse & Logique", "Créativité"], ["Génie Mécanique", "Automatisation"], ["EPAC", "UNSTIM"], "Conception et maintenance de systèmes mécaniques industriels."),
  c("architecte", "Architecte", "Ingénierie & Construction", "📐", 300_000, 600_000, "Moyenne (croissance 18%/an)", "Stable", ["Créativité", "Communication", "Ambition"], ["Architecture", "Design"], ["EPAC", "UAC"], "Conception de bâtiments et espaces fonctionnels et esthétiques."),
  c("ingenieur-environnement", "Ingénieur Environnement", "Ingénierie & Construction", "🌿", 220_000, 450_000, "Moyenne (croissance 20%/an)", "Stable", ["Analyse & Logique", "Empathie", "Communication"], ["Génie Environnemental", "Développement Durable"], ["UNSTIM", "UAC"], "Protection de l'environnement et gestion durable des ressources."),
  c("ingenieur-agronome", "Ingénieur Agronome", "Ingénierie & Construction", "🌱", 180_000, 400_000, "Moyenne (croissance 15%/an)", "Stable", ["Analyse & Logique", "Empathie", "Communication"], ["Agronomie", "Agriculture"], ["UP", "UAC"], "Optimisation des cultures et accompagnement des exploitations agricoles."),
  c("ingenieur-telecom", "Ingénieur Télécommunications", "Ingénierie & Construction", "📡", 280_000, 550_000, "Élevée (croissance 30%/an)", "Forte", ["Analyse & Logique", "Communication"], ["Télécommunications", "Réseaux"], ["UNSTIM", "EPAC"], "Conception et maintenance des réseaux de télécommunication."),
  c("ingenieur-energies", "Ingénieur Énergies Renouvelables", "Ingénierie & Construction", "🔋", 250_000, 500_000, "Élevée (croissance 40%/an)", "Élevée", ["Analyse & Logique", "Ambition", "Empathie"], ["Génie Énergétique", "Énergies Renouvelables"], ["UNSTIM", "UAC"], "Développement de solutions d'énergie solaire, éolienne et durable."),

  // SANTÉ & SCIENCES (7)
  c("medecin", "Médecin", "Santé & Sciences", "🩺", 300_000, 600_000, "Très élevée (croissance 25%/an)", "Élevée", ["Analyse & Logique", "Empathie", "Communication"], ["Médecine"], ["UAC", "UP"], "Diagnostic et traitement des pathologies, suivi des patients."),
  c("infirmier", "Infirmier(ère)", "Santé & Sciences", "💉", 150_000, 300_000, "Très élevée (croissance 30%/an)", "Élevée", ["Empathie", "Communication", "Ambition"], ["Infirmerie", "Santé"], ["UAC", "Ecoles Infirmerie"], "Soins aux patients et accompagnement au quotidien."),
  c("pharmacien", "Pharmacien", "Santé & Sciences", "💊", 250_000, 500_000, "Élevée (croissance 20%/an)", "Forte", ["Analyse & Logique", "Communication", "Empathie"], ["Pharmacie"], ["UAC"], "Dispensation de médicaments et conseil pharmaceutique."),
  c("biologiste", "Biologiste / Chercheur", "Santé & Sciences", "🧬", 200_000, 400_000, "Moyenne (croissance 15%/an)", "Stable", ["Analyse & Logique", "Créativité"], ["Biologie", "Sciences"], ["UAC", "UP"], "Recherche biologique et analyses en laboratoire."),
  c("psychologue", "Psychologue", "Santé & Sciences", "🧠", 180_000, 350_000, "Moyenne (croissance 18%/an)", "Stable", ["Empathie", "Communication", "Analyse & Logique"], ["Psychologie"], ["UAC"], "Accompagnement psychologique et thérapie."),
  c("veterinaire", "Vétérinaire", "Santé & Sciences", "🐾", 200_000, 400_000, "Moyenne (croissance 15%/an)", "Stable", ["Analyse & Logique", "Empathie", "Communication"], ["Médecine Vétérinaire"], ["UP"], "Soins aux animaux et santé publique vétérinaire."),
  c("chimiste", "Chimiste", "Santé & Sciences", "⚗️", 200_000, 400_000, "Moyenne (croissance 18%/an)", "Stable", ["Analyse & Logique", "Créativité"], ["Chimie", "Sciences"], ["UAC", "UP"], "Recherche chimique et contrôle qualité en industrie."),

  // BUSINESS & ENTREPRENEURIAT (8)
  c("entrepreneur", "Entrepreneur / Créateur d'Entreprise", "Business & Entrepreneuriat", "🚀", 200_000, 1_000_000, "Très élevée (croissance 50%/an)", "Élevée", ["Ambition", "Créativité", "Communication"], ["Gestion", "Entrepreneuriat"], ["ENEAM", "UAC"], "Création et développement de ta propre entreprise."),
  c("manager", "Manager / Directeur Général", "Business & Entrepreneuriat", "👔", 400_000, 800_000, "Élevée (croissance 20%/an)", "Forte", ["Communication", "Ambition", "Analyse & Logique"], ["Gestion", "Management"], ["ENEAM", "UAC"], "Pilotage d'équipes et de stratégies d'entreprise."),
  c("consultant-gestion", "Consultant en Gestion", "Business & Entrepreneuriat", "📋", 350_000, 700_000, "Élevée (croissance 25%/an)", "Forte", ["Analyse & Logique", "Communication", "Ambition"], ["Gestion", "Consulting"], ["ENEAM", "UAC"], "Conseil stratégique aux organisations."),
  c("responsable-marketing", "Responsable Marketing", "Business & Entrepreneuriat", "📣", 250_000, 500_000, "Élevée (croissance 30%/an)", "Forte", ["Créativité", "Communication", "Ambition"], ["Marketing", "Communication"], ["ENEAM", "UAC"], "Stratégies marketing et acquisition de clients."),
  c("responsable-rh", "Responsable Ressources Humaines", "Business & Entrepreneuriat", "👥", 250_000, 500_000, "Élevée (croissance 25%/an)", "Forte", ["Empathie", "Communication", "Ambition"], ["Gestion", "RH"], ["ENEAM", "UAC"], "Recrutement, formation et gestion des talents."),
  c("responsable-ventes", "Responsable Ventes", "Business & Entrepreneuriat", "🤝", 200_000, 450_000, "Très élevée (croissance 35%/an)", "Élevée", ["Communication", "Ambition", "Empathie"], ["Ventes", "Commerce"], ["ENEAM", "UAC"], "Développement commercial et gestion des équipes de vente."),
  c("comptable", "Comptable / Auditeur", "Business & Entrepreneuriat", "💼", 250_000, 500_000, "Élevée (croissance 20%/an)", "Forte", ["Analyse & Logique", "Communication"], ["Comptabilité", "Finance"], ["ENEAM", "UAC"], "Tenue des comptes, audit et conseil fiscal."),
  c("supply-chain", "Responsable Supply Chain", "Business & Entrepreneuriat", "📦", 280_000, 550_000, "Élevée (croissance 25%/an)", "Forte", ["Analyse & Logique", "Communication", "Ambition"], ["Logistique", "Gestion"], ["ENEAM", "UAC"], "Gestion de la chaîne logistique et des approvisionnements."),

  // ÉDUCATION & FORMATION (5)
  c("professeur", "Professeur / Enseignant", "Éducation & Formation", "📚", 150_000, 300_000, "Très élevée (croissance 20%/an)", "Élevée", ["Communication", "Empathie", "Ambition"], ["Éducation", "Pédagogie"], ["ENS", "UAC"], "Transmission du savoir aux élèves et étudiants."),
  c("formateur", "Formateur Professionnel", "Éducation & Formation", "🎓", 200_000, 400_000, "Élevée (croissance 25%/an)", "Forte", ["Communication", "Empathie", "Créativité"], ["Formation", "Pédagogie"], ["Centres Formation", "UAC"], "Formation des adultes et professionnels."),
  c("conseiller-orientation", "Conseiller d'Orientation", "Éducation & Formation", "🧭", 180_000, 350_000, "Moyenne (croissance 20%/an)", "Stable", ["Empathie", "Communication", "Analyse & Logique"], ["Psychologie", "Éducation"], ["UAC"], "Accompagnement des jeunes dans leurs choix d'orientation."),
  c("directeur-ecole", "Directeur d'Établissement Scolaire", "Éducation & Formation", "🏫", 300_000, 600_000, "Moyenne (croissance 15%/an)", "Stable", ["Communication", "Ambition", "Analyse & Logique"], ["Gestion", "Éducation"], ["UAC"], "Direction et gestion d'établissements scolaires."),
  c("concepteur-pedagogique", "Concepteur Pédagogique", "Éducation & Formation", "✏️", 220_000, 450_000, "Élevée (croissance 30%/an)", "Forte", ["Créativité", "Communication", "Analyse & Logique"], ["Éducation", "Design Pédagogique"], ["UAC"], "Création de contenus et parcours de formation."),

  // ARTS & DESIGN (5)
  c("designer-graphique", "Designer Graphique", "Arts & Design", "🎨", 180_000, 350_000, "Élevée (croissance 35%/an)", "Forte", ["Créativité", "Communication"], ["Design Graphique", "Arts"], ["EPAC", "UAC"], "Création d'identités visuelles et supports graphiques."),
  c("photographe", "Photographe / Vidéographe", "Arts & Design", "📷", 150_000, 300_000, "Moyenne (croissance 25%/an)", "Stable", ["Créativité", "Communication"], ["Photographie", "Audiovisuel"], ["EPAC", "Ecoles Arts"], "Production photo et vidéo pour médias et événements."),
  c("musicien", "Musicien / Compositeur", "Arts & Design", "🎵", 100_000, 250_000, "Faible (croissance 10%/an)", "Faible", ["Créativité", "Communication"], ["Musique", "Arts"], ["Conservatoires", "UAC"], "Création et interprétation musicale."),
  c("illustrateur", "Illustrateur / Animateur", "Arts & Design", "✨", 180_000, 350_000, "Moyenne (croissance 20%/an)", "Stable", ["Créativité", "Ambition"], ["Animation", "Arts"], ["EPAC", "Ecoles Arts"], "Illustration et animation 2D/3D."),
  c("infographiste", "Maquettiste / Infographiste", "Arts & Design", "🖌️", 200_000, 400_000, "Élevée (croissance 30%/an)", "Forte", ["Créativité", "Logique"], ["Design", "Infographie"], ["EPAC", "UAC"], "Mise en page et création de supports visuels."),

  // MÉDIAS & COMMUNICATION (2 — complété à 50 métiers)
  c("journaliste", "Journaliste", "Médias & Communication", "📰", 180_000, 350_000, "Moyenne (croissance 15%/an)", "Stable", ["Communication", "Créativité", "Ambition"], ["Journalisme", "Communication"], ["UAC", "Ecoles Medias"], "Recherche, rédaction et diffusion de l'information."),
  c("responsable-communication", "Responsable Communication", "Médias & Communication", "📢", 250_000, 500_000, "Élevée (croissance 25%/an)", "Forte", ["Communication", "Créativité", "Ambition"], ["Communication", "Marketing"], ["UAC", "ENEAM"], "Gestion de l'image et de la communication institutionnelle."),
];

export const BENIN_INSTITUTIONS: Institution[] = [
  { key: "UNSTIM", name: "UNSTIM", full: "Université Nationale des Sciences, Technologies et Ingénierie du Bénin", city: "Abomey-Calavi", programs: ["Informatique", "Génie Logiciel", "Génie Civil", "Génie Électrique", "Génie Mécanique", "Télécommunications", "Énergies Renouvelables", "Mathématiques"], duration: "3-5 ans", costMin: 500_000, costMax: 1_500_000 },
  { key: "EPAC", name: "EPAC", full: "École Polytechnique d'Abomey-Calavi", city: "Abomey-Calavi", programs: ["Génie Civil", "Génie Électrique", "Génie Mécanique", "Architecture", "Informatique", "Génie des Procédés"], duration: "3-5 ans", costMin: 600_000, costMax: 1_800_000 },
  { key: "ENSI", name: "ENSI", full: "École Nationale Supérieure d'Informatique", city: "Cotonou", programs: ["Informatique", "Génie Logiciel", "Cybersécurité", "Cloud Computing"], duration: "3-5 ans", costMin: 700_000, costMax: 1_500_000 },
  { key: "UAC", name: "UAC", full: "Université d'Abomey-Calavi", city: "Abomey-Calavi", programs: ["Médecine", "Pharmacie", "Infirmerie", "Psychologie", "Éducation", "Économie", "Gestion", "Biologie", "Chimie", "Mathématiques", "Droit", "Littérature"], duration: "3-6 ans", costMin: 300_000, costMax: 1_000_000 },
  { key: "ENEAM", name: "ENEAM", full: "École Nationale d'Économie, d'Administration et de Management", city: "Cotonou", programs: ["Gestion", "Management", "Finance", "Comptabilité", "Marketing", "RH", "Entrepreneuriat"], duration: "3-5 ans", costMin: 500_000, costMax: 1_200_000 },
  { key: "UP", name: "Université de Parakou", full: "Université de Parakou", city: "Parakou", programs: ["Agronomie", "Agriculture", "Médecine Vétérinaire", "Biologie", "Chimie", "Mathématiques"], duration: "3-5 ans", costMin: 200_000, costMax: 600_000 },
  { key: "IFRI", name: "IFRI", full: "Institut de Formation et de Recherche en Informatique", city: "Abomey-Calavi", programs: ["Informatique", "Génie Logiciel"], duration: "3-5 ans", costMin: 400_000, costMax: 1_000_000 },
];

export const CAREER_CATEGORIES = [
  "Tous",
  "Technologie & Informatique",
  "Données & Statistiques",
  "Ingénierie & Construction",
  "Santé & Sciences",
  "Business & Entrepreneuriat",
  "Éducation & Formation",
  "Arts & Design",
  "Médias & Communication",
] as const;
