import './ContactMap.css';

const ContactMap = () => {
    return (
        <div className="map">
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6978.752978453489!2d21.172884003877993!3d42.657028375113775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1639606417359!5m2!1sen!2s" width="600" height="450" style={{ border: 0, }} allowFullScreen="" loading="lazy"></iframe>
        </div>
    );
}

export default ContactMap;