import './Modal.css';
const Modal = ({ setOpenModal }) => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Insert:</h1>
                </div>
                <form>
                    <div className="container">
                        <div className="left">
                            <div>
                                <p>Image link:</p>
                                <input className="userInputs" type="text" name="imageLink" />
                            </div>
                            <div>
                                <p>Title:</p>
                                <input className="userInputs" type="text" name="title" />
                            </div>
                            <div>
                                <p>Duration:</p>
                                <input className="userInputs" type="text" name="duration" />
                            </div>
                        </div>
                        <div className="right">
                            <div>
                                <p>Rating:</p>
                                <input className="userInputs" type="number" step="0.01" min="0" max="10" name="rating" />
                            </div>
                            <div>
                                <p>Director:</p>
                                <input className="userInputs" type="text" name="director" />
                            </div>
                            <div>
                                <p>Trailer id:</p>
                                <input className="userInputs" type="text" name="trailerId" />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="footer">
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;