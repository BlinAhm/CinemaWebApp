import { useEffect, useState } from 'react';
import $ from 'jquery';
import './AvailableHalls.css';

const AvailableHalls = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayHalls();
    });

    return (
        <div className="available-halls">
            <h2>Available halls:</h2>

            <div className="hall-list">
                {response?.map((hall) => (
                    <div onClick={() => { displaySeats(hall.id) }} id={"hall" + hall.id} key={hall.id} className="hall-div">{hall.name}</div>
                ))}
            </div>
        </div>
    );

    function displayHalls() {
        var id = getUrlParameter("id");
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Hall/GetByMovie/" + id,
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

    function displaySeats(id) {
        $('.hall-div').css({ "width": "45%", "background": "linear-gradient(to right, #606060, #606060, #808080, #909090)" });
        $('#hall' + id).css({ "width": "80%", "background": "linear-gradient(to right, #510912, #8e1b2a, #D7263D)" });


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

export default AvailableHalls;