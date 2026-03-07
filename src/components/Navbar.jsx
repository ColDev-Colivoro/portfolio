import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'featured-project', label: 'Proyecto Destacado' }, // Nuevo item de navegación
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contacto' }
  ];

  const handleNavClick = (sectionId) => {
    setIsOpen(false);

    if (sectionId === 'projects') {
      navigate('/proyectos');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
          onSectionChange(sectionId);
        }
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      onSectionChange(sectionId);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Code className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-gradient">PORTaFOLIO</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="h-1 bg-accent rounded-full mt-1"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground p-2"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatedMobileMenu isOpen={isOpen} navItems={navItems} onNavClick={handleNavClick} activeSection={activeSection} />
    </motion.header>
  );
};

const AnimatedMobileMenu = ({ isOpen, navItems, onNavClick, activeSection }) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 py-2">
        <nav className="flex flex-col space-y-2 pb-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${activeSection === item.id
                  ? 'bg-secondary text-accent'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeMobileSection"
                    className="w-1 h-6 bg-accent rounded-full mr-2"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {item.label}
                {activeSection === item.id && (
                  <Zap className="ml-auto h-4 w-4 text-accent" />
                )}
              </div>
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
