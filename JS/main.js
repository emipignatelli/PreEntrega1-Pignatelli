
function mostrarFechaActual() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-AR', opciones);
    document.getElementById('fechaActual').textContent = fechaFormateada;
}

document.getElementById('btnSaludo').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value.trim();
    const mensajeBienvenida = nombre ? `Bienvenido/a a la tienda bostera: ${nombre}` : "Por favor, ingresa tu nombre.";
    
    if (nombre) {
        localStorage.setItem('nombreUsuario', nombre);
        document.getElementById('mensajeBienvenida').textContent = mensajeBienvenida;

        document.getElementById('formSaludo').classList.add('hidden');
        document.getElementById('contenidoCompra').classList.remove('hidden');
        cargarArticulos();
    } else {
        mostrarMensaje(mensajeBienvenida);
    }
});

const IVA_RATE = 0.21;

class ArticulosDeCompra {
    constructor(indumentaria, categoria, talles, precio, talleSeleccionado) {
        this.indumentaria = indumentaria;
        this.categoria = categoria;
        this.talles = talles;
        this.precio = precio;
        this.cantidad = 0;
        this.talleSeleccionado = talleSeleccionado;
    }

    calcularPrecioConIVA() {
        return this.precio * (1 + IVA_RATE);
    }
}

let carrito = [];
let articulosDisponibles = [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado).map(articulo => new ArticulosDeCompra(articulo.indumentaria, articulo.categoria, articulo.talles, articulo.precio, articulo.talleSeleccionado));
        mostrarListaCompra();
    }
}

function cargarNombreUsuario() {
    const nombre = localStorage.getItem('nombreUsuario');
    if (nombre) {
        document.getElementById('mensajeBienvenida').textContent = `Bienvenido/a a la tienda bostera: ${nombre}`;
        document.getElementById('formSaludo').classList.add('hidden');
        document.getElementById('contenidoCompra').classList.remove('hidden');
        cargarArticulos();
    }
}

async function cargarArticulos() {
    try {
        const response = await fetch('json/archivos.json');
        const { articulos } = await response.json();
        articulosDisponibles = articulos;
        mostrarProductos(articulosDisponibles);
    } catch (error) {
        console.error('Error al cargar los artículos:', error);
    }
}

function mostrarProductos(articulos) {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    articulos.forEach((articulo, index) => {
        const tallesOptions = articulo.talles.map(talle => `<option value="${talle}">${talle}</option>`).join('');

        const cardHTML = `
            <div class="card">
                <img src="./multimedia/${articulo.imagen}" class="card-img-top" alt="${articulo.indumentaria}">
                <div class="card-body">
                    <h5 class="card-title">${articulo.indumentaria} ${articulo.categoria}</h5>
                    <p class="card-text">Precio: $${articulo.precio} S/IVA</p>
                    <select class="form-select" id="talleSelect${index}">
                        <option value="" disabled selected>Seleccionar talle</option>
                        ${tallesOptions}
                    </select>
                    <button class="btn btn-primary btn-agregar" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
                </div>
            </div>
        `;
        productosDiv.innerHTML += cardHTML;
    });
}

function agregarAlCarrito(index) {
    const articuloActual = articulosDisponibles[index];
    const talleSeleccionado = document.getElementById(`talleSelect${index}`).value;

    if (!talleSeleccionado) {
        mostrarMensaje("Por favor, selecciona un talle.");
        return;
    }

    const articuloEnCarrito = carrito.find(art => art.indumentaria === articuloActual.indumentaria && art.talleSeleccionado === talleSeleccionado);

    if (articuloEnCarrito) {
        articuloEnCarrito.cantidad += 1;
    } else {
        const nuevoArticulo = new ArticulosDeCompra(articuloActual.indumentaria, articuloActual.categoria, articuloActual.talles, articuloActual.precio, talleSeleccionado);
        nuevoArticulo.cantidad = 1;
        carrito.push(nuevoArticulo);
    }

    mostrarListaCompra();
    mostrarMensajeConfirmarArticulo();
    guardarCarrito();
}

