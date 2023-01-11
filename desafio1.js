/*

DESAFÍO ENTREGABLE - PROCESO DE TESTING

(Clases con ECMAScript y ECMAScript avanzado)

-Se creará una instancia de la clase “ProductManager”
-Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
-Se llamará al método “addProduct” con los campos:
    title: “producto prueba”
    description:”Este es un producto prueba”
    price:200,
    thumbnail:”Sin imagen”
    code:”abc123”,
    stock:25
-El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
-Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
-Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
-Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

*/
let codes = [];

class ProductManager {
        constructor (title,description,price,thumbnail,code,stock) {
            let previousExistance = this.consultCode(this.code);
            if (previousExistance == false) {
                this.title = title;
                this.description = description;
                this.price = price;
                this.thumbnail = thumbnail;
                this.code = code;
                console.log(codes);
                codes.push(code);
                console.log(codes);
                this.stock = stock;
                this.getProducts();
            } else {
                console.log('ERROR!! Código ya utilizado antes.');
            };         
        };

        getProducts() {
            console.log('Hola');
        };

        consultCode(newCode) {
         codes.forEach( codeStored => {
            if(codeStored == newCode) {
                return true;
            };
         });
        };
};

const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
};

const {title,description,price,thumbnail,code,stock} = product1;

const TestProduct = new ProductManager(title,description,price,thumbnail,code,stock);

const TestProduct2 = new ProductManager(title,description,price,thumbnail,code,stock);

