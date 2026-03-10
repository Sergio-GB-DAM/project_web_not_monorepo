import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert.jsx";

const SignUp = () => {
  const { alert, confirm } = useAlert();

  const [form, setForm] = useState({
    name: "",
    surname1: "",
    surname2: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({
        ...form,
      });
      alert("✅ Usuario creado");
      navigate("/login");

    } catch (err) {
      alert("❌ Error al registrarse");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4 mx-auto" style={{ maxWidth: "420px" }}>
        <h2 className="fw-bold mb-3 text-center">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control"
            name="surname1"
            placeholder="Primer apellido"
            value={form.surname1}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control"
            name="surname2"
            placeholder="Segundo apellido"
            value={form.surname2}
            onChange={handleChange}
          />

          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
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

          <button className="btn btn-primary w-100">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
