
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarme. Te responderé lo antes posible.",
        duration: 5000,
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
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
            <span className="text-gradient">Contáctame</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Estoy disponible para trabajar en proyectos freelance y colaboraciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-bold mb-6 text-gradient"
              variants={itemVariants}
            >
              Hablemos
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              variants={itemVariants}
            >
              Estoy interesado en proyectos freelance, especialmente proyectos ambiciosos o grandes. Sin embargo, si tienes otra petición o pregunta, no dudes en contactarme.
            </motion.p>
            
            <motion.div 
              className="space-y-6 mb-8"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="p-3 bg-secondary rounded-lg">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Email</h4>
                  <p className="text-muted-foreground">Palaxis89wakala@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="p-3 bg-secondary rounded-lg">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Teléfono</h4>
                  <p className="text-muted-foreground">+56 930972883</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="p-3 bg-secondary rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Ubicación</h4>
                  <p className="text-muted-foreground">San Pedro de la Paz, Concepcion</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-secondary/30 rounded-lg border border-border"
              variants={itemVariants}
            >
              <h4 className="text-lg font-bold mb-3">Horario de Trabajo</h4>
              <p className="text-muted-foreground mb-2">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground">Fines de semana: Disponible para emergencias</p>
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants}>
            <motion.form 
              onSubmit={handleSubmit}
              className="bg-secondary/30 p-6 rounded-lg border border-border"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-6">Envíame un mensaje</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    autocomplete="name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    autocomplete="email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    autocomplete="off"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    autocomplete="off"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/80"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
