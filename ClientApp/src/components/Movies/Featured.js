import './Featured.css';
import Banner from './Banner.js';
import { useEffect, useState } from "react";
import $ from 'jquery';

const Featured = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayFeatured();

    }, []);

    return (
        <div className="featured">
            <h2>Featured!</h2>
            <div className="featured-holder">
                {response?.map((key) => (
                    key.movies.map((movie) => (
                        <Banner key={movie.id} movieId={movie.id} category={movie.category} imageLink={movie.imageLink} title={movie.title} description={movie.description} rating={movie.rating} />
                    ))
                )) ?? ""}
            </div>
        </div>
    );

    function displayFeatured() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetFeatured",
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

export default Featured;