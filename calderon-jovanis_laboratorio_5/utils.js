(() => {
    const Utils = {
        methods: {
            fibonacci: (cantidad) => {
                let inicio = 0;
                let final = 1;
                let arreglo = [];
                arreglo[0] = inicio;
                if(1 < cantidad){
                    arreglo[1] = final;
                    let iterator = 2;
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
        }
    }
    document.Utils = Utils;
})();