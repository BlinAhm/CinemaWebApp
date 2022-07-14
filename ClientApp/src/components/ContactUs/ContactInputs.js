import './ContactInputs.css';
import { useEffect } from 'react';
import $ from 'jquery';

const ContactInputs = () => {
    useEffect(() => {
        $('[name="msgSend"]').on('click', (e) => {
            $(this).off();
            e.preventDefault();

            var values = $('#contactform').serialize();
            $.ajax({
                method: 'POST',
                url: 'https://localhost:7197/api/Contact/add',
                data: values,
                success: function () {
                    window.location.href = "https://localhost:44465/contact-us";
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    });

    return (
        <form id="contactform" method="post" className="contact-right">
            <div id="write">
                <h2>Write us!</h2>

                <input name="name" type="text" placeholder="Name and Surname" />
                <input name="email" type="email" placeholder="E-mail" />
                <input name="title" type="text" placeholder="Title" />

            </div>
            <div className="write2">

                <textarea name="message" placeholder="Message"></textarea>
                <button name="msgSend">Send</button>

            </div>
        </form>
    );
}

export default ContactInputs;