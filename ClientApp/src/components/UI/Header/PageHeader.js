import './PageHeader.css';
import NavBar from './NavBar';

const PageHeader = () => {
    return (
        <div className='page-header'>
            <img src='https://thumbs.dreamstime.com/b/clapperboard-pop-corn-red-color-background-top-view-cinema-two-concept-fresh-salty-movie-clapper-board-145416789.jpg' alt='img' />
            <NavBar />
        </div>
    );
}

export default PageHeader;