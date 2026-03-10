import { Link } from "react-router-dom";
import { deleteProduct } from "../services/productService";
import { useAuth } from "../context/authContext";
import { useAlert } from "../hooks/useAlert";

const Product = ({ id, img, name, price, type, onDelete }) => {
    const { token } = useAuth();
    const { alert, confirm } = useAlert();

    const getTypeLabel = () => {
        if (type == "DishDAO") return "🍽️ Plato";
        if (type == "DrinkDAO") return "🥤 Bebida";
        return "🥖 Complemento";
    };

    const handleDelete = async () => {
        const confirmed = await confirm("¿Seguro que quieres eliminar este producto?");
        if (!confirmed) return;

        try {
            await deleteProduct(id, token);
            onDelete(id);
            alert("✅ Producto eliminado correctamente.")

        } catch (error) {
            alert("❌ " + error.message);
        }
    };


    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 product-card">
            {/* Papelera flotante */}
            <button className="btn delete-btn btn-danger btn-sm position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }} onClick={handleDelete}>
                <i className="bi bi-trash"></i>
            </button>

            {/* Imagen */}
            <div className="position-relative">

                {img ? (
                    <img src={"http://localhost:8080" + img} alt={name} className="card-img-top bg-dark rounded-top-4 product-img"/>
                ) : (
                    <div className="card-img-top d-flex align-items-center justify-content-center bg-dark text-secondary product-img">
                        <span>Sin imagen</span>
                    </div>
                )}

                {/* Badge tipo */}
                <span className="badge bg-dark position-relative m-2">{getTypeLabel()}</span>
            </div>

            {/* Cuerpo */}
            <div className="card-body d-flex flex-column">
                <h3 className="fw-semibold mb-2 text-truncate">{name}</h3>
                <p className="mb-3 text-success fw-bold fs-5">{price ? price.toFixed(2) : 0.00} €</p>

                {/* Botón */}
                <Link to={`/product/${id}`} className="btn btn-outline-primary btn-sm mt-auto rounded-pill">Ver detalles →</Link>
            </div>
        </div>
    );
};

export default Product;
