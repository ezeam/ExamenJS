let inicializacion: InicializacionVentas;

const validacionesInicializacion = (): boolean => {
    const fechaInput = document.getElementById("fechaInput") as HTMLInputElement;
    const prediccionVentasInput = document.getElementById("prediccionVentasInput") as HTMLInputElement;
    const fechaHoy: string = new Date().toISOString().split('T')[0];

    let erroresFecha: boolean = false;
    let hayErroresVentas: boolean = false;

    const errorFecha = document.getElementById("error-fecha");
    const errorPrediccion = document.getElementById("error-prediccion");

    if (!fechaInput.value) {
        fechaInput.classList.add("is-invalid");        
        if(errorFecha) errorFecha.innerHTML = `No puede haber campos vacíos`;
    }   
    else if (fechaInput.value !== fechaHoy) {  
        fechaInput.classList.add("is-invalid"); 
        if(errorFecha) errorFecha.innerHTML = `La fecha no puede ser diferente a la de hoy`;
    }
    else {
        fechaInput.classList.remove("is-invalid");
        if(errorFecha) errorFecha.innerHTML = '';
        erroresFecha = true;
    };

    if (!prediccionVentasInput.value) {       
        prediccionVentasInput.classList.add("is-invalid");
        if(errorPrediccion) errorPrediccion.innerHTML = `No puede haber campos vacíos`;
    }
    else if (+prediccionVentasInput.value <= 0) {  
        prediccionVentasInput.classList.add("is-invalid");
        if(errorPrediccion) errorPrediccion.innerHTML = `El valor ha de ser superior a 0`;
    }
    else {
        prediccionVentasInput.classList.remove("is-invalid");
        if(errorPrediccion) errorPrediccion.innerHTML = '';
        hayErroresVentas = true;
    };

    return (erroresFecha && hayErroresVentas);
};

function submitInicioVentas(): void {
    const fechaInput = document.getElementById("fechaInput") as HTMLInputElement;
    const prediccionVentasInput = document.getElementById("prediccionVentasInput") as HTMLInputElement;

    if(validacionesInicializacion()) {        
        inicializacion = new InicializacionVentas(fechaInput.value, prediccionVentasInput.value);
        showInicializacion();
        showVentaForm();
    }  
};

function showInicializacion() {
    let fechaOutput = <HTMLInputElement>document.getElementById("fechaOutput");
    let prediccionVentasOutput = <HTMLInputElement>document.getElementById("prediccionVentasOutput");
  
    fechaOutput.innerText = "Fecha: " + inicializacion.fecha;
    prediccionVentasOutput.innerText = "Brand: " + inicializacion.prediccionVentas;
};

const validacionesVentas = (): boolean => {
    let nombreVentaInput = document.getElementById("nombreVentaInput") as HTMLInputElement;
    let cantidadVentaInput = document.getElementById("cantidadVentaInput") as HTMLInputElement;
    let fechaVentaInput = document.getElementById("fechaVentaInput") as HTMLInputElement;
    const fechaHoy:string = new Date().toISOString().split('T')[0];

    let todoBienNombre: boolean = false;
    let todoBienCantidad: boolean = false;
    let todoBienFecha: boolean = false;

    const errorNombre = document.getElementById("error-nombre");
    const errorCantidad = document.getElementById("error-cantidad");
    const errorFechaVentas = document.getElementById("error-fecha-ventas");

    if (!nombreVentaInput.value) {       
        nombreVentaInput.classList.add("is-invalid");
        if(errorNombre) errorNombre.innerHTML = `No puede haber campos vacíos`;
    }
    else {
        nombreVentaInput.classList.remove("is-invalid");
        if(errorNombre) errorNombre.innerHTML = '';
        todoBienNombre = true;
    };
    
    if (!cantidadVentaInput.value) {       
        cantidadVentaInput.classList.add("is-invalid");
        if(errorCantidad) errorCantidad.innerHTML = `No puede haber campos vacíos`;
    }
    else if (+(cantidadVentaInput.value) <= 0) {  
        cantidadVentaInput.classList.add("is-invalid");
        if(errorCantidad) errorCantidad.innerHTML = `El valor ha de ser superior a 0`;
    }
    else {
        cantidadVentaInput.classList.remove("is-invalid");
        if(errorCantidad) errorCantidad.innerHTML = '';
        todoBienCantidad = true;
    };

    if (!fechaVentaInput.value) {
        fechaVentaInput.classList.add("is-invalid");        
        if(errorFechaVentas) errorFechaVentas.innerHTML = `No puede haber campos vacíos`;
    }   
    else if (fechaVentaInput.value.split("T")[0] !== fechaHoy) {  
        fechaVentaInput.classList.add("is-invalid"); 
        if(errorFechaVentas) errorFechaVentas.innerHTML = `La fecha no puede ser diferente a la de hoy`;
    }
    else {
        fechaVentaInput.classList.remove("is-invalid");
        if(errorFechaVentas) errorFechaVentas.innerHTML = '';
        todoBienFecha = true;
    };

    return (todoBienNombre && todoBienCantidad && todoBienFecha);
};

const checkSuperarPrediccion = (): void => {
    if( inicializacion.ventas.length > +inicializacion.prediccionVentas) {
        const resumen = <HTMLInputElement>document.getElementById("resumen-ventas"); 
        resumen.innerHTML = 
            `!Se ha superado el nº de ventas! 
            ventas: ${inicializacion.ventas.length} \n
            predicción: ${inicializacion.prediccionVentas}`;
        }  
};

function submitVentaForm(): void {     
    let nombreInput = <HTMLInputElement>document.getElementById("nombreVentaInput");
    let cantidadInput = <HTMLInputElement>document.getElementById("cantidadVentaInput");
    let fechaVentaInput = <HTMLInputElement>document.getElementById("fechaVentaInput");
    
    if(validacionesVentas()) {
        let ventaGenerica: Venta = new Venta(nombreInput.value, Number(cantidadInput.value), fechaVentaInput.value);
        inicializacion.addVenta(ventaGenerica);  
        showVentas();
        checkSuperarPrediccion();
    }
};

function showVentas():void {
    let ventaTitle = <HTMLInputElement>document.getElementById("ventaTitle"); 
    ventaTitle.innerHTML = "Ventas:";

    const ventasContainer = <HTMLInputElement>document.getElementById("ventas"); 
    ventasContainer.innerHTML = "";
   
    inicializacion.ventas.forEach((venta) => {
        const ventaPintada = document.createElement("div");
        ventaPintada.innerHTML = `Nombre: ${venta.nombre} - Cantidad: ${venta.cantidad} - Fecha: ${venta.fechaCompra}`;
        const ventasElement = document.getElementById("ventas");
        if (ventasElement) ventasElement.appendChild(ventaPintada); 
    });
};

function showVentaForm():void {
    let inicializacionForm = <HTMLInputElement>document.getElementById("create-inicializacion-form");
    let ventasForm = <HTMLInputElement>document.getElementById("create-ventas-form");
    inicializacionForm.style.display = "none";
    ventasForm.style.display = "block";
};
