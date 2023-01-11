class ProductManager {
    constructor() {
        this.products = []
    }
    incrementableId() {
        let idMax = 0
        this.products.forEach(product => {
            if (product.id > idMax) {
                idMax = product.id
            }
        });
        return idMax + 1;
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.existCode(code)) {
            console.log("This product already exists.")
        }
        else {
            if (title && description && price && thumbnail && code && stock) {
                let newProduct = {
                    id: this.incrementableId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                this.products.push(newProduct);
            }
            else {
                console.log("There are missing fields. Complete them and try again.");
            }
        }

    }
    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        let answer = this.findProduct(id)
        if (!this.findProduct(id)) {
            answer = "No registered products."
        }
        return answer ;
    }
    
    //funciones auxiliares
    existCode(code) {
        let exist = this.products.some(product => product.code == code)
        return exist;
    }
    findProduct(id) {
        let searchProduct = this.products.find(product => product.id == id)
        return searchProduct;
    }
    deleteById(id) {
        let removeItem = this.findProduct(id);
        let index = this.products.indexOf(removeItem);
        let deletebyIndex = this.products.splice(index, 1);
        return deletebyIndex;
    }
}
const productManager = new ProductManager()
productManager.addProduct("Test", "test", 12000, "test", "AB125", 5);
productManager.addProduct("Test1", "Test1", 15000, "AB125", 5);
productManager.addProduct("Test1", "Test1", 15000, "AB128", 5);
console.log(productManager.getProducts())
productManager.deleteById(2)
productManager.addProduct("Monitor", "Monitor Led", 2000, "imagen", "AB129", 5);
productManager.addProduct("Placa de Audio", "Placa Premium", 2000, "imagen", "AB130", 5);
console.log(productManager.getProducts())
console.log(productManager.getProductsById(3))
console.log(productManager.getProductsById(4))