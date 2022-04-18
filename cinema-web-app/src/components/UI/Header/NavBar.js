import './NavBar.css';
import NavBarLink from "./NavBarLink"

const NavBar = () => {
    return (
        <ul className='nav-bar'>
            <NavBarLink value='Home'/>
            <NavBarLink value='Movies'/>
            <NavBarLink value='Schedules'/>
            <NavBarLink value='About us'/>
            <NavBarLink value='Contact us'/>
            <NavBarLink name='login' value='Log in'/>
            <NavBarLink name='login' value='Sign up'/>
        </ul>
    );
}
export default NavBar;