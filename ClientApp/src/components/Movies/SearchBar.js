import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <div className="category">
                <label>Category: </label>
                <select>
                    <option>Comedy</option>
                    <option>Action</option>
                    <option>Horror</option>
                </select>
            </div>

            <div className="name">
                <label>Name: </label>
                <input type="text" />
            </div>
            <button>Search</button>
        </div>
    );
}

export default SearchBar;