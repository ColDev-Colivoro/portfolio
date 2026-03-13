import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import FeaturedProject from '@/components/FeaturedProject';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';

const HomePage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<motion.main
			initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
			transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
			className="home-main w-full"
		>
			<section id="home" className="home-section home-section-hero">
				<Hero />
			</section>

			<section id="projects" className="home-projects-stack home-section">
				<FeaturedProject />
				<Projects />
			</section>

			<section id="about" className="home-section">
				<About />
			</section>

			<section id="capabilities" className="home-section">
				<Skills />
			</section>

			<section id="certifications" className="home-section">
				<Certificates />
			</section>

			<section id="contact" className="home-section-tight">
				<Contact />
			</section>
		</motion.main>
	);
};

export default HomePage;
