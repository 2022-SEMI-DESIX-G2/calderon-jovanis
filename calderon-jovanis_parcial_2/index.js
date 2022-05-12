((Utils) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
            pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
            pokemonFinderSearchType: document.querySelector("#pokemon-finder-search-type"),
            pokemonFinderOutput: document.querySelector("pokemon-finder-response")
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener(
                "submit",
                App.handlers.pokemonFinderFormOnSubmit
            );
        },
        handlers: {
            pokemonFinderFormOnSubmit: async (e) => {
                e.preventDefault();

                const query = App.htmlElements.pokemonFinderInput.value;
                const searchType = App.htmlElements.pokemonFinderSearchType.value;

                try {
                    const response = await Utils.getPokemon({query, searchType});
                    console.log(response)
                } catch(error) {
                    App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
                }
            }
        },
        templates: {
            render: ({searchType, response}) => {
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard
                };
                return renderMap[searchType] ? renderMap[searchType](response): App.templates.errorCard();
            },
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: ({id, name, weight, height}) => {

            },
            abilityCard: ({id, name, pokemon}) => {

            }
        }
    }
    App.init();
})(document.Utils);