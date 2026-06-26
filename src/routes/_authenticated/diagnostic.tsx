import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { INSTITUTIONS } from "@/lib/data";
import {
  PERSONALITY_QUIZ,
  DIMENSIONS,
  DIMENSION_LABELS,
  PREFERRED_DOMAINS,
  PROFILE_TYPES,
  emptyDimensionScores,
  addAnswerScore,
  normalizeScores,
  detectProfileType,
  recommendTopCareers,
  getSecondaryDimension,
  type DimensionKey,
} from "@/lib/diagnostic-quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, RotateCcw, Sparkles, ChevronLeft, ChevronRight,
  GraduationCap, Building2, Users, Award,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/diagnostic")({
  component: Diag,
});

type Phase = "quiz" | "form" | "results";

function Diag() {
  const { user } = Route.useRouteContext();
  const total = PERSONALITY_QUIZ.length;
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(0);
  const [resultPage, setResultPage] = useState(0);
  const [answers, setAnswers] = useState<(DimensionKey | null)[]>(() => Array(PERSONALITY_QUIZ.length).fill(null));
  const [saving, setSaving] = useState(false);
  const [bacSeries, setBacSeries] = useState("");
  const [preferredDomain, setPreferredDomain] = useState("");

  const scores = answers.reduce((acc, dim) => {
    if (!dim) return acc;
    return addAnswerScore(acc, dim);
  }, emptyDimensionScores());

  const current = PERSONALITY_QUIZ[step];
  const normalized = normalizeScores(scores);
  const profileType = detectProfileType(scores);
  const profile = PROFILE_TYPES[profileType];
  const topCareers = recommendTopCareers(scores, 10);
  const secondaryDim = getSecondaryDimension(scores);

  function pick(dimension: DimensionKey) {
    const nextAnswers = [...answers];
    nextAnswers[step] = dimension;
    setAnswers(nextAnswers);
    if (step + 1 < total) setStep(step + 1);
    else setPhase("form");
  }

  async function submitDiagnostic() {
    if (!bacSeries) return toast.error("La série du BAC est obligatoire");
    if (!preferredDomain) return toast.error("Le domaine préféré est obligatoire");

    setSaving(true);
    const { error: profileError } = await supabase.from("profiles").update({
      bac_series: bacSeries,
      interests: [preferredDomain],
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id);

    if (profileError) {
      setSaving(false);
      return toast.error(profileError.message);
    }

    const { error } = await supabase.from("diagnostic_results").insert({
      user_id: user.id,
      dominant_profile: profile.label,
      secondary_profile: DIMENSION_LABELS[secondaryDim],
      scores: scores as never,
      strengths: profile.strengths,
      recommendations: {
        careers: topCareers.map((c) => c.slug),
        profile_type: profileType,
        bac_series: bacSeries,
        preferred_domain: preferredDomain,
      } as never,
    });

    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Diagnostic enregistré !");
      setPhase("results");
      setResultPage(0);
    }
  }

  function restart() {
    setPhase("quiz");
    setStep(0);
    setResultPage(0);
    setAnswers(Array(total).fill(null));
    setBacSeries("");
    setPreferredDomain("");
  }

  if (phase === "results") {
    const chartData = DIMENSIONS.map((d) => ({
      profile: DIMENSION_LABELS[d].split(" ")[0],
      value: normalized[d],
    }));

    return (
      <div className="p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-2">
          {["Profil", "Top 10 métiers", "Prochaines étapes"].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setResultPage(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                resultPage === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {resultPage === 0 && (
            <motion.div key="p1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elevated relative overflow-hidden">
                <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-white/20">
                  <Sparkles className="h-3 w-3" /> Profil personnalité
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold">{profile.label}</h1>
                <p className="mt-2 opacity-90 max-w-2xl">{profile.description}</p>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <div className="bg-card rounded-3xl p-6 border border-border">
                  <h3 className="font-display font-bold">Tes 5 dimensions (0-100)</h3>
                  <div className="mt-4 space-y-3">
                    {DIMENSIONS.map((d) => (
                      <div key={d}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{DIMENSION_LABELS[d]}</span>
                          <span className="font-semibold text-primary">{normalized[d]}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full gradient-primary rounded-full" style={{ width: `${normalized[d]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-3xl p-6 border border-border">
                  <h3 className="font-display font-bold">Radar de personnalité</h3>
                  <div className="mt-4 h-72">
                    <ResponsiveContainer>
                      <RadarChart data={chartData}>
                        <PolarGrid stroke="var(--color-border)" />
                        <PolarAngleAxis dataKey="profile" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl p-5 border border-border">
                  <h4 className="font-semibold text-success">Points forts</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {profile.strengths.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border">
                  <h4 className="font-semibold">À développer</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {profile.develop.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {resultPage === 1 && (
            <motion.div key="p2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="rounded-3xl gradient-primary p-7 text-primary-foreground shadow-elevated">
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Top 10 métiers recommandés</h1>
                <p className="mt-1 opacity-90 text-sm">Classés par compatibilité avec ton profil {profile.label}.</p>
              </div>
              <div className="mt-6 space-y-3">
                {topCareers.map((c, i) => (
                  <div key={c.slug} className="bg-card rounded-2xl p-5 border border-border flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="h-10 w-10 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-2xl">{c.emoji}</span>
                      <div className="min-w-0">
                        <div className="font-display font-bold truncate">{c.title}</div>
                        <div className="text-xs text-muted-foreground">{c.field}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Compatibilité</div>
                        <div className="font-display font-extrabold text-gradient text-lg">{c.compatibility}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Salaire (FCFA)</div>
                        <div className="font-semibold text-xs">
                          {Intl.NumberFormat("fr-FR").format(c.salaryMin)} – {Intl.NumberFormat("fr-FR").format(c.salaryMax)}
                        </div>
                      </div>
                      <div className="hidden md:block max-w-xs">
                        <div className="text-xs text-muted-foreground mb-1">Compétences</div>
                        <div className="flex flex-wrap gap-1">
                          {c.skills.slice(0, 3).map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {resultPage === 2 && (
            <motion.div key="p3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="rounded-3xl gradient-primary p-7 text-primary-foreground shadow-elevated">
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Prochaines étapes</h1>
                <p className="mt-1 opacity-90 text-sm">BAC {bacSeries} • Domaine : {preferredDomain}</p>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <div className="bg-card rounded-3xl p-6 border border-border">
                  <h3 className="font-display font-bold flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> Filières recommandées</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[...new Set(topCareers.flatMap((c) => c.programs))].slice(0, 8).map((p) => (
                      <span key={p} className="text-sm px-3 py-1.5 rounded-xl bg-accent text-accent-foreground font-medium">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-3xl p-6 border border-border">
                  <h3 className="font-display font-bold flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Établissements au Bénin</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {INSTITUTIONS.map((i) => (
                      <li key={i.name} className="flex justify-between gap-2">
                        <span className="font-medium">{i.name}</span>
                        <span className="text-muted-foreground">{i.city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-3xl p-6 border border-border">
                  <h3 className="font-display font-bold flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Bourses & opportunités</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• Programme national de bourses (MESRS Bénin)</li>
                    <li>• Bourses UEMOA / CEDEAO pour filières STEM</li>
                    <li>• Partenariats IFRI — stages rémunérés</li>
                  </ul>
                </div>
                <div className="bg-card rounded-3xl p-6 border border-border">
                  <h3 className="font-display font-bold flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Mentorat disponible</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Connecte-toi avec des professionnels pour affiner ton choix.</p>
                  <Link to="/mentors" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3">
                    Voir les conseillers <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <Button variant="outline" disabled={resultPage === 0} onClick={() => setResultPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
            </Button>
            <Button variant="outline" disabled={resultPage === 2} onClick={() => setResultPage((p) => p + 1)}>
              Suivant <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/recommendations">
              <Button className="gradient-primary text-primary-foreground border-0">
                Voir mes recommandations <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" onClick={restart}><RotateCcw className="mr-1.5 h-4 w-4" /> Refaire</Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "form") {
    return (
      <div className="p-6 sm:p-10 max-w-3xl mx-auto">
        <div className="rounded-3xl gradient-primary p-7 text-primary-foreground shadow-elevated">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Dernière étape</h1>
          <p className="mt-2 opacity-90">Complète ces informations pour personnaliser tes recommandations.</p>
        </div>
        <div className="mt-6 bg-card rounded-3xl p-7 border border-border shadow-soft space-y-5">
          <div>
            <label className="text-sm font-medium">Série du BAC <span className="text-destructive">*</span></label>
            <Select value={bacSeries} onValueChange={setBacSeries}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Choisir ta série..." /></SelectTrigger>
              <SelectContent>
                {["A", "B", "C", "D", "E", "F", "G", "STT"].map((s) => (
                  <SelectItem key={s} value={s}>BAC {s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Domaine préféré <span className="text-destructive">*</span></label>
            <Select value={preferredDomain} onValueChange={setPreferredDomain}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Choisir un domaine..." /></SelectTrigger>
              <SelectContent>
                {PREFERRED_DOMAINS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => void submitDiagnostic()}
              disabled={saving}
              className="gradient-primary text-primary-foreground border-0"
            >
              {saving ? "Enregistrement..." : "Voir mes résultats"}
            </Button>
            <Button variant="outline" onClick={() => { setPhase("quiz"); setStep(total - 1); }}>
              ← Retour aux questions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold">Test de personnalité ALITCHÉ</h1>
          <p className="text-sm text-muted-foreground">Question {step + 1} sur {total}</p>
          <p className="text-xs text-primary font-medium mt-0.5">{current.dimensionGroup}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground">5-8 min</span>
      </div>
      <Progress value={((step + 1) / total) * 100} className="h-2" />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-8 bg-card rounded-3xl p-7 border border-border shadow-soft"
        >
          <h2 className="text-xl font-display font-bold">{current.q}</h2>
          <div className="mt-5 grid gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.letter}
                onClick={() => pick(opt.dimension)}
                className="text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-accent transition group"
              >
                <span className="font-semibold text-primary mr-2">{opt.letter})</span>
                <span className="font-medium group-hover:text-primary">{opt.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      {step > 0 && (
        <Button variant="ghost" className="mt-4" onClick={() => setStep((s) => s - 1)}>← Précédent</Button>
      )}
    </div>
  );
}
