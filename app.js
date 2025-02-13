let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let contadorVidas = 0



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log(intentos);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p.texto__parrafo', `Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        //El usuario no acierta
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p.texto__parrafo', 'El número secreto es menor.')
        } else {
            asignarTextoElemento('p.texto__parrafo', 'El número secreto es mayor.')
        }
        intentos++
        --contadorVidas
        asignarTextoElemento('p#contadorVidas', `❤️ ${contadorVidas}`)
        console.log(`Estas son las vidas ${contadorVidas}`);
        if (contadorVidas === 0) {
            terminarJuego()
        }

        limpiarCaja()
    }
    return;
}

function limpiarCaja() {
    document.getElementById('valorUsuario').value = ''

}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya se sortearon todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p.texto__parrafo', 'Se sortearon todos los números posibles.')
    } else {
        // Si el número generadoe está incluido en la lista   
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto()
        } else {
            listaNumerosSorteados.push(numeroGenerado)
            return numeroGenerado
        }
    }


}

function terminarJuego() {
    document.getElementById('intentar').setAttribute('disabled', 'true')
    asignarTextoElemento('p.texto__parrafo', 'Te quedaste sin vidas, ha terminado el juego.')
    document.getElementById('reiniciar').removeAttribute('disabled')
}

function condicionesIniciales() {
    numeroSecreto = generarNumeroSecreto()
    contadorVidas = parseInt(Math.floor(numeroMaximo * 0.3));
    console.log(`Estas son las vidas del usuario: ${contadorVidas}`);
    intentos = 1
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p.texto__parrafo', `Indica un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento('p#contadorVidas', `❤️ ${contadorVidas}`)
}

function reiniciarJuego() {
    limpiarCaja()
    condicionesIniciales()
    document.getElementById('reiniciar').setAttribute('disabled', 'true')
    document.getElementById('intentar').removeAttribute('disabled')
}

condicionesIniciales()