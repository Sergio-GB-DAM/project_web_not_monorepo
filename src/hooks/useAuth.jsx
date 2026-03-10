import { useAuth } from "../context/authContext";

export const useAuth = () => {
    const authFetch = async (url, options = {}) => {
        const headers = {
            ...(options.headers || {}),
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        };

        const res = await fetch(url, { ...options, headers });

        if (!res.ok) throw new Error("Error en la petición: " + res.status);
        return res.json();
    };

    return authFetch;
};
