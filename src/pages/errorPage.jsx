// pages/ErrorPage.jsx
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { status, message } = location.state || {
        status: 500,
        message: "Error inesperado"
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h1 className="display-1 fw-bold">{status}</h1>
            <p className="fs-4">{message}</p>

            <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
};

export default ErrorPage;
