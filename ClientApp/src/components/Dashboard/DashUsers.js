import { useEffect, useState } from 'react';
import $ from 'jquery';
import './DashUsers.css';

const DashUsers = () => {
    const [response, setResponse] = useState([]);


    useEffect(() => {
        //Displays all users
        displayUsers();

        //Insert action listener
        $('[name="insert"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            if (inputsNotEmpty()) {
                addUser();
            }
        });

        //Edit action listener
        $('#editBtn').on('click', (e) => {
            console.log("123");
        });


        //Update action listener
        $('[name="update"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            updateUser();
        });

        //Delete action listener
        $('#delete').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            deleteUser();
        });

        //Show/hide forms
        $('#insertBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#insertForm').css('display', 'block');
        });


        $('#deleteBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#deleteForm').css('display', 'block');
        });

        $('.close').on('click', () => {
            $('#insertForm').css('display', 'none');
            $('#editForm').css('display', 'none');
            $('#updateForm').css('display', 'none');
            $('#deleteForm').css('display', 'none');
        });

        //eslint-disable-next-line
    }, []);

    return (
        <div className="contents">
            <form className="form">
                <ul className="commands">
                    <li><button id="insertBtn">Insert</button></li>
{/*                    <li><button id="editBtn">Edit</button></li>
                    <li><button id="deleteBtn">Delete</button></li>*/}
                </ul>
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>User Id</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{response?.map((key, value) => (
                        <tr key={key.id}>
                            <td>{key.firstName}</td>
                            <td>{key.lastName}</td>
                            <td>{key.email}</td>
                            <td>{key.id}</td>
                            <td><div onClick={() => { edit(key.email) }} id="editBtn">Edit</div></td>
                            <td><div id="deleteBtn">Delete</div></td>
                        </tr>)) ?? ""}
                    </tbody>
                </table>
            </form>

            <div id="insertForm" action="https://localhost:7197/User/Add">
                <form className="insertForm" method="POST">
                    <span className="close">x</span>
                    <p id="headP">Insert user:</p>
                    <div>
                        <p>Name:</p>
                        <input className="userInputs" type="text" name="name" />
                    </div>
                    <div>
                        <p>Last name:</p>
                        <input className="userInputs" type="text" name="lastName" />
                    </div>
                    <div>
                        <p>Email:</p>
                        <input className="userInputs" type="email" name="email" />
                        <label id="labelEmail"></label>
                    </div>
                    <div>
                        <p>Password:</p>
                        <input className="userInputs" type="text" name="password" />
                    </div>

                    <input className="save" type="submit" name="insert" value="Save" />
                </form>
            </div>

            <div id="editForm">
                <form className="editForm" method="GET">
                    <span className="close">x</span>
                    <p id="headP">User id:</p>
                    <input className="id" type="number" name="id" />

                    <input className="next" id="next" type="submit" value="Next" />
                </form>
            </div>

            <div id="updateForm">
                <form className="updateForm" method="POST">

                    <span className="close">x</span>
                    <p id="headP">Update user:</p>
                    <div>
                        <p>Name:</p>
                        <input id="updateName" className="updateInputs" type="text" name="name" />
                    </div>
                    <div>
                        <p>Last name:</p>
                        <input id="updateLName" className="updateInputs" type="text" name="lastName" />
                    </div>
                    <div>
                        <p>Email:</p>
                        <input id="updateEmail" className="updateInputs" type="email" name="email" />
                    </div>
                    <div>
                        <p>Password:</p>
                        <input id="updatePassword" className="updateInputs" type="text" name="password" />
                    </div>

                    <input id="update" className="update" type="submit" name="update" value="Update" />
                </form>
            </div>

            <div id="deleteForm">
                <form className="deleteForm" method="GET">
                    <span className="close">x</span>
                    <p id="headP">User id:</p>
                    <input className="deleteId" type="number" name="deleteID" />
                    <label id="labelDel"></label>

                    <input className="delete" id="delete" type="submit" value="Delete" />
                </form>
            </div>

        </div>
    );

    function displayUsers() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Authenticate/GetAll",
            success: function (data) {
                if (response !== data) {
                    setResponse(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            }
        });
    }
}

function inputsNotEmpty() {
    const name = $('[name="name"]');
    const lastName = $('[name="lastName"]');
    const email = $('[name="email"]');
    const password = $('[name="password"]');

    if ($(name).val().trim() !== "" &&
        $(lastName).val().trim() !== "" &&
        $(email).val().trim() !== "" &&
        $(password).val().trim() !== "") {
        return true;
    }
    return false;
}

function addUser() {
    var values = $('.insertForm').serialize();
    $.ajax({
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        method: 'POST',
        url: 'https://localhost:7197/User/Add',
        data: values,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/users";
        },
        error: function (error) {
            $('#labelEmail').html(error.responseText);
        }
    });
}

function edit(email) {
    var send = "email=" + email;

    $.ajax({
        type: "POST",
        url: "https://localhost:7197/api/Authenticate/GetByEmail",
        data: send,
        success: function (data) {
            $('#updateForm').css('display', 'block');

            $('#updateName').val(data.firstName);
            $('#updateLName').val(data.lastName);
            $('#updateEmail').val(data.email);
            $('#updatePassword').val(data.passwordHash);
        },
        error: function (jqXHR) {
            console.log(jqXHR.status);
        }
    });
}

function updateUser() {
    var id = $('[name="id"]').val();
    var values = $('.updateForm').serialize();
    values = "id=" + id +"&" + values;
    console.log(values);
    $.ajax({
        type: "POST",
        url: "https://localhost:7197/User/Update",
        data: values,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/users";
        },
        error: function (jqXHR) {
            alert(jqXHR.status);
        }
    });
}

function deleteUser() {
    var id = $('[name="deleteID"]').val();

    $.ajax({
        type: "GET",
        url: "https://localhost:7197/User/Delete/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/users";
        },
        error: function (error) {
            $('#labelDel').html(error.responseText);
        }
    })
}

export default DashUsers;