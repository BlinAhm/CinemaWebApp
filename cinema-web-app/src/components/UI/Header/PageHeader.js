import './PageHeader.css';
import NavBar from './NavBar';

const PageHeader = () => {
    return (
        <div className='page-header'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png' alt='img' />
            <NavBar />
        </div>
    );
}

export default PageHeader;