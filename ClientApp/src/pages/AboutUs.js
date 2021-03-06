import './AboutUs.css';
const AboutUs = () => {
    return (
        <div className="aboutus-details">
            <img src={require('./about-us.jpg').default} />
            <h2 id="title">For the love of cinema</h2>
            <p>Picturecinema is a leading Kosovo film company incorporating cinema, distribution and home entertainment.

                At Picturecinema, we love cinemas. Nestled in the heart of their neighbourhoods, each of our cinemas are distinct, full of personality and run by welcoming and attentive staff. We don't just screen excellent films. We provide places to eat, meet and relax, and host a busy calendar of events for everyone to explore.

                If you love opera or theatre, we screen it live and direct from stages around the world. If you're all about superhero films, come to one of our state-of-the-art screens and get yourself a large popcorn.
            </p>
            <img src={require('./about-us2.jpeg').default} />
            <p>Our impressive cafes, bars and restaurants cater for everyone. From burgers to superfood salads, coffees to cocktails and a wide selection of beers and wines.

                We screen 35mm and 70mm special presentations at select Picturecinema, welcome independent film collectives and are proud hosts of some of the most visionary film festivals around. Our team of passionate programmers carefully curate a broad range of films, from quality mainstream and family movies to indies, documentaries and foreign language releases.

                We believe cinema can change lives and broaden perspectives. Catering to a diverse and inclusive audience is part of our DNA. We know that our communities make us and we champion films made for all ages, backgrounds and walks of life.

                We take our planet and the climate crisis seriously.From Prishtina down to Prizren, we play our own small part in the safekeeping of our planet and look to set an example for how cinemas can best reduce their energy consumption and waste.</p>
        </div>
    );
}
export default AboutUs;