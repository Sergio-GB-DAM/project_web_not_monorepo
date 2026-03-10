import { useRestaurants } from "../../hooks/useRestaurants";
import Restaurant from "../../elements/restaurant";
import Loader from "../../elements/common/loader.jsx";
import { useState, useEffect } from "react";
import SearchBar from "../../elements/common/searchBar.jsx";

const AllRestaurants = () => {
    const { restaurants, loading, deleteRestaurant } = useRestaurants();
    const [search, setSearch] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        let result = [...restaurants];
    
        if (search.trim() !== "") {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredRestaurants(result);
    
    }, [restaurants, search]);
    

    return(
        <>            
            {/* Cuando carga */}
            {loading && <Loader />}

            <SearchBar value={search} onChange={setSearch} placeholder="Buscar restaurantes..." />

            {/* Contenedor restaurantes */}
            {!loading && filteredRestaurants.length === 0 ? (
                <div className="no-restaurants">
                    <p className="text-center fs-3 fw-semibold">No se han encontrado restaurantes.</p>
                </div>
            ) : (
                <div id="restaurantsContainer" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 m-2">
                    {filteredRestaurants.map(restaurant => (
                        <div key={restaurant.id}>
                            <Restaurant id={restaurant.id} img={restaurant.image} name={restaurant.name} location={restaurant.location} onDelete={deleteRestaurant} />
                        </div>
                    ))}
                </div>
            )}            
        </>
    );
}

export default AllRestaurants;