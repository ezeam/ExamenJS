"use strict";
var InicializacionVentas = /** @class */ (function () {
    function InicializacionVentas(fechaInput, prediccionVentasInput) {
        this.ventas = new Array();
        this.fecha = fechaInput;
        this.prediccionVentas = prediccionVentasInput;
    }
    InicializacionVentas.prototype.addVenta = function (venta) {
        this.ventas.push(venta);
    };
    return InicializacionVentas;
}());
