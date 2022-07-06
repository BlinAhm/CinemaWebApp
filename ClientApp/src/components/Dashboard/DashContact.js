import { useEffect, useState} from 'react';
import './DashContact.css';
import $ from 'jquery';


const DashContact = () => {
    const [response, setResponse] = useState([]);
    useEffect(() => {
        getContact();
        
    });
    return (
        <div id="contact">
            <form class="form">
                <ul class="commands">
                    <li><button id="deleteBtn">Delete</button></li>
                </ul>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="fullN">Full name</th>
                            <th class="email">Email</th>
                            <th class="title">Title</th>
                            <th class="messageBox">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response?.map((key) => (
                                <tr key={key.id }>
                                    <td class="fullN">{key.name}</td>
                                    <td class="email">{key.email}</td>
                                    <td class="title">{key.title}</td>
                                    <td class="messageBox">{key.message}</td>
                                </tr>
                                ))}

                    </tbody>
                </table>
            </form>
        </div>
    );

    function getContact() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Contact/getAll",
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

export default DashContact;