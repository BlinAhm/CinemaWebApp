import '../components/Dashboard/Dashboard.css';
import DashContact from '../components/Dashboard/DashContact';
import DashAdmin from '../components/Dashboard/DashAdmin';
import DashUsers from '../components/Dashboard/DashUsers';
import DashNav from '../components/UI/Header/DashNav';
import DashMovie from '../components/Dashboard/DashMovie';
import DashMovieSoon from '../components/Dashboard/DashMovieSoon';

const Dashboard = (props) => {
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