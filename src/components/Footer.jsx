
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gradient">PORTFOLIO</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Creando experiencias digitales únicas y memorables. Disponible para proyectos freelance y colaboraciones.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-full text-muted-foreground hover:text-accent transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-full text-muted-foreground hover:text-accent transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-full text-muted-foreground hover:text-accent transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Inicio', 'Sobre Mí', 'Proyectos', 'Habilidades', 'Contacto'].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>San pedro de la Paz, Concepcion</li>
              <li>Palaxis89wakala@gmail.com</li>
              <li>+56930972983</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Mi Portfolio. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Hecho con</span>
            <Heart className="h-4 w-4 text-accent mx-1" />
            <span className="text-sm text-muted-foreground">y mucho café</span>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-2 bg-accent/10 rounded-full text-accent hover:bg-accent/20 transition-colors"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
