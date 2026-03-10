import { useState } from "react";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-container">

      {/* Menú */}
      {open && (
        <div className="floating-menu shadow-lg">
          <Link to="/new-product" className="dropdown-item" onClick={() => setOpen(false)}>🧾 Nuevo producto</Link>
          <Link to="/new-restaurant" className="dropdown-item" onClick={() => setOpen(false)}>🏪 Nuevo restaurante</Link>
        </div>
      )}

      {/* Botón + */}
      <button className="floating-btn" onClick={() => setOpen(!open)}>+</button>
    </div>
  );
};

export default FloatingButton;
