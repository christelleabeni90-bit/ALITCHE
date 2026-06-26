import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { ImageSlideshow } from "@/components/site/ImageSlideshow";
import { motion } from "framer-motion";
import { Heart, Target, Users, Globe } from "lucide-react";

import aboutSlide1 from "../../img/jeune sur la voie.jpeg";
import aboutSlide2 from "../../img/jeune avec son ordinateur.jpeg";
import aboutSlide3 from "../../img/jeune à l'université.jpeg";
import aboutSlide4 from "../../img/groupe de jeune .jpeg";

const ABOUT_SLIDES = [aboutSlide1, aboutSlide2, aboutSlide3, aboutSlide4];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — ALITCHÉ" },
      { name: "description", content: "ALITCHÉ démocratise l'accès à une orientation académique de qualité en Afrique de l'Ouest grâce à l'IA." },
      { property: "og:title", content: "À propos d'ALITCHÉ" },
      { property: "og:description", content: "Notre mission : aider chaque bachelier à choisir avec confiance." },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    { icon: Heart, t: "Humain d'abord", d: "Chaque parcours est unique. Nous écoutons avant de recommander." },
    { icon: Target, t: "Précision", d: "Des recommandations basées sur la science et les données réelles du marché." },
    { icon: Users, t: "Diversité", d: "Conçu pour tous les profils — scientifiques, littéraires, artistiques, techniques." },
    { icon: Globe, t: "Impact africain", d: "Pensé pour les réalités des bacheliers du Bénin et d'Afrique de l'Ouest." },
  ];
  return (
    <PublicLayout>
      <section className="gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold">
            Notre mission : <span className="text-gradient">orienter chaque talent.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            ALITCHÉ est née d'un constat simple : trop de bacheliers font des choix d'orientation par défaut, par peur ou par manque d'information. Nous croyons qu'il est possible d'éclairer chaque décision grâce à l'intelligence artificielle, la science des aptitudes et l'expertise humaine.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold">Une startup engagée pour la jeunesse africaine</h2>
            <p className="mt-4 text-muted-foreground">
              Basée à Cotonou, ALITCHÉ accompagne déjà des milliers de jeunes vers des choix académiques et professionnels alignés avec leur potentiel. Notre équipe associe data scientists, conseillers d'orientation et entrepreneurs qui partagent une conviction : <strong>aucun talent ne doit être perdu</strong>.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "2 000+", v: "Bacheliers" },
                { k: "150+", v: "Filières" },
                { k: "95%", v: "Satisfaction" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl bg-card border border-border p-4 text-center shadow-soft">
                  <div className="text-2xl font-display font-extrabold text-gradient">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square rounded-3xl shadow-elevated p-10 grid place-items-center text-white relative overflow-hidden">
            <ImageSlideshow
              images={ABOUT_SLIDES}
              overlayClassName="bg-gradient-to-br from-primary/55 via-primary/35 to-primary/50"
            />
            <div className="relative z-10 text-center drop-shadow-md">
              <div className="text-7xl font-display font-extrabold">A</div>
              <div className="mt-2 text-sm uppercase tracking-[0.3em]">Alitché</div>
              <div className="mt-6 text-sm opacity-95 max-w-xs mx-auto">« Alitché » signifie <em>chemin</em> en fon. Nous traçons le tien.</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-display font-bold text-center">Nos valeurs</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.t}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-3xl p-6 border border-border hover-lift">
                <div className="h-12 w-12 rounded-2xl gradient-primary grid place-items-center text-primary-foreground mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{v.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
