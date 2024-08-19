function saludo() {
  let nombre = prompt("Ingrese su nombre");
  alert("Bienvenido/a a la tienda bostera:" + " " + nombre);
}
saludo();

alert(
  "Si desea comprar indumentaria relacionada al Club Atlético Boca Juniors, aprete aceptar y verá todos los productos que tenemos para ofrecerle."
);

function compraArticulos() {
    let producto = prompt("Elegí lo que sea de tu interés \n1: Remeras \n2: Camperas \n3: Shorts \n4: Finalizar");

    if (producto === "1") {
        let remera = prompt("Elegiste remeras. Ahora elegí cuál es la que deseas. \n1: Remera titular \n2: Remera suplente");

        if (remera === "1") {
            alert("Elegiste remera titular");
            let remeraTitular = prompt("Ahora selecciona el talle. \n1: S \n2: M \n3: L \n4: XL");
            switch (remeraTitular) {
                case "1": alert("Talle S"); break;
                case "2": alert("Talle M"); break;
                case "3": alert("Tamaño L"); break;
                case "4": alert("Tamaño XL"); break;
                default: alert("Ese talle no existe"); return;
            }
        } else if (remera === "2") {
            alert("Elegiste remera suplente");
            let remeraSuplente = prompt("Ahora selecciona el talle. \n1: S \n2: M \n3: L \n4: XL");
            switch (remeraSuplente) {
                case "1": alert("Talle S"); break;
                case "2": alert("Talle M"); break;
                case "3": alert("Tamaño L"); break;
                case "4": alert("Tamaño XL"); break;
                default: alert("Ese talle no existe"); return;
            }
        }

        let pagar = prompt("Si deseas comprarla, elegí la forma de pago. \n1: Efectivo (Retiro por tienda) \n2: Transferencia (Envío) \n3: Tarjeta de débito/crédito (Envío)");
        switch (pagar) {
            case "1": alert("Completa tus datos"); break;
            case "2": alert("Completa tus datos"); break;
            case "3": alert("Completa tus datos"); break;
            default: alert("Método de pago inexistente"); return;
        }

        for (let i = 1; i <= 1; i++) {
            let nombre = prompt("Ingresar Nombre");
            let apellido = prompt("Ingresar Apellido");
            let email = prompt("Ingresar email");
            let validacionDatos = "Nombre: " + nombre + " " + "Apellido: " + " " + apellido + " " + "y" + " " + "email:" + " " + email;
            alert("Usted ingresó" + " " + validacionDatos);
        }

        let finalizarCompra = prompt("Si desea finalizar su compra ingrese aceptar, Aceptar o ACEPTAR");
        if (finalizarCompra === "Aceptar" || finalizarCompra === "ACEPTAR" || finalizarCompra === "aceptar") {
            alert("Gracias por su compra, nos comunicaremos con usted vía email para mostrarle el estado de su pedido");
        } else {
            alert("Opción no válida");
        }

    } else if (producto === "2") {
        let camperas = prompt("Elegiste camperas. Ahora elegí cuál es la que deseas. \n1: Campera rompe viento \n2: Camperón");

        if (camperas === "1") {
            alert("Elegiste la campera rompe viento");
            let camperaRompeViento = prompt("Ahora selecciona el talle. \n1: S \n2: M \n3: L \n4: XL");
            switch (camperaRompeViento) {
                case "1": alert("Talle S"); break;
                case "2": alert("Talle M"); break;
                case "3": alert("Tamaño L"); break;
                case "4": alert("Tamaño XL"); break;
                default: alert("Ese talle no existe"); return;
            }
        } else if (camperas === "2") {
            alert("Elegiste el camperón");
            let camperon = prompt("Ahora selecciona el talle. \n1: S \n2: M \n3: L \n4: XL");
            switch (camperon) {
                case "1": alert("Talle S"); break;
                case "2": alert("Talle M"); break;
                case "3": alert("Tamaño L"); break;
                case "4": alert("Tamaño XL"); break;
                default: alert("Ese talle no existe"); return;
            }
        }

        let pagar = prompt("Si deseas comprarla, elegí la forma de pago. \n1: Efectivo (Retiro por tienda) \n2: Transferencia (Envío) \n3: Tarjeta de débito/crédito (Envío)");
        switch (pagar) {
            case "1": alert("Completa tus datos"); break;
            case "2": alert("Completa tus datos"); break;
            case "3": alert("Completa tus datos"); break;
            default: alert("Método de pago inexistente"); return;
        }

        for (let i = 1; i <= 1; i++) {
            let nombre = prompt("Ingresar Nombre");
            let apellido = prompt("Ingresar Apellido");
            let email = prompt("Ingresar email");
            let validacionDatos = "Nombre: " + nombre + " " + "Apellido: " + " " + apellido + " " + "y" + " " + "email:" + " " + email;
            alert("Usted ingresó" + " " + validacionDatos);
        }

        let finalizarCompra = prompt("Si desea finalizar su compra ingrese aceptar, Aceptar o ACEPTAR");
        if (finalizarCompra === "Aceptar" || finalizarCompra === "ACEPTAR" || finalizarCompra === "aceptar") {
            alert("Gracias por su compra, nos comunicaremos con usted vía email para mostrarle el estado de su pedido");
        } else {
            alert("Opción no válida");
        }

    } else if (producto === "3") {
        let shorts = prompt("Elegiste shorts. Ahora elegí cuál es el que deseas. \n1: short titular \n2: short suplente.");

        if (shorts === "1") {
            alert("Elegiste el short titular");
            let shortTitular = prompt("Ahora selecciona el talle. \n1: S \n2: M \n3: L \n4: XL");
            switch (shortTitular) {
                case "1": alert("Talle S"); break;
                case "2": alert("Talle M"); break;
                case "3": alert("Tamaño L"); break;
                case "4": alert("Tamaño XL"); break;
                default: alert("Ese talle no existe"); return;
            }
        } else if (shorts === "2") {
            alert("Elegiste el short suplente");
            let shortSuplente = prompt("Ahora selecciona el talle. \n1: S \n2: M \n3: L \n4: XL");
            switch (shortSuplente) {
                case "1": alert("Talle S"); break;
                case "2": alert("Talle M"); break;
                case "3": alert("Tamaño L"); break;
                case "4": alert("Tamaño XL"); break;
                default: alert("Ese talle no existe"); return;
            }
        }

        let pagar = prompt("Si deseas comprarlo, elegí la forma de pago. \n1: Efectivo (Retiro por tienda) \n2: Transferencia (Envío) \n3: Tarjeta de débito/crédito (Envío)");
        switch (pagar) {
            case "1": alert("Completa tus datos"); break;
            case "2": alert("Completa tus datos"); break;
            case "3": alert("Completa tus datos"); break;
            default: alert("Método de pago inexistente"); return;
        }

        for (let i = 1; i <= 1; i++) {
            let nombre = prompt("Ingresar Nombre");
            let apellido = prompt("Ingresar Apellido");
            let email = prompt("Ingresar email");
            let validacionDatos = "Nombre: " + nombre + " " + "Apellido: " + " " + apellido + " " + "y" + " " + "email:" + " " + email;
            alert("Usted ingresó" + " " + validacionDatos);
        }

        let finalizarCompra = prompt("Si desea finalizar su compra ingrese aceptar, Aceptar o ACEPTAR");
        if (finalizarCompra === "Aceptar" || finalizarCompra === "ACEPTAR" || finalizarCompra === "aceptar") {
            alert("Gracias por su compra, nos comunicaremos con usted vía email para mostrarle el estado de su pedido");
        } else {
            alert("Opción no válida");
        }

    } else if (producto === "4") {
        alert("Elegiste finalizar, gracias por visitar nuestro sitio");
    }
}

compraArticulos();

