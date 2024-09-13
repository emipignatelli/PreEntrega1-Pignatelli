document.getElementById('btnSaludo').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre) {
        localStorage.setItem('nombreUsuario', nombre); 
        document.getElementById('mensajeBienvenida').textContent = `Bienvenido/a a la tienda bostera: ${nombre}`;

        document.getElementById('formSaludo').classList.add('hidden');
        document.getElementById('contenidoCompra').classList.remove('hidden');
        mostrarProductos();
    } else {
        mostrarMensaje("El nombre no puede estar vacío.");
    }
});

const talles = ["S", "M", "L", "XL"];
const IVA_RATE = 0.21; 

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

    calcularPrecioConIVA() {
        return this.precio * (1 + IVA_RATE);
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

let carrito = [];
let articuloActual = null;

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado).map(articulo => new ArticulosDeCompra(articulo.indumentaria, articulo.categoria, articulo.talles, articulo.precio));
        mostrarListaCompra();
    }
}

function cargarNombreUsuario() {
    const nombre = localStorage.getItem('nombreUsuario');
    if (nombre) {
        document.getElementById('mensajeBienvenida').textContent = `Bienvenido/a a la tienda bostera: ${nombre}`;
        document.getElementById('formSaludo').classList.add('hidden');
        document.getElementById('contenidoCompra').classList.remove('hidden');
        mostrarProductos();
    }
}

cargarNombreUsuario();
cargarCarrito();

function mostrarProductos() {
    const categorias = Object.keys(articulosDisponibles);
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    let count = 0;
    categorias.forEach(categoria => {
        articulosDisponibles[categoria].forEach((articulo, index) => {
            if (count < 6) {
                const imagen = [
                    './multimedia/remeraTitular.png', 
                    './multimedia/remeraSuplente.png', 
                    './multimedia/camperaRompeVientos.png', 
                    './multimedia/camperon.webp', 
                    './multimedia/shortsTitular.png', 
                    './multimedia/shortsSuplente.png'
                ][count];
                
                const cardHTML = `
                    <div class="card">
                        <img src="${imagen}" class="card-img-top" alt="${articulo.indumentaria}">
                        <div class="card-body">
                            <h5 class="card-title">${articulo.indumentaria} ${articulo.categoria}</h5>
                            <p class="card-text">Precio: $${articulo.precio} S/IVA</p>
                            <button class="btn btn-primary btn-agregar" onclick="agregarAlCarrito('${categoria}', ${index})">Agregar al carrito</button>
                        </div>
                    </div>
                `;
                productosDiv.innerHTML += cardHTML;
                count++;
            }
        });
    });
}

function agregarAlCarrito(categoria, index) {
    articuloActual = articulosDisponibles[categoria][index];
    
    document.querySelectorAll('.btn-agregar').forEach(btn => btn.classList.remove('btn-agregar-active'));
    document.querySelector(`button[onclick="agregarAlCarrito('${categoria}', ${index})"]`).classList.add('btn-agregar-active');
    
    let tallesContainer = document.getElementById('tallesContainer');
    tallesContainer.innerHTML = `
        <h3>Selecciona el talle:</h3>
        ${articuloActual.talles.map(talle => `<button type="button" class="btn btn-warning" onclick="confirmarTalle('${talle}')">${talle}</button>`).join(' ')}
    `;
    tallesContainer.classList.remove('hidden');
}

function confirmarTalle(talle) {
    if (articuloActual) {
        carrito.push(new ArticulosDeCompra(articuloActual.indumentaria, articuloActual.categoria, [talle], articuloActual.precio));
        articuloActual = null;
        document.getElementById('tallesContainer').classList.add('hidden');
        mostrarListaCompra();
        mostrarMensajeConfirmarArticulo();
        guardarCarrito();
    }
}

