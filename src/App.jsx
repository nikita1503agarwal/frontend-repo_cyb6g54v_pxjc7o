import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Mail, Github, Linkedin, Award, GraduationCap, Briefcase, Send, ExternalLink, Code2 } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Badge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-white/40">
      <Icon className="w-4 h-4 text-blue-600" />
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  )
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-blue-600/30 to-transparent ml-6" />
    </div>
  )
}

function ProjectCard({ title, description, tags, link }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {link && (
          <a href={link} target="_blank" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
            View <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags?.map((t) => (
          <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: 'Sending...' })
    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus({ state: 'success', msg: 'Message sent! I will get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ state: 'error', msg: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_600px_at_50%_-50%,rgba(56,189,248,0.35),transparent),radial-gradient(800px_400px_at_0%_0%,rgba(167,139,250,0.35),transparent)]">
      {/* Hero */}
      <header className="relative h-[72vh] sm:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 sm:pt-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge icon={Code2} label="Full-Stack Developer" />
              <Badge icon={Award} label="Certified" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
              Building Modern, Vivid, and Secure Web Experiences
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              I design and develop clean, performant applications with a focus on delightful UX and robust engineering.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#projects" className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">View Projects</a>
              <a href="#contact" className="px-5 py-2.5 bg-white text-gray-900 rounded-full border border-gray-200 hover:border-gray-300 transition">Contact</a>
            </div>
            <div className="flex items-center gap-4 mt-6 text-gray-700">
              <a href="mailto:you@example.com" className="flex items-center gap-2 hover:text-blue-600 transition"><Mail className="w-4 h-4"/> Email</a>
              <a href="https://github.com/" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition"><Github className="w-4 h-4"/> GitHub</a>
              <a href="https://linkedin.com/" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition"><Linkedin className="w-4 h-4"/> LinkedIn</a>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 -mt-16 sm:-mt-24">
        <div className="max-w-6xl mx-auto px-6 space-y-12 sm:space-y-16">
          {/* Certifications */}
          <section id="certifications" className="bg-white/70 backdrop-blur rounded-3xl border border-gray-200 p-6 sm:p-8">
            <SectionTitle icon={Award} title="Certifications" subtitle="Highlights of my credentials" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
              {[
                { title: 'AWS Certified Cloud Practitioner', by: 'Amazon Web Services', year: '2024' },
                { title: 'Google Professional Cloud Developer', by: 'Google Cloud', year: '2023' },
                { title: 'Meta Front-End Developer', by: 'Coursera', year: '2023' },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-gray-200 p-5 bg-white/60">
                  <p className="text-sm text-gray-500">{c.by} • {c.year}</p>
                  <p className="mt-1 font-medium text-gray-900">{c.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="bg-white/70 backdrop-blur rounded-3xl border border-gray-200 p-6 sm:p-8">
            <SectionTitle icon={Briefcase} title="Projects" subtitle="Selected work" />
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6">
              <ProjectCard
                title="Realtime Chat App"
                description="WebSocket-powered chat with rooms, presence, and end-to-end typing indicators."
                tags={["React", "FastAPI", "WebSocket", "Tailwind"]}
                link="#"
              />
              <ProjectCard
                title="AI Image Styler"
                description="Upload images and apply artistic styles in the browser with GPU-accelerated effects."
                tags={["React", "WebGL", "Workers"]}
                link="#"
              />
              <ProjectCard
                title="SaaS Billing Dashboard"
                description="Multi-tenant subscriptions, metered billing, and analytics with role-based access."
                tags={["FastAPI", "MongoDB", "Stripe"]}
                link="#"
              />
              <ProjectCard
                title="Developer Portfolio"
                description="This site template—hero with 3D Spline, projects, timeline, and contact form."
                tags={["React", "Tailwind", "Spline"]}
                link="#"
              />
            </div>
          </section>

          {/* Education Timeline */}
          <section id="education" className="bg-white/70 backdrop-blur rounded-3xl border border-gray-200 p-6 sm:p-8">
            <SectionTitle icon={GraduationCap} title="Education" subtitle="My learning journey" />
            <ol className="relative border-s border-gray-200 mt-6">
              {[
                { time: '2018 - 2022', title: 'B.Sc. in Computer Science', place: 'Tech University' },
                { time: '2022 - 2023', title: 'Full-Stack Bootcamp', place: 'Online' },
                { time: '2024', title: 'Cloud Certifications', place: 'AWS/GCP' },
              ].map((e, idx) => (
                <li key={idx} className="mb-8 ms-6">
                  <span className="absolute -start-1.5 mt-1.5 w-3 h-3 bg-blue-600 rounded-full border border-white"></span>
                  <time className="text-xs text-gray-500">{e.time}</time>
                  <h3 className="text-base font-semibold text-gray-900">{e.title}</h3>
                  <p className="text-sm text-gray-600">{e.place}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Contact Form */}
          <section id="contact" className="bg-white/70 backdrop-blur rounded-3xl border border-gray-200 p-6 sm:p-8">
            <SectionTitle icon={Mail} title="Contact" subtitle="Let’s build something together" />
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 mt-6">
              <div className="sm:col-span-1">
                <label className="text-sm text-gray-700">Name</label>
                <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm text-gray-700">Email</label>
                <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-700">Subject</label>
                <input value={form.subject} onChange={(e)=>setForm({...form, subject: e.target.value})} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-700">Message</label>
                <textarea rows="4" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-60" disabled={status.state==='loading'}>
                  <Send className="w-4 h-4"/> Send
                </button>
                {status.state !== 'idle' && (
                  <span className={`${status.state==='success' ? 'text-green-600' : status.state==='error' ? 'text-red-600' : 'text-gray-600'} text-sm`}>
                    {status.msg}
                  </span>
                )}
              </div>
            </form>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 py-8">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </footer>
        </div>
      </main>
    </div>
  )
}
