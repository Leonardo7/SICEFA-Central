let sucursal = [
    {
        "id" : 1,
        "nombre" : "Sucursal Central",
        "titular" : "Medicamos tu vida",
        "rfc" : "ANRF020418H26",
        "domicilio" : "Blvd. Universidad Tecnológica #225",
        "colonia" : "San Carlos",
        "cp" : "37670",
        "ciudad" : "Leon",
        "estado" : "Guanajuato",
        "telefono" : "4777100020",
        "latitud" : "21.06353483110673",
        "longitud" : "-101.57969394332699",
        "estatus" : 1
    },
    {
        "id" : 2,
        "nombre" : "Sucursal Centro",
        "titular" : "Medicamos tu vida",
        "rfc" : "ANRF020418H26",
        "domicilio" : "Av. Belisario Domingez",
        "colonia" : "Centro",
        "cp" : "37000",
        "ciudad" : "Leon",
        "estado" : "Guanajuato",
        "telefono" : "4777651300",
        "latitud" : "21.122372",
        "longitud" : "-101.686211",
        "estatus" : 1
    },
    {
        "id" : 3,
        "nombre" : "Sucursal Centro Max",
        "titular" : "Medicamos tu vida",
        "rfc" : "ANRF020418H26",
        "domicilio" : "Blvd. Adolfo Lopez Mateos",
        "colonia" : "",
        "cp" : "37530",
        "ciudad" : "Leon",
        "estado" : "Guanajuato",
        "telefono" : "477771361",
        "latitud" : "21.100418",
        "longitud" : "-101.635468",
        "estatus" : 1
    },
    {
        "id" : 4,
        "nombre" : "Sucursal Plaza Mayor",
        "titular" : "Medicamos tu vida",
        "rfc" : "ANRF020418H26",
        "domicilio" : "Blvd. Jesus Reyes Heroles 302",
        "colonia" : "Valle del Campestre",
        "cp" : "37150",
        "ciudad" : "Leon",
        "estado" : "Guanajuato",
        "telefono" : "4777734916",
        "latitud" : "21.157230",
        "longitud" : "-101.692711",
        "estatus" : 1
    },
    {
        "id" : 5,
        "nombre" : "Sucursal Central",
        "titular" : "Medicamos tu vida",
        "rfc" : "ANRF020418H26",
        "domicilio" : "Blvd. Adolfo Lopez Mateos 1702",
        "colonia" : "Rincon de las Bugambilias",
        "cp" : "37500",
        "ciudad" : "Leon",
        "estado" : "Guanajuato",
        "telefono" : "4772670701",
        "latitud" : "21.116442",
        "longitud" : "-101.658615",
        "estatus" : 1
    }
];


//Esta funcion nos sirve para inicializar el modulo
//de sucursales.
export function inicializar()
{
    fillTableSucursal();
    setDetalleSucursalVisible(false);
}

//Insert y Update en el mismo metodo:
export function save()
{
    // Declaramos un objeto donde guardaremos los datos de la sucursal:
    let suc = null;
    let posicion = -1; // Para saber si una sucursal ya existe o no.
    let idSucursal = 0;
    
    // Revisamos si hay un ID de sucursal:
    if (document.getElementById("txtIdSucursal").value.trim().length > 0)
    {
        idSucursal = parseInt(document.getElementById("txtIdSucursal").value.trim());
        posicion = buscarPosicionSucursalPorId(idSucursal);
        
        // Si posicion es mayor o igual a 0, si encontramos una sucursal:
        if (posicion >= 0)
            suc = sucursal[posicion];
        else
        {
            // Si no hay una sucursal con el ID descrito,
            // creamos una nueva instancia del Objeto:
            suc = new Object();
            suc.id = idSucursal;
            
            // Insertamos el objeto suc dentro del arreglo de sucursal:
            sucursal.push(suc);
        }
        
        // Continuamos llenando los datos del objeto:
        // Datos de sucursal:
        suc.nombre = document.getElementById("txtNombreSucursal").value;
        suc.titular = document.getElementById("txtNombreTitular").value;
        suc.rfc = document.getElementById("txtRfc").value;
        suc.domicilio = document.getElementById("txtDomicilio").value;
        suc.colonia = document.getElementById("txtColonia").value;
        suc.cp = document.getElementById("txtCp").value;
        suc.ciudad = document.getElementById("txtCiudad").value;
        suc.estado = document.getElementById("txtEstado").value;
        suc.telefono = document.getElementById("txtTelefono").value;
        suc.latitud = document.getElementById("txtLatitud").value;
        suc.longitud = document.getElementById("txtLongitud").value;
        
        // Refrescamos el catalogo de sucursales:
        fillTableSucursal();
        
        Swal.fire('Movimiento Realizado', 'Datos de Sucursal Actualizados correctamente.' , 'success');
    }
    else
    {
        Swal.fire('Verificaci&oacute;n de datos requerida.',
                  'Debe agregar un ID a la sucursal (valor num&eacute;rico).',
                  'warning');
    }
}

