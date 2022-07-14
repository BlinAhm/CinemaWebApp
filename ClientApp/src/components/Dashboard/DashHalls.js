import DashNavLink from '../UI/Header/DashNavLink';
import './DashboardBackground.css';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import Modal from './Modal';

const DashHalls = () => {
    const [halls, setHalls] = useState([]);
    const [openModal, setModalOpen] = useState(false);

    useEffect(() => {
        displayHalls();

        //eslint-disable-next-line
    }, [])

    return (
        <div className="db-background">
            <div className="db-main">
                <ul className="commands" id="selected">
                    <li><DashNavLink link="vip-seats" value="Vip Seats"></DashNavLink></li>
                    <li><button onClick={() => { setModalOpen(true) }} id="insertBtn">Add</button></li>
                </ul>
                <table className="table">
                    <caption id="caption-featured">Halls:</caption>
                    <thead id="thead-header">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>No. Seats</th>
                            <th>3D</th>
                            <th style={{ "width": "8%" }}></th>
                            <th style={{ "width": "4%" }}></th>
                            <th style={{ "width": "4%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {halls?.map((hall) => (
                            <tr key={hall.id}>
                                <td>{hall.id}</td>
                                <td>{hall.name}</td>
                                <td>{hall.seats}</td>
                                <td>{hall.is3D + ""}</td>
                                <td><div id="extraBtn">Movies</div></td>
                                <td><div id="editBtn">Edit</div></td>
                                <td><div id="deleteBtn">Delete</div></td>
                            </tr>
                        )) ?? ""}
                    </tbody>
                </table>
            </div>
            {openModal && <Modal setOpenModal={setModalOpen} />}
        </div>


    );

    function displayHalls() {
        var token = localStorage.getItem('token');

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Hall/GetAll",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                if (halls !== data) {
                    setHalls(data);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }
}


export default DashHalls;