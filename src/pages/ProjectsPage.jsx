import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from '@/components/Projects';

const ProjectsPage = () => {
    // Al entrar a la página, hacer scroll hacia arriba
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-20"
        >
            <div className="container mx-auto px-4">
                <Projects />
            </div>
        </motion.main>
    );
};

export default ProjectsPage;
