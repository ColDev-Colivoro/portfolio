import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Terminal } from 'lucide-react';
import SystemLog from './SystemLog';

const CommandBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [logOpen, setLogOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        const footer = document.querySelector('footer');
        if (footer) observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                        <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-6 z-40 flex w-full justify-center px-4"
                    >
                        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-background/80 px-6 py-3 shadow-2xl backdrop-blur-xl">
                            <a href="https://github.com/ColDev-Colivoro" target="_blank" className="text-muted-foreground transition-colors hover:text-accent"><Github className="h-5 w-5" /></a>
                            <a href="https://www.linkedin.com/in/camilo-colivoro-1a5206386" target="_blank" className="text-muted-foreground transition-colors hover:text-accent"><Linkedin className="h-5 w-5" /></a>
                            <div className="h-4 w-px bg-white/10" />
                            <button onClick={() => setLogOpen(true)} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent">
                                <Terminal className="h-3 w-3" /> v2026.03.17
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SystemLog isOpen={logOpen} onClose={() => setLogOpen(false)} />
        </>
    );
};

export default CommandBar;