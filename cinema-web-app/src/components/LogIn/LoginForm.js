import './LoginForm.css';
import LoginInputs from './LoginInputs';
import LoginTitle from './LoginTitle';

const LoginForm = () => {
    return (
        <form method="post" id="formSignIn">
            <div className="sign-in-container">
                <div className="sign-in">
                    <LoginTitle />
                    <LoginInputs />

                    <button className="loginSubmit">Login</button>
                    <button disabled id="link-btn">Don't have an account? Sign up!</button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;