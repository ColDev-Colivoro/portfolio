import { useEffect } from 'react';
import Projects from '@/components/Projects';

const ProjectsPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="w-full pt-24 md:pt-28">
			<section className="pb-16 pt-10 md:pb-20">
				<Projects />
			</section>
		</main>
	);
};

export default ProjectsPage;
