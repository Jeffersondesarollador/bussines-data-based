
// 1. Leer archivo de texto:
// o Se debe leer un archivo plano que contiene la información de los empleados

// import { Console } from "console";

// Los datos deben almacenarse en un array de objetos.
const fs = require("fs");
const prompt = require('prompt-sync')();
const archivo = "empleados.csv";
// Datos base
const departamentos = ['Antioquia', 'Cundinamarca', 'Valle del Cauca', 'Atlántico', 'Santander', 'Bolívar', 'Nariño', 'Caldas', 'Risaralda', 'Meta'];
const empleados = ['Carlos Pérez', 'María Gómez', 'Juan Rodríguez', 'Laura Martínez', 'Pedro Sánchez', 'Ana Torres', 'Luis Herrera', 'Isabel Ramírez', 'Diego Ruiz', 'Sandra López'];
const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre'];
// Función para generar una identificación única
function generarIdentificacion() {
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const rules = (arreglo) => {
        for (let i = arreglo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
        };
        const indexDelUno = arreglo.indexOf(1);
        if (indexDelUno !== -1) {
            arreglo.splice(indexDelUno, 1);
            arreglo.unshift(1);
        }
        return arreglo.join("");
    };

    return rules([...nums]);
}
// Función para generar ventas aleatorias
function generarVentas() {
    const generarVenta = () => {
        return Math.floor(Math.random() * (20000000 - 10000000 + 1)) + 10000000;
    };

    let ventas = {};
    meses.forEach(mes => {
        ventas[mes] = generarVenta();
    });

    return ventas;
}

// Armar los datos de empleados
let empleadosData = [];

for (let i = 0; i < empleados.length; i++) {
    let empleado = empleados[i];
    let departamento = departamentos[i];
    let id = generarIdentificacion();
    let ventas = generarVentas();

    empleadosData.push({
        nombre: empleado,
        departamento: departamento,
        identificacion: id,
        ...ventas
    });
}

// Crear encabezado del CSV
let encabezado = ['Nombre', 'Departamento', 'Identificación', ...meses];

// Convertir a texto CSV
let csv = encabezado.join(",") + "\n";

empleadosData.forEach(empleado => {
    let fila = [
        empleado.nombre,
        empleado.departamento,
        empleado.identificacion,
        ...meses.map(m => empleado[m])
    ];
    csv += fila.join(",") + "\n";
});

// Escribir el archivo
fs.writeFileSync(archivo, csv, "utf-8");

console.log(`Archivo ${archivo} generado correctamente.`);


// 2. Agregar un empleado:
// o El programa debe permitir agregar un nuevo empleado solicitando los datos
// por consola (Nombre, Identificación, Departamento, Ventas de Enero a
// Septiembre).
// o Al agregar un empleado se debe validar que esa identificación no existe ya
// en el array.


function agregarempleado(){
let empleado1 = {
    
    empleados: prompt("ingrese el nombre del empleado"),
    departamentos: prompt("ingrese el departamento de ubicación"),
    identificacion:prompt("ingrese la cédula de la persona") ,
    valor:
    [
    { enero: parseInt(prompt("ingrese el valor de este mes en ventas mes de enero"))},
    {febrero: parseInt(prompt("ingrese el valor de este mes en ventas mes de febrero"))},
    {marzo: parseInt(prompt("ingrese el valor de este mes en ventas mes de marzo"))},
    {abril: parseInt(prompt("ingrese el valor de este mes en ventas mes de abril"))},
    {mayo: parseInt(prompt("ingrese el valor de este mes en ventas mes de mayo"))},
    {junio:parseInt(prompt("ingrese el valor de este mes en ventas mes de junio"))},
    {julio: parseInt(prompt("ingrese el valor de este mes en ventas mes de julio"))},
    {agosto:parseInt(prompt("ingrese el valor de este mes en ventas mes de agosto"))},
    { septiembre:parseInt(prompt("ingrese el valor de este mes en ventas mes de septiembre"))},

    ]
}

let filaNueva = [
    empleado1.empleados,
    empleado1.departamentos,
    empleado1.identificacion,
    ...empleado1.valor.map(mesObj => Object.values(mesObj)[0])
].join(",") + "\n";

// Si el archivo no existe, crea encabezado
if (!fs.existsSync(archivo)) {
    let encabezado = ['Nombre', 'Departamento', 'Identificación', 'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre'].join(",") + "\n";
    fs.writeFileSync(archivo, encabezado);
}

// Agregar la fila al archivo CSV sin sobrescribirlo
fs.appendFileSync(archivo, filaNueva, "utf-8");

console.log(` Empleado "${empleado1.empleados}" agregado correctamente al archivo ${archivo}.`);}


