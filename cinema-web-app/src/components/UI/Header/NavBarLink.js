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
                isActive ? { background: "#6DA34D" } : undefined
        } className={className} to={`/${link}`} > {props.value}</NavLink >
    );
}

export default NavBarLink;