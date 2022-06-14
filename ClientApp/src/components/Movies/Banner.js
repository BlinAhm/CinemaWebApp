import './Banner.css';

const Banner = () => {
    return (
        <a href="movies/#" className="banner-body">
            <img src="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg" alt="img" />
            <div className="banner-details">
                <h3>Avengers: Endgame</h3>
                <p>Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the direct sequel to Avengers: Infinity War (2018) and the 22nd film in the Marvel Cinematic Universe (MCU). Directed by Anthony and Joe Russo and written by Christopher Markus and Stephen McFeely, the film features an ensemble cast including Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Benedict Wong, Jon Favreau, Bradley Cooper, Gwyneth Paltrow, and Josh Brolin. In the film, the surviving members of the Avengers and their allies attempt to reverse the destruction caused by Thanos in Infinity War.</p>
            </div>
        </a>
    );
}

export default Banner;