// 3. Eliminar un empleado:
// o Se debe poder eliminar a un empleado del array utilizando su identificación.
// o De no existir la identificación mostrar el respectivo mensaje

// console.log(` Empleado "${empleado1.empleados}" agregado correctamente al archivo ${archivo}.`);

function eliminarempleado(){
    while(true){
        let ask=prompt("escriba SI, si desea continuar, escriba NO para terminar")
        if (ask != "SI") break;

        let ingresedato = prompt("Ingrese la identificación a eliminar: ");

        // Buscar en empleadosData
        let indexEncontrado = empleadosData.findIndex(empleado => empleado.identificacion === ingresedato);
    
        if (indexEncontrado !== -1) {
            console.log(`Empleado encontrado: ${empleadosData[indexEncontrado].nombre}`);
            empleadosData.splice(indexEncontrado, 1); // Elimina del array
            console.log(" Empleado eliminado correctamente.");
        } else {
            console.log(" Identificación no encontrada.");
        }
    }

// Convertimos a texto CSV de nuevo
let nuevoCSV = encabezado.join(",") + "\n";
empleadosData.forEach(empleado => {
    let fila = [
        empleado.nombre,
        empleado.departamento,
        empleado.identificacion,
        ...meses.map(mes => empleado[mes])
    ];
    nuevoCSV += fila.join(",") + "\n";
});

// Guardamos los cambios
fs.writeFileSync(archivo, nuevoCSV, "utf-8");
console.log(" Archivo actualizado después de la eliminación.");;}


// 4. Modificar la información de un empleado:
// o El usuario debe poder cambiar la información de un empleado (nombre,
// departamento o ventas) utilizando su identificación.
// o De no existir la identificación mostrar el respectivo mensaje


        
function modificarinfoempleado(){
        while (true) {
            let ask = prompt("Escriba SI si desea cambiar datos, o NO para no hacer cambios:");
            if (ask !== "SI") break;
        
            let llave = prompt("Ingrese la identificación del empleado a modificar:");
            let empleado = empleadosData.find(empleado => empleado.identificacion === llave);
        
            if (!empleado) {
                console.log(" Empleado no encontrado. Intente nuevamente.");
                continue; // vuelve a pedir la identificación
            }
        
            console.log(` Empleado encontrado: ${empleado.nombre}`);
        
            let cambiarNombre = prompt("¿Desea cambiar el nombre? (SI/NO):");
            if (cambiarNombre === "SI") {
                empleado.nombre = prompt("Ingrese el nuevo nombre:");
            }
        
            let cambiarDepto = prompt("¿Desea cambiar el departamento? (SI/NO):");
            if (cambiarDepto === "SI") {
                empleado.departamento = prompt("Ingrese el nuevo departamento:");
            }
        
            for (let mes of meses) {
                let cambiarVenta = prompt(`¿Desea cambiar el valor de ${mes}? (SI/NO):`);
                if (cambiarVenta === "SI") {
                    let nuevaVenta = parseInt(prompt(`Ingrese el nuevo valor para ${mes}:`));
                    if ((nuevaVenta)) {
                        empleado[mes] = nuevaVenta;
                    } else {
                        console.log(" Valor inválido. No se realizó el cambio.");
                    }
                }
            }
        
            console.log(" Datos modificados correctamente.");
            break;
        }}
    // 5. Calcular total de ventas por mes:
    // o El programa debe solicitar un mes específico y devolver el total de ventas de
    // la empresa para ese mes.
    // Solicitar el mes al usuario

function cacularventames(){    
let pedirmes = prompt("Ingrese el nombre del mes (ej: enero, febrero, marzo...):");

// Validar si el mes es válido
if (!meses.includes(pedirmes)) {
    console.log(" El mes ingresado no es válido. Intente nuevamente con un nombre correcto.");
} else {
    // Sumar ventas totales del mes
    let totalVentas = 0
    

    empleadosData.forEach((empleado) => {
        if (empleado[pedirmes]) {
            totalVentas += empleado[pedirmes];
           
            
        }
    });

    console.log(` Total de ventas en ${pedirmes}: $${totalVentas}`);
    
}}

function totalventasempresa(){
let totalVentasEmpresa = empleadosData.reduce((total, empleado) => {
    let totalEmpleado = meses.reduce((suma, mes) => {
        return suma + (empleado[mes] || 0);
    }, 0);
    return total + totalEmpleado;
}, 0);

console.log(` Total de ventas de toda la empresa: $${totalVentasEmpresa}`);}

    // 10. Calcular total de ventas:
    // o El programa debe calcular el total de ventas de la empresa, sumando todos
    // los meses de cada empelado.
