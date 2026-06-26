import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CAREERS, INSTITUTIONS, CAREER_CATEGORIES } from "@/lib/data";
import { markCareerExplored } from "@/lib/explored-careers";
import { Input } from "@/components/ui/input";
import { Search, Building2, MapPin, TrendingUp, ArrowRight, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/explorer")({
  component: Explorer,
});

function Explorer() {
  const { user } = Route.useRouteContext();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("Tous");
  const [selected, setSelected] = useState(CAREERS[0]);

  const filtered = useMemo(() => {
    return CAREERS.filter((c) => {
      const matchQ = [c.title, c.field, ...c.skills].join(" ").toLowerCase().includes(q.toLowerCase());
      const matchCat = category === "Tous" || c.field === category;
      return matchQ && matchCat;
    });
  }, [q, category]);

  const relatedInstitutions = INSTITUTIONS.filter((i) =>
    selected.institutions.some((code) => i.key === code || i.name === code),
  );

  function selectCareer(career: (typeof CAREERS)[number]) {
    setSelected(career);
    markCareerExplored(user.id, career.slug);
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Métiers, Filières & Institutions</h1>
      <p className="mt-1 text-muted-foreground">
        Explore {CAREERS.length} métiers recommandés et leurs débouchés réels au Bénin.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {CAREER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
              category === cat ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-[360px_1fr] gap-5">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un métier..." className="h-11 pl-10 rounded-2xl" />
          </div>
          <div className="text-xs text-muted-foreground">{filtered.length} métier(s)</div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map((c) => (
              <button key={c.slug} onClick={() => selectCareer(c)}
                className={`w-full text-left p-4 rounded-2xl border transition ${selected.slug === c.slug ? "border-primary bg-accent" : "border-border bg-card hover:border-primary/40"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{c.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.field}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-5xl">{selected.emoji}</div>
              <h2 className="mt-3 text-2xl font-display font-extrabold">{selected.title}</h2>
              <span className="mt-1 inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{selected.field}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Salaire moyen (FCFA/mois)</div>
              <div className="text-lg font-display font-bold text-gradient">
                {Intl.NumberFormat("fr-FR").format(selected.salaryMin)} – {Intl.NumberFormat("fr-FR").format(selected.salaryMax)}
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3" /> {selected.growth}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-muted/50 p-4 flex items-start gap-3">
            <BarChart3 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demande marché</div>
              <div className="text-sm font-medium mt-0.5">{selected.marketDemand}</div>
            </div>
          </div>

          <p className="mt-5 text-muted-foreground">{selected.description}</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="font-display font-semibold mb-2">Compétences requises</h3>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map((s) => (
                  <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Filières</h3>
              <div className="flex flex-wrap gap-2">
                {selected.programs.map((p) => (
                  <span key={p} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Building2 className="h-4 w-4" /> Établissements au Bénin</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedInstitutions.map((i) => (
                <div key={i.key} className="rounded-2xl p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold">{i.name}</div>
                      <div className="text-xs text-muted-foreground">{i.full}</div>
                      <div className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />{i.city}
                      </div>
                      {i.duration && i.costMin && (
                        <div className="text-[10px] text-muted-foreground mt-1">
                          {i.duration} • {Intl.NumberFormat("fr-FR").format(i.costMin)} – {Intl.NumberFormat("fr-FR").format(i.costMax!)} FCFA/an
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Link to="/simulator" search={{ career: selected.slug } as never} className="text-primary font-medium inline-flex items-center gap-1.5">
              Simuler mon parcours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
