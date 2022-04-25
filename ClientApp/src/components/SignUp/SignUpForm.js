import { Link } from 'react-router-dom';
import SignUpTitle from './SignUpTitle';
import SignUpInputs from './SignUpInputs';
import './SignUpForm.css';

const SignUpForm = () => {
    return (
        <form method="post" id="form" name="form" className="SignupForm">
            <div className="sign-up-container" id="sign-up-container">
                <div className="sign-up">
                    <SignUpTitle />
                    <SignUpInputs />

                    <div className="checkSignUp">
                        <input type="checkbox" />
                        <p>I accept the <span>
                            <button disabled id="link-btn2">Terms and Conditions</button>
                        </span></p>
                    </div>

                    <button name="btnSubmit" className="signupSubmit">Sign up</button>

                    <Link to="/log-in" className="sign-in__already">Already have an account? Sign in!</Link>
                </div>
            </div>
        </form>
    );
}

export default SignUpForm;