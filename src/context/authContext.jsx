import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

    const loginUser = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const authFetch = async (url, options = {}) => {
        const headers = {...(options.headers || {})};

        if (token) headers["Authorization"] = `Bearer ${token}`;

        try {
            const res = await fetch(url, { ...options, headers });

            if (!res.ok) throw {
                status: res.status,
                message: "Error en la petición"
            };

            return res.json();

        } catch (error) {
            if (!error.status) {
                throw {
                    status: 503,
                    message: "Datos no disponibles."
                };
            }

            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ token, loginUser, logoutUser, authFetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
