import { useState } from "react";
import { login } from "../../services/authService";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert.jsx";

const Login = () => {
  const { alert, confirm } = useAlert();
  
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(form);
      loginUser(token);
      navigate("/"); 

    } catch (err) {
      alert("❌ " + err.message);
    }
};

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="fw-bold mb-3 text-center">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">Entrar</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
