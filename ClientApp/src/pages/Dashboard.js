import '../components/Dashboard/Dashboard.css';
import DashContact from '../components/Dashboard/DashContact';
import DashAdmin from '../components/Dashboard/DashAdmin';
import DashUsers from '../components/Dashboard/DashUsers';
import DashNav from '../components/UI/Header/DashNav';
import DashMovie from '../components/Dashboard/DashMovie';
import DashMovieSoon from '../components/Dashboard/DashMovieSoon';
import DashHalls from '../components/Dashboard/DashHalls';
import DashBookings from '../components/Dashboard/DashBookings';
import DashVipSeats from '../components/Dashboard/DashVipSeats';

const Dashboard = (props) => {
    if (localStorage.getItem('login').split(',')[0] !== "Admin") {
        window.location.href = "https://localhost:44465/home";
        return <div></div>;
    }
    if (props.id === "users") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashUsers />
            </div>
        );
    } else if (props.id === "admin") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashAdmin />
            </div>
        );
    } else if (props.id === "contact-us") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashContact />
            </div>
        );
    } else if (props.id === "movies") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashMovie />
            </div>
        );
    } else if (props.id === "coming-soon") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashMovieSoon />
            </div>
        );
    } else if (props.id === "halls") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashHalls />
            </div>
        );
    }else if (props.id === "vip-seats") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashVipSeats />
            </div>
        );
    } else if (props.id === "bookings") {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashBookings />
            </div>
        );
    } else {
        return (
            <div className="dashnav-background">
                <DashNav />
                <DashAdmin />
            </div>
        );
    }
}

export default Dashboard;