import './MovieTable.css';

const MovieTable = () => {
    return (
        <table className="movie-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>TestTestTestTest</td>
                    <td>TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest</td>
                    <td>8.6/10</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>TestTestTestTest</td>
                    <td>TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest</td>
                    <td>8.6/10</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>TestTestTestTest</td>
                    <td>TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest</td>
                    <td>8.6/10</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>TestTestTestTest</td>
                    <td>TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest</td>
                    <td>8.6/10</td>
                </tr>
            </tbody>
        </table>
    );
}

export default MovieTable;