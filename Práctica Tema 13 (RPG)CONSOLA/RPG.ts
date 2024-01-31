import * as readlineSync from 'readline-sync';

//CLASE JUGADOR
class Jugador {

    nombre: string;
    puntos_salud: number;
    puntos_ataque: number;
    oro: number;


    constructor(nombre: string) {
        this.nombre = nombre;
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        this.oro = 2;

    }


    getNombre(): string {
        return this.nombre;
    }

    setNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }

    getPuntos_salud(): number {
        return this.puntos_salud;
    }

    setPuntos_salud(nuevo_puntos_salud: number) {
        this.puntos_salud = nuevo_puntos_salud;
    }

    getPuntos_ataque(): number {
        return this.puntos_ataque;
    }

    setPuntos_ataque(puntos_ataque_nuevo: number) {
        this.puntos_ataque = puntos_ataque_nuevo;
    }

    getOro(): number {
        return this.oro;
    }

    setOro(nuevo_oro: number) {
        this.oro = nuevo_oro;
    }




    imprimirAtributos(): void {
        console.log(`Puntos de Salud: ${this.puntos_salud}`);
        console.log(`Puntos de Ataque: ${this.puntos_ataque}`);
        console.log(`Oro: ${this.oro}`);
    }

    calcularFuerzaInicial(): void {
        //Puntos de ataque aleatorios entre 1 y 12
        this.puntos_ataque = Math.floor(Math.random() * 12) + 1;
    }

}


//CLASE ENEMIGO
class Enemigo {

    nombre: string;
    puntos_ataque: number;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.puntos_ataque = 0;


    }

    // Métodos get y set (opcional)
    getNombre(): string {
        return this.nombre;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    getPuntosAtaque(): number {
        return this.puntos_ataque;
    }

    setPuntosAtaque(puntos_ataque: number): void {
        this.puntos_ataque = puntos_ataque;
    }

    calcularFuerzaEnemigo(): void {
        // Establecer puntos de ataque aleatorios entre 1 y 10
        this.puntos_ataque = Math.floor(Math.random() * 10) + 1;
    }

    soltarDinero(): number {
        // Establecer la cantidad de dinero que soltará el enemigo de forma aleatoria
        return Math.floor(Math.random() * 10) + 1;
    }

}



function Main(): void {





    function historia() {
        console.log("---------------------------------------");
        console.log("Título del Juego: Medac`s Curse");
        console.log("HISTORIA");
        console.log("En la academia mágica de Medac, una maldición ha convertido a profesores");
        console.log("y compañeros en oscuros enemigos sedientos de poder. Como estudiante");
        console.log("resistente a la maldición, tu misión es liberar la academia y restaurar la paz.");
        console.log("---------------------------------------");
    }

    let nombre = readlineSync.question('Ingresa tu nombre: ');
    const jugador = new Jugador(`${nombre}`);
    console.log(`¡Hola, ${nombre}!`);
    jugador.calcularFuerzaInicial();



    let opcion: number;
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
                console.log(`Nombre: ${nombre}`);
                jugador.imprimirAtributos();
                break;
            case 4:
                if (jugador.oro >= 1) {
                    cambiarFuerza();
                    break;
                } else {
                    console.log(`Si no tienes oro pa que vienes`);
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
        console.log(`Tienes ${jugador.oro} oro`);
    }

    function Luchar() {

       
        let enemigos: Enemigo[] = [
            new Enemigo("Javi"),
            new Enemigo("Evelyn"),
            new Enemigo("Antonio")
        ];

        const nombreEnemigo = Math.floor(Math.random() * enemigos.length);//Al ser un numero el nombre sera la posicion en el array

        enemigos[nombreEnemigo].calcularFuerzaEnemigo();//Calculamos su fuerza
        console.log(`Estas luchando contra ${enemigos[nombreEnemigo].nombre}`);

        if (jugador.puntos_salud == 0) {
            console.log("GAME OVER");
            return;
        } if (jugador.puntos_ataque >= enemigos[nombreEnemigo].puntos_ataque) {
            console.log("---------------------------------------");
            console.log("Has ganado!!!!!!");
            jugador.oro += enemigos[nombreEnemigo].soltarDinero();
            console.log(`Tienes ${jugador.oro} de  oro`);
            console.log("---------------------------------------");

        } if (jugador.puntos_ataque < enemigos[nombreEnemigo].puntos_ataque) {
            console.log("---------------------------------------");
            console.log("Has perdido ahahahahaa");
            console.log("---------------------------------------");
            let vidaPerdida = (enemigos[nombreEnemigo].puntos_ataque) - (jugador.puntos_ataque);
            jugador.puntos_salud -= vidaPerdida;
            console.log("---------------------------------------");
            console.log(`Has perdido ${vidaPerdida} de vida  y te quedan ${jugador.puntos_salud} `)
            console.log("---------------------------------------");

        }
    }



    function comprarItems() {
        let opcion: number;
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
                        console.log(`Se añadio Glock-18 a tu inventario, tu ataque es de ${jugador.puntos_ataque}`);
                        break;
                    } else {
                        console.log(`Si no tienes dinero pa que vienes`);
                        break;
                    }

                case 2:
                    if (jugador.oro >= 15) {
                        jugador.puntos_ataque += 10;
                        jugador.oro -= 15;
                        console.log(`Se añadio AK-47 a tu inventario, tu ataque es de ${jugador.puntos_ataque}`);
                        break;
                    } else {
                        console.log(`Si no tienes dinero pa que vienes`);
                        break;
                    }

                case 3:
                    if (jugador.oro >= 5) {
                        jugador.puntos_salud += 5;
                        jugador.oro -= 5;
                        console.log(`Te has curado,compraste una venda, tu vida es de ${jugador.puntos_salud}`);
                        break;
                    } else {
                        console.log(`Si no tienes dinero pa que vienes`);
                        break;
                    }

                case 4:
                    if (jugador.oro >= 10) {
                        jugador.puntos_salud += 10;
                        jugador.oro -= 10;
                        console.log(`Te has curado, compraste un botiquin, tu vida es de ${jugador.puntos_salud}`);
                        break;
                    } else {
                        console.log(`Si no tienes dinero pa que vienes`);
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

Main();//Ejecutamos el juegesito
