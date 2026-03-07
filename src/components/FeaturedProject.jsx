import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { featuredProjects } from "@/data/projectsData";
import ProjectModalContent from "./ProjectModalContent";

const FeaturedProject = () => {
  const [activeProject, setActiveProject] = useState(null);

  const openModal = (project) => setActiveProject(project);
  const closeModal = () => setActiveProject(null);

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      {featuredProjects.map((project, index) => (
        <motion.div
          key={project.id}
          className={`max-w-6xl mx-auto bg-secondary rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 ${index > 0 ? "mt-12" : ""
            }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Imagen del proyecto destacado */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-accent/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src={project.thumbnail}
              alt={project.title}
              className="relative z-10 w-full h-auto rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-lg z-20"></div>
          </div>

          {/* Descripción y botón */}
          <div className="w-full md:w-1/2">
            {project.tags &&
              project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm mb-4 mr-2"
                >
                  {tag}
                </span>
              ))}
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-6">{project.subtitle}</p>
            <button
              className="inline-flex items-center px-4 py-2 bg-accent text-primary-foreground rounded-md text-sm hover:bg-accent/80"
              onClick={() => openModal(project)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Caso de Estudio
            </button>
          </div>
        </motion.div>
      ))}

      {/* Modal Genérico */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl h-[90vh] bg-background rounded-lg shadow-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Evita que el click en el modal cierre el modal
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={closeModal}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm shadow-md"
                >
                  Cerrar
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                {/* Aquí renderizamos el componente abstraído dinámico */}
                <ProjectModalContent project={activeProject} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturedProject;
