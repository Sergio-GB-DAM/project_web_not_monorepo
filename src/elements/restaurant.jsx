import { useAuth } from "../context/authContext";
import { deleteRestaurant } from "../services/restaurantService";
import { Link } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";

const Restaurant = ({id, name, location, img, onDelete}) => {
    const { token } = useAuth();
    const { alert, confirm } = useAlert();

    const handleDelete = async () => {
        const confirmed = await confirm("¿Seguro que quieres eliminar este restaurante?");
        if (!confirmed) return;
        
        try {
            await deleteRestaurant(id, token);
            onDelete(id);
            alert("✅ Restaurante eliminado correctamente.")

        } catch (error) {
            alert("❌ " + error.message);
        }
    };

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 restaurant-card">
            {/* Papelera flotante */}
            <button className="btn delete-btn btn-danger btn-sm position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }} onClick={handleDelete}>
                <i className="bi bi-trash"></i>
            </button>

            {/* Imagen */}
            <div className="position-relative">
                {img ? (
                    <img src={"http://localhost:8080" + img} alt={name} className="card-img-top rounded-top-4 bg-dark restaurant-img"/>
                ) : (
                    <div className="card-img-top d-flex align-items-center justify-content-center bg-dark text-secondary restaurant-img">
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>

            {/* Cuerpo */}
            <div className="card-body d-flex flex-column">
                <h3 className="fw-semibold mb-2 text-truncate">{name}</h3>
                <p className="mb-3 text-secondary flex-grow-1">{location ? location : "Ubicación desconocida."}</p>
                

                {/* Botón */}
                <Link to={`/restaurant/${id}`} className="btn btn-outline-primary btn-sm mt-auto rounded-pill">Ver detalles →</Link>
            </div>
        </div>
    );
}

export default Restaurant;