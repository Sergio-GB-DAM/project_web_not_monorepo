import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import { createRestaurant } from "../../services/restaurantService.jsx";
import { useAlert } from "../../hooks/useAlert.jsx";

const newRestaurant = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { alert } = useAlert();

    const [restaurant, setRestaurant] = useState({
        name: "",
        location: "",
        description: "",
        phoneNumber: "",
        email: "",
        accountId: localStorage.getItem("userId") || 1
    });


    // Para mostrar preview de la imagen
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFile(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };


    // Cambio en el formulario
    const handleChange = (e) => {
        setRestaurant({
            ...restaurant,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createRestaurant(restaurant, file, token);
            alert("✅ Restaurante creado correctamente");
            navigate("/restaurants");

        } catch (error) {
            alert("❌ " + error.message);
        }
    };


    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded-4">
                <h2 className="fw-bold mb-4">Crear nuevo restaurante</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-0"
                            id="name"
                            name="name"
                            value={restaurant.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Ubicación</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-0"
                            id="location"
                            name="location"
                            value={restaurant.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-0"
                            id="description"
                            name="description"
                            value={restaurant.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-0"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={restaurant.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control bg-dark text-white border-0"
                            id="email"
                            name="email"
                            value={restaurant.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Imagen</label>
                        <input
                            type="file"
                            className="form-control bg-dark text-white border-0"
                            id="image"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </div>

                    {preview && (
                        <div className="mb-3">
                            <img src={preview} alt="Preview" className="img-fluid rounded" style={{maxWidth: "600px", maxHeight: "300px"}} />
                        </div>
                    )}

                    <div className="col-12 d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-primary px-4">Crear restaurante</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default newRestaurant;