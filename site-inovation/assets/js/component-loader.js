// assets/js/component-loader.js
document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar um único componente
    const loadComponent = async (element) => {
        const path = element.dataset.include;
        if (path) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const html = await response.text();
                    element.outerHTML = html; // Substitui o placeholder pelo conteúdo do componente
                    return true; // Indica sucesso
                } else {
                    console.error(`Erro ao carregar componente ${path}: ${response.status} ${response.statusText}`);
                    element.innerHTML = `<p style="color:red;">Erro ao carregar ${path}</p>`;
                }
            } catch (error) {
                console.error(`Erro de rede ao carregar componente ${path}:`, error);
                element.innerHTML = `<p style="color:red;">Erro de rede ao carregar ${path}</p>`;
            }
        }
        return false; // Indica que não foi carregado ou houve erro
    };

    // Função para carregar todos os componentes aninhados recursivamente
    const loadAllComponents = async () => {
        let placeholders = document.querySelectorAll('[data-include], [id$="-placeholder"]'); // Pega data-include e os IDs de placeholder

        // Continua carregando enquanto houver placeholders
        while (placeholders.length > 0) {
            const loadPromises = [];

            placeholders.forEach(placeholder => {
                // Se o placeholder tiver 'data-include', use-o
                if (placeholder.dataset.include) {
                    loadPromises.push(loadComponent(placeholder));
                }
                // Para placeholders dentro de componentes já carregados (com IDs)
                else if (placeholder.id) {
                    let componentPath = '';
                    if (placeholder.id === 'main-navigation-placeholder') componentPath = 'components/navigation-main.html';
                    else if (placeholder.id === 'search-panel-placeholder') componentPath = 'components/search-panel.html';
                    else if (placeholder.id === 'login-panel-placeholder') componentPath = 'components/login-panel.html';
                    // else if (placeholder.id === 'overlay-placeholder') componentPath = 'components/overlay.html'; // Se o overlay fosse separado
                    else if (placeholder.id === 'contact-form-footer-placeholder') componentPath = 'components/contact-form-footer.html';

                    if (componentPath) {
                        // Temporariamente adiciona data-include para usar a função loadComponent
                        placeholder.dataset.include = componentPath;
                        loadPromises.push(loadComponent(placeholder).then(success => {
                            // Remove o data-include temporário após o carregamento (ou tentativa)
                            delete placeholder.dataset.include;
                            return success;
                        }));
                    }
                }
            });

            await Promise.all(loadPromises);

            // Atualiza a lista de placeholders para a próxima iteração (pegar os que foram adicionados pelos componentes carregados)
            placeholders = document.querySelectorAll('[data-include], [id$="-placeholder"]');
             // Se nenhum placeholder foi processado com sucesso nesta rodada, pode haver um loop ou erro.
            if (loadPromises.length > 0 && !placeholders.length) {
                // Todos os placeholders foram processados ou não há mais
            } else if (loadPromises.length === 0 && placeholders.length > 0) {
                console.warn("Nenhum placeholder processado, mas ainda existem. Verifique a lógica.");
                break; // Evita loop infinito
            }

            // Pequena pausa para o DOM atualizar, se necessário, antes da próxima verificação.
            // Normalmente não é preciso, mas pode ajudar em cenários complexos.
            // await new Promise(resolve => setTimeout(resolve, 0));
        }

        // Após todos os componentes serem carregados, reinicialize os scripts que dependem do DOM completo.
        // É crucial que main.js e animations.js sejam executados DEPOIS que os componentes estão no DOM.
        // Uma forma é re-despachar o DOMContentLoaded ou chamar funções de inicialização específicas.

        // FORMA SIMPLES: Se main.js e animations.js encapsulam sua lógica em funções
        // que podem ser chamadas, você pode chamá-las aqui.
        // Exemplo:
        // if (typeof initializeMainScripts === 'function') initializeMainScripts();
        // if (typeof initializeAnimations === 'function') initializeAnimations();

        // FORMA MAIS ROBUSTA (re-disparar DOMContentLoaded ou eventos customizados):
        // Disparar um evento customizado para sinalizar que os componentes foram carregados
        document.dispatchEvent(new CustomEvent('componentsLoaded'));

    };

    loadAllComponents();
});

// Modifique seus scripts main.js e animations.js para ouvir 'componentsLoaded'
// Exemplo em main.js:
/*
function initMain() {
    // ... todo o seu código de main.js ...
}
if (document.readyState === 'loading') { // Ainda carregando
    document.addEventListener('componentsLoaded', initMain);
} else { // Já carregou (caso componentsLoaded dispare muito rápido)
    initMain();
}
*/
// Faça o mesmo para animations.js