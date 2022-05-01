import './SignUpInputs.css';

const SignUpInputs = () => {
    return (
        <div className="input-div2">
            <input name="Name" id="sName" className="texts" type="text" placeholder="Name" />
            <label id="labelName"></label>
            <input name="LastName" id="sLName" className="texts" type="text" placeholder="Last name" />
            <label id="labelLName"></label>
            <input name="Email" id="sEmail" className="texts" type="email" placeholder="E-mail" />
            <label id="labelEmail"></label>
            <input name="Password" id="sPassword" className="texts" type="password" placeholder="Password" />
            <label id="labelPassword"></label>
            <input name="cpass" id="sCPassword" className="texts" type="password" placeholder="Confirm password" />
            <label id="labelCPassword"></label>
        </div>
    );
}

export default SignUpInputs;