import './Featured.css';
import Banner from './Banner.js';

const Featured = () => {
    return (
        <div className="featured">
            <h2>Featured!</h2>
            <div className="featured-holder">
                <Banner />
                <Banner />
            </div>
        </div>
    );
}

export default Featured;