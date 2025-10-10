import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portafolioImage from '../img/portafolio.png';
import metalcolwImage from '../img/Metalcolw.png';
import mar2Image from '../img/Mar2.png';

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  
  const projects = [ {
      
  id: 1,
  title: "Colivoro Developer",
  description: "Portafolio personal de desarrollo web creado para centralizar proyectos, experiencias y enlaces profesionales, con diseño moderno y despliegue continuo en Netlify.",
  tags: ["React", "TailwindCSS", "Netlify", "Portfolio"],
  imageAlt: "Portafolio Colivoro Developer",
  imageDesc: "Interfaz limpia y moderna con tarjetas de proyectos, menú de navegación dinámico y diseño responsivo en tonos oscuros y azules.",
  liveLink: "https://colivoro-developer.netlify.app",
  githubLink: "https://github.com/username/colivoro-developer",
  imageSrc: portafolioImage


    }
   ,
    {
      
  id: 2,
  title: "Metalcolw",
  description: "Sitio web corporativo para Metalcolw, empresa dedicada al montaje industrial y servicios de fabricación metálica, con enfoque en soluciones técnicas y proyectos a medida.",
  tags: ["React", "TailwindCSS", "Netlify", "Empresa"],
  imageAlt: "Sitio web corporativo de Metalcolw",
  imageDesc: "Diseño profesional con secciones sobre servicios de montaje, galería de proyectos y formulario de contacto, en una interfaz moderna y adaptable.",
  liveLink: "https://colivoro.netlify.app",
  githubLink: "https://github.com/username/metalcolw",
  imageSrc: metalcolwImage


    }, {
      
  id: 3,
  title: "Mar2 Asesorías",
  description: "Sitio web corporativo para Mar2 Asesorías, enfocado en servicios de consultoría empresarial y gestión estratégica, con diseño moderno y adaptable.",
  tags: ["React", "TailwindCSS", "Netlify","Node.js"],
  imageAlt: "Sitio web corporativo de Mar2 Asesorías",
  imageDesc: "Interfaz limpia y profesional con tonos azul marino y blanco, secciones informativas y diseño responsivo.",
  liveLink: "https://mar2asesorias.netlify.app",
  githubLink: "https://github.com/username/mar2-asesorias",
  imageSrc: mar2Image


    }
   
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Mis Proyectos en Proceso</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una selección de mis trabajos más destacados que muestran mi enfoque creativo y habilidades técnicas.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <img  
                  className="relative z-10 w-full h-auto rounded-lg shadow-xl"
                  alt={projects[currentProject].imageAlt}
                 src={projects[currentProject].imageSrc} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-lg z-20"></div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm mb-4">
                  Proyecto {currentProject + 1}/{projects.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
                  {projects[currentProject].title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {projects[currentProject].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[currentProject].tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    className="bg-accent hover:bg-accent/80"
                    onClick={() => window.open(projects[currentProject].liveLink, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Proyecto
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-accent text-accent hover:bg-accent/10"
                    onClick={() => window.open(projects[currentProject].githubLink, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Ver Código
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-12 space-x-4">
            <motion.button
              onClick={prevProject}
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-accent/20 hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentProject === index ? 'bg-accent' : 'bg-secondary'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                ></motion.button>
              ))}
            </div>
            
            <motion.button
              onClick={nextProject}
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-accent/20 hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Projects;