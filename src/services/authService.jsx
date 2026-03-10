// Para iniciar sesión
export const login = async (credentials) => {
    const res = await fetch("http://localhost:8080/project/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    if (!res.ok) throw new Error("Credenciales incorrectas");

    const token = await res.text();
    localStorage.setItem("token", token);

    return token;
};

// Para crear una cuenta
export const signup = async (data) => {
    const res = await fetch("http://localhost:8080/project/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al registrarse");
    return res.json();
};
