import { useEffect } from 'react';
import Hero from '@/components/Hero';

const HomePage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="home-main w-full">
			<section id="home" className="home-section home-section-hero">
				<Hero />
			</section>
		</main>
	);
};

export default HomePage;
