import './DashAdmin.css';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const DashAdmin = () => {
    const [response, setResponse] = useState([]);
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        /*displayAdmins();*/
        displayActivities();

        $('[name="insert"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            addAdmin();
        });

        $('[name="delete"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            removeAdmin();
        });


        //Show/hide forms
        $('#insertBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#insertForm').css({ "display": "block" });
        });
        $('#deleteBtn').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            $('#deleteForm').css('display', 'block');
        });

        $('.close').on('click', () => {
            $('#insertForm').css('display', 'none');
            $('#deleteForm').css('display', 'none');
        });


        //eslint-disable-next-line
    }, []);

    return (
        <div id="admin">
            <form className="form">
                <ul className="commands">
                    <li><button id="insertBtn">Add</button></li>
                    <li><button id="deleteBtn">Remove</button></li>
                </ul>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Admin Id</th>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Last name</th>
                        </tr>
                    </thead>
                    <tbody>{response?.map((key, value) => (
                        <tr key={key.id}>
                            <td>{key.id}</td>
                            <td>{key.userId}</td>
                            <td>{key.name}</td>
                            <td>{key.lastName}</td>
                        </tr>)) ?? ""}
                    </tbody>
                </table>
                <table className="activity">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Activity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>{activity?.map((acts) =>(
                        <tr key={acts.id}>
                            <td>{acts.id}</td>
                            <td className="act">{acts.act}</td>
                            <td>{acts.date}</td>
                        </tr>)) ?? ""}
                    </tbody>
                </table>
            </form>

            <div id="insertForm">
                <form className="insertForm" method="POST">
                    <span className="close">x</span>
                    <p id="headP">Add admin:</p>
                    <div id="columnDiv">
                        <p>User id:</p>
                        <input className="userInputs" type="text" name="userId" />
                        <label id="labelAdd"></label>
                    </div>

                    <input className="save" type="submit" name="insert" value="Save" />
                </form>
            </div>

            <div id="deleteForm">
                <form className="deleteForm" method="GET">
                    <span className="close">x</span>
                    <p id="headP">Remove admin:</p>
                    <div id="columnDiv">
                        <p>User id:</p>
                        <input className="deleteId" type="number" name="deleteId" />
                        <label id="labelRemove"></label>
                    </div>

                    <input className="delete" id="deleteBtn" type="submit" name="delete" value="Remove" />
                </form>
            </div>

        </div>
    );

    function displayAdmins() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/Admin/GetAll",
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
    function displayActivities() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Activity/GetAll",
            success: function (data) {
                if (activity !== data) {
                    setActivity(data);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }
}

function addAdmin() {
    var id = $('.insertForm').serialize();
    $.ajax({
        type: "POST",
        url: "https://localhost:7197/Admin/Add",
        data: id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/admin";
        },
        error: function (error) {
            alert(error.status);
        }
    });
}

function removeAdmin() {
    var id = $('.deleteId').val();
    $.ajax({
        type: "GET",
        url: "https://localhost:7197/Admin/Remove/" + id,
        success: function () {
            window.location.href = "https://localhost:44465/dashboard/admin";
        },
        error: function (error) {
            alert(error.status);
        }
    });
}

export default DashAdmin;