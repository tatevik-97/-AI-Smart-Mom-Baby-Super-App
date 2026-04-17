import Link from "next/link";

const features = [
  {
    icon: "🤱",
    title: "Feeding Tracker",
    description: "Log breast and bottle feedings with time, duration, and notes — never lose track of baby's nutrition.",
    color: "#fff1f5",
    border: "#ffc0d5",
    accent: "#f7306a",
  },
  {
    icon: "😴",
    title: "Sleep Logs",
    description: "Track sleep patterns and wake windows so you and baby can finally rest better.",
    color: "#f5f0ff",
    border: "#d9cbff",
    accent: "#8057d8",
  },
  {
    icon: "📏",
    title: "Growth Tracking",
    description: "Record weight, height, and head circumference with beautiful charts to watch every milestone.",
    color: "#fff7f0",
    border: "#ffd8b5",
    accent: "#ff9044",
  },
  {
    icon: "🧠",
    title: "AI Insights",
    description: "Ask your personal AI assistant anything about sleep, feeding, development, and more.",
    color: "#f0fff4",
    border: "#b5f7d8",
    accent: "#10b981",
  },
  {
    icon: "💊",
    title: "Health Logs",
    description: "Keep a record of symptoms, medications, doctor visits, and vaccinations in one place.",
    color: "#fff1f5",
    border: "#ffc0d5",
    accent: "#f7306a",
  },
  {
    icon: "📊",
    title: "Smart Charts",
    description: "Visualize trends over days and weeks — spot patterns and share progress with your pediatrician.",
    color: "#f5f0ff",
    border: "#d9cbff",
    accent: "#8057d8",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    baby: "Mom of 3-month-old Lily",
    avatar: "👩‍🍼",
    quote: "MomAI saved my sanity in the first weeks. The AI chat answered my 3am questions better than Google ever did.",
  },
  {
    name: "Anika R.",
    baby: "Mom of 8-month-old Ravi",
    avatar: "🤱",
    quote: "The growth charts are beautiful. My pediatrician was impressed when I showed up with 8 months of clean data!",
  },
  {
    name: "Julia K.",
    baby: "Mom of twin newborns",
    avatar: "👶",
    quote: "Tracking two babies at once felt impossible — until MomAI. Now I actually know who ate last.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#fff9fb", color: "#3d1f2e" }}>

      {/* ── Decorative background blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #ffc0d5, transparent)" }} />
        <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #d9cbff, transparent)" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #ffd8b5, transparent)" }} />
      </div>

      {/* ── Navbar ── */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md"
            style={{ background: "linear-gradient(135deg, #ff91b3, #bea6ff)" }}>
            🍼
          </div>
          <span className="text-xl font-bold tracking-tight"
            style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            MomAI
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium" style={{ color: "#7a4f6a" }}>
          <a href="#features" className="hover:text-rose-500 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-rose-500 transition-colors">Stories</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login"
            className="text-sm font-medium px-4 py-2 rounded-full transition-all hover:bg-rose-50"
            style={{ color: "#f7306a" }}>
            Sign In
          </Link>
          <Link href="/register"
            className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-all active:scale-95 shadow-md hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", boxShadow: "0 4px 16px rgba(247,48,106,0.3)" }}>
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
          style={{ background: "rgba(255,193,213,0.3)", color: "#e0155a", border: "1px solid #ffc0d5" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          AI-Powered Mom &amp; Baby Super App
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-3xl mb-6">
          <span style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Every moment
          </span>
          <br />
          <span style={{ color: "#3d1f2e" }}>beautifully tracked.</span>
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed max-w-xl mb-10" style={{ color: "#7a4f6a" }}>
          MomAI helps you log feedings, sleep, growth, and health — then turns it all into insights, powered by AI that actually understands your baby.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/register"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-base shadow-xl hover:shadow-2xl transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", boxShadow: "0 8px 30px rgba(247,48,106,0.35)" }}>
            Start for free ✨
          </Link>
          <Link href="/login"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-all hover:bg-white/80"
            style={{ color: "#8057d8", background: "rgba(255,255,255,0.6)", border: "1px solid #d9cbff" }}>
            I have an account →
          </Link>
        </div>

        {/* Floating tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {["🍼 Feeding logs", "😴 Sleep patterns", "📏 Growth charts", "🧠 AI chat", "💊 Health tracking"].map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: "rgba(255,255,255,0.75)", color: "#8057d8", border: "1px solid #d9cbff" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Hero mockup card */}
        <div className="relative mt-20 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,193,213,0.4)", backdropFilter: "blur(10px)" }}>
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: "#ffe4ed" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffc0d5" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffd8b5" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#d9cbff" }} />
            <div className="flex-1 mx-4 h-6 rounded-full text-xs flex items-center px-3" style={{ background: "#fff9fb", color: "#c49ab5" }}>
              momaiapp.com/dashboard
            </div>
          </div>
          {/* Dashboard preview content */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: "🍼", label: "Last Feed", value: "2h ago", sub: "Left side · 18 min", color: "#fff1f5", border: "#ffc0d5" },
              { icon: "😴", label: "Last Sleep", value: "3h 40m", sub: "Nap · 11:00–14:40", color: "#f5f0ff", border: "#d9cbff" },
              { icon: "📏", label: "Weight", value: "6.2 kg", sub: "+0.3 kg this week", color: "#fff7f0", border: "#ffd8b5" },
              { icon: "💧", label: "Diapers", value: "4 today", sub: "3 wet · 1 dirty", color: "#fff1f5", border: "#ffc0d5" },
              { icon: "🧠", label: "AI Tip", value: "Sleep cue", sub: "Yawning = sleepy signal", color: "#f5f0ff", border: "#d9cbff" },
              { icon: "⭐", label: "Milestone", value: "Smiled!", sub: "First social smile", color: "#fff7f0", border: "#ffd8b5" },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl p-4 flex flex-col gap-1"
                style={{ background: card.color, border: `1px solid ${card.border}` }}>
                <span className="text-2xl">{card.icon}</span>
                <span className="text-xs font-medium mt-1" style={{ color: "#9b7fa8" }}>{card.label}</span>
                <span className="text-base font-bold" style={{ color: "#3d1f2e" }}>{card.value}</span>
                <span className="text-xs" style={{ color: "#b896a8" }}>{card.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#c49ab5" }}>Everything you need</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: "#3d1f2e" }}>
            Built for the beautiful{" "}
            <span style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              chaos of motherhood
            </span>
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#7a4f6a" }}>
            One app to replace the scattered notes, the half-remembered times, and the 3am Google spirals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title}
              className="rounded-3xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg"
              style={{ background: f.color, border: `1px solid ${f.border}` }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                style={{ background: "rgba(255,255,255,0.8)" }}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: "#3d1f2e" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a4f6a" }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI Chat highlight ── */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fff1f5 0%, #f5f0ff 60%, #fff7f0 100%)", border: "1px solid rgba(255,193,213,0.5)" }}>
          <div className="flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-16">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#c49ab5" }}>AI Assistant</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "#3d1f2e" }}>
                Ask anything.{" "}
                <span style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Get real answers.
                </span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#7a4f6a" }}>
                Your AI knows your baby's logs. Ask "Is Lily sleeping enough?" and get answers based on <em>her</em> data — not generic advice.
              </p>
              <Link href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all active:scale-95 shadow-lg"
                style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", boxShadow: "0 4px 20px rgba(247,48,106,0.3)" }}>
                Try AI Chat free →
              </Link>
            </div>
            {/* Chat mockup */}
            <div className="flex-1 w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,193,213,0.4)" }}>
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#ffe4ed" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg, #ff91b3, #bea6ff)" }}>
                  🧠
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#3d1f2e" }}>MomAI Assistant</div>
                  <div className="text-xs flex items-center gap-1" style={{ color: "#10b981" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm"
                    style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", color: "white" }}>
                    Is Lily getting enough sleep?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
                    style={{ background: "#fff1f5", color: "#3d1f2e", border: "1px solid #ffc0d5" }}>
                    Based on Lily&apos;s last 7 days, she&apos;s averaging <strong>14.2 hours</strong> of sleep — right in the healthy range for a 3-month-old (14–17h). Keep it up, mama! 🌙
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm"
                    style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", color: "white" }}>
                    Why does she wake at 3am every night?
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl rounded-bl-sm text-sm"
                  style={{ background: "#fff1f5", color: "#9b7fa8", border: "1px solid #ffc0d5" }}>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#f7306a", animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#8057d8", animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#ff9044", animationDelay: "300ms" }} />
                  </span>
                  Thinking…
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#c49ab5" }}>Real moms, real stories</p>
          <h2 className="text-4xl font-extrabold tracking-tight" style={{ color: "#3d1f2e" }}>
            Loved by mamas worldwide 💕
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,193,213,0.35)", backdropFilter: "blur(8px)" }}>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-base" style={{ color: "#f7306a" }}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#5c3d52" }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#ffe4ed" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "linear-gradient(135deg, #ffc0d5, #d9cbff)" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#3d1f2e" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#9b7fa8" }}>{t.baby}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-3xl mx-auto text-center rounded-3xl px-8 py-16"
          style={{ background: "linear-gradient(135deg, #f7306a 0%, #8057d8 50%, #ff9044 100%)", boxShadow: "0 20px 60px rgba(247,48,106,0.25)" }}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to take the stress out of new parenthood?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
            Join thousands of mamas tracking, learning, and thriving with MomAI.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all active:scale-95 shadow-2xl hover:shadow-3xl"
            style={{ background: "white", color: "#f7306a" }}>
            Create your free account ✨
          </Link>
          <p className="mt-4 text-white/60 text-sm">No credit card required · Free forever plan</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t px-6 py-10 text-center" style={{ borderColor: "#ffe4ed" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, #ff91b3, #bea6ff)" }}>
            🍼
          </div>
          <span className="font-bold tracking-tight"
            style={{ background: "linear-gradient(135deg, #f7306a, #8057d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            MomAI
          </span>
        </div>
        <p className="text-sm" style={{ color: "#c49ab5" }}>
          Made with 💕 for every mama out there. &copy; {new Date().getFullYear()} MomAI.
        </p>
      </footer>
    </div>
  );
}