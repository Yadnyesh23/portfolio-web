import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, ExternalLink, Activity, Target, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import projects from '../data/projects.json';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Project Not Found</h2>
        <p className="text-xs font-mono text-neutral-500">The codebase ID '{id}' does not exist in our systems.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md border border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        BACK TO CODEBASES
      </Link>

      {/* Header Info */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold border ${
            project.status === 'Completed'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-950/20'
              : 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 dark:bg-amber-950/20'
          }`}>
            {project.status.toUpperCase()}
          </span>
          {project.featured && (
            <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border border-white/10">
              FEATURED CASE STUDY
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {project.title}
          </h1>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                Repository
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Site
              </a>
            )}
          </div>
        </div>

        {/* Project Meta Metrics Column */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-neutral-200 dark:border-neutral-850 rounded-lg bg-neutral-50/50 dark:bg-[#0a0a0a]/50 text-xs font-mono">
          <div>
            <div className="text-neutral-400">ROLE</div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 pt-0.5">{project.role}</div>
          </div>
          <div>
            <div className="text-neutral-400">TIMELINE</div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 pt-0.5">{project.timeline}</div>
          </div>
          <div>
            <div className="text-neutral-400">STACK</div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 pt-0.5 line-clamp-1" title={project.techStack.join(', ')}>{project.techStack[0]}, {project.techStack[1]}...</div>
          </div>
          <div>
            <div className="text-neutral-400">TAGS</div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 pt-0.5">{project.tags.join(', ')}</div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="h-64 md:h-96 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-850 bg-neutral-100 dark:bg-neutral-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Case Study Core Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Problem */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-mono font-bold tracking-wider text-neutral-400 uppercase">
              <HelpCircle className="w-4 h-4 text-rose-500" />
              The Problem
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-mono font-bold tracking-wider text-neutral-400 uppercase">
              <Target className="w-4 h-4 text-emerald-500" />
              The Solution
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Key Deliverables / Features */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono font-bold tracking-wider text-neutral-400 uppercase">
              Core Technical Features
            </h2>
            <ul className="space-y-2 list-none">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  <span className="font-mono text-neutral-400 select-none">[{idx + 1}]</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learnings */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-mono font-bold tracking-wider text-neutral-400 uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Engineering Learnings
            </h2>
            <ul className="space-y-2 list-none">
              {project.learnings.map((learning, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  <span className="font-mono text-neutral-400 select-none">//</span>
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar (Performance metrics + Tech tags) */}
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="p-5 border border-neutral-250 dark:border-neutral-800 bg-white/20 dark:bg-neutral-950/20 rounded-lg space-y-4">
            <h3 className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-neutral-400">
              <Activity className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
              Key Metrics
            </h3>
            
            <div className="space-y-4">
              {project.metrics.map((metric, idx) => {
                const parts = metric.split(/(?<=^\S+)\s/); // splits at first space
                return (
                  <div key={idx} className="border-b border-neutral-200 dark:border-neutral-850 last:border-none pb-2 last:pb-0">
                    <div className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                      {parts[0]}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase pt-0.5">
                      {parts[1] || 'Impact metric'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full tech stack representation */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-400">
              Engineered With
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-800/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-900">
          <h2 className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
            Interface Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, idx) => (
              <div 
                key={idx} 
                className="h-48 md:h-64 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-850 bg-neutral-100 dark:bg-neutral-950"
              >
                <img
                  src={img}
                  alt={`Screenshot ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-101 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
