"use strict";
var inicializacion;
var validacionesInicializacion = function () {
    var fechaInput = document.getElementById("fechaInput");
    var prediccionVentasInput = document.getElementById("prediccionVentasInput");
    var fechaHoy = new Date().toISOString().split('T')[0];
    var erroresFecha = false;
    var hayErroresVentas = false;
    var errorFecha = document.getElementById("error-fecha");
    var errorPrediccion = document.getElementById("error-prediccion");
    if (!fechaInput.value) {
        fechaInput.classList.add("is-invalid");
        if (errorFecha)
            errorFecha.innerHTML = "No puede haber campos vac\u00EDos";
    }
    else if (fechaInput.value !== fechaHoy) {
        fechaInput.classList.add("is-invalid");
        if (errorFecha)
            errorFecha.innerHTML = "La fecha no puede ser diferente a la de hoy";
    }
    else {
        fechaInput.classList.remove("is-invalid");
        if (errorFecha)
            errorFecha.innerHTML = '';
        erroresFecha = true;
    }
    ;
    if (!prediccionVentasInput.value) {
        prediccionVentasInput.classList.add("is-invalid");
        if (errorPrediccion)
            errorPrediccion.innerHTML = "No puede haber campos vac\u00EDos";
    }
    else if (+prediccionVentasInput.value <= 0) {
        prediccionVentasInput.classList.add("is-invalid");
        if (errorPrediccion)
            errorPrediccion.innerHTML = "El valor ha de ser superior a 0";
    }
    else {
        prediccionVentasInput.classList.remove("is-invalid");
        if (errorPrediccion)
            errorPrediccion.innerHTML = '';
        hayErroresVentas = true;
    }
    ;
    return (erroresFecha && hayErroresVentas);
};
function submitInicioVentas() {
    var fechaInput = document.getElementById("fechaInput");
    var prediccionVentasInput = document.getElementById("prediccionVentasInput");
    if (validacionesInicializacion()) {
        inicializacion = new InicializacionVentas(fechaInput.value, prediccionVentasInput.value);
        showInicializacion();
        showVentaForm();
    }
}
;
function showInicializacion() {
    var fechaOutput = document.getElementById("fechaOutput");
    var prediccionVentasOutput = document.getElementById("prediccionVentasOutput");
    fechaOutput.innerText = "Fecha: " + inicializacion.fecha;
    prediccionVentasOutput.innerText = "Brand: " + inicializacion.prediccionVentas;
}
;
var validacionesVentas = function () {
    var nombreVentaInput = document.getElementById("nombreVentaInput");
    var cantidadVentaInput = document.getElementById("cantidadVentaInput");
    var fechaVentaInput = document.getElementById("fechaVentaInput");
    var fechaHoy = new Date().toISOString().split('T')[0];
    var todoBienNombre = false;
    var todoBienCantidad = false;
    var todoBienFecha = false;
    var errorNombre = document.getElementById("error-nombre");
    var errorCantidad = document.getElementById("error-cantidad");
    var errorFechaVentas = document.getElementById("error-fecha-ventas");
    if (!nombreVentaInput.value) {
        nombreVentaInput.classList.add("is-invalid");
        if (errorNombre)
            errorNombre.innerHTML = "No puede haber campos vac\u00EDos";
    }
    else {
        nombreVentaInput.classList.remove("is-invalid");
        if (errorNombre)
            errorNombre.innerHTML = '';
        todoBienNombre = true;
    }
    ;
    if (!cantidadVentaInput.value) {
        cantidadVentaInput.classList.add("is-invalid");
        if (errorCantidad)
            errorCantidad.innerHTML = "No puede haber campos vac\u00EDos";
    }
    else if (+(cantidadVentaInput.value) <= 0) {
        cantidadVentaInput.classList.add("is-invalid");
        if (errorCantidad)
            errorCantidad.innerHTML = "El valor ha de ser superior a 0";
    }
    else {
        cantidadVentaInput.classList.remove("is-invalid");
        if (errorCantidad)
            errorCantidad.innerHTML = '';
        todoBienCantidad = true;
    }
    ;
    if (!fechaVentaInput.value) {
        fechaVentaInput.classList.add("is-invalid");
        if (errorFechaVentas)
            errorFechaVentas.innerHTML = "No puede haber campos vac\u00EDos";
    }
    else if (fechaVentaInput.value.split("T")[0] !== fechaHoy) {
        fechaVentaInput.classList.add("is-invalid");
        if (errorFechaVentas)
            errorFechaVentas.innerHTML = "La fecha no puede ser diferente a la de hoy";
    }
    else {
        fechaVentaInput.classList.remove("is-invalid");
        if (errorFechaVentas)
            errorFechaVentas.innerHTML = '';
        todoBienFecha = true;
    }
    ;
    return (todoBienNombre && todoBienCantidad && todoBienFecha);
};
var checkSuperarPrediccion = function () {
    if (inicializacion.ventas.length > +inicializacion.prediccionVentas) {
        var resumen = document.getElementById("resumen-ventas");
        resumen.innerHTML =
            "!Se ha superado el n\u00BA de ventas! \n            ventas: ".concat(inicializacion.ventas.length, " \n\n            predicci\u00F3n: ").concat(inicializacion.prediccionVentas);
    }
};
function submitVentaForm() {
    var nombreInput = document.getElementById("nombreVentaInput");
    var cantidadInput = document.getElementById("cantidadVentaInput");
    var fechaVentaInput = document.getElementById("fechaVentaInput");
    if (validacionesVentas()) {
        var ventaGenerica = new Venta(nombreInput.value, Number(cantidadInput.value), fechaVentaInput.value);
        inicializacion.addVenta(ventaGenerica);
        showVentas();
        checkSuperarPrediccion();
    }
}
;
function showVentas() {
    var ventaTitle = document.getElementById("ventaTitle");
    ventaTitle.innerHTML = "Ventas:";
    var ventasContainer = document.getElementById("ventas");
    ventasContainer.innerHTML = "";
    inicializacion.ventas.forEach(function (venta) {
        var ventaPintada = document.createElement("div");
        ventaPintada.innerHTML = "Nombre: ".concat(venta.nombre, " - Cantidad: ").concat(venta.cantidad, " - Fecha: ").concat(venta.fechaCompra);
        var ventasElement = document.getElementById("ventas");
        if (ventasElement)
            ventasElement.appendChild(ventaPintada);
    });
}
;
function showVentaForm() {
    var inicializacionForm = document.getElementById("create-inicializacion-form");
    var ventasForm = document.getElementById("create-ventas-form");
    inicializacionForm.style.display = "none";
    ventasForm.style.display = "block";
}
;
