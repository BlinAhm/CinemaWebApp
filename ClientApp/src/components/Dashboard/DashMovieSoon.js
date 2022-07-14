import { useEffect, useState } from "react";
import $ from 'jquery';
import DashNavLink from '../UI/Header/DashNavLink';
import './DashMovie.css';

const DashMovie = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayMovies();


        $('[name="insert"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            addMovie();
        })
        $('[name="update"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            updateMovie();
        })



        $('#insertBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#insertForm').css('display', 'block');
        });

        $('.close').on('click', () => {
            $('#insertForm').css('display', 'none');
            $('#updateForm').css('display', 'none');
        });
        //eslint-disable-next-line
    }, []);

    return (
        <div className="contents">
            <form className="form">
                <ul className="commands" id="coming-soon">
                    <li><DashNavLink link="coming-soon" value="Coming Soon"></DashNavLink></li>
                    <li><button id="insertBtn">Insert</button></li>
                </ul>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Poster Link</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{response?.map((key) => (
                        <tr key={key.id}>
                            <td style={{ "width": "25%", "wordWrap": "anywhere" }}>{key.imageLink}</td>
                            <td style={{ "width": "20%" }}>{key.title}</td>
                            <td style={{ "width": "30%" }}>{key.description}</td>
                            <td style={{ "width": "15%" }}>{key.category}</td>
                            <td style={{ "width": "5%" }} ><div onClick={() => { editMovie(key.id) }} id="editBtn">Edit</div></td>
                            <td style={{ "width": "5%" }}><div onClick={() => { delMovie(key.id) }} id="deleteBtn">Delete</div></td>
                        </tr>)) ?? ""}
                    </tbody>
                </table>
            </form>

            <div id="insertForm">
                <form className="insertForm" method="POST">
                    <span className="close">x</span>
                    <p id="headP">Insert movie:</p>
                    <div className="container">
                        <div className="left">
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
                        </div>
                        <div className="right">
                            <div>
                                <p>Category:</p>
                                <input className="userInputs" type="text" name="category" />
                            </div>
                            <div>
                                <p>Trailer Id:</p>
                                <input className="userInputs" type="text" name="trailerID" />
                            </div>
                        </div>
                    </div>
                    <input className="save" type="submit" name="insert" value="Save" />
                </form>
            </div>

            <div id="updateForm">
                <form className="updateForm" method="POST">

                    <span className="close">x</span>
                    <p id="headP">Edit movie:</p>
                    <div className="container">
                        <div className="left">
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
                        </div>
                        <div className="right">
                            <div>
                                <p>Category:</p>
                                <input id="updateCategory" className="updateInputs" type="text" name="category" />
                            </div>
                            <div>
                                <p>Trailer id:</p>
                                <input id="updateTrailer" className="updateInputs" type="text" name="trailerID" />
                            </div>
                        </div>
                    </div>
                    <input id="movieId" disabled name="mId" style={{ "display": "none" }} />

                    <input id="update" className="updatem" type="submit" name="update" value="Update" />
                </form>
            </div>
        </div>
    );

    function displayMovies() {
        var token = localStorage.getItem('token');

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetComingSoon",
            headers: { "Authorization": "Bearer " + token },
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

function addMovie() {
    var values = $('.insertForm').serialize();
    var token = localStorage.getItem('token');

    $.ajax({
        method: 'POST',
        url: 'https://localhost:7197/api/Movie/AddComingSoon',
        data: values,
        headers: { "Authorization": "Bearer " + token },
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/coming-soon";
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function delMovie(id) {
    var token = localStorage.getItem('token');

    $.ajax({
        type: "DELETE",
        url: "https://localhost:7197/api/Movie/DeleteComingSoon/" + id,
        headers: { "Authorization": "Bearer " + token },
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/coming-soon";
        },
        error: function (error) {
            console.log(error.status);
        }
    })
}

function editMovie(id) {
    var token = localStorage.getItem('token');

    $.ajax({
        type: "GET",
        url: "https://localhost:7197/api/Movie/FindByIdCSoon/" + id,
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            $('#updateForm').css('display', 'block');

            $('#updateLink').val(data.imageLink);
            $('#updateTitle').val(data.title);
            $('#updateDescription').val(data.description);
            $('#updateCategory').val(data.category);
            $('#updateTrailer').val(data.trailerID);
            $('#movieId').val(data.id);
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}

function updateMovie() {
    var token = localStorage.getItem('token');

    var id = $('[name="mId"]').val();
    var values = $('.updateForm').serialize();
    var send = values + "&mId=" + id;

    $.ajax({
        type: "POST",
        url: "https://localhost:7197/api/Movie/UpdateComingSoon",
        data: send,
        headers: { "Authorization": "Bearer " + token },
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/coming-soon";
        },
        error: function (jqXHR) {
            console.log(jqXHR.responseText);
        }
    });
}

export default DashMovie;