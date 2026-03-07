import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Soy el asistente virtual de José Colivoro. ¿Tienes alguna pregunta sobre sus proyectos, stack tecnológico o experiencia?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = { role: 'user', content: inputValue.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Llamada mockeada hacia nuestra futura Netlify Function
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) {
                throw new Error('Error en la comunicación con el servidor');
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, en este momento no puedo conectarme con el cerebro de José. Por favor, contáctalo directamente a jose.coldev@gmail.com' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Botón Flotante */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-accent-foreground shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-110 transition-transform flex items-center justify-center"
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageSquare className="w-6 h-6" />
            </motion.button>

            {/* Ventana de Chat */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] max-h-[70vh] glass-panel bg-secondary/80 rounded-2xl flex flex-col overflow-hidden shadow-2xl neon-border"
                    >
                        {/* Header */}
                        <div className="bg-background/80 p-4 border-b border-border flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="bg-accent/20 p-2 rounded-full">
                                    <Bot className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm">Asistente de José</h3>
                                    <p className="text-xs text-accent">En línea</p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${message.role === 'user'
                                            ? 'bg-accent text-accent-foreground rounded-tr-none'
                                            : 'bg-card text-foreground rounded-tl-none border border-white/5 shadow-sm'
                                        }`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-card rounded-2xl p-3 rounded-tl-none border border-white/5 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-accent animate-spin" />
                                        <span className="text-xs text-muted-foreground">Escribiendo...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-background/50 backdrop-blur-md border-t border-border">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu mensaje..."
                                    className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-accent text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4 ml-[-2px]" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
