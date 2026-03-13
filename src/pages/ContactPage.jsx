import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Contact from '@/components/Contact';

const ContactPage = () => {
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
			<section className="pb-16 pt-10 md:pb-20">
				<Contact />
			</section>
		</motion.main>
	);
};

export default ContactPage;
