const axios = require('axios').default;

const Utils = {
    settings: {
        backendBaseUrl: "https://pokeapi.co/api/v2",
    },
    getFormattedBackendUrl: ({ query, searchType }) => {
        return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
    },
    getPokemon: ({ query, searchType = "pokemon" }) => {
        return Utils.fetch({
            url: Utils.getFormattedBackendUrl({ query, searchType }),
            searchType
        });
    },
    getEvolutionChain: (species) => {
        return Utils.fetch({
            url: species.url,
            searchType: "EvolutionChain"
        });
    },
    fetch: async ({ url, searchType }) => {
        try {
            const rawResponse = await axios.get(url);
            if (rawResponse.status !== 200) {
                throw new Error(`${searchType} not found`);
            }
            return rawResponse.data;
        } catch (error) {
            throw new Error(`${searchType} not found`);
        }
    },
    toUpperCaseFirst: (text) => {
        let cadena = text.split("");
        cadena[0] = cadena[0].toUpperCase();
        return cadena.join("");
    }
}

const ejecutar = async () => {
    const query = "pikachu";
    const searchType = "pokemon";
    const response = await Utils.getPokemon({query, searchType});
    const species = await Utils.getEvolutionChain(response.species);
    const evolutionChain = await Utils.getEvolutionChain(species.evolution_chain);
    pokemonCard(response);
    console.log('Cadena de Evolución: ');
    evolutionChainList(evolutionChain.chain);
}

const pokemonCard = ({id, name, weight, height, abilities}) => {
    console.log('Nombre: ' + Utils.toUpperCaseFirst(name));
    console.log('Id: ' + id);
    console.log('Altura: ' + height);
    console.log('Peso: ' + weight);
    console.log('Habilidades:');
    abilities.map(({ability, is_hidden}) => {
        console.log('   - ' + ability.name + (is_hidden ? ' *' : ''));
    });
}

const evolutionChainList = ({species, is_baby, evolves_to}) => {
    console.log('   - ' + species.name + (is_baby ? ' :)' : ''));
    return ((brk, arry) => {
        if(!brk){
            evolutionChainList(arry);
        }
    })(evolves_to[0] === undefined, evolves_to[0]);
}

ejecutar();