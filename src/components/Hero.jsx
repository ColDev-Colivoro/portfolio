import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoGato from '../img/logo_gato.png';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const [showDiscover, setShowDiscover] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = 80;
      if (scrollPosition >= document.body.offsetHeight - threshold) {
        setShowDiscover(false);
      } else {
        setShowDiscover(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <img  
              className="w-40 h-40 rounded-full border-4 border-accent object-cover"
              alt="Foto de perfil"
             src={logoGato} />
          </motion.div>

          <motion.h2 
            className="text-xl text-accent mb-2 font-mono"
            variants={itemVariants}
          >
            ¡Hola Mundo! Soy
          </motion.h2>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-glitch"
            data-text="Jose Colivoro"
            variants={itemVariants}
          >
          Jose Colivoro
          </motion.h1>

          <motion.div 
            className="w-24 h-1 bg-accent mb-6"
            variants={itemVariants}
          ></motion.div>

          <motion.h3 
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-gradient font-semibold"
            variants={itemVariants}
          >
            Desarrollador & Diseñador Digital
          </motion.h3>

          <motion.p 
            className="max-w-2xl text-muted-foreground mb-10 text-lg"
            variants={itemVariants}
          >
            Creando experiencias digitales únicas y memorables. 
            Mi enfoque combina diseño audaz con código limpio para 
            construir productos que destacan en el mundo digital.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/80 text-white font-bold"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Contáctame
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10"
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  window.scrollTo({
                    top: projectsSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Ver Proyectos
            </Button>
          </motion.div>

          <motion.div 
            className="flex space-x-6 mb-16"
            variants={itemVariants}
          >
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Twitter size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {showDiscover && (
        <motion.div 
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="flex flex-col items-center text-muted-foreground hover:text-accent transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.span
              className="text-sm mb-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              Descubre más
            </motion.span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
