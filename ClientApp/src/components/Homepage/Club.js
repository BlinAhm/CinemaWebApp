import './ComingSoon.css';
import MovieCard from './MovieCard';
import { useEffect, useState } from "react";
import $ from 'jquery';

const ComingSoon = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        displayComingSoon();
    }, []);

    return (
        <div className="soon-body">
            <h2>Coming Soon!</h2>
            <div className="card-holder">
                {response?.map((key) => (
                    <MovieCard key={key.id} movieId={key.id} imageLink={key.imageLink} title={key.title} />
                ))}
            </div>
        </div>
    );

    function displayComingSoon() {
        $.ajax({
            type: "GET",
            url: "https://localhost:7197/api/Movie/GetComingSoon",
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

export default ComingSoon;