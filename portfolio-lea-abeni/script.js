/* ==========================================================================
   Données des projets — à éditer librement, sans toucher au HTML
   ========================================================================== */
const projects = [
  {
    title: "Suivi automatique des nouveaux prospects",
    description:
      "Capture des leads reçus via un formulaire en ligne, création automatique d'une fiche contact et notification instantanée à l'équipe commerciale.",
    image: "assets/projet-prospects.jpg",
    tools: ["Make.com", "Google Forms", "Google Sheets", "Gmail"],
    category: "Gestion de prospects",
  },
  {
    title: "Relances clients pour factures impayées",
    description:
      "Scénario qui détecte les factures en retard dans un tableur et envoie automatiquement un e-mail de relance personnalisé après un délai défini.",
    image: "assets/projet-relance.jpg",
    tools: ["Make.com", "Google Sheets", "Gmail"],
    category: "Relance client",
  },
  {
    title: "Reporting hebdomadaire automatisé",
    description:
      "Compilation automatique des données d'activité de la semaine dans un tableau de synthèse, envoyé chaque lundi matin par e-mail.",
    image: "assets/projet-reporting.jpg",
    tools: ["Make.com", "Airtable", "Gmail"],
    category: "Reporting",
  },
  {
    title: "Parcours de bienvenue pour nouveaux clients",
    description:
      "Envoi automatique d'une séquence d'e-mails de bienvenue et création d'une checklist de suivi dès qu'un nouveau client signe un contrat.",
    image: "assets/projet-onboarding.jpg",
    tools: ["Make.com", "Airtable", "Gmail"],
    category: "Onboarding client",
  },
];

/* ==========================================================================
   Injection des cartes projets
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
        <div class="project-image">
          <img
            src="${project.image}"
            alt="Aperçu du scénario Make.com : ${project.title}"
            loading="lazy"
            onerror="this.remove();"
          />
          <span>Capture à venir</span>
        </div>
        <div class="project-body">
          <span class="project-tag">${project.category}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <p class="project-tools-label">Outils utilisés</p>
          <ul class="project-tools">
            ${project.tools.map((tool) => `<li>${tool}</li>`).join("")}
          </ul>
        </div>
      </article>
    `
    )
    .join("");
}

/* ==========================================================================
   Menu mobile
   ========================================================================== */
function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   Scroll fluide vers les ancres
   ========================================================================== */
function setupSmoothScroll() {
  const header = document.getElementById("site-header");
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
  });
}

/* ==========================================================================
   Année dynamique dans le footer
   ========================================================================== */
function setupCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   Initialisation
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupMobileNav();
  setupSmoothScroll();
  setupCurrentYear();
});
