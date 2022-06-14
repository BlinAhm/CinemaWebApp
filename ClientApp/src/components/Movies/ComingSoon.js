import './ComingSoon.css';
import MovieCard from './MovieCard';

const ComingSoon = () => {
    return (
        <div className="soon-body">
            <h2>Coming Soon!</h2>
            <div className="card-holder">
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
            </div>
        </div>
    );
}

export default ComingSoon;