require("dotenv").config();
const axios = require('axios').default;
const express = require('express');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const TIME_CACHE = process.env.TIME_CACHE || 5000;

const CACHE = {};

app.use(cors());

app.get('/', (req, res) => {
    let output = '<h1>Ejemplo para ejecutar: </h1>';
    output += '<h2>http://localhost:3000/pokemon?name=ditto</h2>';
    res.send(output);
});

app.get('/pokemon', async (req, res) => {
    const queryParameter = req.query;
    let name = queryParameter.name;
    let now = new Date();
    if (CACHE[name]) {
        createDate = CACHE[name].createDate;
        diferenceTime = now - createDate;
        console.log("cache:", name, createDate, diferenceTime, "ms");
        if(diferenceTime <= TIME_CACHE){
            return res.json({ data: CACHE[name].data, isCached: true });
        }
    }
    let responseData;
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      responseData = data;
    } catch (error) {
      responseData = { error: error.toString(), name };
    }
    console.log("registre in cache:", responseData.name, now);
    CACHE[name] = {data: responseData, createDate: now};
    res.send({ data: responseData, isCached: false });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    console.log(`time for expired cache set to ${TIME_CACHE}ms`)
});