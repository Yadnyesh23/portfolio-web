import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, GitBranch, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects.json';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Featured', 'Completed', 'In Progress'];

  // Filter projects based on search and selected category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory === 'Featured' && !project.featured) return false;
      if (selectedCategory === 'Completed' && project.status !== 'Completed') return false;
      if (selectedCategory === 'In Progress' && project.status !== 'In Progress') return false;

      // Search query filter
      if (searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDesc = project.description.toLowerCase().includes(query);
      const matchesTech = project.techStack.some((tech) => tech.toLowerCase().includes(query));
      const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesTitle || matchesDesc || matchesTech || matchesTags;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Projects
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          A COLLECTION OF CODEBASE ARCHITECTURES AND DEPLOYMENTS
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center py-2">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title, stack, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 text-xs font-mono placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-[10px] font-mono tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                  : 'border-neutral-200 bg-transparent text-neutral-500 hover:text-neutral-950 dark:border-neutral-850 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-neutral-200 dark:border-neutral-850 bg-white/30 dark:bg-neutral-900/30 rounded-lg overflow-hidden flex flex-col hover:border-neutral-350 dark:hover:border-neutral-700 transition-all duration-200"
            >
              {/* Image & Status Tag */}
              <div className="h-40 overflow-hidden bg-neutral-100 dark:bg-neutral-950 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold tracking-wider backdrop-blur-sm border ${
                    project.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-950/20'
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 dark:bg-amber-950/20'
                  }`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex gap-1">
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-neutral-900/80 text-white dark:bg-white/80 dark:text-neutral-900 border border-white/10">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:opacity-75 transition-opacity">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-neutral-100 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-150 dark:border-neutral-850">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-[10px] font-mono font-bold tracking-wider text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                      READ CASE STUDY →
                    </Link>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-2 text-center py-16 border border-dashed border-neutral-250 dark:border-neutral-800 rounded-lg">
            <Terminal className="w-6 h-6 mx-auto text-neutral-400 mb-2" />
            <p className="text-xs font-mono text-neutral-500">
              No codebase matches your filter options
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
