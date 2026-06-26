import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { recommendTopCareers, type DimensionKey } from "@/lib/diagnostic-quiz";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Sparkles, Brain } from "lucide-react";

export const Route = createFileRoute("/_authenticated/recommendations")({
  component: Recs,
});

function Recs() {
  const { user } = Route.useRouteContext();
  const { data: diag, isLoading } = useQuery({
    queryKey: ["diagnostic", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("diagnostic_results").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
      return data;
    },
  });

  if (isLoading) return <div className="p-10">Chargement...</div>;

  if (!diag) {
    return (
      <div className="p-10 max-w-2xl mx-auto text-center">
        <div className="h-16 w-16 rounded-2xl gradient-primary grid place-items-center text-primary-foreground mx-auto"><Brain className="h-7 w-7" /></div>
        <h1 className="mt-5 text-2xl font-display font-bold">Aucun diagnostic encore</h1>
        <p className="mt-2 text-muted-foreground">Fais ton test de personnalité (15 questions) pour débloquer tes recommandations.</p>
        <Link to="/diagnostic"><Button className="mt-6 gradient-primary text-primary-foreground border-0">Faire mon diagnostic <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
      </div>
    );
  }

  const scores = diag.scores as Record<DimensionKey, number>;
  const top = recommendTopCareers(scores, 10);

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      <div className="rounded-3xl gradient-primary p-7 text-primary-foreground shadow-elevated">
        <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-white/20"><Sparkles className="h-3 w-3" /> Recommandations IA</span>
        <h1 className="mt-3 text-2xl sm:text-3xl font-display font-extrabold">Profil : <span className="opacity-90">{diag.dominant_profile}</span></h1>
        <p className="mt-1.5 opacity-90 text-sm">Top {top.length} métiers classés par compatibilité avec ton profil.</p>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {top.slice(0, 6).map((c) => (
          <div key={c.slug} className="bg-card rounded-3xl p-6 border border-border hover-lift">
            <div className="flex items-start justify-between">
              <div className="text-4xl">{c.emoji}</div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Compatibilité</div>
                <div className="text-2xl font-display font-extrabold text-gradient">{c.compatibility}%</div>
              </div>
            </div>
            <h3 className="mt-3 text-lg font-display font-bold">{c.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
            <div className="mt-3 text-xs text-muted-foreground">
              Salaire : {Intl.NumberFormat("fr-FR").format(c.salaryMin)} – {Intl.NumberFormat("fr-FR").format(c.salaryMax)} FCFA
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: "Compatibilité", value: c.compatibility },
                { label: "Employabilité", value: Math.min(95, c.compatibility + 5) },
                { label: "Potentiel de croissance", value: c.growth === "Élevée" ? 95 : c.growth === "Forte" ? 80 : 65 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">{m.label}</span><span className="font-semibold">{m.value}%</span></div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1 text-muted-foreground"><TrendingUp className="h-3.5 w-3.5 text-success" />{c.growth}</span>
              <Link to="/simulator" search={{ career: c.slug } as never} className="text-primary font-medium inline-flex items-center gap-1">Simuler <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link to="/diagnostic"><Button variant="outline">Refaire le diagnostic</Button></Link>
      </div>
    </div>
  );
}
