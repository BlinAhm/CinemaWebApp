import './MovieTable.css';
import { useEffect, useState } from "react";
import $ from 'jquery';

const MovieTable = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayMovies();
        // eslint-disable-next-line
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
                <tr onClick={() => { toMovie(key.id) }} key={key.id}>
                    <td id="photo"><img style={{ "height": "330px", "width": "235px" }} alt="img" src={key.imageLink} /></td>
                    <td style={{ "width": "15%", "paddingRight": "20px" }} id="title">{key.title}</td>
                    <td style={{ "width": "25%", "textAlign": "justify" }} id="description">{key.description}</td>
                    <td style={{ "width": "15%", "fontSize": "22px", "fontWeight": "500" }} id="category">{key.category}</td>
                    <td style={{ "width": "15%" }} id="cast">
                        {key.actors.map((actor) => (
                            <span key={actor.id}>{`${actor.firstName} ${actor.lastName}`}<br /></span>
                        ))}
                    </td>
                    <td style={{ "width": "20%", "paddingRight": "30px" }} id="rating">{key.rating}/10 <span style={{ "color":"#dbc541"}} className="fa fa-star checked"/></td>
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

function toMovie(id) {
    window.location.href = "https://localhost:44465/movies/details/?id=" + id;
}

export default MovieTable;