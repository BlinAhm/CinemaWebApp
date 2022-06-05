import { Link } from 'react-router-dom';
import './LoginForm.css';
import LoginInputs from './LoginInputs';
import LoginTitle from './LoginTitle';

const LoginForm = () => {
    return (
        <form action="https://localhost:7197/api/Authenticate/login" method="post" id="formSignIn" className="LoginForm">
            <div className="sign-in-container">
                <div className="sign-in">
                    <LoginTitle />
                    <LoginInputs />

                    <Link to="/sign-up">Don't have an account? Sign up!</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;