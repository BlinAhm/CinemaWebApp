import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <a href="movies/#" className="movie-card">
            <img src={props.imageLink} alt="img" />
            <h4>{props.title}</h4>
        </a>
    );
}

export default MovieCard;