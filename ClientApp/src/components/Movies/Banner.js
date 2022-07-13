import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = (props) => {
    return (
        <Link to={"details/?id=" + props.movieId} className="banner-body">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <img src={props.imageLink} alt="img" />
            <div className="banner-details">
                <h3>{props.title}</h3>
                <p style={{ "width": "45%"}}>{props.description}</p>
                <h4>Category: <br />
                    <span style={{"fontWeight":"400","lineHeight":"2"}}>{props.category}</span>
                </h4>
                <h4 style={{ "marginRight": "30px" }}>Rating: {props.rating}/10 <span style={{ "color": "#dbc541" }} className="fa fa-star checked" /></h4>
            </div>
        </Link>
    );
}

export default Banner;