import React, { useState, useEffect } from 'react';
import { Home, FolderOpen, Cpu, GraduationCap, User, Mail, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'home',       icon: Home,          label: 'Home' },
  { id: 'about',      icon: User,          label: 'About' },
  { id: 'projects',   icon: FolderOpen,    label: 'Projects' },
  { id: 'skills',     icon: Cpu,           label: 'Skills' },
  { id: 'education',  icon: GraduationCap, label: 'Education' },
  { id: 'hackathons', icon: Zap,           label: 'Hackathons' },
  { id: 'contact',    icon: Mail,          label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Shrink slightly on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    /* Outer wrapper — sticky so it scrolls with the right panel column */
    <div className="sticky top-0 z-40 flex justify-center py-5 pointer-events-none"
      style={{ backgroundColor: 'transparent' }}>

      {/* Floating pill */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          backgroundColor: '#2A2A2A',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          transform: isScrolled ? 'scale(0.96)' : 'scale(1)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        }}
      >
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              title={label}
              aria-label={label}
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group"
              style={{
                color: isActive ? '#FF5500' : '#666666',
              }}
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="navActivePill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'rgba(255, 85, 0, 0.15)', border: '1px solid rgba(255,85,0,0.3)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}

              <Icon
                className="w-[18px] h-[18px] relative z-10 transition-colors duration-200"
                style={{ color: isActive ? '#FF5500' : '#666666' }}
              />

              {/* Hover tooltip */}
              <span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ backgroundColor: '#1A1A1A', color: '#AAAAAA', border: '1px solid #333333' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
