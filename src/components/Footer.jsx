import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';
import AppFooter from '@/components/layout/AppFooter';

const Footer = () => {
	const { lang } = useLocale();
	const content = siteContent.footer;

	return (
		<AppFooter
			productLabel="ColDev"
			productSummary={resolveCopy(content.tagline, lang)}
			rights={resolveCopy(content.rights, lang)}
			showSocialLinks={false}
		/>
	);
};

export default Footer;
