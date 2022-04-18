import { Link } from 'react-router-dom';
import './FooterDetails.css';

const FooterDetails = () => {
    return (
        <div className="footer-details">
            <h3>Movies</h3>
            <Link className="link" to="/movies#current">Current Movies</Link>
            <Link className="link" to="/movies#coming-soon">Coming Soon</Link>
            <Link className="link" to="/movies#trailers">Trailers</Link>
        </div>
    );
}

export default FooterDetails;