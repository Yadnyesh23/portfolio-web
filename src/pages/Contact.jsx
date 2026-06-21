import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../data/profile.json';
import socials from '../data/socials.json';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      setErrorMsg('Please populate all inputs before submitting.');
      return;
    }

    try {
      setStatus('loading');
      
      // Simulate API submit to a form service (e.g., Formspree/Web3Forms mock fetch)
      // The user can configure their endpoint token easily inside profile.json or directly here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Submission failed. Please try emailing directly.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Contact
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          OUTREACH PORTAL AND INQUIRIES
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Info Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              Direct Contact
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              If you prefer direct emails or have an urgent request, shoot me a line directly.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white transition-colors border border-neutral-200 dark:border-neutral-800 px-3 py-1 rounded bg-neutral-50/50 dark:bg-neutral-950/50"
            >
              <Mail className="w-3.5 h-3.5" />
              {profile.email}
            </a>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              System Channels
            </h2>
            <div className="space-y-1.5 text-xs font-mono text-neutral-500">
              {Object.keys(socials).map((platform) => (
                <div key={platform} className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900 pb-1.5 last:border-none">
                  <span className="uppercase text-[10px]">{platform}</span>
                  <a
                    href={socials[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-850 dark:text-neutral-300 hover:underline transition-all"
                  >
                    {socials[platform].replace(/(^\w+:|^)\/\//, '').split('/')[0]}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-neutral-500" />
            Send Transmission
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] uppercase text-neutral-400">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                disabled={status === 'loading'}
                className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                placeholder="Tony Stark"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] uppercase text-neutral-400">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                disabled={status === 'loading'}
                className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                placeholder="tony@starkindustries.com"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-[10px] uppercase text-neutral-400">
                Message Content
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                disabled={status === 'loading'}
                rows={5}
                className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none"
                placeholder="Describe project details or availability timeline..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md border border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950 font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-neutral-500 border-t-neutral-100 rounded-full animate-spin mr-1" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Transmit Message
                </>
              )}
            </button>
          </form>

          {/* Feedback Messages */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-xs font-mono"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Transmission successful! I will get back to you shortly.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-450 flex items-center gap-2 text-xs font-mono"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
