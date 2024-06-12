class InicializacionVentas{
    fecha:string;
    prediccionVentas:string;
    ventas:Venta[]=new Array();
    
    constructor(fechaInput:string,prediccionVentasInput:string){
        this.fecha=fechaInput;
        this.prediccionVentas=prediccionVentasInput;
    }
    
    addVenta(venta:Venta):void{
        this.ventas.push(venta);
    }
}