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
			initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
			transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
			className="w-full pt-24 md:pt-28"
		>
			<section className="pb-20 pt-10 md:pb-28">
				<About />
			</section>
			<section className="pb-20 md:pb-28">
				<Skills />
			</section>
			<section className="pb-16 md:pb-20">
				<Certificates />
			</section>
		</motion.main>
	);
};

export default AboutPage;
