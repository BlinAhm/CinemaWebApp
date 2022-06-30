import $ from 'jquery';
import { useEffect, useState } from 'react';
import '../components/Movies/MoviePage.css';

const MoviePage = () => {
    const [response, setResponse] = useState([]);
    const type = getUrlParameter('type');

    useEffect(() => {
        if (type == "csoon") {
            getMovieDataCSoon();
        } else {
            getMovieData();
        }
    }, []);

    return (
        <div className="movie-page-main">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <img src={response.imageLink} alt="img" />
            <div className="movie-details">
                <div className="title"><h2>{response.title}</h2></div>
                <div className="details">
                    <p className="rating"><span className="fa fa-star checked"></span> {response.rating} <span className="category">{response.category}</span></p>
                    <p className="description">{response.description}</p>
                    <p className="cast">Cast: {response.actors?.map((actor) => (
                        <span key={actor.id} className="actors">{actor.firstName + " " + actor.lastName + (response.actors[response.actors.length-1].id != actor.id ? ", " : " ")}</span>
                        ))}</p>
                </div>
                <div className="buttons">
                    <div className="trailer">Watch Trailer</div>
                    <div className="buy">Buy Ticket</div>
                </div>
            </div>
        </div>
    );

    function getMovieData() {
        var id = getUrlParameter('id');

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetById/"+id,
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

    function getMovieDataCSoon() {
        var id = getUrlParameter('id');

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetByIdSoon/" + id,
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


export default MoviePage;