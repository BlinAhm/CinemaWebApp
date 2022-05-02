import { useState } from 'react';
import './Faq.css';
function Faq() {

    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }

    return (
        <div className="accordion">
            <div className="accordion-item">
                {data.map((item, i) => (
                    <div className='item' onClick={() => toggle(i)}>
                        <div className='acordion-link'>
                            <h2>{item.question}</h2>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={selected === i ? 'content show' : 'content'}><p>{item.answer}</p></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
const data = [
    {
        question: 'How do I purchase tickets online?',
        answer: 'Purchasing tickets for sessions online is a simple process that allows you to buy tickets easily and securely using your credit card or Paypal. The process is quick and you can be assured the information you provide will be secure.To purchase tickets for the session you want, display session times by selecting Cinema and/ or Movie or by using Quick Tickets.',
    },
    {
        question: 'When and where do I collect my movie tickets?',
        answer: 'After purchasing your tickets online, you can collect them at any time (even several days in advance) from the cinemas complex you made the booking for. Collect your tickets from the cinema you have booked to attend.Collect your tickets from either a kiosk in cinema or the main counter.When you pick up your tickets, it is important that you use the same card that you made the booking with.It is a good idea to present the booking confirmation page, or booking number.',
    },
    {
        question: 'What methods of payment can I use online?',
        answer: 'We accept the following major credit cards: Visa, Mastercard, AMEX and Diners. As well as the following digital wallet applications: PayPal & MasterPass',
    },
    {
        question: 'If I do not collect my tickets will I still get charged?',
        answer: 'Yes. Your credit card will be charged the full price of the tickets. ',
    },
    {
        question: 'What forms of ID are accepted at the cinema for restricted films?',
        answer: 'Personal ID, Driver license, Passport, Student ID Card',
    }
]


export default Faq;