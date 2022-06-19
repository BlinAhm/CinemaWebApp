import { useEffect, useState } from "react";
import $ from 'jquery';
import DashNavLink from '../UI/Header/DashNavLink';
import './DashMovie.css';

const DashMovie = () => {
    const [response, setResponse] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        displayMovies();
        displayFeatured();
        getActors();

        $('#select1').change(() => {
            var select = $('#select1');
            var option = $('#newA');
            
            console.log(select.find(":selected").val());

            if (select.find(":selected").val() === option.val()) {
                $('#hidden1').css("display", "block");
            } else {
                $('#hidden1').css("display", "none");
            }
        });

        $('#select2').change(() => {
            var select = $('#select2');
            var option = $('#newA');
            console.log(select.find(":selected").val());

            if (select.find(":selected").val() === option.val()) {
                $('#hidden2').css("display", "block");
            } else {
                $('#hidden2').css("display", "none");
            }
        });

        $('#select3').change(() => {
            var select = $('#select3');
            var option = $('#newA');
            console.log(select.find(":selected").val());

            if (select.find(":selected").val() === option.val()) {
                $('#hidden3').css("display", "block");
            } else {
                $('#hidden3').css("display", "none");
            }
        });

        $('[name="updateCast"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            updateCast();
        });

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
        $('[name="update"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            updateMovie();
        });

        $('.close').on('click', () => {
            $('#insertForm').css('display', 'none');
            $('#updateForm').css('display', 'none');
            $('#editForm').css('display', 'none');
            $('#castForm').css('display', 'none');
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
                                <div id="editBtnM" onClick={() => { editMovie(key.id) }}>Edit</div>
                                <div id="deleteBtn" onClick={() => { deleteMovie(key.id) }}>Delete</div>
                            </td>
                            <td><div style={
                                { "marginRight": "10px", "paddingBlock": "10px", "paddingInline": "5px" }
                            } id="castBtn" onClick={() => { editCast(key.id) }}>Edit Cast</div></td>
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

            <div id="updateForm">
                <form className="updateForm" method="POST">

                    <span className="close">x</span>
                    <p id="headP">Edit movie:</p>

                    <div>
                        <p>Image Link:</p>
                        <input id="updateLink" className="updateInputs" type="text" name="imageLink" />
                    </div>
                    <div>
                        <p>Title:</p>
                        <input id="updateTitle" className="updateInputs" type="text" name="title" />
                    </div>
                    <div>
                        <p>Description:</p>
                        <textarea style={
                            {
                                "width": "300px",
                                "height": "150px",
                                "resize": "none"
                            }
                        } id="updateDescription" className="updateInputs" type="email" name="description" />
                    </div>
                    <div>
                        <p>Category:</p>
                        <input id="updateCategory" className="updateInputs" type="text" name="category" />
                    </div>
                    <div>
                        <p>Rating:</p>
                        <input id="updateRating" className="updateInputs" type="text" name="rating" />
                    </div>
                    <input id="movieId" className="updateInputs" disabled name="mId" style={{ "display": "none" }} />

                    <input id="update" className="update" type="submit" name="update" value="Update" />
                </form>
            </div>

            <div id="castForm">
                <form className="castForm" method="POST">

                    <span className="close">x</span>
                    <p id="headP">Edit cast:</p>

                    <select defaultValue={-1} id="select1" style={{ "height": "auto" }} className="updateInputs" name="a1Id">
                        <option id="newA" value={0}>Create new actor</option>
                        <option value={-1}>-</option>
                        {cast?.map((key) => (
                            <option key={key.id} value={key.id}>{key.firstName + " " + key.lastName}</option>
                        ))}
                    </select>

                    <div id="hidden1" style={{ "display": "none" }}>
                        <p>Actor 1:</p>
                        <input className="updateInputs" type="text" name="actor1" />
                    </div>

                    <select defaultValue={-1} id="select2" style={{ "height": "auto" }} className="updateInputs" name="a2Id">
                        <option id="newA" value={0}>Create new actor</option>
                        <option value={-1}>-</option>
                        {cast?.map((key) => (
                            <option key={key.id} value={key.id}>{key.firstName + " " + key.lastName}</option>
                        ))}
                    </select>

                    <div id="hidden2" style={{ "display": "none" }}>
                        <p>Actor 2:</p>
                        <input className="updateInputs" type="text" name="actor2" />
                    </div>

                    <select defaultValue={-1} id="select3" style={{ "height": "auto" }} className="updateInputs" name="a3Id">
                        <option id="newA" value={0}>Create new actor</option>
                        <option value={-1}>-</option>
                        {cast?.map((key) => (
                            <option key={key.id} value={key.id}>{key.firstName + " " + key.lastName}</option>
                        ))}
                    </select>

                    <div id="hidden3" style={{ "display": "none" }}>
                        <p>Actor 3:</p>
                        <input className="updateInputs" type="text" name="actor3" />
                    </div>
                    <input id="movieIdCast" className="updateInputs" disabled name="mId" style={{ "display": "none" }} />


                    <input id="updateCast" className="update" type="submit" name="updateCast" value="Save" />
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

    function getActors() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetAllActors",
            success: function (data) {
                if (cast !== data) {
                    setCast(data);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }
}



function editMovie(id) {
    $.ajax({
        type: "GET",
        url: "https://localhost:7197/api/Movie/FindById/" + id,
        success: function (data) {
            $('#updateForm').css('display', 'block');

            $('#updateLink').val(data.imageLink);
            $('#updateTitle').val(data.title);
            $('#updateDescription').val(data.description);
            $('#updateCategory').val(data.category);
            $('#updateRating').val(data.rating);
            $('#movieId').val(data.id);
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}

function editCast(id) {
    
    $('#movieIdCast').val(id);
    $('[name="actor1"]').val("Name Surname");
    $('[name="actor2"]').val("Name Surname");
    $('[name="actor3"]').val("Name Surname");
    $('#castForm').css('display', 'block');
}

function updateMovie() {
    var id = $('[name="mId"]').val();
    var values = $('.updateForm').serialize();
    var send = values + "&mId=" + id;

    $.ajax({
        type: "POST",
        url: "https://localhost:7197/api/Movie/Update",
        data: send,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            console.log(jqXHR.responseText);
        }
    });
}

function updateCast() {
    var id = $('#movieIdCast').val();
    var values = $('.castForm').serialize();
    var send = values + "&mId=" + id;

    $.ajax({
        type: "POST",
        url: "https://localhost:7197/api/Movie/UpdateCast",
        data: send,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            console.log(jqXHR.responseText);
        }
    });
}

function addFeatured(id) {
    $.ajax({
        type: "GET",
        url: "https://localhost:7197/api/Movie/AddFeatured/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
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

function deleteMovie(id) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:7197/api/Movie/Delete/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/movies";
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}

export default DashMovie;