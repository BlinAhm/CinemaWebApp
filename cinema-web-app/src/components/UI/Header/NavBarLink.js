import './NavBarLink.css';

const NavBarLink = (props) => {
    let className = 'nav-bar-link';

    if (props.name === 'login') {
        className = 'login';
    }

    return (
        <li className={className}>
            {props.value}
        </li>
    );
}

export default NavBarLink;