function mostrarListaCompra() {
    const listaCompra = document.getElementById('listaCompra');
    listaCompra.innerHTML = '';
    
    carrito.forEach((articulo, index) => {
        const precioConIVA = articulo.calcularPrecioConIVA().toFixed(2);
        listaCompra.innerHTML += `
            <li class="text-center">
                ${articulo.indumentaria} ${articulo.categoria} - ${articulo.talles.join(", ")} - $${articulo.precio} S/IVA - $${precioConIVA} con IVA
                <button class="btn btn-danger btn-sm" onclick="eliminarArticulo(${index})">Eliminar</button>
            </li>
        `;
    });
    
    const totalSinIVA = carrito.reduce((sum, articulo) => sum + articulo.precio, 0);
    const totalConIVA = carrito.reduce((sum, articulo) => sum + articulo.calcularPrecioConIVA(), 0);
    document.getElementById('mensajeTotal').textContent = `Total: $${totalSinIVA.toFixed(2)} S/IVA - $${totalConIVA.toFixed(2)} con IVA`;
    document.getElementById('resumenCompra').classList.remove('hidden');
}

function mostrarMensajeConfirmarArticulo() {
    document.getElementById('mensajeConfirmarArticulo').classList.remove('hidden');
}

function eliminarArticulo(index) {
    carrito.splice(index, 1);
    mostrarListaCompra();
    guardarCarrito();
}

function mostrarMensaje(mensaje) {
    const mensajeElemento = document.getElementById('mensajeCompra');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.classList.remove('hidden');
    setTimeout(() => {
        mensajeElemento.classList.add('hidden');
    }, 3000); 
}

document.getElementById('btnAgregarOtro').addEventListener('click', function() {
    document.getElementById('mensajeConfirmarArticulo').classList.add('hidden');
});

document.getElementById('btnNoAgregar').addEventListener('click', function() {
    document.getElementById('mensajeConfirmarArticulo').classList.add('hidden');
    document.getElementById('medioPagoContainer').classList.remove('hidden');
});

document.getElementById('btnTransferencia').addEventListener('click', function() {
    seleccionarMedioPago('Transferencia');
});

document.getElementById('btnTarjeta').addEventListener('click', function() {
    seleccionarMedioPago('Tarjeta');
});

function seleccionarMedioPago(medio) {
    document.getElementById('medioPagoContainer').classList.add('hidden');
    document.getElementById('formularioCompra').classList.remove('hidden');
    document.getElementById('compraForm').dataset.medioPago = medio;
}

document.getElementById('btnConfirmarCompra').addEventListener('click', function() {
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const email = document.getElementById('email').value.trim();
    const medioPago = document.getElementById('compraForm').dataset.medioPago;


    if (!nombreCompleto || !apellido || !dni || !email || !medioPago) {
        mostrarMensaje("Por favor, completa todos los campos del formulario.");
        return;
    }

    
    const dniValido = /^\d+$/.test(dni); 
    if (!dniValido) {
        mostrarMensaje("El DNI debe ser un número válido.");
        return;
    }

    
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    if (!emailValido) {
        mostrarMensaje("El email debe tener un formato válido (por ejemplo, usuario@dominio.com).");
        return;
    }

    const compra = new Compra(medioPago, nombreCompleto, apellido, dni, email);

    
    const mensajeFinal = document.getElementById('mensajeFinal');
    mensajeFinal.textContent = "Gracias, nos comunicaremos vía email para finalizar su operación.";
    mensajeFinal.classList.remove('hidden');

    
    document.getElementById('formularioCompra').classList.add('hidden');
    document.getElementById('contenidoCompra').classList.add('hidden');
    document.getElementById('resumenCompra').classList.add('hidden');
    carrito = [];
    guardarCarrito();

    
    setTimeout(function() {
        
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('carrito');
        
        document.getElementById('formSaludo').classList.remove('hidden');
        document.getElementById('mensajeBienvenida').textContent = '';
    }, 5000); 
});