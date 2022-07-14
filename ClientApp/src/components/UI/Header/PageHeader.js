import './PageHeader.css';
import NavBar from './NavBar';

const PageHeader = () => {
    return (
        <div className='page-header'>
            <img onClick={checkAdmin} src='https://thumbs.dreamstime.com/b/clapperboard-pop-corn-red-color-background-top-view-cinema-two-concept-fresh-salty-movie-clapper-board-145416789.jpg' alt='img' />
            <NavBar />
        </div>
    );
}

function checkAdmin() {
    if (localStorage.getItem('login') !== null) {
        if (localStorage.getItem('login').includes("Admin")){
            window.location.href = "https://localhost:44465/dashboard";
        }
    }
}

export default PageHeader;