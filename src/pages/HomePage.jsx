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
			initial={{ opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -18 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			className="w-full pt-24"
		>
			<section id="home" className="pb-14 pt-8">
				<Hero />
			</section>
			<section id="featured-project" className="pb-14">
				<FeaturedProject />
			</section>
			<section id="projects" className="pb-14">
				<Projects />
			</section>
			<section id="capabilities" className="pb-14">
				<Skills />
			</section>
			<section id="certifications" className="pb-14">
				<Certificates />
			</section>
			<section id="about" className="pb-14">
				<About />
			</section>
			<section id="contact" className="pb-20">
				<Contact />
			</section>
		</motion.main>
	);
};

export default HomePage;
