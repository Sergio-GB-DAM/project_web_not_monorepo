import { Link, useParams } from "react-router-dom";
import { useRestaurant } from "../../hooks/useRestaurant";
import Loader from "../../elements/common/loader.jsx";

const RestaurantInfo = () => {
    const { id } = useParams();
    const { restaurant, loading } = useRestaurant(id);

    if (loading) return <Loader />;


    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded-4">
                <div className="row g-4 align-items-center">
                    {/* Imagen */}
                    <div className="col-md-5 text-center">
                        <img 
                            src={"http://localhost:8080" + restaurant.image} 
                            alt="Sin imagen"
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                    </div>

                    {/* Información */}
                    <div className="col-md-7">
                        <h2 className="fw-bold mb-3">{restaurant.name}</h2>
                        <p className="mt-3"><strong>Dirección:</strong> {restaurant.location}</p>

                        <div className="mt-4 d-flex gap-2">
                            <Link to="/restaurants" className="btn btn-outline-primary">← Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantInfo;