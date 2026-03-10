const AlertDialog = ({ message, show, setShow }) => {
    return (
        <div
            className={`toast align-items-center bg-dark position-fixed top-0 end-0 m-3 ${show ? "show" : "hide"}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShow(false)}></button>
            </div>
        </div>
    );
};

export default AlertDialog;
