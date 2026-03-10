import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const useProduct = (id) => {
    const { authFetch } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        authFetch(`http://localhost:8080/project/product/id/${id}`)
            .then(data => { setProduct(data); })

            .catch(async err => {              
                
                // Datos locales
                if (err.status == 503) {
                    const localRes = await fetch(`/products.json`);
                    const localData = await localRes.json();

                    const localProduct = localData.find(p => Number(p.id) == Number(id));

                    setLoading(false);
                    setProduct(localProduct);                    

                    return { product, loading };
                }

                if (err.status === 403) {
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
            
            .finally(() => { setLoading(false);});

    }, [id]);

    return { product, loading };
};
