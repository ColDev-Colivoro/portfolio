import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Terminal } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { resolveCopy } from '@/lib/i18n';

const SystemLog = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-sm rounded-3xl border border-white/10 bg-card p-6 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-foreground">System Log</h3>
                        <div className="mt-4 text-sm text-muted-foreground">
                            <p>v2026.03.17 - UX Refinement: Added CommandBar, streamlined transitions.</p>
                        </div>
                        <button onClick={onClose} className="mt-6 w-full rounded-full bg-accent py-2 text-sm text-accent-foreground">Close</button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SystemLog;