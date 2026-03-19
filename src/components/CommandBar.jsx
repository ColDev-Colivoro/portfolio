import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Terminal } from 'lucide-react';
import SystemLog from './SystemLog';
import { appVersionLabel } from '@/lib/appMeta';

const CommandBar = () => {
    const [footerVisible, setFooterVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileHidden, setMobileHidden] = useState(false);
    const [logOpen, setLogOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        const footer = document.querySelector('footer');
        if (footer) observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const updateViewport = () => setIsMobile(window.innerWidth < 1024);
        updateViewport();
        window.addEventListener('resize', updateViewport);

        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    useEffect(() => {
        if (!isMobile || typeof window === 'undefined') {
            setMobileHidden(false);
            return undefined;
        }

        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastY;

            if (currentY < 80) {
                setMobileHidden(false);
                lastY = currentY;
                return;
            }

            if (delta > 8) setMobileHidden(true);
            if (delta < -10) setMobileHidden(false);
            lastY = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    const shouldRender = !footerVisible && (!isMobile || !mobileHidden);

    return (
        <>
            <AnimatePresence>
                {shouldRender && (
                        <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                        className={`fixed z-[58] flex px-4 ${
                            isMobile
                                ? 'bottom-[calc(0.8rem+env(safe-area-inset-bottom))] left-0 w-auto items-end'
                                : 'bottom-6 left-0 w-full justify-center'
                        }`}
                        data-no-swipe="true"
                    >
                        <div className={`flex items-center rounded-full border border-white/10 bg-background/85 py-2.5 shadow-2xl backdrop-blur-xl ${isMobile ? 'gap-3 pl-4 pr-3' : 'gap-4 px-6 py-3'}`}>
                            <a href="https://github.com/ColDev-Colivoro" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-accent"><Github className="h-5 w-5" /></a>
                            <a href="https://www.linkedin.com/in/camilo-colivoro-1a5206386" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-accent"><Linkedin className="h-5 w-5" /></a>
                            <div className="h-4 w-px bg-white/10" />
                            <button onClick={() => setLogOpen(true)} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent">
                                <Terminal className="h-3 w-3" /> {isMobile ? 'Log' : appVersionLabel}
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
