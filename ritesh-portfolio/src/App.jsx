import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Mail, Github, Linkedin, ImageOff } from 'lucide-react'
import { profile, projects, skills } from './config.js'

const links = ['About', 'Skills', 'Projects', 'Contact']
const wrap = 'mx-auto w-full max-w-6xl px-6'
const label = 'font-mono text-[11px] uppercase tracking-[0.22em] text-mute'
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
    }), { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const btnBase = 'inline-flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-medium transition-colors'

function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id)
    }), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach((l) => { const el = document.getElementById(l.toLowerCase()); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const tone = (l) => (active === l.toLowerCase() ? 'text-amber' : 'text-mute')
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-black/70 backdrop-blur">
      <nav className={`${wrap} flex h-16 items-center justify-between`} aria-label="Main">
        <a href="#top" className="font-serif text-xl">Ritesh<span className="text-amber">.</span></a>
        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className={`text-sm transition-colors hover:text-paper ${tone(l)}`}>{l}</a></li>
          ))}
        </ul>
        <button className="grid size-11 place-items-center md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-black px-6 py-2 md:hidden">
          {links.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className={`block border-b border-line/60 py-4 font-serif text-2xl last:border-0 ${active === l.toLowerCase() ? 'text-amber' : ''}`  }>{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  )
}

function Hero() {
  const [missing, setMissing] = useState(false)
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-6xl grid-cols-4 px-6 md:grid-cols-6" aria-hidden="true">
        {[...Array(6)].map((_, i) => <div key={i} className={`border-l border-white/6 ${i > 3 ? 'hidden md:block' : ''} ${i === 5 ? 'border-r' : ''}` } />)}
      </div>
      <div className="absolute inset-x-0 top-0 h-[68svh] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[55%]">
        {!missing ? (
          <img src={profile.photo} alt="Portrait of Ritesh Ranjan" onError={() => setMissing(true)} className="h-full w-full object-cover object-top hero-zoom grayscale contrast-110 brightness-90" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_35%,#2a1d0e_0%,#000_65%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(224,160,80,0.4),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent md:bg-linear-to-r md:from-black md:via-black/30 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black to-transparent md:hidden" />
      </div>

      <div className={`${wrap} relative z-10 pb-24 pt-32`}>
        <p className="hero-in flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/80">
          <span className="h-px w-8 bg-amber" />Engineer. Developer. Builder.
        </p>
        <h1 className="mt-5 font-serif text-[clamp(3.5rem,17vw,9rem)] leading-[0.92] tracking-tight">
          <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em]"><span className="line-up block" style={{ animationDelay: '.15s' }}>Ritesh</span></span>
          <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em]"><span className="line-up block" style={{ animationDelay: '.3s' }}>Ranjan</span></span>
        </h1>
        <p className="hero-in mt-6 max-w-md text-base leading-relaxed text-paper/75 md:text-lg" style={{ animationDelay: '.2s' }}>
          I build modern web experiences and full-stack applications.
        </p>
        <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '.3s' }}>
          <a href="#projects" className={`${btnBase} bg-paper text-black hover:bg-amber`}>Explore My Work</a>
          <a href="#contact" className={`${btnBase} border border-paper/30 hover:border-amber hover:text-amber`}>Start a Conversation</a>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className={label}>Scroll</span>
        <span className="scroll-line h-8 w-px bg-amber" />
      </a>
    </section>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-t border-line py-24 md:py-32">
      <div className={wrap}>
        <h2 className="reveal font-serif text-4xl md:text-6xl">{title}</h2>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" title="About">
      <div className="reveal max-w-2xl space-y-5 text-lg leading-relaxed text-paper/80">
        <p>I'm a B.Tech Computer Science and Engineering (Data Science) student and a full-stack developer.</p>
        <p>I focus on building useful applications from the database to the interface, and I'm always learning more about software engineering along the way.</p>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
        {skills.map((s, i) => (
          <li key={s} style={{ transitionDelay: `${i * 60}ms` }} className="reveal group bg-black px-5 py-8 hover:bg-char">
            <span className="mb-4 block h-px w-6 bg-line transition-all group-hover:w-10 group-hover:bg-amber" />
            <span className="font-serif text-xl">{s}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ProjectCard({ p, i }) {
  const [broken, setBroken] = useState(false)
  return (
    <div className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
    <article className="group flex h-full flex-col border border-line bg-char/40 transition-colors hover:border-amber/60">
      <div className="aspect-16/10 overflow-hidden border-b border-line bg-char">
        {!broken ? (
          <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" onError={() => setBroken(true)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(ellipse_at_50%_40%,#241a0d,#0a0a0a_70%)] text-mute">
            <div className="flex flex-col items-center gap-2"><ImageOff size={22} /><span className={label}>Screenshot coming soon</span></div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.text}</p>
        {(p.github || p.live) && (
          <div className="mt-5 flex gap-5 text-sm">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 hover:text-amber">Live demo <ArrowUpRight size={14} /></a>}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 hover:text-amber">Code <ArrowUpRight size={14} /></a>}
          </div>
        )}
      </div>
    </article>
    </div>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Featured projects">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </Section>
  )
}

function Contact() {
  const link = 'inline-flex min-h-12 items-center gap-2 border border-paper/30 px-6 text-sm transition-colors hover:border-amber hover:text-amber'
  return (
    <Section id="contact" title="Let's build something useful.">
      <p className="reveal max-w-xl text-lg text-paper/75">Open to internships, collaborations and conversations about web development.</p>
      <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {profile.email && <a href={`mailto:${profile.email}`} className={`${btnBase} bg-paper text-black hover:bg-amber`}><Mail size={16} />Email me</a>}
        <a href={profile.github} target="_blank" rel="noreferrer" className={link}><Github size={16} />GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}><Linkedin size={16} />LinkedIn</a>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className={`${wrap} flex flex-col items-start justify-between gap-4 text-sm text-mute sm:flex-row sm:items-center`}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-amber">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}