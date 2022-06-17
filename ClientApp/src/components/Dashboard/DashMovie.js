import { useEffect, useState } from "react";
import $ from 'jquery';
import DashNavLink from '../UI/Header/DashNavLink';
import './DashMovie.css';

const DashMovie = () => {
    const [response, setResponse] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        displayMovies();
        displayFeatured();

        $('#insertBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#insertForm').css('display', 'block');
        });
        $('[name="insert"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            addMovie();
        });

        $('.close').on('click', () => {
            $('#insertForm').css('display', 'none');
            $('#editForm').css('display', 'none');
        });
    }, []);

    return (
        <div className="contents">
            <form className="form">
                <ul className="commands" id="coming-soon">
                    <li><DashNavLink link="coming-soon" value="Coming Soon"></DashNavLink></li>
                    <li><button id="insertBtn">Insert</button></li>
                </ul>
                <table className="table">
                    <caption id="caption-featured">Featured movies:</caption>
                    <thead id="thead-movie">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {featured?.map((key) => (
                            key.movies.map((movie) => (
                                <tr key={movie.id}>
                                    <td style={{ "width": "5%" }}><div onClick={() => { removeFeatured(movie.id) }} id="removeBtn">Remove</div></td>
                                    <td style={{ "width": "20%" }}>{movie.title}</td>
                                    <td style={{ "width": "25%" }} >{movie.description}</td>
                                    <td style={{ "width": "20%" }}>{movie.category}</td>
                                    <td style={{ "width": "20%" }}>{movie.rating}</td>
                                </tr>
                            ))
                        )) ?? ""}
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Poster Link</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Cast</th>
                            <th>Rating</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="movie-tbody">{response?.map((key) => (
                        <tr key={key.id}>
                            <td><div id="featureBtn" onClick={() => { addFeatured(key.id) }}>Feature</div></td>

                            <td style={{ "width": "20%", "wordWrap": "anywhere" }}>{key.imageLink}</td>
                            <td style={{ "width": "20%" }}>{key.title}</td>
                            <td style={{ "width": "25%" }}>{key.description}</td>
                            <td style={{ "width": "15%" }}>{key.category}</td>
                            <td style={{ "width": "10%" }}>{key.actors.map((actor) => (
                                <span key={actor.id}>{`${actor.firstName} ${actor.lastName}`}<br /></span>
                            ))}</td>
                            <td>{key.rating}</td>
                            <td>
                                <div id="editBtnM">Edit</div>
                                <div id="deleteBtn">Delete</div>
                            </td>
                            <td><div style={
                                { "marginRight": "10px", "paddingBlock": "10px", "paddingInline": "5px" }
                            } id="castBtn">Edit Cast</div></td>
                        </tr>)) ?? ""}
                    </tbody>
                </table>
            </form>

            <div id="insertForm">
                <form className="insertForm" method="POST">
                    <span className="close">x</span>
                    <p id="headP">Insert movie:</p>
                    <div>
                        <p>Image link:</p>
                        <input className="userInputs" type="text" name="imageLink" />
                    </div>
                    <div>
                        <p>Title:</p>
                        <input className="userInputs" type="text" name="title" />
                    </div>
                    <div>
                        <p>Description:</p>
                        <textarea style={
                            {
                                "width": "300px",
                                "height": "150px",
                                "resize": "none"
                            }
                        } className="userInputs" type="email" name="description" />
                    </div>
                    <div>
                        <p>Category:</p>
                        <input className="userInputs" type="text" name="category" />
                    </div>
                    <div>
                        <p>Rating:</p>
                        <input className="userInputs" type="number" step="0.01" min="0" max="10" name="rating" />
                    </div>

                    <input className="save" type="submit" name="insert" value="Save" />
                </form>
            </div>
        </div>
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

    function displayFeatured() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetFeatured",
            success: function (data) {
                if (featured !== data) {
                    setFeatured(data);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }
}

function addFeatured(id) {
    $.ajax({
        type: "GET",
        url: "https://localhost:7197/api/Movie/AddFeatured/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            alert(jqXHR.status);
        }
    });
}

function addMovie() {
    var values = $('.insertForm').serialize();

    $.ajax({
        type: "POST",
        url: "https://localhost:7197/api/Movie/Add",
        data: values,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}

function removeFeatured(id) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:7197/api/Movie/RemoveFeatured/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}

export default DashMovie;