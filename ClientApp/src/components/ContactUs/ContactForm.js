import './ContactForm.css';
import ContactTitle from './ContactTitle';
import ContactInputs from './ContactInputs';
import ContactMap from './ContactMap';

const ContactForm = () => {
    return (
        <div className="contact-head">
            <div className="contact-main">

                <ContactTitle />
                <ContactInputs />


            </div>

            <ContactMap />

        </div>
    );
}

export default ContactForm;