import './MovieTable.css';
import { useEffect, useState } from "react";
import $ from 'jquery';

const MovieTable = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayMovies();
    }, []);

    return (
        <table className="movie-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Cast</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>{response?.map((key) => (
                <tr key={key.id}>
                    <td id="photo"><img style={{"height":"300px"}} alt="img" src={key.imageLink} /></td>
                    <td id="title">{key.title}</td>
                    <td id="description">{key.description}</td>
                    <td id="category">{key.category}</td>
                    <td id="cast">
                        {key.actors.map((actor) => (
                        <span>{`${actor.firstName} ${actor.lastName}`}<br /></span>
                        ))}
                    </td>
                    <td id="rating">{key.rating}/10</td>
                </tr>)) ?? ""}
            </tbody>
        </table>
    );
    function displayMovies() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetAll",
            success: function (data) {
                if (response !== data) {
                    setResponse(data);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }
}

export default MovieTable;