((Utils) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
            pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
            pokemonFinderSearchType: document.querySelector("#pokemon-finder-search-type"),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener(
                "submit",
                App.handlers.pokemonFinderFormOnSubmit
            );
        },
        templates: {

        },
        handlers: {
            pokemonFinderFormOnSubmit: async (e) => {
                e.preventDefault();

                const query = App.htmlElements.pokemonFinderInput.value;
                const searchType = App.htmlElements.pokemonFinderSearchType.value;

                const response = await Utils.getPokemon({query, searchType});
                console.log(response)
            }
        }
    }
    App.init();
})(document.Utils);