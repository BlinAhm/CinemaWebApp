import { NavLink } from "react-router-dom";

const DashNavLink = (props) => {
    return (
        <NavLink style={
            ({ isActive }) =>
                isActive ? {
                    background: "#D7263D",
                    color: '#fff',
                    borderTop: "solid #D7263D 2px",
                    borderBottom: "solid #d81831 2px"
                } : undefined
        } to={`/dashboard/${props.link}`} > {props.value}</NavLink >
    );
}

export default DashNavLink;