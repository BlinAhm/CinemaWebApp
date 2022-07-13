import { useEffect, useState } from 'react';
import $ from 'jquery';
import './AvailableSeats.css';

const AvailableSeats = () => {
    const [seats, setSeats] = useState([]);
    const [vipSeats, setVipSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);

    useEffect(() => {
        displaySeats();
    });

    return (
        <div className="available-seats">
            <h2>Available seats:</h2>

            <div className="seat-list">
                {seats}
                {vipSeats}
            </div>
        </div>
    );

    function displaySeats() {
        var id = getUrlParameter("id");
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Hall/GetSeats/" + id,
            success: function (data) {
                if (seats !== data[0]) {

                    setSeats(data[0]);
                    setVipSeats(data[1]);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }

    function displayReservedSeats() {

    }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

export default AvailableSeats;