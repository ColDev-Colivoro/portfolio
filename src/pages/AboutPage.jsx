import { useEffect } from 'react';
import { motion } from 'framer-motion';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certificates from '@/components/Certificates';

const AboutPage = () => {
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
			<section className="pb-14 pt-8">
				<About />
			</section>
			<section className="pb-14">
				<Skills />
			</section>
			<section className="pb-20">
				<Certificates />
			</section>
		</motion.main>
	);
};

export default AboutPage;
