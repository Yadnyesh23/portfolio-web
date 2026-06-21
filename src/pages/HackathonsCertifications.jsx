import React from 'react';
import { Award, ShieldCheck, GitBranch, ExternalLink, Calendar, ShieldCheck as Verified } from 'lucide-react';
import hackathons from '../data/hackathons.json';
import certifications from '../data/certifications.json';

export default function HackathonsCertifications() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Credentials & Accolades
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          OFFICIAL CERTIFICATIONS AND COMPETITIVE PROJECTS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hackathons Section */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Hackathons & Competitions
          </h2>
          
          <div className="space-y-4">
            {hackathons.map((hack) => (
              <div 
                key={hack.id} 
                className="p-5 border border-neutral-200 dark:border-neutral-850 bg-white/20 dark:bg-neutral-950/20 rounded-lg space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold uppercase">
                      {hack.award}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white pt-1">
                      {hack.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {hack.timeline}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    PROJECT: {hack.project}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {hack.description}
                  </p>
                </div>

                <div className="flex gap-4 pt-1 text-[10px] font-mono">
                  {hack.links?.github && (
                    <a
                      href={hack.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      Repository
                    </a>
                  )}
                  {hack.links?.demo && (
                    <a
                      href={hack.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Official Certifications
          </h2>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="p-5 border border-neutral-200 dark:border-neutral-850 bg-white/20 dark:bg-neutral-950/20 rounded-lg space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.date}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                    <Verified className="w-3 h-3 text-emerald-500" />
                    ID: {cert.credentialId}
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors border border-neutral-200 dark:border-neutral-850 px-2 py-0.5 rounded bg-neutral-50/50 dark:bg-neutral-950/50"
                  >
                    Verify Credential
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
