import $ from 'jquery';
import './HallControlls.css';

const HallControlls = () => {
    return (
        <div className="controlls">
            <div>
                <label>Normal tickets: <span id="ticketNr">0</span></label>
            </div>
            <div>
                <label>VIP Tickets: <span id="vipTicketNr">0</span></label>
            </div>
            <label>Total: <span id="total">0</span> &euro;</label>
        </div>
    );


}

export default HallControlls;