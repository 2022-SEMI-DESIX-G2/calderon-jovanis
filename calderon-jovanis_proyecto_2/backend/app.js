require("dotenv").config();
const axios = require('axios').default;
const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const { PokemonModel } = require("./models");

const {
  PORT = 3000,
  TIME_CACHE = 5000,
  MONGODB_URI = "mongodb://admin:password@localhost:27017/chess?authSource=admin",
} = process.env;

const CACHE = {};

const db = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    let pokemonRead = await PokemonModel.find({ name });
    if (pokemonRead.length) {
      let { data, createDate } = pokemonRead[0];
      diferenceTime = now - createDate;
      console.log("cache:", name, createDate, diferenceTime, "ms");
      if(diferenceTime <= TIME_CACHE){
        return res.json({ data: data, isCached: true });
      }else{
        let responseData2;
        try {
          const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          responseData2 = data;
        } catch (error) {
          responseData2 = { error: error.toString(), name };
        }
        await PokemonModel.updateOne({ name }, {
          $set: {
            data: responseData2,
            createDate: now
          }
        });
        console.log("update in cache:", name, now);
        return res.json({ data: responseData2, isCached: false });
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
    const pokemonCreated = await PokemonModel.create({
      name: name,
      data: responseData,
      createDate: now
    });
    console.log("registre in cache:", pokemonCreated.name, now);
    res.send({ data: responseData, isCached: false });
});

db.then(() => {
  console.log("Database connection established successfully");
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    console.log(`time for expired cache set to ${TIME_CACHE}ms`)
  });
}).catch((error) => {
  console.error({ error });
});