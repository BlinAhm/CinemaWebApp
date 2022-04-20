import './LoginForm.css';
import LoginInputs from './LoginInputs';

const LoginForm = () => {
    return (
        <form method="post" id="formSignIn">
            <div className="sign-in-container">
                <div className="sign-in">
                    <h1>Log in</h1>
                    <h5>Log in and start browsing your favorite movies!</h5>
                    <LoginInputs />
                    <input type="button" value="Login" className="loginSubmit" />
                    <a id="sign-up">Don't have an account? Sign up!</a>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;