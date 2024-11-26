
//Configurando prduct-controllers.js
//Definindo a URL base da API
const BASE_URL = 'https://674393b6b7464b1c2a654064.mockapi.io/products';

//función que hará las adquisiciones de la API

const productList = async () => { //se define la función asíncrona porque se está trabajando con elementos externos
    try { //si está todo bien se ejecutará esta parte del código
        const response = await fetch(BASE_URL); //se hace la petición a la API, buscando la url, y se guarda en la variable response
        const data = await response.json(); //se convierte la respuesta en un objeto JSON y se guarda en la variable data
        return data;
    } catch (error) {
        console.error('Error al listar productos: ', error);
    }
};

const createProduct = async (name, price, image,id) => { //se define la función asíncrona createProduct que recibe los parámetros name, precio e image
    try {
        const response = await fetch(BASE_URL, { //se hace la petición a la API, buscando la url, y se guarda en la variable response
            method: 'POST',
            headers: { //se definen los headers de la petición
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ //se convierte el objeto en un string JSON
                name,
                price,
                image,
                id
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear productos: ', error);
    }
}

// Método para eliminar un producto por ID
const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        alert('Producto eliminado exitosamente');
    } catch (error) {
        console.error('Error al intentar eliminar el producto: ', error);
    }
};


export const servicesProducts ={ //se exporta la función productList para que pueda ser utilizada en otros archivos
    productList,
    createProduct,
    deleteProduct,
};