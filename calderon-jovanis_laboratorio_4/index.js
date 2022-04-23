var resultado = [];

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

document.onsubmit = (e) => {
    if(resultado.length === 0){
        e.preventDefault();

        let cantidad = document.getElementById("frmCantidad");
        resultado = fibonacci(cantidad.value);
        
        const element = document.getElementById("tarjetas");
    
        const resetearCont = document.getElementById("parrafoBoton");
        const resetear = document.createElement("input");
        resetear.id = "resetear";
        resetear.value = "Restablecer";
        resetear.type = "submit";
        resetear.className = "boton";
        resetearCont.appendChild(resetear);
    
        const eliminaBoton = document.getElementById("frmCalcular"); 
        eliminaBoton.remove();
    
        for(i = 0; i < resultado.length; i++){
            let nombre = "frmTarj" + i.toString();
            let nombreB = nombre + "b";
            const div1 = document.createElement("div");
            div1.className = "card";
            div1.id = nombre;
            const div2 = document.createElement("div");
            div2.className = "container";
            const titulo4 = document.createElement("h4");
            titulo4.className = "h4Class";
            const letraB = document.createElement("b");
            const node2 = document.createTextNode(resultado[i].toString());
            letraB.appendChild(node2);
            titulo4.appendChild(letraB);
            div2.appendChild(titulo4);
            div1.appendChild(div2);
    
            element.appendChild(div1);
            const salto = document.createElement("br");
            salto.id = nombreB;
            element.appendChild(salto);
    
            document.getElementById(nombre).onclick = () => {
                if (confirm("La tarjeta sera eliminada")) {
                    const elmnt = document.getElementById(nombre); 
                    elmnt.remove();
                    const elmntB = document.getElementById(nombreB); 
                    elmntB.remove();
                }
            }
        }
    }
}