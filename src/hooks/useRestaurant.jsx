import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export const useRestaurant = (id) => {
    const { authFetch } = useAuth();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        authFetch(`http://localhost:8080/project/restaurant/id/${id}`)
            .then(data => { setRestaurant(data); })

            .catch(async err => {

                // Datos locales
                if (err.status == 503) {
                    const localRes = await fetch(`/restaurants.json`);
                    const localData = await localRes.json();

                    const localRestaurant = localData.find(p => Number(p.id) == Number(id));

                    setLoading(false);
                    setRestaurant(localRestaurant);                    

                    return { restaurant, loading };
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
    }, [id]);

    return { restaurant, loading };
}