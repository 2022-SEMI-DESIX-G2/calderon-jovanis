(() => {
    const Utils = {
        settings: {
            backendBaseUrl: "http://localhost:3000",
        },
        getFormattedBackendUrl: ({ query, searchType }) => {
            return `${Utils.settings.backendBaseUrl}/${searchType}?name=${query}`;
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
                const rawResponse = await fetch(url);
                if (rawResponse.status !== 200) {
                    throw new Error(`${searchType} not found`);
                }
                return rawResponse.json();
            } catch (error) {
                throw error;
            }
        },
        toUpperCaseFirst: (text) => {
            let cadena = text.split("");
            cadena[0] = cadena[0].toUpperCase();
            return cadena.join("");
        }
    }
    document.Utils = Utils;
})();