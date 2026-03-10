import { useState } from "react";
import { useEffect } from "react";
import Product from "../../elements/product.jsx";
import Filters from "./filters.jsx";
import { useProducts } from "../../hooks/useProducts.jsx";
import Loader from "../../elements/common/loader.jsx";
import SearchBar from "../../elements/common/searchBar.jsx";

const AllProducts = () => {
    const { products, loading, deleteProduct } = useProducts();

    // Filtros
    const [filters, setFilters] = useState({
        productType: [],
        priceRange: []
    });

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        let result = [...products];

        // Filtrar por tipo
        if (filters.productType.length > 0)  result = result.filter(p => filters.productType.includes(p.dtype));

        // Filtrar por precio
        if (filters.priceRange.length > 0) {
            result = result.filter(p => {
                return filters.priceRange.some(range => {
                    if (range === "lowPrice") return p.price >= 0 && p.price <= 10;
                    if (range === "midPrice") return p.price > 10 && p.price <= 30;
                    if (range === "highPrice") return p.price > 30;
                    return true;
                });
            });
        }

        if (search.trim() !== "") {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredProducts(result);

    }, [filters, products, search]);


    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;

        setFilters(prev => {
            const updated = { ...prev };

            if (checked) updated[name].push(value);
            else updated[name] = updated[name].filter(v => v !== value);
            return updated;
        });
    };


    return(
        <>            
            {/* Cuando carga */}
            {loading && <Loader />}

            <SearchBar value={search} onChange={setSearch} placeholder="Buscar productos..." />

            <div className="d-flex gap-4 mt-4 me-4" id="allProducts">

                {/* Sidebar filtros */}
                <Filters filters={filters} setFilters={setFilters} handleFilterChange={handleFilterChange} />

                {/* Contenedor productos */}
                <div id="productsContainer">
                    {!loading && filteredProducts.length === 0 ? (
                        <div className="no-products">
                            <p className="text-center fs-3 fw-semibold">No se han encontrado productos.</p>
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product.id}>
                                <Product id={product.id} img={product.image} name={product.name} price={product.price} type={product.dtype} onDelete={deleteProduct} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default AllProducts;