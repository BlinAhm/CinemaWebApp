import { useEffect, useState } from "react";
import $ from 'jquery';
import DashNavLink from '../UI/Header/DashNavLink';
import './DashMovie.css';

const DashMovie = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayMovies();

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
                            <th>Cast</th>
                            <th>Rating</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{response?.map((key) => (
                        <tr key={key.id}>
                            <td style={{"width": "25%",}}>{key.imageLink}</td>
                            <td>{key.title}</td>
                            <td>{key.description}</td>
                            <td>{key.category}</td>
                            <td>{key.actors.map((actor) => (
                                <span key={actor.id}>{`${actor.firstName} ${actor.lastName}`}<br/></span>
                            ))}</td>
                            <td>{key.rating}</td>
                            <td><div id="editBtn">Edit</div></td>
                            <td><div id="deleteBtn">Delete</div></td>
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
                        <input className="userInputs" type="text" name="title" />
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
}

export default DashMovie;