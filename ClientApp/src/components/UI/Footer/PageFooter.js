import './PageFooter.css';
import FooterDetails from './FooterDetails';
import FooterLinks from './FooterLinks';
import FooterSocials from './FooterSocials';
import Divider from './Divider';

const PageFooter = () => {
	return (
		<div className="page-footer">
			<FooterDetails />
			<Divider />
			<FooterLinks />
			<Divider />
			<FooterSocials />
		</div>
	);
}

export default PageFooter;