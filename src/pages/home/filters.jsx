const Filters = ({ filters, handleFilterChange }) => {
  const priceRanges = [
    { id: "lowPrice", label: "0€ - 10€", min: 0, max: 10 },
    { id: "midPrice", label: "10€ - 30€", min: 10, max: 30 },
    { id: "highPrice", label: "+30€", min: 30 }
  ];

  const productTypes = [
    { id: "dish", label: "Platos" },
    { id: "drink", label: "Bebidas" },
    { id: "complement", label: "Complementos" }
  ];

  return (
    <div id="filters" className="p-4 shadow-sm filters-sidebar">

      {/* Título */}
      <h3 className="fw-bold mb-4">Filtros</h3>

      {/* Tipo de producto */}
      <div className="mb-4">
        <h5 className="fw-semibold mb-3">Tipo de producto</h5>
        
        {productTypes.map(type => (
          <div className="form-check mb-2" key={type.id}>
            <input
              type="checkbox"
              id={type.id}
              name="productType"
              value={type.id}
              className="form-check-input"
              checked={filters.productType.includes(type.id)}
              onChange={handleFilterChange}
            />
            <label htmlFor={type.id} className="form-check-label">{type.label}</label>
          </div>
        ))}
      </div>

      {/* Precio */}
      <div className="mb-4">
        <h5 className="fw-semibold mb-3">Precio</h5>

        {priceRanges.map(range => (
          <div className="form-check mb-2" key={range.id}>
            <input
              type="checkbox"
              id={range.id}
              name="priceRange"
              value={range.id}
              className="form-check-input"
              checked={filters.priceRange.includes(range.id)}
              onChange={handleFilterChange}
            />
            <label htmlFor={range.id} className="form-check-label">{range.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;