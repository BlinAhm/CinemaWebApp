import SignUpForm from '../components/SignUp/SignUpForm';

const SignUp = () => {
    if (localStorage.getItem('login') === null) {
        console.log(localStorage.getItem('login'));
        return (
            <SignUpForm />
        );
    } else {

        window.location.href = "https://localhost:44465/home";
        return (<div></div>);
    }
}
export default SignUp;