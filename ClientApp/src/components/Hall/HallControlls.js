import $ from 'jquery';
import './HallControlls.css';

const HallControlls = () => {
    return (
        <div className="controlls">
            <div>
                <label>Normal tickets: <span id="ticketNr">10</span></label>
            </div>
            <div>
                <label>VIP Tickets: <span id="ticketNr">10</span></label>
            </div>
            <label>Price: €</label>
        </div>
    );


}

export default HallControlls;