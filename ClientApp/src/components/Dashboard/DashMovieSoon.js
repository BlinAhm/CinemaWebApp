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

        $('#insertBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#insertForm').css('display', 'block');
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
                            <td style={{"width": "25%", "wordWrap":"anywhere"}}>{key.imageLink}</td>
                            <td style={{ "width": "20%" }}>{key.title}</td>
                            <td style={{ "width": "30%"}}>{key.description}</td>
                            <td style={{ "width": "15%"}}>{key.category}</td>
                            <td style={{ "width": "5%" }} ><div id="editBtn">Edit</div></td>
                            <td style={{ "width": "5%" }} onClick={() => { delMovie(key.id) }}><div id="deleteBtn">Delete</div></td>
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

                    <input className="save" type="submit" name="insert" value="Save" />
                </form>
            </div>
        </div>
    );

    function displayMovies() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetComingSoon",
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
    $.ajax({
        method: 'POST',
        url: 'https://localhost:7197/api/Movie/AddComingSoon',
        data: values,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/coming-soon";
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function delMovie(id) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:7197/api/Movie/DeleteComingSoon/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/coming-soon";
        },
        error: function (error) {
            console.log(error.status);
        }
    })
}

export default DashMovie;