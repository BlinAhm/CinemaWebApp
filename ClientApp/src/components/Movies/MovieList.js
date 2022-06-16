import './MovieList.css';
import SearchBar from './SearchBar';
import MovieTable from './MovieTable';

const MovieList = () => {
    return (
        <div className="list-body">
            <h2>All Movies:</h2>
            <SearchBar />
            <MovieTable />
        </div>
    );
}

export default MovieList;