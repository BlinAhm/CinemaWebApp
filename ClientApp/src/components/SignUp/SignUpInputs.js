import './SignUpInputs.css';
import $ from 'jquery';
import { useEffect } from 'react';

const SignUpInputs = () => {
    //Prevents post before data validation
    useEffect(() => {
        $('[name="btnSubmit"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();
            if (SignUp()) {

                //Sends post, checks if email is registered, returns error if email is registered
                var values = $('#form').serialize();
                $.ajax({
                    method: 'POST',
                    url: 'https://localhost:7197/api/Authenticate/register-admin',//Changed to admin for software testing
                    data: values,
                    success: function() {
                        window.location.href = "https://localhost:44465/log-in";
                    },
                    error: function (error) {
                        var json = JSON.parse(error.responseText);
                        var message = json.message;

                        $('#labelEmail').html(message);
                    }
                });
            }

        })
    });

    return (
        <div className="input-div2">
            <input name="FirstName" id="sName" className="texts" type="text" placeholder="Name" />
            <label id="labelName"></label>
            <input name="LastName" id="sLName" className="texts" type="text" placeholder="Last name" />
            <label id="labelLName"></label>
            <input name="Email" id="sEmail" className="texts" type="email" placeholder="E-mail" />
            <label id="labelEmail"></label>
            <input name="Password" id="sPassword" className="texts" type="password" placeholder="Password" />
            <label id="labelPassword"></label>
            <input name="cpass" id="sCPassword" className="texts" type="password" placeholder="Confirm password" />
            <label id="labelCPassword"></label>

            <div className="checkSignUp">
                <input type="checkbox" />
                <p>I accept the <span>
                    <button disabled id="link-btn2">Terms and Conditions</button>
                </span></p>
            </div>

            <button name="btnSubmit" className="signupSubmit">Sign up</button>
        </div>
    );
}

function SignUp() {

    const isAlpha = new RegExp(/^[a-zA-Z\s]+$/);
    const isEmail = new RegExp(/^[\S]+@[\S]+\.[a-zA-Z]{2,3}$/);

    const name = $('[name="FirstName"]');
    const lastName = $('[name="LastName"]');
    const email = $('[name="Email"]');
    const password = $('[name="Password"]');
    const cPassword = $('[name="cpass"]');

    const labelName = $('#labelName');
    const labelLName = $('#labelLName');
    const labelEmail = $('#labelEmail');
    const labelPassword = $('#labelPassword');
    const labelCPassword = $('#labelCPassword');

    //Validates sign up inputs
    if ($(name).val().trim() === "" || !(isAlpha.test($(name).val()))) {
        labelName.html("Name invalid!");
    } else { labelName.html("") }
    if ($(lastName).val().trim() === "" || !(isAlpha.test($(lastName).val()))) {
        labelLName.html("Last name invalid!");
    } else { labelLName.html("") }
    if ($(email).val().trim() === "" || !(isEmail.test($(email).val()))) {
        labelEmail.html("Email invalid!");
    } else { labelEmail.html("") }
    if ($(password).val().trim() === "" || $(password).val().length < 6) {
        labelPassword.html("Password invalid!");
    } else { labelPassword.html("") }
    if ($(cPassword).val() !== $(password).val()) {
        labelCPassword.html("Passwords don't match!");
    } else { labelCPassword.html("") }

    //Checks if labels are empty (no errors on validation)
    if (labelName.html().trim() === ""
        && labelLName.html().trim() === ""
        && labelEmail.html().trim() === ""
        && labelPassword.html().trim() === ""
        && labelCPassword.html().trim() === "") {
        return true;
    } else {
        return false;
    }
}

export default SignUpInputs;