function mostrarListaCompra() {
    const listaCompra = document.getElementById('listaCompra');
    listaCompra.innerHTML = '';
    
    carrito.forEach((articulo, index) => {
        const precioConIVA = articulo.calcularPrecioConIVA().toFixed(2);
        listaCompra.innerHTML += `
            <li class="text-center">
                ${articulo.indumentaria} ${articulo.categoria} (Talle: ${articulo.talleSeleccionado}) - Cantidad: ${articulo.cantidad} - Precio: $${articulo.precio} S/IVA - Total: $${(articulo.precio * articulo.cantidad).toFixed(2)} S/IVA - Precio con IVA: $${precioConIVA}
                <button class="btn btn-danger btn-sm" onclick="eliminarArticulo(${index})">Eliminar</button>
            </li>
        `;
    });

    const totalSinIVA = carrito.reduce((sum, articulo) => sum + (articulo.precio * articulo.cantidad), 0);
    const totalConIVA = carrito.reduce((sum, articulo) => sum + (articulo.calcularPrecioConIVA() * articulo.cantidad), 0);
    document.getElementById('mensajeTotal').textContent = `Total: $${totalSinIVA.toFixed(2)} S/IVA - Total con IVA: $${totalConIVA.toFixed(2)}`;
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

    
    document.getElementById('nombreError').textContent = '';
    document.getElementById('apellidoError').textContent = '';
    document.getElementById('dniError').textContent = '';
    document.getElementById('emailError').textContent = '';

    
    document.getElementById('nombreError').classList.add('hidden');
    document.getElementById('apellidoError').classList.add('hidden');
    document.getElementById('dniError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');

    let validacion = true;

    
    validacion = nombreCompleto ? validacion : (document.getElementById('nombreError').textContent = "Por favor, ingresa tu nombre completo.", document.getElementById('nombreError').classList.remove('hidden'), false);
    validacion = apellido ? validacion : (document.getElementById('apellidoError').textContent = "Por favor, ingresa tu apellido.", document.getElementById('apellidoError').classList.remove('hidden'), false);
    validacion = /^\d+$/.test(dni) ? validacion : (document.getElementById('dniError').textContent = "El DNI debe ser un número válido.", document.getElementById('dniError').classList.remove('hidden'), false);
    validacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? validacion : (document.getElementById('emailError').textContent = "El email debe tener un formato válido (por ejemplo, usuario@dominio.com).", document.getElementById('emailError').classList.remove('hidden'), false);

    if (validacion) {
        
        emailjs.send("service_g0ep3ia", "template_z0l8k3g", {
            nombre: nombreCompleto,
            apellido: apellido,
            dni: dni,
            email: email
        })
        .then(() => {
            Swal.fire({
                title: 'Gracias por la compra!',
                text: 'Nos comunicaremos con usted vía email para finalizar la solicitud.',
                icon: 'success',
                timer: 5000,
                showConfirmButton: false
            }).then(() => {
                carrito = [];
                guardarCarrito();
                localStorage.removeItem('nombreUsuario');
                localStorage.removeItem('carrito');

                document.getElementById('formSaludo').classList.remove('hidden');
                document.getElementById('mensajeBienvenida').textContent = '';
                document.getElementById('formularioCompra').classList.add('hidden');
                document.getElementById('contenidoCompra').classList.add('hidden');
                document.getElementById('resumenCompra').classList.add('hidden');
            });
        })
        .catch(error => {
            console.error('Error al enviar el correo:', error);
        });
    }
});

cargarNombreUsuario();
cargarCarrito();
mostrarFechaActual();

window.addEventListener('load', () => {
    if (carrito.length > 0) {
        mostrarMensajeConfirmarArticulo();
    }
});
