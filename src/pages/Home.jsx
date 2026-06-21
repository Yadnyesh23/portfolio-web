import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowUpRight, Download, Github, ExternalLink, X, ChevronRight,
  GraduationCap, MapPin, Trophy, Award, Send, User, Mail,
  MessageSquare, Braces, Layers, Code2, Database, Cpu, Wrench, Sparkles,
  ArrowRight, Play, Triangle
} from 'lucide-react';

import profile from '../data/profile.json';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import education from '../data/education.json';
import socials from '../data/socials.json';
import certificates from '../data/certifications.json';
import hackathons from '../data/hackathons.json';

// ── Framer Motion Variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// ── Reusable: Section wrapper with in-view trigger ────────────────────────────

function Section({ id, children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={stagger}
      className={`px-8 md:px-12 xl:px-16 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ── Two-Tone Giant Heading ────────────────────────────────────────────────────

function TwoToneHeading({ bright, ghost }) {
  return (
    <motion.div
      variants={fadeUp}
      className="font-black uppercase leading-none tracking-tight select-none mb-8"
      style={{ fontSize: 'clamp(52px, 8vw, 110px)', lineHeight: 0.92 }}
    >
      <div style={{ color: '#FFFFFF' }}>{bright}</div>
      <div style={{ color: '#1E1E1E' }}>{ghost}</div>
    </motion.div>
  );
}

// ── Accent orange button ──────────────────────────────────────────────────────

function OrangeBtn({ children, onClick, href, download, className = '' }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all cursor-pointer hover:opacity-90 ${className}`;
  const style = { backgroundColor: '#FF5500' };
  if (href)
    return <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={href} download={download} target={download ? undefined : '_blank'} rel="noopener noreferrer" className={cls} style={style}>{children}</motion.a>;
  return <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClick} className={cls} style={style}>{children}</motion.button>;
}

// ── Ghost outline button ──────────────────────────────────────────────────────

function GhostBtn({ children, onClick, href, className = '' }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer hover:bg-white/5 ${className}`;
  const style = { border: '1px solid #2A2A2A', color: '#FFFFFF' };
  if (href)
    return <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{children}</motion.a>;
  return <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClick} className={cls} style={style}>{children}</motion.button>;
}

// ── Project Detail Modal ──────────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-4 md:inset-10 lg:inset-16 z-[101] overflow-y-auto rounded-3xl"
        style={{ backgroundColor: '#111111', border: '1px solid #222222' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ border: '1px solid #2A2A2A', color: '#888888' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="h-56 md:h-72 overflow-hidden rounded-t-3xl relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111]" />
        </div>

        <div className="px-6 md:px-10 pb-10 -mt-8 relative">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-mono" style={{ backgroundColor: 'rgba(255,85,0,0.12)', border: '1px solid rgba(255,85,0,0.3)', color: '#FF5500' }}>{t}</span>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: '#FFFFFF' }}>{project.title}</h2>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: '#888888' }}>{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.github && <OrangeBtn href={project.github}><Github className="w-4 h-4" /> Code</OrangeBtn>}
            {project.liveDemo && <GhostBtn href={project.liveDemo}><ExternalLink className="w-4 h-4" /> Live Demo</GhostBtn>}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {project.problem && (
              <div className="rounded-2xl p-5" style={{ backgroundColor: '#1A1A1A', border: '1px solid #222222' }}>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-2" style={{ color: '#FF5500' }}>The Problem</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="rounded-2xl p-5" style={{ backgroundColor: '#1A1A1A', border: '1px solid #222222' }}>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-2" style={{ color: '#FF5500' }}>The Solution</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{project.solution}</p>
              </div>
            )}
          </div>

          {project.features?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-3" style={{ color: '#FF5500' }}>Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#888888' }}>
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#FF5500' }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-3" style={{ color: '#FF5500' }}>Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono" style={{ backgroundColor: '#1A1A1A', border: '1px solid #222222', color: '#888888' }}>{t}</span>
              ))}
            </div>
          </div>

          {project.metrics?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#1A1A1A', border: '1px solid #222222' }}>
                  <p className="text-xs font-mono" style={{ color: '#888888' }}>{m}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Skill Category Icons ──────────────────────────────────────────────────────

const catIcon = { 'Programming Languages': Braces, 'AI & Machine Learning': Cpu, 'Frontend': Layers, 'Backend': Code2, 'Databases': Database, 'Tools & Technologies': Wrench };
const levelPct = { Expert: 95, Advanced: 78, Intermediate: 55 };

// Add mapping for Simple Icons slugs
const skillToIconSlug = {
  'Python': 'python',
  'JavaScript': 'javascript',
  'SQL': 'mysql',
  'C++': 'cplusplus',
  'C': 'c',
  'Numpy': 'numpy',
  'Pandas': 'pandas',
  'Matplotlib': 'python',
  'Seaborn': 'python',
  'TensorFlow': 'tensorflow',
  'PyTorch': 'pytorch',
  'scikit-learn': 'scikitlearn',
  'OpenAI API': 'openai',
  'LangChain': 'langchain',
  'Hugging Face': 'huggingface',
  'React.js': 'react',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
  'HTML5 / CSS3': 'html5',
  'Node.js': 'nodedotjs',
  'FastAPI': 'fastapi',
  'Express.js': 'express',
  'DRF': 'django',
  'MySQL': 'mysql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'SQLite': 'sqlite',
  'Git & GitHub': 'github',
  'Docker': 'docker',
  'Jupyter Notebook': 'jupyter',
  'Streamlit': 'streamlit'
};

function SkillIcon({ skillName, category, className, style }) {
  const [error, setError] = useState(false);
  const Icon = catIcon[category] || Sparkles;
  const slug = skillToIconSlug[skillName];

  if (!slug || error) {
    return <Icon className={className} style={style} />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={skillName}
      className={className}
      onError={() => setError(true)}
    />
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSkillCat, setActiveSkillCat] = useState(Object.keys(skills)[0]);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const handleFormChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ backgroundColor: '#0D0D0D', color: '#FFFFFF' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <Section id="home" className="pt-16 pb-20 min-h-[85vh] flex flex-col justify-center">
        {/* Mobile profile strip (only on small screens) */}
        <motion.div variants={fadeUp} className="flex lg:hidden items-center gap-4 mb-10 p-4 rounded-2xl" style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black text-white" style={{ backgroundColor: '#FF5500' }}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm">{profile.name}</p>
            <p className="text-xs" style={{ color: '#888888' }}>{profile.status}</p>
          </div>
        </motion.div>

        {/* Availability tag */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono" style={{ color: '#888888' }}>{profile.status}</span>
        </motion.div>

        {/* Two-tone heading */}
        <TwoToneHeading bright="FULL STACK" ghost="DEVELOPER" />

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="max-w-lg text-sm md:text-base leading-relaxed mb-8"
          style={{ color: '#888888' }}
        >
          {profile.subTitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
          <OrangeBtn
            onClick={() => { const el = document.getElementById('projects'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </OrangeBtn>
          <GhostBtn href={profile.resumeUrl} download>
            <Download className="w-4 h-4" /> Resume
          </GhostBtn>
        </motion.div>

      </Section>

      <div style={{ height: '1px', backgroundColor: '#1A1A1A' }} />

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <Section id="about" className="pt-16 pb-20">
        <TwoToneHeading bright="ABOUT" ghost="ME" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="space-y-5">
            <motion.p variants={fadeLeft} className="text-base leading-relaxed" style={{ color: '#888888' }}>
              Second-year AI & Data Science student at{' '}
              <a href="https://kjsit.somaiya.edu.in/en" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#FFFFFF', fontWeight: 600 }}>KJ Somaiya Institute of Technology</a>
              . Solving problems with AI-powered solutions.
              <br /><br />
              As a freelancer, I've built and deployed over 20+ Telegram chatbots for businesses and individuals - scaling some of them to over 10,000 users.
              <br /><br />
              Co-founder of{' '}
              <a href="https://teslearn.com/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#FFFFFF', fontWeight: 600 }}>TesLearn</a>
              {' '}— AI-powered learning platform for engineering students, and{' '}
              <a href="https://makefunnymemes.com/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#FFFFFF', fontWeight: 600 }}>MakeFunnyMemes</a>
              {' '}— AI meme generator.
            </motion.p>
            {/* <motion.p variants={fadeLeft} className="text-base leading-relaxed" style={{ color: '#888888' }}>
              I thrive at the intersection of{' '}
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Artificial Intelligence</span>
              {' '}and{' '}
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>modern web development</span>,
              crafting experiences that are not only functional but truly beautiful.
            </motion.p> */}

            {/* <motion.div variants={fadeLeft} className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Location', value: profile.location },
                { label: 'Status', value: 'Open to Work' },
                { label: 'Focus', value: 'AI & Full Stack' },
                { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4" style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}>
                  <p className="text-[10px] font-mono mb-0.5" style={{ color: '#555555' }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-sm font-semibold hover:underline" style={{ color: '#FF5500' }}>{item.value}</a>
                    : <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{item.value}</p>}
                </div>
              ))}
            </motion.div> */}
          </div>

          {/* Right — passion list */}
          <motion.div variants={stagger} className="space-y-3">
            <motion.div variants={fadeLeft} className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Location', value: profile.location },
                { label: 'Status', value: 'Open to Work' },
                { label: 'Focus', value: 'AI & Full Stack' },
                { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl p-4" style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}>
                  <p className="text-[10px] font-mono mb-0.5" style={{ color: '#555555' }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-sm font-semibold hover:underline" style={{ color: '#FF5500' }}>{item.value}</a>
                    : <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{item.value}</p>}
                </div>
              ))}
            </motion.div>
            {/* {[
              { title: 'Passion for AI', desc: 'Deeply fascinated by machine learning, LLMs, and intelligent systems that push the boundaries of software.' },
              { title: 'Full Stack Dev', desc: 'From pixel-perfect frontends to robust backends — I love the full spectrum of building software products.' },
              { title: 'Problem Solving', desc: 'Complex challenges excite me. Curiosity, creativity, and a systematic mindset are my core tools.' },
              { title: 'Continuous Learning', desc: 'Technology evolves fast, and so do I. Always exploring new tools, concepts, and domains.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeRight}
                whileHover={{ x: 6, borderColor: '#FF5500' }}
                className="flex items-start gap-4 rounded-2xl p-5 transition-all"
                style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
              >
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: '#FF5500' }} />
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: '#FFFFFF' }}>{item.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#888888' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))} */}
          </motion.div>
        </div>
      </Section>

      <div style={{ height: '1px', backgroundColor: '#1A1A1A' }} />

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <Section id="projects" className="pt-16 pb-20">
        <TwoToneHeading bright="RECENT" ghost="PROJECTS" />

        {/* Featured — list style matching reference */}
        <motion.div variants={stagger} className="space-y-3 mb-10">
          {[...featuredProjects, ...otherProjects].map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              whileHover={{ backgroundColor: '#161616' }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex items-center gap-5 px-5 py-4 rounded-2xl cursor-pointer transition-all"
              style={{ backgroundColor: '#111111', border: '1px solid #1A1A1A' }}
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-0.5 truncate" style={{ color: '#FFFFFF' }}>
                  {project.title}
                </h3>
                <p className="text-sm truncate" style={{ color: '#888888' }}>
                  {project.description.slice(0, 70)}…
                </p>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: '#1E1E1E', color: '#666666' }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Arrow icon top-right */}
              <div className="shrink-0 ml-3">
                <motion.div
                  whileHover={{ x: 2, y: -2 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ color: '#FF5500' }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Badges container */}
              <div className="absolute top-3 right-12 flex items-center gap-2">
                {project.status && (
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: project.status.toLowerCase() === 'completed' ? 'rgba(74,222,128,0.12)' : 'rgba(59,130,246,0.12)',
                      color: project.status.toLowerCase() === 'completed' ? '#4ADE80' : '#3B82F6',
                      border: project.status.toLowerCase() === 'completed' ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(59,130,246,0.25)'
                    }}
                  >
                    {project.status}
                  </span>
                )}
                {project.featured && (
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(255,85,0,0.12)', color: '#FF5500', border: '1px solid rgba(255,85,0,0.25)' }}
                  >
                    FEATURED
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div style={{ height: '1px', backgroundColor: '#1A1A1A' }} />

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      <Section id="skills" className="pt-16 pb-20">
        <TwoToneHeading bright="TECH" ghost="SKILLS" />

        {/* Category Tabs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
          {Object.keys(skills).map((cat) => {
            const Icon = catIcon[cat] || Sparkles;
            const active = activeSkillCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveSkillCat(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? '#FF5500' : '#111111',
                  borderColor: active ? '#FF5500' : '#222222',
                  color: active ? '#FFFFFF' : '#888888',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Tools grid — matching reference image 3 layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkillCat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {(skills[activeSkillCat] || []).map((skill, i) => {
              const pct = levelPct[skill.level] || 55;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ borderColor: '#FF5500', backgroundColor: '#141414' }}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all"
                  style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
                >
                  {/* Icon square */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#1A1A1A', border: '1px solid #222222' }}
                  >
                    <SkillIcon skillName={skill.name} category={activeSkillCat} className="w-5 h-5 object-contain" style={{ color: '#FF5500' }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm mb-1" style={{ color: '#FFFFFF' }}>{skill.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: '#1E1E1E' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: '#FF5500' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono shrink-0" style={{ color: '#555555' }}>{skill.level}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Section>

      <div style={{ height: '1px', backgroundColor: '#1A1A1A' }} />

      {/* ── EDUCATION ────────────────────────────────────────────────── */}
      <Section id="education" className="pt-16 pb-20">
        <TwoToneHeading bright="MY" ghost="EDUCATION" />

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
              whileHover={{ borderColor: '#FF5500', y: -4 }}
              className="rounded-3xl p-7 relative overflow-hidden transition-all"
              style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
            >
              {/* Accent corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10" style={{ backgroundColor: '#FF5500' }} />

              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.25)' }}>
                  <GraduationCap className="w-5 h-5" style={{ color: '#FF5500' }} />
                </div>
                <div>
                  <h3 className="font-black text-base leading-tight" style={{ color: '#FFFFFF' }}>{edu.institution}</h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: '#FF5500' }}>{edu.degree}</p>
                </div>
              </div>

              <p className="text-sm mb-3" style={{ color: '#888888' }}>{edu.major}</p>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-xs font-mono flex items-center gap-1" style={{ color: '#555555' }}>
                  <MapPin className="w-3 h-3" /> {edu.location}
                </span>
                <span className="text-xs font-mono" style={{ color: '#555555' }}>{edu.timeline}</span>
                {edu.gpa && (
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,85,0,0.1)', color: '#FF5500', border: '1px solid rgba(255,85,0,0.2)' }}>
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>

              <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>{edu.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: '#555555' }}>
          Certifications
        </motion.p>
        <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
          {certificates.map((a) => (
            <motion.div
              key={a.id}
              variants={scaleIn}
              whileHover={{ borderColor: '#FF5500', y: -3 }}
              className="flex items-start gap-4 rounded-2xl p-5 transition-all"
              style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(255,85,0,0.08)', border: '1px solid rgba(255,85,0,0.2)' }}>
                <Award className="w-5 h-5" style={{ color: '#FF5500' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight mb-1" style={{ color: '#FFFFFF' }}>{a.title}</p>
                <p className="text-xs font-mono" style={{ color: '#555555' }}>{a.issuer} · {a.issued}</p>
                {a.description && <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#666666' }}>{a.description}</p>}
                {a.credentialUrl && (
                  <a href={a.credentialUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono mt-2 hover:underline"
                    style={{ color: '#FF5500' }}>
                    Verify <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div style={{ height: '1px', backgroundColor: '#1A1A1A' }} />

      {/* ── HACKATHONS ───────────────────────────────────────────────── */}
      <Section id="hackathons" className="pt-16 pb-20">
        <TwoToneHeading bright="HACKATHON" ghost="TIMELINE" />

        <div className="relative mt-8">
          {/* Vertical gray line */}
          <div
            className="absolute left-[28px] top-0 bottom-0 w-[1px]"
            style={{ backgroundColor: '#2A2A2A' }}
          />

          <div className="flex flex-col">
            {hackathons.map((hack, i) => (
              <motion.div
                key={hack.id}
                variants={fadeUp}
                className="relative pb-12 mb-2 last:pb-0 last:mb-0 last:border-0 border-b border-dashed"
                style={{ borderColor: '#2A2A2A' }}
              >
                {/* Image / Node */}
                <div className="absolute left-0 top-1 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-[#0D0D0D] border-4 border-[#0D0D0D]">
                  <img
                    src={hack.image}
                    alt={hack.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="ml-24">
                  <p className="text-[11px] mb-1 font-mono tracking-wide" style={{ color: '#777777' }}>
                    {hack.timeline}
                  </p>
                  
                  <h3 className="font-bold text-lg mb-0.5 tracking-tight" style={{ color: '#FFFFFF' }}>
                    {hack.title}
                  </h3>
                  
                  <p className="text-[13px] mb-3" style={{ color: '#777777' }}>
                    {hack.location}
                  </p>
                  
                  <p className="text-[13px] leading-relaxed mb-4 max-w-2xl" style={{ color: '#AAAAAA' }}>
                    {hack.description}
                  </p>

                  {/* Link Buttons */}
                  {hack.links && hack.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hack.links.map((link, j) => {
                        const Icon = link.icon === 'play' ? Play : Triangle;
                        return (
                          <a
                            key={j}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white text-black text-[11px] font-bold transition-all hover:bg-gray-200"
                          >
                            <Icon className="w-3 h-3" fill="currentColor" />
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>


      <div style={{ height: '1px', backgroundColor: '#1A1A1A' }} />

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <Section id="contact" className="pt-16 pb-24">
        <TwoToneHeading bright="LET'S WORK" ghost="TOGETHER" />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — contact links */}
          <motion.div variants={fadeLeft} className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
              { icon: Github, label: 'GitHub', value: `github.com/${profile.githubUsername}`, href: socials.github },
              { icon: ArrowUpRight, label: 'LinkedIn', value: 'linkedin.com/in/…', href: socials.linkedin },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6, borderColor: '#FF5500' }}
                className="flex items-center gap-4 rounded-2xl p-5 group transition-all"
                style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#FF5500] transition-colors"
                  style={{ backgroundColor: '#1A1A1A', border: '1px solid #222222' }}>
                  <Icon className="w-5 h-5 group-hover:text-white transition-colors" style={{ color: '#FF5500' }} />
                </div>
                <div>
                  <p className="text-xs font-mono mb-0.5" style={{ color: '#555555' }}>{label}</p>
                  <p className="text-sm font-bold group-hover:text-[#FF5500] transition-colors" style={{ color: '#FFFFFF' }}>{value}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#FF5500' }} />
              </motion.a>
            ))}

            {/* Availability */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl p-5"
              style={{ backgroundColor: '#111111', border: '1px solid rgba(255,85,0,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold" style={{ color: '#4ADE80' }}>Currently Available</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#888888' }}>
                Actively looking for AI and full-stack roles. Response within 24–48 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div variants={fadeRight}>
            <AnimatePresence mode="wait">
              {formSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl p-10 flex flex-col items-center justify-center text-center min-h-[360px]"
                  style={{ backgroundColor: '#111111', border: '1px solid rgba(74,222,128,0.2)' }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(74,222,128,0.1)' }}>
                    <Send className="w-6 h-6" style={{ color: '#4ADE80' }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                  <p className="text-sm" style={{ color: '#888888' }}>I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: '#555555' }}>Name</label>
                      <input
                        type="text" name="name" required
                        value={formState.name} onChange={handleFormChange}
                        placeholder="Your Name"
                        className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1.5" style={{ color: '#555555' }}>Email</label>
                      <input
                        type="email" name="email" required
                        value={formState.email} onChange={handleFormChange}
                        placeholder="Your@email.com"
                        className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: '#555555' }}>Message</label>
                    <textarea
                      name="message" required rows={5}
                      value={formState.message} onChange={handleFormChange}
                      placeholder="Message"
                      className="input-dark w-full px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ opacity: 0.92 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white cursor-pointer"
                    style={{ backgroundColor: '#FF5500' }}
                  >
                    Submit
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
