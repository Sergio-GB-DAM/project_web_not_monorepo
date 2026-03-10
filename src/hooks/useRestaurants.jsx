import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export const useRestaurants = () => {
    const { authFetch } = useAuth();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        authFetch("http://localhost:8080/project/restaurant")
            .then(data => { setRestaurants(data); })

            .catch(async err => {

                // Datos locales
                if (err.status == 503) {
                    const localRes = await fetch("/restaurants.json");
                    const localData = await localRes.json();
                    setRestaurants(localData);
                    return;
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

            .finally(() => { setLoading(false); });
            
    }, []);

    const deleteRestaurant = (id) => {
        setRestaurants(prev => prev.filter(r => r.id !== id));
    }

    return { restaurants, loading, deleteRestaurant };
}