let compras = [
    {
        "id": 1,
        "fechaCompra": "04/08/2023",
        "nombreSucursal": "Sucursal centro",
        "nombreEmpleado": "Juan Pablo",
        "codigoPostal": "10291",
        "ciudad": "Leon",
        "estado": "Guanajuato",
        "total": "20000",
        "estatus": 1
    },
    {
        "id": 2,
        "fechaCompra": "10/08/2023",
        "nombreSucursal": "Sucursal  altacia",
        "nombreEmpleado": "Eduardo",
        "codigoPostal": "37281",
        "ciudad": "Silao",
        "estado": "Guanajuato",
        "total": "79000",
        "estatus": 1
    },
    {
        "id": 3,
        "fechaCompra": "12/07/2023",
        "nombreSucursal": "Sucursal centro",
        "nombreEmpleado": "Ulises Raul",
        "codigoPostal": "09786",
        "ciudad": "Leon",
        "estado": "Guanajuato",
        "total": "25000",
        "estatus": 1
    },
    {
        "id": 4,
        "fechaCompra": "23/12/2022",
        "nombreSucursal": "Sucursal centro",
        "nombreEmpleado": "Ernesto",
        "codigoPostal": "37161",
        "ciudad": "Leon",
        "estado": "Guanajuato",
        "total": "10000",
        "estatus": 1
    },
    {
        "id": 5,
        "fechaCompra": "13/08/2023",
        "nombreSucursal": "Sucursal centro",
        "nombreEmpleado": "Fabian",
        "codigoPostal": "47362",
        "ciudad": "Leon",
        "estado": "Guanajuato",
        "total": "50000",
        "estatus": 1
    }


];

export function inicializar()
{
    fillTableCompra();
    setDetalleCompraVisible(false);
}

//Insert y Update en el mismo metodo:
export function save()
{
    // Declaramos un objeto donde guardaremos los datos de la compra:
    let com = null;
    let posicion = -1; // Para saber si una compra ya existe o no.
    let idCompra = 0;
    
    
    // Revisamos si hay un ID de compra:
    if (document.getElementById("txtIdCompra").value.trim().length > 0)
    {
        idCompra = parseInt(document.getElementById("txtIdCompra").value.trim());
        posicion = buscarPosicionCompraPorId(idCompra);
        
        if (posicion >= 0)
            com = compras[posicion];
        else
        {
            // Si no hay una sucursal con el ID descrito,
            // creamos una nueva instancia del Objeto:
            com = new Object();
            com.id = idCompra;
            
            // Insertamos el objeto emp dentro del arreglo de sucursal:
            compras.push(com);
        }
        
        // Continuamos llenando los datos del objeto:
        com.estatus = document.getElementById("cmbEstatus").value;
        
        // Refrescamos el catalogo de sucursales:
        fillTableCompra();
        
        Swal.fire('Movimiento Realizado', 'Estatus de compra Actualizados correctamente.' , 'success');
    }
}

function fillTableCompra()
{
    //Aqui vamos a ir guardando el contenido del
    //tbody de la tabla de empleados:
    let contenido = '';
    

    
    //Recorremos el arreglo elemento por elemento:
    for (let i = 0; i < compras.length; i++)
    {
    
        contenido += '<tr>' +
                '<td>' + compras[i].id + '</td>' +
                '<td>' + compras[i].fechaCompra + '</td>' +
                '<td>' + compras[i].nombreSucursal + '</td>' +
                '<td>' + compras[i].nombreEmpleado + '</td>' +
                '<td>' + compras[i].estatus + '</td>' +
                '<td>' +
                '<a href="#" class="text-info" onclick="cm.cargarDetalleCompra(' + i + ');"><i class="fa-brands fa-wpforms"></i></a>' +
                '</td>' +
                '</tr>';
    }
    
 
    document.getElementById("tbodyCompra").innerHTML = contenido;
}

export function cargarDetalleCompra(posicion){
    let com = compras[posicion];
    
    document.getElementById("txtIdCompra").value = com.id;
    
    document.getElementById("txtFechCompra").value = com.fechaCompra;
    document.getElementById("txtNombreS").value = com.nombreSucursal;
    document.getElementById("txtNomEmp").value = com.nombreEmpleado;
    document.getElementById("txtCPE").value = com.codigoPostal;
    document.getElementById("txtCiuEmp").value = com.ciudad;
    document.getElementById("txtEstaPedido").value = com.estado;
    document.getElementById("txtTotPedido").value = com.total;
    document.getElementById("cmbEstatus").value = com.estatus;
    
    setDetalleCompraVisible(true);
}

function buscarPosicionCompraPorId(id)
{
    for (let i = 0; i < compras.length; i++)
    {
        if (compras[i].id === id)
            return i;
    }
    return -1;
}

export function setDetalleCompraVisible(valor)
{
    if (valor === true)
    {
        //Ocultamos la seccion del catalogo de compra:
        document.getElementById("divCatalogoCompra").style.display = 'none';
        
        //Mostramos la seccion del detalle:
        document.getElementById("divDetalleCompra").style.display = '';
    }
    else 
    {
        //Ocultamos la seccion del detalle:
        document.getElementById("divDetalleCompra").style.display = 'none';
        
        //Mostramos la seccion del catalogo de la compra:
        document.getElementById("divCatalogoCompra").style.display = '';
    }
}