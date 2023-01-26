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

const fs = require('fs');
class ProductManager {

    path;

    // async #createFileIfNeeded(path) {
    //     if (!(fs.existsSync(path))) {
    //         await fs.promises.writeFile(path, '[]');
    //     };
    // };

    constructor(path) {
        this.path = path;
        // this.#createFileIfNeeded(path);
    };

    async getProducts() {
        const productosJSON = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productosJSON);
        return products;
    };

    async #generateId() {
        let products = await this.getProducts();
        if (Object.keys(products).length == 0) {
            return 1;
        } else {
            let ids = [];
            for (const product of products) {
                for (const prop in product) {
                    if (prop == "id") {
                        ids.push(product[prop]);
                    };
                };
            };
            return Math.max(...ids) + 1;
        };
    };

    async addProduct(newProductWithoutId) {
        const newProduct = newProductWithoutId;
        newProduct.id = await this.#generateId();
        let products = await this.getProducts();
        products.push(newProduct);
        const productsJSON = JSON.stringify(products);
        await fs.promises.writeFile(this.path, productsJSON);
    };

    async getProductById(idToSearch) {
            const products = await this.getProducts();
            const searchingResult = products.find(product => product.id == idToSearch);
            if (searchingResult) {
                console.log(searchingResult);
            } else {
                console.log(`No existe ningún producto con el ID ${idToSearch}.`);
            }; 
    };

    async deleteProduct(idToSearch) {
        const products = await this.getProducts();
        const searchingResult = products.find(product => product.id == idToSearch);
        if (searchingResult) {
            let productsAfterDelete = [];
            for (const product of products) {
                if (product.id != idToSearch) {
                    productsAfterDelete.push(product);
                };
            };
            const productsJSON = JSON.stringify(productsAfterDelete);
            await fs.promises.writeFile(this.path, productsJSON)
        } else {
            console.log(`No existe ningún producto con el ID ${idToSearch}.`);
        };
    };

    async updateProduct(idToSearch, fieldToUpdate, newValue) {
        let products = await this.getProducts();
        const productToUpdate = products.find(product => product.id == idToSearch);
        if (productToUpdate) {
            const validProperty = productToUpdate.hasOwnProperty(fieldToUpdate);
            if( validProperty ) {
                const productUpdated = productToUpdate;
                productUpdated[fieldToUpdate] = newValue;
                const indexSearchedProduct = products.map(product => product.id).indexOf(idToSearch);
                products.splice(indexSearchedProduct,1,productUpdated);
                const productsJSON = JSON.stringify(products);
                await fs.promises.writeFile(this.path, productsJSON);

            } else if ( fieldToUpdate == "entireProduct" ) {
                const productUpdated = newValue;
                productUpdated.id = productToUpdate["id"];
                const indexSearchedProduct = products.map(product => product.id).indexOf(idToSearch);
                products.splice(indexSearchedProduct,1,productUpdated);
                const productsJSON = JSON.stringify(products);
                await fs.promises.writeFile(this.path, productsJSON);
            } else {
                console.log(`Usted introdujo "${fieldToUpdate}" como campo a modificar, el cual no se trata de una opción válida.
Intente de nuevo con la siguientes opciones: "title", "description", "price", "thumbnail", "code", "stock" o "entireProduct".`)
            };
        } else {
            console.log(`No existe ningún producto con el ID ${idToSearch}.`);
        };
        
    };

};







const main = async () => {

    const product12 = {
        title: "Title 12",
        description: "Description 12",
        price: "Price 12",
        thumbnail: "Thumbnail 12",
        code: "code 12",
        stock: 1200
    };

    const product13 = {
        title: "Title 13",
        description: "Description 13",
        price: "Price 13",
        thumbnail: "Thumbnail 13",
        code: "code 13",
        stock: 1300
    }; 

    // CREO UNA INSTANCIA DE LA CLASE "productManager" LLAMADA "manager"
    let manager = new ProductManager('./products.json');
    // GUARDO EN CONSOLA UN REGISTRO DE COMO ES INICIALMENTE "products.json"
    console.log("FILE INICIAL");
    console.log(await manager.getProducts());
    // AÑADO UN PRODUCTO AL ARCHIVO "products.json" ASIGNÁNDOLE UN id AUTOMÁTICAMENTE
    await manager.addProduct(product12);
    // VEAMOS COMO QUEDA
    console.log("FILE LUEGO DE AÑADIRLE UN NUEVO PRODUCTO");
    console.log(await manager.getProducts());
    // MUESTRO EN CONSOLA EL PRODUCTO CON id=3
    console.log("PRODUCTO DENTRO DEL FILE CON ID=3");
    await manager.getProductById(3);
    // id QUE NO ESTÁ EN "products.json"
    console.log("BUSCO UN id QUE NO EXISTE");
    await manager.updateProduct(50,"x","hola");
    // id CORRECTO, PROP DEL OBJETO INCORRECTA
    console.log("PROPIEDAD INCORRECTA");
    await manager.updateProduct(3,"x","hola");
    // ACTUALIZACIÓN CORRECTA DEL PRODUCTO CON id=3
    await manager.updateProduct(3,"title","Cambie este título");
    // EL PRODUCTO CON id=2 LO CAMBIO POR UNO NUEVO (product13) MANTENIENDO EL id
    await manager.updateProduct(2,"entireProduct",product13);
    // BORRO EL PRODUCTO DE id=1;
    await manager.deleteProduct(1);
    // PUEDE VERIFICAR LOS PASOS ANTERIORES YENDO A "products.json" O BIEN A TRAVÉS DEL REGISTRO QUE DEJARÉ EN CONSOLA A CONTINUACIÓN
    console.log("BORRE PRODUCTO id=1 - AL PRODUCTO id=3 LE CAMBIO LA PROPIEDAD 'title' - AL PRODUCTO id=2 LO REEMPLAZO POR UNO NUEVO, PERO CONSERVO EL id");
    console.log(await manager.getProducts());
};

main();


