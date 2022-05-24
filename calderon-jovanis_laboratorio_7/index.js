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
    console.log(response);
}

ejecutar();