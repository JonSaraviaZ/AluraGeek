//Importo la función que me permite obtener los productos
import { servicesProducts } from '../services/product-controllers.js';
//Creo las variables que me permitirán manipular los elementos del DOM
const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const icono_trash = document.querySelector("[data-icono]");


function createCard({ name, price, image, id }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="caja_imagen">
            <img class="imagen" src="${image}" alt="Imagen del producto">
        </div>
        <h3 class="nom_producto">${name}</h3>
        <div class="product">
            <p class="caja_valor">$${price}</p>
            <button class="delete-button" data-id="${id}">
                <svg class="icono_basurero" data-icono="icono_trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 6.00022H16V4.33022C15.9765 3.69004 15.7002 3.08528 15.2316 2.64851C14.7629 2.21174 14.1402 1.97861 13.5 2.00022H10.5C9.85976 1.97861 9.23706 2.21174 8.76843 2.64851C8.2998 3.08528 8.02346 3.69004 8 4.33022V6.00022H3C2.73478 6.00022 2.48043 6.10558 2.29289 6.29311C2.10536 6.48065 2 6.735 2 7.00022C2 7.26544 2.10536 7.51979 2.29289 7.70733C2.48043 7.89486 2.73478 8.00022 3 8.00022H4V19.0002C4 19.7959 4.31607 20.5589 4.87868 21.1215C5.44129 21.6842 6.20435 22.0002 7 22.0002H17C17.7957 22.0002 18.5587 21.6842 19.1213 21.1215C19.6839 20.5589 20 19.7959 20 19.0002V8.00022H21C21.2652 8.00022 21.5196 7.89486 21.7071 7.70733C21.8946 7.51979 22 7.26544 22 7.00022C22 6.735 21.8946 6.48065 21.7071 6.29311C21.5196 6.10558 21.2652 6.00022 21 6.00022ZM10 16.0002C10 16.2654 9.89464 16.5198 9.70711 16.7073C9.51957 16.8949 9.26522 17.0002 9 17.0002C8.73479 17.0002 8.48043 16.8949 8.29289 16.7073C8.10536 16.5198 8 16.2654 8 16.0002V12.0002C8 11.735 8.10536 11.4806 8.29289 11.2931C8.48043 11.1056 8.73479 11.0002 9 11.0002C9.26522 11.0002 9.51957 11.1056 9.70711 11.2931C9.89464 11.4806 10 11.735 10 12.0002V16.0002ZM10 4.33022C10 4.17022 10.21 4.00022 10.5 4.00022H13.5C13.79 4.00022 14 4.17022 14 4.33022V6.00022H10V4.33022ZM16 16.0002C16 16.2654 15.8946 16.5198 15.7071 16.7073C15.5196 16.8949 15.2652 17.0002 15 17.0002C14.7348 17.0002 14.4804 16.8949 14.2929 16.7073C14.1054 16.5198 14 16.2654 14 16.0002V12.0002C14 11.735 14.1054 11.4806 14.2929 11.2931C14.4804 11.1056 14.7348 11.0002 15 11.0002C15.2652 11.0002 15.5196 11.1056 15.7071 11.2931C15.8946 11.4806 16 11.735 16 12.0002V16.0002Z" fill="white"/>
                </svg>
            </button>
        </div>
    `;

    // Añade evento de eliminación
    const deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', async () => {
        try {
            await servicesProducts.deleteProduct(id); // Llama al método DELETE
            card.remove(); // Elimina la tarjeta del DOM
        } catch (error) {
            console.error('Error al eliminar el producto: ', error);
        }
    });

    return card;
}


const renderProducts = async () => { //se define la función asíncrona renderProducts en donde se renderizará los productos
    try{
        const listProducts = await servicesProducts.productList(); //se obtienen los productos a través de la función productList
        listProducts.forEach(product => { //se recorre el array de productos y los renderiza en la pantalla
            const productCard = createCard(product); //se crea una card por cada producto
            productContainer.appendChild(productCard); //se añade la card al contenedor de productos al utilizar appendChild (agregando como hijo)
        });
    } catch(error){
        console.log(error);
    }
};


form.addEventListener("submit", async (event) => { //se añade un evento al formulario
    event.preventDefault(); //se previene la acción por defecto del formulario

    const name = document.querySelector("[data-name]").value; //se obtiene el valor del input con el nombre del producto
    const  price = document.querySelector("[data-price]").value; //se obtiene el valor del input con el precio del producto
    const image = document.querySelector("[data-image]").value; //se obtiene el valor del input con la imagen del producto

    console.log("Valores capturados:");
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Image:", image);

    try{
        const newProduct = await servicesProducts.createProduct(name, price, image); //se crea un nuevo producto a través de la función createProduct
        const newCard = createCard(newProduct); //se crea una card con el nuevo producto
        productContainer.appendChild(newCard); //se añade la card al contenedor de productos
    } catch(error){
        console.log(error);
    }
    
    form.reset(); //se resetea el formulario
});




renderProducts(); //se llama a la función renderProducts para que se rendericen los productos en la pantalla