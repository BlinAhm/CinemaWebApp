import { Link } from 'react-router-dom';
import './LoginForm.css';
import LoginInputs from './LoginInputs';
import LoginTitle from './LoginTitle';

const LoginForm = () => {
    return (
        <form method="post" id="formSignIn" className="LoginForm">
            <div className="sign-in-container">
                <div className="sign-in">
                    <LoginTitle />
                    <LoginInputs />

                    <button className="loginSubmit">Login</button>
                    <Link to="/sign-up" className="log-in__account">Don't have an account? Sign up!</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;