import { useEffect } from 'react';
import Contact from '@/components/Contact';

const ContactPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="w-full pt-24 md:pt-28">
			<section className="pb-32 pt-10 md:pb-40">
				<Contact />
			</section>
		</main>
	);
};

export default ContactPage;
