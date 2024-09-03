function saludo() {
    let nombre;
    do {
        nombre = prompt("Ingrese su nombre:");
        if (!nombre) {
            alert("El nombre no puede estar vacío. Por favor, ingrese su nombre.");
        }
    } while (!nombre);
    alert("Bienvenido/a a la tienda bostera: " + nombre);
}
saludo();
let talles = ["S", "M", "L", "XL"];
class ArticulosDeCompra {
    constructor(indumentaria, categoria, talles, precio) {
        this.indumentaria = indumentaria;
        this.categoria = categoria;
        this.talles = talles;
        this.precio = precio;
    }    
    mostrarTalles() {
        return this.talles.join(", ");
    }
}
const articulosDisponibles = {
    remeras: [
        new ArticulosDeCompra("Remera", "Titular", talles, 50000),
        new ArticulosDeCompra("Remera", "Suplente", talles, 35000)
    ],
    camperas: [
        new ArticulosDeCompra("Campera", "CamperaRompeViento", talles, 80000),
        new ArticulosDeCompra("Campera", "Camperon", talles, 120000)
    ],
    shorts: [
        new ArticulosDeCompra("Shorts", "ShortTitular", talles, 15000),
        new ArticulosDeCompra("Shorts", "ShortSuplente", talles, 10000)
    ]
};
class Compra {
    constructor(medioPago, nombre, apellido, dni, email) {
        this.medioPago = medioPago;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
    }
}
function mostrarTallesParaArticulo(articulo) {
    let talleSeleccionado = prompt("Elige el talle:\n" + articulo.mostrarTalles());
    if (articulo.talles.includes(talleSeleccionado)) {
        alert("Has elegido el talle " + talleSeleccionado + " para " + articulo.indumentaria + " " + articulo.categoria + ".\nPrecio: $" + articulo.precio + " " + "S/IVA");
        carrito.push(articulo);
        agregarOtroArticulo();
    } else {
        alert("Talle inválido. Por favor, elige un talle válido.");
        mostrarTallesParaArticulo(articulo);
    }
}
function solicitarDato(mensaje) {
    let dato;
    do {
        dato = prompt(mensaje);
        if (!dato) {
            alert("Este campo no puede estar vacío. Por favor, ingrese un valor.");
        }
    } while (!dato);
    return dato;
}
function confirmarCompra() {
    const iva = 0.21;
    let total = carrito.reduce((sum, articulo) => sum + articulo.precio, 0);
    let totalConIva = total * (1 + iva);    
    alert(`El total con IVA es: $${totalConIva.toFixed(2)}\n\nDetalles de la compra:`);    
    let mediosPago = ['Transferencia', 'Tarjeta de débito/crédito'];
    let medioPago = solicitarDato(`Selecciona el medio de pago:\n1. ${mediosPago[0]}\n2. ${mediosPago[1]}`);   
    while (!['1', '2'].includes(medioPago)) {
        alert("Opción de medio de pago inválida. Por favor, selecciona 1 o 2.");
        medioPago = solicitarDato(`Selecciona el medio de pago:\n1. ${mediosPago[0]}\n2. ${mediosPago[1]}`);
    }    
    let compra = new Compra(medioPago, solicitarDato("Ingrese su nombre:"), solicitarDato("Ingrese su apellido:"), solicitarDato("Ingrese su DNI:"), solicitarDato("Ingrese su email:"));    
    const ahora = new Date();
    const fechaHora = ahora.toLocaleString();    
    alert(`Detalles de la compra:
Nombre: ${compra.nombre}
Apellido: ${compra.apellido}
DNI: ${compra.dni}
Email: ${compra.email}
Medio de Pago: ${mediosPago[compra.medioPago - 1]}
Fecha y Hora: ${fechaHora}`);
    
    alert("Gracias, nos comunicaremos con usted vía email para terminar la operación.");
}
function agregarOtroArticulo() {
    let agregarOtro = confirm("¿Deseas agregar otro artículo a la compra?");
    if (agregarOtro) {
        iniciarCompra();
    } else {
        confirmarCompra();
    }
}
function seleccionarArticulo(categoria, opciones) {
    let seleccion = prompt(`Selecciona una categoría para ${categoria}:\n${opciones.map((op, index) => `${index + 1}. ${op}`).join('\n')}`);
    let index = parseInt(seleccion) - 1;
    if (index >= 0 && index < opciones.length) {
        let articulo = articulosDisponibles[categoria][index];
        alert(`Has elegido ${articulo.indumentaria} ${articulo.categoria}.`);
        mostrarTallesParaArticulo(articulo);
    } else {
        alert("Categoría inválida.");
        iniciarCompra();
    }
}
function iniciarCompra() { 
    alert("Si desea comprar indumentaria relacionada al Club Atlético Boca Juniors, aprete aceptar y verá todos los productos que tenemos para ofrecerle.");

    let seleccion = prompt("Elige lo que deseas: \n1. Remeras \n2. Camperas \n3. Shorts");

    switch (seleccion) {
        case '1':
            seleccionarArticulo('remeras', ['Titular', 'Suplente']);
            break;
        case '2':
            seleccionarArticulo('camperas', ['CamperaRompeViento', 'Camperon']);
            break;
        case '3':
            seleccionarArticulo('shorts', ['ShortTitular', 'ShortSuplente']);
            break;
        default:
            alert("Selección de artículo inválida. Por favor, ingresa un número válido.");
            iniciarCompra();
            break;
    }
}
let carrito = [];
iniciarCompra();
