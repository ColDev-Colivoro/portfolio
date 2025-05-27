import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';

const App = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Efecto marquee para el título de la pestaña
  useEffect(() => {
    const marqueeTitle = "Jose Camilo Colivoro Uribe | Desarrollador & Diseñador Digital   ";
    let i = 0;
    const interval = setInterval(() => {
      document.title = marqueeTitle.slice(i) + marqueeTitle.slice(0, i);
      i = (i + 1) % marqueeTitle.length;
    }, 200); // Puedes ajustar la velocidad aquí

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "¡Bienvenido a mi portafolio!",
        description: "Explora mi trabajo y descubre mi estilo único.",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 noise-bg pointer-events-none"></div>
      
      <AnimatePresence>
        {loading ? (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8], 
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2
              }}
              className="w-16 h-16 border-t-4 border-accent rounded-full"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute mt-24 text-2xl font-bold text-gradient"
            >
              Cargando experiencia...
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Cursor />
            <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
            
            <main>
              <section id="home" className="min-h-screen">
                <Hero />
              </section>
              
              <section id="about" className="min-h-screen py-20">
                <About />
              </section>
              
              <section id="projects" className="min-h-screen py-20">
                <Projects />
              </section>
              
              <section id="skills" className="min-h-screen py-20">
                <Skills />
              </section>
              
              <section id="contact" className="min-h-screen py-20">
                <Contact />
              </section>
            </main>
            
            <Footer />
            <Toaster />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
