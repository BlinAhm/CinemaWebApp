import Featured from "../components/Movies/Featured";
import ComingSoon from "../components/Movies/ComingSoon";
import MovieList from "../components/Movies/MovieList";

const Movies = () => {
    return (
        <div className="movies-main">
            <Featured />
            <ComingSoon />
            <MovieList />
        </div>
    );
}
export default Movies;