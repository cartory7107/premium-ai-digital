import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, Search, Megaphone, Share2, Mail, Bot, Workflow,
  MessageSquare, BarChart3, Check, Star, Linkedin, Phone, Send, Calendar,
  TrendingUp, Globe, Users, Award, Zap, Target, ShieldCheck, LineChart,
  LogOut, User,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";
import portraitAsset from "@/assets/portrait-hamza.png.asset.json";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <Logos />
      <About />
      <Services />
      <Stats />
      <Work />
      <Skills />
      <Testimonials />
      <WhyMe />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string; avatar_url?: string } } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-6xl px-4 ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${scrolled ? "glass" : ""}`}>
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-primary glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            Hamza<span className="text-primary">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" className="h-7 w-7 rounded-full" />
                  ) : (
                    <div className="grid place-items-center h-7 w-7 rounded-full bg-white/10">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span className="max-w-[120px] truncate">{user.user_metadata?.full_name || user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-lg glass px-3 py-2 text-xs font-medium hover:bg-white/10 transition"
                  title="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-semibold hover:bg-white/10 transition">
              Book a call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <img src={heroBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50 -z-10" width={1920} height={1280} />
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--gradient-hero)" }} />

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Available for new projects — Q3 2026
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Helping businesses grow through{" "}
              <span className="text-gradient">digital marketing &amp; AI automation</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              I'm Hamza — a Digital Marketing Specialist and AI Integrator with 5+ years of experience
              and 700+ shipped projects. I build growth systems that compound: paid acquisition, SEO,
              and AI-powered workflows that work while you sleep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground hover:scale-[1.02] transition">
                Book a consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 font-semibold hover:bg-white/10 transition">
                View my work
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> 700+ projects shipped</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Global remote experience</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Data-driven, ROI-first</span>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute -inset-6 bg-gradient-primary blur-3xl opacity-30 rounded-full" />
            <div className="relative rounded-3xl overflow-hidden glass p-2">
              <div className="relative min-h-[520px] overflow-hidden rounded-2xl">
                <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl z-0" />
                <div className="absolute -right-20 bottom-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl z-0" />
                <img
                  src={portraitAsset.url}
                  alt="Hamza — Digital Marketing & AI Integration Specialist"
                  className="relative z-10 h-full w-full object-cover rounded-2xl"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
                  <div className="font-display text-3xl font-bold text-white">Hamza</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-white/70">Digital Marketing &amp; AI</div>
                </div>
              </div>
            </div>
            <FloatingCard className="absolute -left-6 top-10" icon={<TrendingUp className="h-5 w-5 text-accent" />} title="+312%" subtitle="Avg. ROAS uplift" />
            <FloatingCard className="absolute -right-4 bottom-16" icon={<Bot className="h-5 w-5 text-primary" />} title="24/7" subtitle="AI support live" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ className = "", icon, title, subtitle }: { className?: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className={`glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[var(--shadow-card)] ${className}`}>
      <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/5">{icon}</div>
      <div>
        <div className="font-display font-bold leading-none">{title}</div>
        <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function Logos() {
  const items = ["NORTHWAVE", "Lumen&Co", "Pulsar", "Helio", "Brightline", "Vexa"];
  return (
    <section className="border-y border-border/60 py-8 bg-card/30">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Trusted by startups, agencies and brands worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground/70 font-display font-semibold tracking-widest text-sm">
          {items.map((i) => <span key={i}>{i}</span>)}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl mb-14">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

function About() {
  const values = [
    { icon: Target, t: "Outcome over output", d: "Every campaign tied to revenue, pipeline, or retention." },
    { icon: ShieldCheck, t: "Transparent execution", d: "Weekly reports, clear KPIs, full access to dashboards." },
    { icon: Zap, t: "AI-native workflows", d: "I automate the boring so your team can focus on growth." },
  ];
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-14">
        <div>
          <SectionHead eyebrow="About me" title="Marketing strategist. AI builder. Growth partner." />
          <p className="text-muted-foreground text-lg leading-relaxed">
            For the past five years I've helped 100+ founders, SaaS teams and DTC brands across 4 continents
            turn marketing into a predictable growth engine. I blend performance marketing fundamentals with
            modern AI tooling — chatbots, agents, RAG systems, and end-to-end automations — to ship results
            that scale beyond the campaign.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            My mission is simple: build marketing systems that compound. No vanity metrics. No fluff. Just
            durable growth, powered by data and accelerated by AI.
          </p>
        </div>
        <div className="grid gap-4">
          {values.map((v) => (
            <div key={v.t} className="glass rounded-2xl p-6 hover:bg-white/[0.06] transition">
              <div className="flex items-start gap-4">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-primary shrink-0">
                  <v.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{v.t}</h3>
                  <p className="text-muted-foreground mt-1">{v.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: LineChart, t: "Digital Marketing Strategy", d: "Go-to-market roadmaps, positioning and full-funnel growth plans." },
    { icon: Search, t: "SEO", d: "Technical SEO, programmatic content and authority building that ranks." },
    { icon: Megaphone, t: "Paid Advertising", d: "Google, Meta and TikTok Ads engineered for profitable scale." },
    { icon: Share2, t: "Social Media Management", d: "Content systems and community growth across every relevant channel." },
    { icon: Mail, t: "Email & Lifecycle", d: "Lifecycle flows and broadcast campaigns that 3–5x retention revenue." },
    { icon: Workflow, t: "Marketing Automation", d: "CRM, attribution and revenue ops wired into one source of truth." },
    { icon: Bot, t: "AI Integration", d: "Custom GPTs, agents and RAG pipelines tailored to your business." },
    { icon: MessageSquare, t: "AI Chatbots & Support", d: "24/7 AI customer support that resolves 70%+ of tickets autonomously." },
  ];
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Services" title="A full growth stack — marketing + AI under one roof." sub="From acquisition to automation, I handle the entire growth engine so you don't have to juggle 5 freelancers." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <div key={s.t} className="group relative glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "var(--gradient-hero)" }} />
              <div className="relative">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-white/5 group-hover:bg-gradient-primary transition">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "700+", l: "Projects completed", i: Award },
    { v: "5+", l: "Years of experience", i: Sparkles },
    { v: "100+", l: "Happy clients", i: Users },
    { v: "20+", l: "Global partnerships", i: Globe },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass rounded-3xl p-8 md:p-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          {stats.map((s) => (
            <div key={s.l} className="relative">
              <s.i className="h-5 w-5 text-accent" />
              <div className="mt-3 font-display text-4xl md:text-5xl font-bold text-gradient">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const cases = [
    {
      tag: "DTC / E-commerce", title: "Scaled a beauty brand from $40k to $480k MRR",
      desc: "Rebuilt Meta + Google Ads funnels, deployed AI-driven creative testing, and launched a lifecycle email engine.",
      m: [["+312%", "ROAS"], ["12x", "Revenue"], ["-38%", "CAC"]],
      grad: "from-fuchsia-500/30 to-cyan-400/20",
    },
    {
      tag: "B2B SaaS", title: "AI support agent resolves 74% of tickets",
      desc: "Custom RAG agent over docs + Intercom, integrated with HubSpot and Slack for live handoff.",
      m: [["74%", "Auto-resolved"], ["–62%", "Response time"], ["+28%", "CSAT"]],
      grad: "from-violet-500/30 to-blue-400/20",
    },
    {
      tag: "Local services", title: "SEO + automation for a multi-location clinic",
      desc: "Programmatic location pages, GMB optimization, and AI booking assistant across 14 cities.",
      m: [["+540%", "Organic traffic"], ["+220%", "Leads"], ["#1", "Local pack"]],
      grad: "from-cyan-400/30 to-emerald-400/20",
    },
    {
      tag: "Agency partnership", title: "AI workflow saves 80 hours / week",
      desc: "Built end-to-end content + reporting automations across Notion, Slack, Zapier and OpenAI.",
      m: [["80h", "Saved weekly"], ["3x", "Output"], ["+$18k", "MRR added"]],
      grad: "from-orange-400/25 to-pink-500/20",
    },
  ];
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Selected work" title="Case studies & before-after results." sub="A snapshot of recent engagements. Full case studies available on request." />
        <div className="grid md:grid-cols-2 gap-5">
          {cases.map((c) => (
            <article key={c.title} className="group glass rounded-3xl p-7 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className={`absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br ${c.grad} blur-3xl opacity-70`} />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.tag}</div>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">{c.title}</h3>
                <p className="mt-3 text-muted-foreground">{c.desc}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {c.m.map(([v, l]) => (
                    <div key={l} className="rounded-xl bg-white/[0.04] border border-border p-3">
                      <div className="font-display font-bold text-xl text-gradient">{v}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { n: "SEO", v: 95 }, { n: "Google Ads", v: 92 }, { n: "Meta Ads", v: 94 },
    { n: "Analytics & Attribution", v: 90 }, { n: "AI Automation", v: 96 },
    { n: "ChatGPT / LLM Workflows", v: 95 }, { n: "Business Automation", v: 88 }, { n: "CRM Systems", v: 86 },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Skills & tools" title="Battle-tested across the modern growth stack." />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {skills.map((s) => (
            <div key={s.n}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{s.n}</span>
                <span className="text-muted-foreground">{s.v}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${s.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: "Hamza rebuilt our paid funnel from scratch and tripled revenue in a single quarter. He's the most strategic marketer we've worked with.", n: "Sarah Lin", r: "Founder, Northwave Skincare" },
    { q: "The AI support agent he shipped resolves the majority of our tickets. It paid for itself in under 30 days.", n: "Marcus Hale", r: "Head of CX, Pulsar SaaS" },
    { q: "Equal parts strategist and operator. Hamza understands the numbers AND the tech — a rare combo.", n: "Ivana Petrova", r: "CMO, Helio Studio" },
  ];
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Testimonials" title="What clients say after the work ships." />
        <div className="grid md:grid-cols-3 gap-5">
          {t.map((x) => (
            <figure key={x.n} className="glass rounded-2xl p-6 flex flex-col">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-foreground/90 leading-relaxed">"{x.q}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border">
                <div className="font-semibold">{x.n}</div>
                <div className="text-sm text-muted-foreground">{x.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  const reasons = [
    { i: BarChart3, t: "Proven track record", d: "700+ projects, double-digit growth as the baseline." },
    { i: Target, t: "Data-driven strategy", d: "Every decision tied to a metric you actually care about." },
    { i: Bot, t: "AI-powered solutions", d: "Modern tooling that gives you an unfair operational edge." },
    { i: TrendingUp, t: "Long-term growth", d: "Systems that compound — not one-off campaigns." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Why work with me" title="A partner who ships, measures, and iterates." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => (
            <div key={r.t} className="glass rounded-2xl p-6">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-primary mb-4">
                <r.i className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg">{r.t}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-primary opacity-25 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="grid lg:grid-cols-2 gap-12 relative">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">Let's talk</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                Ready to <span className="text-gradient">accelerate</span> your growth?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Book a free 30-minute strategy call. We'll diagnose your funnel, map a few quick wins,
                and decide together if we're a good fit.
              </p>
              <div className="mt-8 space-y-3">
                <ContactRow icon={<Calendar className="h-4 w-4" />} label="Book a call" value="cal.com/hamzacarter" href="https://cal.com" />
                <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value="hamza@hamzacarter.com" href="mailto:hamza@hamzacarter.com" />
                <ContactRow icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="/in/hamzacarter" href="https://linkedin.com" />
                <ContactRow icon={<Phone className="h-4 w-4" />} label="WhatsApp" value="+1 (555) 010-7788" href="https://wa.me/15550107788" />
              </div>
            </div>
            <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll be in touch within 24 hours."); }}>
              <Field label="Name" name="name" placeholder="Jane Doe" required />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
              <Field label="Company" name="company" placeholder="Acme Inc." />
              <div>
                <label className="text-sm font-medium mb-1.5 block">How can I help?</label>
                <textarea required rows={4} placeholder="Tell me about your business and goals…"
                  className="w-full rounded-xl bg-white/[0.04] border border-border px-4 py-3 outline-none focus:border-primary/60 transition resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground hover:scale-[1.01] transition">
                Send message <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-4 rounded-xl glass p-4 hover:bg-white/[0.07] transition group">
      <div className="grid place-items-center h-10 w-10 rounded-lg bg-gradient-primary text-primary-foreground">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
    </a>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium mb-1.5 block">{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required}
        className="w-full rounded-xl bg-white/[0.04] border border-border px-4 py-3 outline-none focus:border-primary/60 transition" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10 mt-12">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid place-items-center h-7 w-7 rounded-md bg-gradient-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          Hamza
        </div>
        <div className="flex items-center gap-5 text-muted-foreground text-sm">
          <a href="https://linkedin.com" className="hover:text-foreground transition"><Linkedin className="h-4 w-4" /></a>
          <a href="mailto:hamza@hamzacarter.com" className="hover:text-foreground transition"><Mail className="h-4 w-4" /></a>
          <a href="https://wa.me/15550107788" className="hover:text-foreground transition"><Phone className="h-4 w-4" /></a>
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Hamza. Crafted with intent.</div>
      </div>
    </footer>
  );
}
