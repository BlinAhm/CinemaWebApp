import './MovieList.css';
import SearchBar from './SearchBar';
import MovieTable from './MovieTable';

const MovieList = () => {
    return (
        <div className="list-body">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <h2>All Movies:</h2>
            <SearchBar />
            <MovieTable />
        </div>
    );
}

export default MovieList;