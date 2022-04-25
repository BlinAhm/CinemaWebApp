import './ContactInputs.css';

const ContactInputs = () => {
    return (
        <form method="post" className="contact-right">
            <div id="write">
                <h2>Write us!</h2>

                <input name="fullName" type="text" placeholder="Name and Surname" />
                <input name="email" type="email" placeholder="E-mail" />
                <input name="title" type="text" placeholder="Title" />

            </div>
            <div className="write2">

                <textarea name="msg" placeholder="Message"></textarea>
                <button name="msgSend">Send</button>

            </div>
        </form>
    );
}

export default ContactInputs;