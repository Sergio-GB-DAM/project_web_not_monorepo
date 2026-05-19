import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useAlert } from "../../hooks/useAlert.jsx";
import Loader from "../../elements/common/loader.jsx";



const ProductInfo = () => {
    const { id } = useParams();
    const { product, loading } = useProduct(id);
    const navigate = useNavigate();
    const { alert } = useAlert();

    if (loading) return <Loader />;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded-4">
                <div className="row g-4 align-items-center">
                    {/* Imagen */}
                    <div className="col-md-5 text-center">
                        <img 
                            src={"http://localhost:8080" + product.image} 
                            alt="Sin imagen" 
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                    </div>

                    {/* Información */}
                    <div className="col-md-7">
                        <h2 className="fw-bold mb-3">{product.name}</h2>

                        <h4 className="text-success mb-3">{product.price.toFixed(2)} €</h4>

                        <span className="badge bg-secondary mb-3">
                            {product.dtype == "dish" ? "🍽️ Plato" :
                                product.dtype == "drink" ? "🥤 Bebida":
                                "🥖 Complemento"}
                        </span>

                        {product.description && (
                            <p className="mb-3">
                                {product.description}
                            </p>
                        )}
                        

                        {product.brand && (
                            <p className="mt-3">
                                {product.brand}
                            </p>
                        )}

                        <div className="mt-4 d-flex gap-2">
                            <Link to="/" className="btn btn-outline-primary">← Volver</Link>
                            <button className="btn btn-primary" onClick={() => {
                                alert("✅ Añadido al pedido");
                                navigate(-1);

                            }}>Añadir al pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
