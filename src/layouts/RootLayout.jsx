import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import profile from '../data/profile.json';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0D0D0D' }}>

      {/* ── Left Sidebar — Sticky Profile Card ──────────────── */}
      <aside
        className="hidden lg:flex w-[300px] xl:w-[360px] shrink-0 sticky top-0 h-screen items-center justify-center"
        style={{ backgroundColor: '#0D0D0D', borderRight: '1px solid #1A1A1A' }}
      >
        <ProfileCard />
      </aside>

      {/* ── Right Panel — Scrollable Content ────────────────── */}
      <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: '#0D0D0D' }}>
        {/* Floating Icon Navbar — sits on top of content with negative pull */}
        <Navbar />

        {/* Mobile Profile Card */}
        <div className="lg:hidden flex justify-center pt-8 pb-4 px-4 relative z-10">
          <ProfileCard />
        </div>

        {/* Main Content — pulled up so it flows under the floating nav */}
        <main className="flex-1 lg:-mt-2">
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          className="px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid #1A1A1A' }}
        >
          <span className="text-xs font-mono" style={{ color: '#555555' }}>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-2 text-xs font-mono" style={{ color: '#555555' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span style={{ color: '#4ADE80' }}>Available for work</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
