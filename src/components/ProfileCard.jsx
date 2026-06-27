import React from 'react';
import { Github, Linkedin, Twitter, Mail, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import profile from '../data/profile.json';
import socials from '../data/socials.json';

const pfp = '/assets/pfp2.jpeg';

export default function ProfileCard() {
  const socialLinks = [
    { icon: Github, href: socials.github, label: 'GitHub' },
    { icon: Twitter, href: socials.twitter, label: 'Twitter' },
    { icon: Mail, href: socials.gmail, label: 'Email' },
    { icon: Linkedin, href: socials.linkedin, label: 'LinkedIn' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col"
      style={{ width: '280px', margin: '0 auto' }}
    >
      {/* Dashed orange arc decoration */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none z-10"
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="210"
          cy="25"
          r="150"
          stroke="#FF5500"
          strokeWidth="2"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Edge-to-edge Photo Container */}
      <div className="relative z-10">
        <div
          className="relative flex items-end justify-center overflow-hidden shadow-sm"
          style={{
            height: '240px',
            background: 'linear-gradient(160deg, #FF5500 0%, #CC3300 100%)',
          }}
        >
          <img
            src={pfp}
            alt={profile.name}
            className="relative z-10 w-full h-full object-cover object-top"
          />
        </div>

        {/* Flame Badge overlapping bottom-left of the image */}
        {/* <div
          className="absolute left-6 -bottom-4 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-20"
          style={{ backgroundColor: '#FF5500', border: '3px solid white' }}
        >
          <Flame className="w-[16px] h-[16px] text-white" />
        </div> */}
      </div>

      {/* Info Area */}
      <div className="px-6 pt-7 pb-6 text-center bg-transparent relative z-10 flex flex-col items-center">
        {/* Greeting */}
        <p className="text-[12px] font-medium mb-1" style={{ color: '#888888' }}>
          Hello, I'm 👋
        </p>

        {/* Name */}
        <h2 className="font-black text-[22px] text-black leading-none tracking-tight mb-4">
          Yadnyesh H. Halde
        </h2>

        {/* Accent divider */}
        <div
          className="mb-5"
          style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#FF5500',
            borderRadius: '2px',
          }}
        />

        {/* Bio */}
        <p
          className="text-[13px] leading-[1.6] mb-7 font-medium"
          style={{ color: '#444444' }}
        >
          Still a 2nd-year AI engineering student,<br />
          already building products like a founder.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-orange-100"
              style={{ backgroundColor: '#F3F3F3', color: '#666666' }}
            >
              <Icon className="w-[15px] h-[15px]" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
