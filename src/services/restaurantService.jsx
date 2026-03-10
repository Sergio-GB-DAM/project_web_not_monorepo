// Obtener todos los restaurantes
export const getAllRestaurants = async (token) => {
    const res = await fetch("http://localhost:8080/project/restaurant", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al recoger los rstaurantes"
    };

    return res.json();
}


// Obtener restaurante por ID
export const getRestaurantById = async (id, token) => {
    const res = await fetch(`http://localhost:8080/project/restaurant/id/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al recoger el restaurante"
    };

    return res.json();
}


// Crear nuevo restaurante con imagen
export const createRestaurant = async (restaurant, file, token) => {
    const formData = new FormData();

    formData.append("name", restaurant.name);
    formData.append("location", restaurant.location);
    if (file) formData.append("image", file);

    const res = await fetch("http://localhost:8080/project/restaurant", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },

        body: formData
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al crear el restaurante"
    };

    return res.json();
};


// Actualizar restaurante existente
export const updateRestaurant = async (id, restaurant, token) => {
    const res = await fetch(`http://localhost:8080/project/restaurant/id/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(restaurant)
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al actualizar el restaurante"
    };

    return res.json();
};


// Eliminar restaurante
export const deleteRestaurant = async (id, token) => {
    const res = await fetch(`http://localhost:8080/project/restaurant/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    
    if (!res.ok) throw {
        status: res.status,
        message: "Error al eliminar el restaurante"
    };
};
