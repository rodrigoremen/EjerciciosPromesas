// Ejercicio 1: Promesas Encadenadas
// Crea una función que realice las siguientes tareas:

// Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
// Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el resultado de elevar ese número al cuadrado.
// Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva después de 1 segundo con la raíz cuadrada del número resultante.
function PromesasEncadenadas() {
    //aleatorio
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let nRand = Math.random() * (100 - 1 + 1) + 1;
            resolve(nRand);

        }, 2000);
    })
        //cuadrado
        .then((valorAleatorio) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(valorAleatorio * valorAleatorio);
                }, 3000);
            });
        })
        //raiz
        .then((numeroCuadrado) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve((Math.sqrt(numeroCuadrado)).toFixed(3));
                }, 1000);
            });
        });
}

PromesasEncadenadas().then((result) => {
    console.log("Ejercicio 1: ");
    console.log(result);
})
////////////////////////////////////////////////////////////////////////////////////////////////////7
//   Ejercicio 2: Promesa de Múltiples Solicitudes
// Crea una función que realice las siguientes tareas:

// Recibe un array de URLs como argumento.
// Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.
function PromesaMúltiplesSolicitudes(urls) {
    const PromesaFetch = urls.map((url) => fetch(url).then((response) => response.json()));
    return Promise.all(PromesaFetch);
}
const urls1 = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
PromesaMúltiplesSolicitudes(urls1)
    .then((resultados) => {
        console.log("Ejercicio 2: ");
        console.log(resultados);
    })
    .catch((error) => {
        console.error('Error en una solicitud:', error);
    });


/////////////////////////////////////////////////////////////////////////////////////////////////7
// Ejercicio 3: Promesas Paralelas
// Crea una función que realice las siguientes tareas:

// Recibe un array de funciones que devuelven promesas como argumento.
// Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.
function PromesasParalelas(Arrayfunciones) {
    const promesas = Arrayfunciones.map((funcion) => funcion());
    return Promise.all(promesas);
}
const funcion1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
};

const funcion2 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, 2000);
    });
};

const Arrayfunciones = [funcion1, funcion2];

PromesasParalelas(Arrayfunciones)
    .then((resultados) => {
        console.log("Ejercicio 3: ");
        console.log(resultados);
    })
    .catch((error) => {
        console.error('Error en una promesa:', error);
    });


// Ejercicio 4: Promesas en Cadena con Retraso
// Crea una función que realice las siguientes tareas:

// Recibe un número n como argumento.
// Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve después de N segundos con el número actual en el bucle.
// Cada promesa debe imprimir el número en la consola antes de resolverse.
// Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se resolvieron".
function PromesasCadenaConRetraso(num) {
    let Promesa = Promise.resolve();
    for (let i = 0; i < num; i++) {
        Promesa = Promesa.then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(i);
                    resolve();
                }, num * 1000);
            });
        });
    }

    return Promesa.then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Todas las promesas se resolvieron");
            }, 1000);
        });
    });
}

PromesasCadenaConRetraso(3)
    .then((mensaje) => {
        console.log("Ejercicio 4: ");
        console.log(mensaje);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Ejercicio 5: Promesa con Cancelación
// Crea una función que realice las siguientes tareas:

// Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
// Si se llama a una función cancel antes de que se cumplan los 5 segundos, la promesa debe rechazarse con el mensaje "Promesa cancelada".

function PromesaCancelacion() {
    let cancelado = false;
    const promesa = new Promise((resolve, reject) => {
        const tiempoEspera = setTimeout(() => {
            if (!cancelado) {
                resolve("La promesa se ha completado exitosamente.");
            } else {
                reject("Promesa cancelada");
            }
        }, 5000);
    });

    function cancelar() {
        cancelado = false;
    }
    return { promesa, cancelar };
}

const { promesa, cancelar } = PromesaCancelacion();
setTimeout(() => {
    cancelar();
}, 2000);

promesa.then((mensaje) => {
    console.log("Ejercicio 5");
    console.log(mensaje);
})
    .catch((error) => {
        console.log("Ejercicio 5");
        console.error(error);
    });
