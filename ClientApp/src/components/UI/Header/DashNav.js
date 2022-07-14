import DashNavLink from "./DashNavLink";
import "./DashNav.css";

const DashNav = () => {
    return (
        <ul className="dashboard-nav">
            <DashNavLink link="admin" value="Admin"></DashNavLink>
            <DashNavLink link="users" value="Users"></DashNavLink>
            <DashNavLink link="contact-us" value="Contact"></DashNavLink>
            <DashNavLink link="movies" value="Movies"></DashNavLink>
            <DashNavLink link="halls" value="Halls"></DashNavLink>
            <DashNavLink link="bookings" value="Bookings"></DashNavLink>
        </ul>
    );
}

export default DashNav;