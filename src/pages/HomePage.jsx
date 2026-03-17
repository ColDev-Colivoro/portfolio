import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';

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
		</motion.main>
	);
};

export default HomePage;
