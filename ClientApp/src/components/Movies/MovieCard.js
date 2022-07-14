import './MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    return (
        <Link to={"details/?type=csoon&id=" + props.movieId} className="movie-card">
            <img src={props.imageLink} alt="img" />
            <h4>{props.title}</h4>
        </Link>
    );
}

export default MovieCard;