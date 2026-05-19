// Obtener todos los productos
export const getAllProducts = async (token) => {
    const res = await fetch("http://localhost:8080/project/product", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al recoger los productos"
    };

    return res.json();
}


// Obtener producto por ID
export const getProductById = async (id, token) => {
    const res = await fetch(`http://localhost:8080/project/product/id/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al recoger el producto"
    };

    return res.json();
};


// Crear nuevo producto
export const createProduct = async (product, file, token) => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", Number(product.price));
    formData.append("dtype", product.dtype);
    formData.append("attributes", JSON.stringify(product.attributes || {}));
    formData.append("description", product.description);
    formData.append("restaurantId", Number(product.restaurantId));
    formData.append("allergenIds", JSON.stringify([]));
    if (file) formData.append("image", file);

    const res = await fetch("http://localhost:8080/project/product", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("ERROR BACKEND:", text);

        throw {
            status: res.status,
            message: text
        };
    }

    return res.json();
};


// Actualizar producto existente
export const updateProduct = async (id, product, token) => {
    const res = await fetch(`http://localhost:8080/project/product/id/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al actualizar el producto"
    };

    return res.json();
};


// Eliminar producto
export const deleteProduct = async (id, token) => {
    const res = await fetch(`http://localhost:8080/project/product/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw {
        status: res.status,
        message: "Error al eliminar el producto"
    };
};