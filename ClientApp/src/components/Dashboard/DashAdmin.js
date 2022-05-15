
import './DashAdmin.css';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const DashAdmin = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/Admin/GetAll",
            success: function (data) {
                if (response !== data) {
                    setResponse(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status);
            }
        });
    }, []);

    return (
        <div id="admin">
            <form class="form">
                <ul class="commands">
                    <li><button id="insertBtn">Add</button></li>
                    <li><button id="deleteBtn">Remove</button></li>
                </ul>
                <table class="table">
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
                <table class="activity">
                    <thead>
                        <th>Id</th>
                        <th>Activity</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td class="act">Test</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DashAdmin;