// 6. Calcular total de ventas por empleado:
// o Al seleccionar esta opción, el programa solicitará el identificador de un
// empleado y devolverá el total de sus ventas acumuladas.
// o De no existir la identificación mostrar el respectivo mensaje

function calculartotalventas(){
const idBuscada = prompt(" Ingrese la identificación del empleado:");

const empleadoEncontrado = empleadosData.find(empleado => empleado.identificacion === idBuscada);

if (!empleadoEncontrado) {
    console.log(" No se encontró ningún empleado con esa identificación.");
} else {
    let totalVentas = 0;

    meses.forEach(mes => {
        totalVentas += empleadoEncontrado[mes] || 0; // Suma cada mes, si no tiene valor, suma 0
    });

    console.log(`Total de ventas del empleado ${empleadoEncontrado.nombre}: $${totalVentas.toLocaleString("es-CO")}`);}
}
// 7. Total de ventas por departamento:
// o El programa debe calcular el total de ventas de cada departamento
// (Electrónica, Electrodomésticos, Muebles) sumando las ventas de todos los
// empleados de ese departamento.
function ventaspordepartamento(){
const ventasPorDepartamento = {}; // Objeto donde guardaremos los totales

empleadosData.forEach((empleado) => {
    const departamento = empleado.departamento;

let ventasPorDepartamento=0
    // Sumar las ventas de todos los meses
    meses.forEach((mes) => {
        ventasPorDepartamento[departamento] += empleado[mes];
    });
});

// Mostrar resultados
console.log(" Total de ventas por departamento:");
Object.entries(ventasPorDepartamento).forEach(([departamento, total]) => {
    console.log(`${departamento}: $${total}`);
});
}
// 8. Total de ventas de un departamento específico:
// o El usuario debe poder seleccionar
//  un departamento y recibir el total de
// ventas de dicho departamento.

function ventasdepasignado() {
while (true) {
    const departamentoBuscado = prompt("Ingrese el nombre del departamento que desea consultar:");
    let totalVentas = 0;

    // Validamos si el departamento es válido
    if (!departamentos.includes(departamentoBuscado)) {
        console.log(" El departamento ingresado no es válido. Intente nuevamente.");
        continue; // Repetimos el bucle
    }

    // Recorremos empleados y sumamos ventas
    empleadosData.forEach(empleado => {
        if (empleado.departamento === departamentoBuscado) {
            meses.forEach(mes => {
                totalVentas += empleado[mes] || 0;
            });
        }
    });

    // Mostramos el resultado y salimos del bucle
    console.log(` Total de ventas para el departamento ${departamentoBuscado}: $${totalVentas.toLocaleString("es-CO")}`);
    break;}}

// // 9. Listar todos los empleados:

// o Opción para listar todos los empleados con sus datos.
function listarempleados(){
empleadosData.forEach( (empleado,index) => console.log(empleado))

}


function salirdelprograma(){
    console.log("El programa ha finalizado")
}



console.log("Bienvenido al sistema de gestión de empleados y ventas.");
console.log("Seleccione una de las siguientes opciones:");
console.log("1. Agregar empleado");
console.log("2. Eliminar empleado");
console.log("3. Modificar información de empleado");
console.log("4. Calcular total de ventas por mes");
console.log("5. Calcular total de ventas de la empresa");
console.log("6. Calcular total de ventas por empleado");
console.log("7. Calcular total de ventas por departamento");
console.log("8. Calcular total de ventas de un departamento específico");
console.log("9. Listar todos los empleados");
console.log("10. Salir del programa");

const menu = prompt("Ingrese el número de la opción deseada:");

switch (menu) {
    case "1":
        agregarempleado();
        break;
    case "2":
        eliminarempleado();
        break;
    case "3":
        modificarinfoempleado();
        break;
    case "4":
        cacularventames();
        break;
    case "5":
        totalventasempresa();
        break;
    case "6":
        calculartotalventas();
        break;
    case "7":
        ventaspordepartamento();
        break;
    case "8":
        ventasdepasignado();
        break;
    case "9":
        listarempleados();
        break;
    case "10":
        salirdelprograma();
        break;
    default:
        console.log(" Opción no válida. Intente nuevamente.");
        break;
}
console.log(" Cerrando el programa...");
process.exit(); // Detiene la ejecución completamente