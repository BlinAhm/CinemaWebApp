import './NavBar.css';
import NavBarLink from "./NavBarLink"

const NavBar = () => {
    return (
        <ul className='nav-bar'>
            <NavBarLink link='home' value='Home'/>
            <NavBarLink link='movies' value='Movies'/>
            <NavBarLink link='schedules' value='Schedules'/>
            <NavBarLink link='about-us' value='About us'/>
            <NavBarLink link='contact-us' value='Contact us'/>
            <NavBarLink link='log-in' name='login' value='Log in'/>
            <NavBarLink link='sign-up' name='login' value='Sign up'/>
        </ul>
    );
}
export default NavBar;