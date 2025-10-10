
import react from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Award, Coffee } from 'lucide-react';

const About = () => {
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
    <div className="container mx-auto px-4 pt-16 pb-8">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Sobre Mí</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conoce quién soy, mi trayectoria y lo que me impulsa a crear experiencias digitales únicas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-accent/10 rounded-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-purple-500/10 rounded-lg transform -rotate-3"></div>
            <img  
              className="relative z-10 w-full h-auto rounded-lg shadow-xl"
              alt="Foto profesional"
             src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613" />
          </motion.div>

          <motion.div variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-bold mb-4 text-gradient"
              variants={itemVariants}
            >
              Desarrollador & Diseñador Digital
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              variants={itemVariants}
            >
              Soy un apasionado desarrollador y diseñador digital formandome en experiencia creando soluciones web innovadoras. Mi enfoque combina estética audaz con funcionalidad intuitiva para crear experiencias digitales memorables.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              variants={itemVariants}
            >
              Mi filosofía de trabajo se basa en la experimentación constante, rompiendo los límites convencionales del diseño para crear productos digitales que no solo cumplen objetivos funcionales sino que también generan impacto emocional en los usuarios y formas de insentivar micuriosidad
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-sm">Nacido: 15 Abril 1989</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-sm">Chiloé, Chile</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Briefcase className="h-5 w-5 text-accent" />
                <span className="text-sm">Freelance Disponible</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm">2+ Años Experiencia</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <Coffee className="h-4 w-4 text-accent" />
              <span>Impulsado por café, pasion pro aprender y curiosidad</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-secondary/50 p-6 rounded-lg border border-border card-hover"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-3 text-gradient">Diseño</h3>
            <p className="text-muted-foreground">
              Creo interfaces audaces y memorables que rompen con lo convencional mientras mantienen una excelente usabilidad.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-secondary/50 p-6 rounded-lg border border-border card-hover"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-3 text-gradient">Desarrollo</h3>
            <p className="text-muted-foreground">
              Construyo aplicaciones web robustas y escalables utilizando las tecnologías más modernas del mercado.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-secondary/50 p-6 rounded-lg border border-border card-hover"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-3 text-gradient">Estrategia</h3>
            <p className="text-muted-foreground">
              Analizo necesidades y objetivos para crear soluciones digitales que generan resultados tangibles.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
