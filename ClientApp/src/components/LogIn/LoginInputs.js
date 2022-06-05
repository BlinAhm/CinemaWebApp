import { useEffect } from 'react';
import $ from 'jquery';
import './LoginInputs.css';

const LoginInputs = () => {
    useEffect(() => {
        $('.loginSubmit').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            ValidateInputs();
        });
    });

    return (
        <div className="input-div">
            <input name="Email" id="SIemail" className="texts" type="email" placeholder="E-mail" />
            <label id="labelSIEmail"></label>
            <input name="Password" id="SIpassword" className="texts" type="password" placeholder="Password" />
            <label id="labelSIPassword"></label>

            <div className="remember-me">
                <div className="check">
                    <input type="checkbox" /><p>Remember me</p>
                </div>
                <button disabled id="link-btn2">Forgot your password?</button>
            </div>

            <button className="loginSubmit">Login</button>
        </div>
        );
}

function LogIn() {
    var values = $('#formSignIn').serialize();
    $.ajax({
        method: 'POST',
        url: 'https://localhost:7197/api/Authenticate/login',
        data: values,
        success: function () {
            window.location.href = "https://localhost:44465/home";
        },
        error: function (error) {
            var json = JSON.parse(error.responseText);
            var message = json.message;

            $('#labelEmail').html(message);
        }
    });
}
function ValidateInputs() {
    const isEmail = new RegExp(/^[\S]+@[\S]+\.[a-zA-Z]{2,3}$/);

    const email = $('[name="Email"]');
    const password = $('[name="Password"]');
    const labelEmail = $('#labelSIEmail');
    const labelPassword = $('#labelSIPassword');

    if ($(email).val().trim() === "" || !(isEmail.test($(email).val()))) {
        labelEmail.html("Email invalid!");
    } else { labelEmail.html("") }
    if ($(password).val().trim() === "" || $(password).val().length < 6) {
        labelPassword.html("Password invalid!");
    } else { labelPassword.html("") }

    if (labelEmail.html().trim() === "" && labelPassword.html().trim() === "") {
        LogIn();
    }
}

export default LoginInputs;