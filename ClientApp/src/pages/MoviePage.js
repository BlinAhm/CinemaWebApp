import $ from 'jquery';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/Movies/MoviePage.css';

const MoviePage = () => {
    const [response, setResponse] = useState([]);
    const type = getUrlParameter('type');
    const [link,setLink] = useState([]);

    useEffect(() => {
        if (type === "csoon") {
            getMovieDataCSoon();
        } else {
            getMovieData();
            checkLogIn();
        }
        // eslint-disable-next-line
    }, []);

    if (type === "csoon") {
        return (
            <div className="movie-page-main">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <img src={response.imageLink} alt="img" />
                <div className="movie-details">
                    <div className="title">
                        <h2>{response.title}</h2>
                        <div className="watchlist">Add to Watchlist <i className="fa fa-plus-circle" aria-hidden="true"></i></div>
                    </div>
                    <div className="details">
                        <p className="rating"><span className="categoryS">{response.category}</span></p>
                        <p className="description">{response.description}</p>
                    </div>
                    <div className="buttons">
                        <div className="trailer" onClick={showTrailer}>Watch Trailer</div>
                        <div className="coming-soon">Coming Soon!</div>
                    </div>
                    <div className="video">
                        <iframe title="trailer" height="400" width="650"
                            src={"https://www.youtube.com/embed/" + response.trailerID} >
                        </iframe>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="movie-page-main">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <img src={response.imageLink} alt="img" />
                <div className="movie-details">
                    <div className="title">
                        <h2>{response.title}</h2>
                        <div className="watchlist">Add to Watchlist <i className="fa fa-plus-circle" aria-hidden="true"></i></div>
                    </div>
                    <div className="details">
                        <p className="rating"><span className="fa fa-star checked"></span> {response.rating} <span className="category">{response.category}</span><span className="duration">Duration: {response.duration} min</span></p>
                        <p className="description">{response.description}</p>
                        <p className="cast">Cast: {response.actors?.map((actor) => (
                            <span key={actor.id} className="actors">{actor.firstName + " " + actor.lastName + (response.actors[response.actors.length - 1].id !== actor.id ? ", " : " ")}</span>
                        ))}</p>
                        <p className="director">Director: <span className="actors">{response.director?.firstName + " " + response.director?.lastName}</span></p>
                        <p className="price">Ticket price: {response.price?.toFixed(2)} &euro;</p>
                    </div>
                    <div className="buttons">
                        <div className="trailer" onClick={showTrailer}>Watch Trailer</div>
                        <Link to={link}><div className="buy">Buy Ticket</div></Link>
                    </div>
                    <div className="video">
                        <iframe title="trailer" height="400" width="650"
                            src={"https://www.youtube.com/embed/" + response.trailerID} >
                        </iframe>
                    </div>
                </div>
            </div>
        );
    }

    function checkLogIn() {
        var id = getUrlParameter('id');

        if (localStorage.getItem('login') !== null) {
            setLink("/movies/seating/?id=" + id);
        }
        else {
            setLink("/log-in");
        }
    }

    function getMovieData() {
        var id = getUrlParameter('id');

        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetById/" + id,
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

let trailer = false;

function showTrailer() {
    if (!trailer) {
        $('.video').css('display', 'block');
        trailer = true;
    } else {
        $('.video').css('display', 'none');
        trailer = false;
    }
}


export default MoviePage;