import { motion, AnimatePresence } from 'framer-motion';
import { appMeta, appVersionLabel } from '@/lib/appMeta';

const SystemLog = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    data-overlay-open="true"
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        data-no-arrow-nav="true"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-sm rounded-3xl border border-white/10 bg-card p-6 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-foreground">System Log</h3>
                        <div className="mt-4 text-sm text-muted-foreground">
                            <p>{appVersionLabel} - Build metadata synchronized automatically.</p>
                            <p className="mt-2">Build date: {appMeta.buildDate}</p>
                            <p className="mt-1">Commit: {appMeta.commit}</p>
                        </div>
                        <button onClick={onClose} className="mt-6 w-full rounded-full bg-accent py-2 text-sm text-accent-foreground">Close</button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SystemLog;
