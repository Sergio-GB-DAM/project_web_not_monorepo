import { createContext, useContext, useState } from "react";
import AlertDialog from "../elements/common/alertDialog";

// Contexto de notificaciones
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [confirmOptions, setConfirmOptions] = useState(null);

    // Mostrar alert
    const alert = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    // Mostrar confirm
    const confirm = (message) => {
        return new Promise((resolve) => { setConfirmOptions({ message, resolve }); });
    };

    const handleConfirm = (result) => {
        if (confirmOptions) {
            confirmOptions.resolve(result);
            setConfirmOptions(null);
        }
    };

    return (
        <AlertContext.Provider value={{ alert, confirm }}>
            {children}

            {/* Alert Toast */}
            <AlertDialog message={alertMessage} show={showAlert} setShow={setShowAlert}/>

            {/* Confirm Modal */}
            {confirmOptions && (
                <>
                    <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark text-white">
                                <div className="modal-header bg-danger">
                                    <h5 className="modal-title">¿Estás seguro?</h5>
                                    <button type="button" className="btn-close" onClick={() => handleConfirm(false)}></button>
                                </div>

                                <div className="modal-body"><p>{confirmOptions.message}</p></div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => handleConfirm(false)}>Cancelar</button>
                                    <button className="btn btn-primary" onClick={() => handleConfirm(true)}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AlertContext.Provider>
    );
};
