// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PageHeader from './components/UI/Header/PageHeader';
import PageFooter from './components/UI/Footer/PageFooter';
import Homepage from './pages/Homepage';
import Movies from './pages/Movies';
import Schedule from './pages/Schedule';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <div className="App">
            <PageHeader />
            <Routes>
                <Route path='/home' element={<Homepage />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/schedules' element={<Schedule />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/log-in' element={<LogIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/dashboard/users' element={<Dashboard id="users" />} />
                <Route path='/dashboard/admin' element={<Dashboard id="admin" />} />
                <Route path='/dashboard/contact-us' element={<Dashboard id="contact-us" />} />
                <Route path='/dashboard/' element={<Dashboard />} />
                <Route
                    path="*"
                    element={<Navigate to="/home" replace />}
                />
            </Routes>
            <PageFooter />
        </div>
    );
}

export default App;
