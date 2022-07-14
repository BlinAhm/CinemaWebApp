import './NavBar.css';
import NavBarLink from "./NavBarLink"

const NavBar = () => {
    var text = '';

    if (localStorage.getItem('login') === null) {
        return (
            <ul className='nav-bar'>
                <NavBarLink link='home' value='Home' />
                <NavBarLink link='movies' value='Movies' />
                <NavBarLink link='schedules' value='Schedules' />
                <NavBarLink link='about-us' value='About us' />
                <NavBarLink link='contact-us' value='Contact us' />
                <NavBarLink link='log-in' name='login' value='Log in' />
                <NavBarLink link='sign-up' name='login' value='Sign up' />
            </ul>
        );
    } else {
        user();
        return (
            <ul className='nav-bar'>
                <NavBarLink link='home' value='Home' />
                <NavBarLink link='movies' value='Movies' />
                <NavBarLink link='schedules' value='Schedules' />
                <NavBarLink link='about-us' value='About us' />
                <NavBarLink link='contact-us' value='Contact us' />
                <div className="horizontal-divider"></div>
                <div className="user-details">Logged in as:<br /> {text}</div>
                <div onClick={logout} className="log-out">Log Out</div>
            </ul>
        );
    }

    function user() {
        var split = localStorage.getItem('user').split(',');
        text = split[0] + ' ' + split[1];
    }

    function logout() {
        localStorage.clear();
        window.location.href = "https://localhost:44465/log-in";
    }
}


export default NavBar;