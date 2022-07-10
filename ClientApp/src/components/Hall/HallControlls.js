import './HallControlls.css';

const HallControlls = () => {
    return (
        <div className="controlls">
            <div>
                <label>Nr. of tickets: </label>
                <input type="number" min={1} max={10} />
            </div>
            <div>
                <label>VIP Tickets </label>
                <input type="checkbox" />
            </div>
            <label>Price: €</label>
        </div>
    );
}

export default HallControlls;