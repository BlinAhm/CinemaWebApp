import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = (props) => {
    return (
        <Link to={"details/?id="+props.movieId} className="banner-body">
            <img src={props.imageLink} alt="img" />
            <div className="banner-details">
                <h3>{props.title}</h3>
                <p style={{ "width": "45%"}}>{props.description}</p>
                <h4>Category: <br />
                    <span style={{"fontWeight":"400","lineHeight":"2"}}>{props.category}</span>
                </h4>
                <h4 style={{ "marginRight": "30px"}}>Rating: {props.rating}/10</h4>
            </div>
        </Link>
    );
}

export default Banner;