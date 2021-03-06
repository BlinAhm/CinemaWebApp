import { NavLink } from 'react-router-dom';
import './NavBarLink.css';

const NavBarLink = (props) => {
    let className = 'nav-bar-link';
    const link = props.link;

    if (props.name === 'login') {
        className = 'login';
    }


    return (
        <NavLink style={
            ({ isActive }) =>
                isActive ? { background: "#D7263D", color: '#fff' } : undefined
        } className={className} to={`/${link}`} > {props.value}</NavLink >
    );
}

export default NavBarLink;