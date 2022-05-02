import { Link } from 'react-router-dom';
import SignUpTitle from './SignUpTitle';
import SignUpInputs from './SignUpInputs';
import './SignUpForm.css';

const SignUpForm = () => {

    return (
        <form action="https://localhost:7197/User/Add" method="post" id="form" name="form" className="SignupForm">
            <div className="sign-up-container" id="sign-up-container">
                <div className="sign-up">
                    <SignUpTitle />
                    <SignUpInputs />

                    <Link to="/log-in" className="sign-in__already">Already have an account? Sign in!</Link>
                </div>
            </div>
        </form>
    );
}


export default SignUpForm;