((Utils) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
            pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
            pokemonFinderSearchType: document.querySelector("#pokemon-finder-search-type"),
            pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
            svgEye: ' <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.975 2.475C12.675 2.175 12.15 2.175 11.775 2.475L9.975 4.275C9.1828 3.98092 8.34501 3.8286 7.5 3.825C4.65 3.9 2.1 5.4 0.75 7.875C0.9 8.175 1.125 8.475 1.35 8.775C1.95 9.6 2.7 10.275 3.525 10.8L2.25 12.075C1.95 12.375 1.875 12.9 2.25 13.275C2.55 13.575 3.075 13.65 3.45 13.275L12.975 3.675C13.275 3.3 13.275 2.775 12.975 2.475ZM5.025 9.225L4.05 10.2C3.15 9.675 2.325 8.925 1.725 8.025C2.625 6.75 3.825 5.85 5.25 5.4C4.275 6.45 4.2 8.1 5.025 9.225ZM7.575 6.75C7.2 6.375 7.275 5.775 7.65 5.4C8.025 5.1 8.55 5.1 8.925 5.4L7.575 6.75ZM13.725 7.125C13.35 6.6 12.9 6.075 12.375 5.7L11.625 6.45C12.225 6.9 12.75 7.425 13.2 8.1C11.925 10.05 9.75 11.25 7.425 11.25H6.825L6.075 12C6.6 11.925 7.05 12 7.5 12C9.975 12 12.3 10.8 13.725 8.775C13.95 8.475 14.1 8.175 14.325 7.875C14.1 7.65 13.95 7.35 13.725 7.125ZM10.5 7.5L7.5 10.5C9.15 10.5 10.5 9.15 10.5 7.5Z" fill="black"/></svg>',
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
                    const renderedTemplate = App.templates.render({searchType, response});
                    App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
                    console.log(response);
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
            pokemonCard: ({id, name, weight, height, sprites, abilities}) => {
                let { back_default, front_default } = sprites;
                let abilitiesList = abilities.map(({ ability, is_hidden }) => `<li>${ability.name} ${is_hidden ? App.htmlElements.svgEye : ""}</li>`);
                return `<h1>${name} (${id})</h1>
                        <div class="row">
                            <div class="column">
                                <div>
                                    <h2>Sprites</h2>
                                    <img class="sprites" src="${front_default}" alt="Front_Image_Pokemon">
                                    <img class="sprites2" src="${back_default}" alt="Back_Image_Pokemon">
                                </div>
                                <div class="margin1">
                                    <h2>Evolution chain</h2>
                                    <ul>
                                        <li>Pichu</li>
                                        <li>Pikachu</li>
                                        <li>Raichu</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="column">
                                <div class="derecha">
                                    <h2>Weight / Height</h2>
                                    <div class="texto">${weight} / ${height}</div>
                                </div>
                                <div class="margin2">
                                    <h2>Abilities</h2>
                                    <ul class="ul2">
                                        ${abilitiesList.join("")}
                                    </ul>
                                </div>
                            </div>
                        </div>`;
            },
            abilityCard: ({id, name, pokemon}) => {
                const pokemonList = pokemon.map(
                    ({ pokemon, is_hidden }) =>
                    `<li><a target="_blank" href="${pokemon.url}">${pokemon.name}${
                        is_hidden ? " (Hidden)" : ""
                    }</a></li>`
                );
                return `<h1>${name} (${id})</h1><ul>${pokemonList.join("")}</ul>`;
            }
        }
    }
    App.init();
})(document.Utils);