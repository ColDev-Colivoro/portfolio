import { useEffect } from 'react';
import SGCPlatformView from '@/components/demos/sgc/SGCPlatformView';

const SGCPlatformPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <SGCPlatformView />;
};

export default SGCPlatformPage;
