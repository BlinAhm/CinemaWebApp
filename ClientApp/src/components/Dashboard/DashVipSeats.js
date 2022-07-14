import DashNavLink from '../UI/Header/DashNavLink';
import './DashboardBackground.css';

const DashVipSeats = () => {
    return (
        <div className="db-background">
            <div className="db-main">
                <ul className="commands" id="selected">
                    <li><DashNavLink link="vip-seats" value="Vip Seats"></DashNavLink></li>
                    <li><button id="insertBtn">Insert</button></li>
                </ul>
            </div>
        </div>
    );    
}

export default DashVipSeats;