export function deleteSucursal()
{
    let posicion = -1;
    let idSucursal = 0;
    
    // Revisamos si hay un ID de sucursal:
    if (document.getElementById("txtIdSucursal").value.trim().length > 0)
    {
        // Recuperamos el ID del Sucursal que deseamos eliminar:
        idSucursal = parseInt(document.getElementById("txtIdSucursal").value.trim());
        
        // Buscamos la posicion del sucursal con ese ID:
        posicion = buscarPosicionSucursalPorId(idSucursal);
        
        // Si la posicion del Sucursal existe, lo quitamos del arreglo:
        if (posicion >= 0)
        {
            sucursal.splice(posicion, 1);
            Swal.fire('Movimiento realizado.', 'Registro de sucursal Eliminado.', 'success');
            fillTableSucursal();
        }
        else
        {
            Swal.fire('', 'El ID de sucursal especificado no existe.', 'warning');
        }
    }
    else
    {
        Swal.fire('', 'Especifique un ID de sucursal.', 'warning');
    }
}

export function getSucursal()
{
    
}

//Llena la tabla de sucursales
//con el arreglo.
function fillTableSucursal()
{
    //Aqui vamos a ir guardando el contenido del
    //tbody de la tabla de sucursales:
    let contenido = '';
    
    //Recorremos el arreglo elemento por elemento:
    for(let i =0; i <sucursal.length; i++)
    {
        contenido += '<tr>' +
                         '<td>' + sucursal[i].nombre +'</td>' +
                         '<td>' + sucursal[i].titular +'</td>' +
                         '<td>' + sucursal[i].rfc +'</td>' +
                         '<td>' + sucursal[i].domicilio +'</td>' +
                         '<td>' + sucursal[i].cp + '</td>' +
                         '<td>' + 
                         '<a href="#" class="text-info" onclick="cm.cargarDetalleSucursal(' + i + ');"><i class="fa-brands fa-wpforms"></i></a>' +
                         '</td>' +
                     '</tr>';
    }
    
    document.getElementById("tbodySucursal").innerHTML = contenido;
}

export function cargarDetalleSucursal(posicion)
{
    //Recuperamos la Sucursal en la posicion indicada:
    let suc = sucursal[posicion];

    //Llenamos las cajas de texto y demas controles con los datos de la
    //sucursal que recuperamos previamente:
    document.getElementById("txtIdSucursal").value = suc.id;
    document.getElementById("txtNombreSucursal").value = suc.nombre;
    document.getElementById("txtNombreTitular").value = suc.titular;
    document.getElementById("txtRfc").value = suc.rfc;
    document.getElementById("txtDomicilio").value = suc.domicilio;
    document.getElementById("txtColonia").value = suc.colonia;
    document.getElementById("txtCp").value = suc.cp;
    document.getElementById("txtCiudad").value = suc.ciudad;
    document.getElementById("txtEstado").value = suc.estado;
    document.getElementById("txtTelefono").value = suc.telefono;
    document.getElementById("txtLatitud").value = suc.latitud;
    document.getElementById("txtLongitud").value = suc.longitud;
    
    setDetalleSucursalVisible(true);
}

export function clearForm()
{   
    document.getElementById("txtIdSucursal").value = '';
    document.getElementById("txtNombreSucursal").value = '';
    document.getElementById("txtNombreTitular").value = '';
    document.getElementById("txtRfc").value = '';
    document.getElementById("txtDomicilio").value = '';
    document.getElementById("txtColonia").value = '';
    document.getElementById("txtCp").value ='';
    document.getElementById("txtCiudad").value = '';
    document.getElementById("txtEstado").value = '';
    document.getElementById("txtTelefono").value = '';
    document.getElementById("txtLatitud").value = '';
    document.getElementById("txtLongitud").value = '';
}

//Busca la posicion de un objeto sucursal
//con base en la propiedad ID y la devuelve.
//Si no se encuentra el ID buscado,
//el metodo devuelve -1.
function buscarPosicionSucursalPorId(id)
{
    for (let i = 0; i < sucursal.length; i++)
    {
        if (sucursal[i].id === id)
            return i;
    }
    return -1;
}

export function setDetalleSucursalVisible(valor)
{
    if (valor === true)
    {
        //Ocultamos la seccion del catalogo de sucursal:
        document.getElementById("divCatalogoSucrsal").style.display = 'none';
        
        //Mostramos la seccion del detalle:
        document.getElementById("divDetalleSucursal").style.display = '';
    }
    else 
    {
        //Ocultamos la seccion del detalle:
        document.getElementById("divDetalleSucursal").style.display = 'none';
        
        //Mostramos la seccion del catalogo de la sucursal:
        document.getElementById("divCatalogoSucrsal").style.display = '';
    }
}

export function clearAndShowDetalleSucursal()
{
    clearForm();
    setDetalleSucursalVisible(true);
}