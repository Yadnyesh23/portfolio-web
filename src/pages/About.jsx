import React from 'react';
import { Calendar, MapPin, Briefcase, Award, GraduationCap } from 'lucide-react';
import profile from '../data/profile.json';
import skills from '../data/skills.json';
import timeline from '../data/timeline.json';

export default function About() {
  const getTimelineIcon = (category) => {
    switch (category) {
      case 'work':
        return <Briefcase className="w-3.5 h-3.5" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5" />;
      case 'award':
        return <Award className="w-3.5 h-3.5" />;
      default:
        return <Calendar className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-16">
      {/* Introduction / Bio */}
      <section className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          About Me
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          DESIGN ENGINEER / FRONTEND DEVELOPER
        </p>

        <div className="pt-2 space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
          <p>{profile.bio}</p>
          <p>
            I believe that user interfaces should not only be clean and accessible but also highly interactive. 
            I pay close attention to rendering budgets, layout shifts, micro-animations, and overall bundle size, 
            blending aesthetic engineering with modern frontend science.
          </p>
        </div>

        {/* Location & Contact Grid Info */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Available for selected contracts
          </span>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
          Technical Skills Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(skills).map((category) => (
            <div 
              key={category} 
              className="p-4 rounded-lg border border-neutral-250 dark:border-neutral-800 bg-white/20 dark:bg-neutral-950/20 space-y-3"
            >
              <h3 className="text-xs font-mono font-semibold text-neutral-850 dark:text-neutral-200">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills[category].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-800/50"
                  >
                    {skill.name}
                    <span className="ml-1 text-[8px] text-neutral-400/80 uppercase">{skill.level}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
          Milestone Timeline
        </h2>

        <div className="relative border-l border-neutral-200 dark:border-neutral-800 pl-6 ml-2 space-y-8">
          {timeline.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                {getTimelineIcon(item.category)}
              </div>

              {/* Content */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400">
                  {item.year}
                </span>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
