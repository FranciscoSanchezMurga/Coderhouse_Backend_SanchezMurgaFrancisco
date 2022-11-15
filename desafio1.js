/*

Formato: Un documento de texto con nombre de archivo “ApellidoNombre” con que cumpla la siguiente consigna.
---
>> Consigna: 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:
    getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
    addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
    countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
    addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.

4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

>> Ejemplos:

countMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato'] usuario.countMascotas() debería devolver 2.

getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}] usuario.getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].

getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk' usuario.getFullName() deberia devolver 'Elon Musk'

*/

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    };

    addMascota(nombreMascota) {
        (this.mascotas).push(nombreMascota);
    };

    countMascotas() {
        let i = 0;
        (this.mascotas).forEach( ()=> i += 1 )
        return i;
    };

    addBook(nombreLibro, autor) {
        (this.libros).push({nombre: nombreLibro, autor: autor});
    };

    getBookNames() {
        let nombreLibros = [];
        (this.libros).forEach( libro => {
            nombreLibros.push(libro.nombre);
        });
        return nombreLibros;
    };
};

const nombre = 'Francisco';
const apellido = 'Sánchez Murga';
const libros = [{nombre: 'Soy Roca',autor: 'Felix Luna'},{nombre: 'La riqueza de las naciones',autor: 'Adam Smith'}];
const mascotas = ['Perro','Gato','Loro'];

const usuario = new Usuario(nombre,apellido,libros,mascotas);
console.log('Nombre completo del usuario (string):')
console.log(usuario.getFullName()); 
console.log('Mascotas que el usuario tiene inicialmente (number):')
console.log(usuario.countMascotas()); 
console.log('Agrego string "hamster".')
usuario.addMascota('hamster');
console.log('Nueva cantidad de mascotas del usuario (number):');
console.log(usuario.countMascotas());
console.log('Nombres de los libros(array):');
console.log(usuario.getBookNames());
console.log('Agrego un nuevo libro (objeto) con 2 string como parámetros.')
usuario.addBook('Deuda soberana','Alejandro Olmos Gaona');
console.log('Nombre de los libros tras agregar uno nuevo (array):');
console.log(usuario.getBookNames());


