import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import { createProduct } from "../../services/productService.jsx";
import { useAlert } from "../../hooks/useAlert.jsx";

const NewProduct = () => {
    const navigate = useNavigate();
    const { alert } = useAlert();
    const { token } = useAuth();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        dtype: "dish",
        description: "",
        restaurantId: 10,
        attributes: {
            brand: ""
        }
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
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };


    // Cambio en los atributos dinámicos
    const handleAttributeChange = (e) => {
    setProduct({
        ...product,
        attributes: { ...product.attributes, [e.target.name]: e.target.value }
    });
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct(product, file, token);
            alert("✅ Producto creado correctamente");
            navigate("/");

        } catch (err) {
            alert("❌ Error al crear el producto: " + err.message);
        }
    };

  return (
    <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-4">
            <h2 className="fw-bold mb-4">Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="row g-3">
                {/* Nombre */}
                <div className="col-md-6">
                    <label className="form-label">Nombre *</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-white border-0"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Precio */}
                <div className="col-md-6">
                    <label className="form-label">Precio (€) *</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control bg-dark text-white border-0"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>


                {/* Descripción */}
                <div className="col-md-6">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control bg-dark text-white border-0"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Tipo */}
                <div className="col-md-6">
                <label className="form-label">Tipo</label>
                    <select
                        className="form-select bg-dark text-white border-0"
                        name="dtype"
                        value={product.dtype}
                        onChange={handleChange}
                    >
                        <option value="dish">Plato</option>
                        <option value="drink">Bebida</option>
                        <option value="complement">Complemento</option>
                    </select>
                </div>

                {/* Atributos dinámicos */}
                {product.dtype === "drink" && (
                    <div className="col-md-12">
                        <label className="form-label">Marca</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-0"
                            name="brand"
                            value={product.attributes.brand || ""}
                            onChange={handleAttributeChange}
                        />
                    </div>
                )}

                {/* Imagen */}
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="file"
                    accept="image/*"
                    className="form-control bg-dark text-white border-0"
                    onChange={handleImage} />

                    {preview && <img src={preview} alt="Preview" className="mt-2" style={{maxWidth: "600px", maxHeight: "300px"}} />}
                </div>

                {/* Botones */}
                <div className="col-12 d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-primary px-4">Crear producto</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default NewProduct;
