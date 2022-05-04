import { useEffect, useState } from 'react';
import $ from 'jquery';
import './DashUsers.css';

const DashUsers = () => {
    const [response, setResponse] = useState([]);


    useEffect(() => {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/User/GetAll",
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
        <div className="contents">
            <form className="form">
                <ul className="commands">
                    <li><button id="insertBtn">Insert</button></li>
                    <li><button id="editBtn">Edit</button></li>
                    <li><button id="deleteBtn">Delete</button></li>
                </ul>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>{response?.map((key, value) => (
                        <tr key={key.id}>
                            <td>{key.id}</td>
                            <td>{key.name}</td>
                            <td>{key.lastName}</td>
                            <td>{key.email}</td>
                            <td>{key.password}</td>
                        </tr>)) ?? ""}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DashUsers;