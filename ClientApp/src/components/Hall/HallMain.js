import { useEffect, useState } from 'react';
import $ from 'jquery';
import './AvailableHalls.css';
import './AvailableSeats.css';
import './HallControlls.css';

const HallMain = () => {
    const [response, setResponse] = useState([]);
    const [seatsNr, setSeatsNr] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [vipSeats, setVipSeats] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        displayHalls();

        $('#dateBox').change(function() {
            getVipSeats(this.value);
            $('.vip-seat').removeClass('vip-seat').addClass('free-seat');
            /*$(".free-seat").css("background","linear-gradient(to right, #297d06,#2c8706,#3aa90c)");*/
        });

    }, []);

    return (
        <div className="hall-main">

            {/*Available Halls*/}
            <div className="available-halls">
                <h2>Available halls:</h2>

                <div className="hall-list">
                    <input id="hallId" type="hidden" />
                    {response?.map((hall) => (
                        <div onClick={() => { displaySeats(hall.id) }} id={"hall" + hall.id} key={hall.id} className="hall-div">{hall.name}</div>
                    ))}
                </div>
            </div>

            {/*Available Seats*/}
            <div className="available-seats">
                <h2>Available seats:</h2>
                <div>
                    <div className="dates-div">
                        <select id="dateBox" className="dates">
                            {dates?.map((key, index) => (
                                <option key={index}>{key}</option>
                            ))}

                        </select>
                    </div>
                    <div className="seat-list">
                        {showRows()}
                    </div>
                </div>

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
        $('.vip-seat').removeClass('vip-seat').addClass('free-seat');
        $('#hallId').val(id);

        setDate();

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Hall/GetSeats/" + id,
            success: function (data) {
                if (seatsNr !== data[0]) {

                    setSeats(seatArray(data[0]));
                }

            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }

    function seatArray(seatsNr) {
        var alfa = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var array = [];
        var index = 0;
        for (let i = 0; i < seatsNr / 10; i++) {
            for (let j = 1; j <= 10; j++) {
                array[index] = alfa[i] + j;
                index++;
            }
        }
        setSeatsNr(seatsNr);
        return array;
    }

    function showRows() {
        var arr = [];
        var i = 0;

        //Filter through seats array: A1,A2... and gets the letters for each seat row 
        seats?.filter((seat) => { if (seat.endsWith('1')) { return seat; } }).map((value) => {
            arr[i++] = value.charAt(0);
        })

        //With the letters of every row creates numbered seats from seats array and pushes the rows to final
        const final = [];
        for (let item of arr) {
            final.push(<div key={item} className="seat-row"><span className="letter">{item}</span>{seats?.filter((seat) => { if (seat.startsWith(item)) { return seat; } }).map((item) => (<div key={item} id={item} className="free-seat">{item}</div>))}</div>);
        }
        return final;
    }

    function getVipSeats(date) {
        var id = getUrlParameter("id");
        var hallId = $('#hallId').val();
        var dateFinal = date.split(" ")[0] + "T" + date.split(" ")[1] + ":00";

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Hall/GetVipSeats/" + hallId + "&" + id + "&" + dateFinal,
            success: function (data) {
                if (vipSeats !== data) {
                    setVipSeats(data);
                    data.forEach(function (item) {
                        $('#' + item).removeClass('free-seat').addClass('vip-seat');
                    })
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
    }


    function setDate() {
        var id = getUrlParameter('id');
        var hallId = $('#hallId').val();
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Hall/GetDatesForMovie/" + hallId + "&" + id,
            success: function (data) {
                if (dates !== data) {
                    var final = [];
                    var index = 0;

                    data?.forEach((value) => {
                        var temp = value.split("T");
                        var timeArr = temp[1].split(":");
                        var time = timeArr[0] + ":" + timeArr[1];
                        final[index++] = temp[0] + " " + time;
                    })
                    setDates(final);
                    getVipSeats(final[0]);
                }
            },
            error: function (jqXHR) {
                alert(jqXHR.status);
            }
        });
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

export default HallMain;