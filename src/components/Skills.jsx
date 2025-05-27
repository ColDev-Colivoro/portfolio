
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Server, Globe, Cpu } from 'lucide-react';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="h-6 w-6 text-accent" />,
      skills: [
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "Vue.js", level: 75 },
        { name: "TailwindCSS", level: 90 }
      ]
    },
    {
      title: "Diseño",
      icon: <Palette className="h-6 w-6 text-accent" />,
      skills: [
        { name: "UI/UX", level: 85 },
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 80 },
        { name: "Photoshop", level: 75 },
        { name: "Ilustración", level: 70 }
      ]
    },
    {
      title: "Backend",
      icon: <Server className="h-6 w-6 text-accent" />,
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "Python", level: 65 },
        { name: "PHP", level: 60 },
        { name: "GraphQL", level: 70 }
      ]
    },
    {
      title: "Bases de Datos",
      icon: <Database className="h-6 w-6 text-accent" />,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "Firebase", level: 90 },
        { name: "PostgreSQL", level: 70 },
        { name: "Supabase", level: 75 }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Mis Habilidades</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un vistazo a mi conjunto de habilidades técnicas y creativas que me permiten crear experiencias digitales excepcionales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-secondary/30 rounded-lg p-6 border border-border"
              variants={itemVariants}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-secondary rounded-lg mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 * skillIndex }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20"
          variants={containerVariants}
        >
          <h3 className="text-2xl font-bold text-center mb-10">Otras Habilidades</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "SEO", icon: <Globe className="h-5 w-5" /> },
              { name: "Responsive Design", icon: <Cpu className="h-5 w-5" /> },
              { name: "Animaciones", icon: <Palette className="h-5 w-5" /> },
              { name: "Optimización", icon: <Server className="h-5 w-5" /> },
              { name: "Accesibilidad", icon: <Globe className="h-5 w-5" /> },
              { name: "Git/GitHub", icon: <Code className="h-5 w-5" /> },
              { name: "Testing", icon: <Cpu className="h-5 w-5" /> },
              { name: "CI/CD", icon: <Server className="h-5 w-5" /> }
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="bg-secondary/20 rounded-lg p-4 text-center card-hover"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  {skill.icon}
                </div>
                <h4 className="text-sm font-medium">{skill.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;
