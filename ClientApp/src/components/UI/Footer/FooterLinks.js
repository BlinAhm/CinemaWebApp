import { Link } from 'react-router-dom';
import './FooterLinks.css';

const FooterLinks = () => {
    return (
        <div className="footer-links">
            <div>
                <h3>Company</h3>
                <Link className="link" to="/about-us">About us</Link>
                <Link className="link" to="/contact-us">Contact</Link>
            </div>
            <div>
                <h3>Follow us</h3>
                <a href="https://facebook.com">Facebook</a>
                <a href="https://instagram.com">Instagram</a>
            </div>

        </div>
    );
}

export default FooterLinks;