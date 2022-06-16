import './Banner.css';

const Banner = () => {
    return (
        <a href="movies/#" className="banner-body">
            <img src="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg" alt="img" />
            <div className="banner-details">
                <h3>Avengers: Endgame</h3>
                <p>"After half of all life is snapped away by Thanos, the Avengers are left scattered and divided. Now with a way to reverse the damage, the Avengers and their allies must assemble once more and learn to put differences aside in order to work together and set things right."</p>
                <h4>Cast: Test Test Test Test Test Test</h4>
                <h4>Rating: 8.6/10</h4>
            </div>
        </a>
    );
}

export default Banner;