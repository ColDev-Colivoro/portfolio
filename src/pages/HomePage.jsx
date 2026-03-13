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
			className="w-full pt-24 md:pt-28"
		>
			<section id="home" className="pb-20 pt-10 md:pb-28">
				<Hero />
			</section>

			<section id="projects" className="space-y-14 pb-20 md:space-y-20 md:pb-28">
				<FeaturedProject />
				<Projects />
			</section>

			<section id="about" className="pb-20 md:pb-28">
				<About />
			</section>

			<section id="capabilities" className="pb-20 md:pb-28">
				<Skills />
			</section>

			<section id="certifications" className="pb-20 md:pb-28">
				<Certificates />
			</section>

			<section id="contact" className="pb-16 md:pb-20">
				<Contact />
			</section>
		</motion.main>
	);
};

export default HomePage;
