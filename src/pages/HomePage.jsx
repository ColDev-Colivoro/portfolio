import Hero from '@/components/Hero';
import { FeaturedProjects } from '@/components/Projects';

const HomePage = () => {
	return (
		<main className="home-main w-full">
			<section id="home" className="home-section home-section-hero">
				<Hero />
			</section>
			<section id="featured-projects" className="home-section">
				<FeaturedProjects />
			</section>
		</main>
	);
};

export default HomePage;
