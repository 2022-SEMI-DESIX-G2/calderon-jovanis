const express = require('express');
const app = express();
const port = 3000;

const fibonacci = (cantidad) => {
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

app.get('/', (req, res) => {
    let output = '<h1>Ejemplo para ejecutar: </h1>';
    output += '<h2>http://localhost:3000/fibonacci?cantidad=5</h2>';
    res.send(output);
});

app.get('/fibonacci', (req, res) => {
    let queryParameter = req.query;
    let limit = queryParameter.cantidad;
    let output = fibonacci(limit);
    res.json({ secuence: output});
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});