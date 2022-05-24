function fibonacci(cantidad){
    let inicio = 0;
    let final = 1;
    let arreglo = [];
    arreglo[0] = inicio;
    if(1 < cantidad){
        arreglo[1] = final;
        iterator = 2;
        while(iterator < cantidad){
            let siguiente = inicio + final;
            arreglo[iterator] = siguiente;
            inicio = final;
            final = siguiente;
            iterator++;
        }
    }
    return arreglo;
}

console.log("Hello word");
const str = "osos";
const isPalindromo = (s) => s === s.split("").reverse().join("");
console.log(isPalindromo(str));

var resultado = [];
const cantidad = 5;
resultado = fibonacci(cantidad);
var cadena = "";
for(i = 0; i < resultado.length; i++){
    cadena = cadena + " " + resultado[i].toString();
}
console.log("fibonacci:" + cadena);