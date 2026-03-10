import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const useProducts = () => {
    const { authFetch } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        authFetch("http://localhost:8080/project/product")
            .then(data => { setProducts(data); })

            .catch(async err => {

                // Datos locales
                if (err.status == 503) {
                    const localRes = await fetch("/products.json");
                    const localData = await localRes.json();
                    setProducts(localData);
                    return;
                }
            
                if (err.status == 403) {
                    navigate("/login");
                    return;
                }

                navigate("/error", {
                    state: {
                        status: err.status || 500, 
                        message: err.message || "Error desconocido"
                    }
                });
            })

            .finally(() => { setLoading(false); });
    }, []);

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return { products, loading, deleteProduct };
};
