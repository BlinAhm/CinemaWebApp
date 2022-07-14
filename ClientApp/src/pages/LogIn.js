import LoginForm from "../components/LogIn/LoginForm"

const LogIn = () => {
    if (localStorage.getItem('login') === null) {
        console.log(localStorage.getItem('login'));
        return (
            <div className="main">
                <LoginForm />
            </div>
        );
    } else {
        
        window.location.href = "https://localhost:44465/home";
        return (<div></div>);
    }
}
export default LogIn;