import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckSquare } from 'lucide-react';
import experience from '../data/experience.json';
import education from '../data/education.json';

export default function ExperienceEducation() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Journey & History
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          CHRONOLOGICAL LOG OF CAREER MILESTONES AND ACADEMICS
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-900 pb-[1px]">
        {['experience', 'education'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-mono tracking-wider relative transition-colors ${
              activeTab === tab 
                ? 'text-neutral-900 dark:text-white font-semibold' 
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            {tab.toUpperCase()}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTimelineTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 dark:bg-white"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="pt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-l border-neutral-200 dark:border-neutral-850 pl-6 ml-2 space-y-12"
            >
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} className="relative group">
                  {/* Timeline Node dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 flex items-center justify-center text-neutral-400 dark:text-neutral-500 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors">
                    <Briefcase className="w-2.5 h-2.5" />
                  </div>

                  <div className="space-y-3">
                    {/* Header line */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                          {exp.company}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-3 text-[10px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Brief */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                      {exp.description}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-1.5 list-none">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          <span className="text-[10px] font-mono text-neutral-400 select-none">-</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies utilized */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-neutral-100 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-l border-neutral-200 dark:border-neutral-850 pl-6 ml-2 space-y-12"
            >
              {education.map((edu, idx) => (
                <div key={edu.id || idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 flex items-center justify-center text-neutral-400 dark:text-neutral-500 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors">
                    <GraduationCap className="w-2.5 h-2.5" />
                  </div>

                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                          {edu.degree} in {edu.major}
                        </h3>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                          {edu.institution}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-3 text-[10px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                      {edu.description}
                    </p>

                    {/* GPA */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-850 text-[10px] font-mono text-neutral-500">
                      <span>GPA:</span>
                      <span className="font-semibold text-neutral-850 dark:text-neutral-200">{edu.gpa}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
