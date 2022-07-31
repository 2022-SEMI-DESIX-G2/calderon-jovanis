const mongoose = require("mongoose");

const PokemonModelSchema = new mongoose.Schema({
    name: String,
    data: mongoose.Mixed,
    createDate: Date
});

module.exports = {
  PokemonModel: mongoose.model("pokemon", PokemonModelSchema),
};