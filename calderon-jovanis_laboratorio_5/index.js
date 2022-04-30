((Utils) => {
    const App = {
        htmlElements: {
            form: document.querySelector('#frmFibonacci'),
            input: document.querySelector('#frmCantidad'),
            response: document.querySelector('#response')
        },
        init: () => {
            App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
            App.htmlElements.response.addEventListener('click', App.handlers.onCardClick);
        },
        utils: {
            ...Utils.methods,
        },
        templates: {
            card: (value) => {
                return `<div class="card">${value}</div>`;
            }
        },
        handlers: {
            onCardClick: (e) => {
                if(e.target.className === 'card'){
                    e.target.remove();
                }
            },
            onFormSubmit: (e) => {
                e.preventDefault();

                App.htmlElements.response.innerHTML = '';
                
                const size = App.htmlElements.input.value;
                App.utils.fibonacci(size).forEach(item => {
                    App.htmlElements.response.innerHTML += App.templates.card(item);
                });
            }
        }
    }
    App.init();
})(document.Utils);