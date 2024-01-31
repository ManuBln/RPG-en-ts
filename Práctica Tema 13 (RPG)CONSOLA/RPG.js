"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
//CLASE JUGADOR
var Jugador = /** @class */ (function () {
    function Jugador(nombre) {
        this.nombre = nombre;
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        this.oro = 2;
    }
    Jugador.prototype.getNombre = function () {
        return this.nombre;
    };
    Jugador.prototype.setNombre = function (nuevoNombre) {
        this.nombre = nuevoNombre;
    };
    Jugador.prototype.getPuntos_salud = function () {
        return this.puntos_salud;
    };
    Jugador.prototype.setPuntos_salud = function (nuevo_puntos_salud) {
        this.puntos_salud = nuevo_puntos_salud;
    };
    Jugador.prototype.getPuntos_ataque = function () {
        return this.puntos_ataque;
    };
    Jugador.prototype.setPuntos_ataque = function (puntos_ataque_nuevo) {
        this.puntos_ataque = puntos_ataque_nuevo;
    };
    Jugador.prototype.getOro = function () {
        return this.oro;
    };
    Jugador.prototype.setOro = function (nuevo_oro) {
        this.oro = nuevo_oro;
    };
    Jugador.prototype.imprimirAtributos = function () {
        console.log("Puntos de Salud: ".concat(this.puntos_salud));
        console.log("Puntos de Ataque: ".concat(this.puntos_ataque));
        console.log("Oro: ".concat(this.oro));
    };
    Jugador.prototype.calcularFuerzaInicial = function () {
        //Puntos de ataque aleatorios entre 1 y 12
        this.puntos_ataque = Math.floor(Math.random() * 12) + 1;
    };
    return Jugador;
}());
//CLASE ENEMIGO
var Enemigo = /** @class */ (function () {
    function Enemigo(nombre) {
        this.nombre = nombre;
        this.puntos_ataque = 0;
    }
    // Métodos get y set (opcional)
    Enemigo.prototype.getNombre = function () {
        return this.nombre;
    };
    Enemigo.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Enemigo.prototype.getPuntosAtaque = function () {
        return this.puntos_ataque;
    };
    Enemigo.prototype.setPuntosAtaque = function (puntos_ataque) {
        this.puntos_ataque = puntos_ataque;
    };
    Enemigo.prototype.calcularFuerzaEnemigo = function () {
        // Establecer puntos de ataque aleatorios entre 1 y 10
        this.puntos_ataque = Math.floor(Math.random() * 10) + 1;
    };
    Enemigo.prototype.soltarDinero = function () {
        // Establecer la cantidad de dinero que soltará el enemigo de forma aleatoria
        return Math.floor(Math.random() * 10) + 1;
    };
    return Enemigo;
}());
function Main() {
    function historia() {
        console.log("---------------------------------------");
        console.log("Título del Juego: Medac`s Curse");
        console.log("HISTORIA");
        console.log("En la academia mágica de Medac, una maldición ha convertido a profesores");
        console.log("y compañeros en oscuros enemigos sedientos de poder. Como estudiante");
        console.log("resistente a la maldición, tu misión es liberar la academia y restaurar la paz.");
        console.log("---------------------------------------");
    }
    var nombre = readlineSync.question('Ingresa tu nombre: ');
    var jugador = new Jugador("".concat(nombre));
    console.log("\u00A1Hola, ".concat(nombre, "!"));
    jugador.calcularFuerzaInicial();
    var opcion;
    do {
        historia();
        console.log("1.Luchar contra el enemigo");
        console.log("2.Comprar ítems");
        console.log("3.Consultar estadisticas ");
        console.log("4.Pagar 1 de Oro para generar nueva fuerza");
        console.log("5.Exit");
        opcion = readlineSync.questionInt('Ingresa tu eleccion:');
        switch (opcion) {
            case 1:
                Luchar();
                break;
            case 2:
                comprarItems();
                break;
            case 3:
                console.log("Nombre: ".concat(nombre));
                jugador.imprimirAtributos();
                break;
            case 4:
                if (jugador.oro >= 1) {
                    cambiarFuerza();
                    break;
                }
                else {
                    console.log("Si no tienes oro pa que vienes");
                    break;
                }
            case 5:
                console.log("Nos vemos!!!");
                return;
            default:
                console.log("Opción no válida. Por favor, elige nuevamente.");
        }
    } while (opcion !== 5);
    function cambiarFuerza() {
        jugador.calcularFuerzaInicial();
        jugador.oro -= 1;
        console.log("Tienes ".concat(jugador.oro, " oro"));
    }
    function Luchar() {
        var enemigos = [
            new Enemigo("Javi"),
            new Enemigo("Evelyn"),
            new Enemigo("Antonio")
        ];
        var nombreEnemigo = Math.floor(Math.random() * enemigos.length); //Al ser un numero el nombre sera la posicion en el array
        enemigos[nombreEnemigo].calcularFuerzaEnemigo(); //Calculamos su fuerza
        console.log("Estas luchando contra ".concat(enemigos[nombreEnemigo].nombre));
        if (jugador.puntos_salud == 0) {
            console.log("GAME OVER");
            return;
        }
        if (jugador.puntos_ataque >= enemigos[nombreEnemigo].puntos_ataque) {
            console.log("---------------------------------------");
            console.log("Has ganado!!!!!!");
            jugador.oro += enemigos[nombreEnemigo].soltarDinero();
            console.log("Tienes ".concat(jugador.oro, " de  oro"));
            console.log("---------------------------------------");
        }
        if (jugador.puntos_ataque < enemigos[nombreEnemigo].puntos_ataque) {
            console.log("---------------------------------------");
            console.log("Has perdido ahahahahaa");
            console.log("---------------------------------------");
            var vidaPerdida = (enemigos[nombreEnemigo].puntos_ataque) - (jugador.puntos_ataque);
            jugador.puntos_salud -= vidaPerdida;
            console.log("---------------------------------------");
            console.log("Has perdido ".concat(vidaPerdida, " de vida  y te quedan ").concat(jugador.puntos_salud, " "));
            console.log("---------------------------------------");
        }
    }
    function comprarItems() {
        var opcion;
        do {
            console.log("1.Glock-18 por 5 de oro");
            console.log("2.AK-47 por 15 de oro");
            console.log("3.Venda por 5 de oro");
            console.log("4.Botiquin por 10 de oro");
            console.log("5.Exit");
            opcion = readlineSync.questionInt('Ingresa tu eleccion:');
            switch (opcion) {
                case 1:
                    if (jugador.oro >= 5) {
                        jugador.puntos_ataque += 5;
                        jugador.oro -= 5;
                        console.log("Se a\u00F1adio Glock-18 a tu inventario, tu ataque es de ".concat(jugador.puntos_ataque));
                        break;
                    }
                    else {
                        console.log("Si no tienes dinero pa que vienes");
                        break;
                    }
                case 2:
                    if (jugador.oro >= 15) {
                        jugador.puntos_ataque += 10;
                        jugador.oro -= 15;
                        console.log("Se a\u00F1adio AK-47 a tu inventario, tu ataque es de ".concat(jugador.puntos_ataque));
                        break;
                    }
                    else {
                        console.log("Si no tienes dinero pa que vienes");
                        break;
                    }
                case 3:
                    if (jugador.oro >= 5) {
                        jugador.puntos_salud += 5;
                        jugador.oro -= 5;
                        console.log("Te has curado,compraste una venda, tu vida es de ".concat(jugador.puntos_salud));
                        break;
                    }
                    else {
                        console.log("Si no tienes dinero pa que vienes");
                        break;
                    }
                case 4:
                    if (jugador.oro >= 10) {
                        jugador.puntos_salud += 10;
                        jugador.oro -= 10;
                        console.log("Te has curado, compraste un botiquin, tu vida es de ".concat(jugador.puntos_salud));
                        break;
                    }
                    else {
                        console.log("Si no tienes dinero pa que vienes");
                        break;
                    }
                case 5:
                    break;
                default:
                    console.log("Opción no válida. Por favor, elige nuevamente.");
            }
        } while (opcion !== 5);
    }
}
Main(); //Ejecutamos el juegesito
