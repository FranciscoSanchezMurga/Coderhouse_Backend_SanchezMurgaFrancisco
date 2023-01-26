export class ProductManager {

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