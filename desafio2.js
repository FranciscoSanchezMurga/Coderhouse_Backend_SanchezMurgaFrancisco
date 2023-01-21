/*
CONSIGNA

    Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. 
    Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
    Aspectos a incluir:

        -La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
        -Debe guardar objetos con el siguiente formato:
            -- id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
            -- title (nombre del producto)
            -- description (descripción del producto)
            -- price (precio)
            -- thumbnail (ruta de imagen)
            -- code (código identificador)
            -- stock (número de piezas disponibles)
        -Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo 
        (recuerda siempre guardarlo como un array en el archivo).
        -Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
        -Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto.
        -Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB),
        y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
        -Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

*/

const { createDiffieHellman } = require('crypto');
const fs = require('fs');

class ProductManager {

    path;
    #maxIdUsed;

    constructor(path) {
        this.path = path;
        this.#maxIdUsed = 0;
        this.createFile(path);
    };

    async createFile(path) {
        if ( !(fs.existsSync(path)) ) {
            await fs.promises.writeFile(path,'[]');
        };
    };


    incrementMaxId() {
        console.log(this.#maxIdUsed);
        this.#maxIdUsed++;
        console.log(this.#maxIdUsed);
    };

    assignId(productWithoutId) {
        this.incrementMaxId();
        productWithoutId.id = this.#maxIdUsed;
        return productWithoutId;
    };

    async addProduct(newProductWithoutId) {
        // if( await fs.promises.exists(this.path) ) {

        // } else {
        //     await fs.promises.writeFile(this.path,"[]");
        // };
        let products = await this.getProducts();
        const newProduct = this.assignId(newProductWithoutId);
        products.push(newProduct);
        const productsJSON = JSON.stringify(products);
        await fs.promises.writeFile(this.path, productsJSON);
    };

    async getProducts() {
        const productosJSON = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productosJSON);
        return products;
    };

    async getProductById(idToSearch) {
        const products = await this.getProducts();
        const searchingResult = products.find(product => product.id == idToSearch);
        if (searchingResult) {
            return console.log(searchingResult)
        } else {
            return console.log('No existe ningún producto con el ID introducido.')
        };
    };

};



let manager = new ProductManager('./products.json');

const main = async () => {

    const product1 = {
        title: "Title 01",
        description: "Description 01",
        price: "Price 01",
        thumbnail: "Thumbnail 01",
        code: "code 01",
        stock: 100
    };

    console.log(await manager.getProducts());
    await manager.getProductById(0);
    await manager.getProductById(1);
    await manager.addProduct(product1);
    console.log(await manager.getProducts());
    await manager.getProductById(0);
    await manager.getProductById(1);
    await manager.getProductById('12121CDBC');

};

main();

