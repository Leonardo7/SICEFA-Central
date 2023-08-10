async function cargarModuloSucursal()
{
    //AJAX: Asynchronous Java script And Xml
    let respuesta = await fetch('sucursal/sucursal.html');
    let contenido = await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;
    
    import('./sucursal.js')
        .then(obj => {
            cm = obj;
            cm.inicializar();
        }
    );
}

async function cargarModuloProductos()
{
    //AJAXA: Asynchronouns Java Script And Xml
    let respuesta= await fetch('producto/producto.html');
    let contenido= await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;
    
      import( './producto.js')
            .then(obj=> {
            cm=obj;
            cm.inicializar();
        }
    );

}
async function cargarModuloCompra()
{
    //AJAXA: Asynchronouns Java Script And Xml
    let respuesta= await fetch('compra/compra.html');
    let contenido= await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;
    
    import('./compra.js')
        .then(obj => {
            cm = obj;
            cm.inicializar();
        }
    );
}


function cargarLogin()
{
    window.location.replace('../index.html');
}