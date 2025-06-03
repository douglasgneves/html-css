// assets/js/main.js

function initializeMainScripts() {
    // Script para o ano atual no rodapé
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Funcionalidade dos Ícones de Navegação
    const searchIcon = document.getElementById('search-icon');
    const searchPanel = document.getElementById('search-panel');
    const closeSearchPanelButton = document.getElementById('close-search-panel');

    const bagIcon = document.getElementById('bag-icon');
    const loginSidePanel = document.getElementById('login-side-panel');
    const closeLoginPanelButton = document.getElementById('close-login-panel');
    const overlay = document.getElementById('overlay'); // O overlay agora é parte do login-panel.html

    function closeAllPanels() {
        if (searchPanel && searchPanel.classList.contains('active')) {
            searchPanel.classList.remove('active');
        }
        if (loginSidePanel && loginSidePanel.classList.contains('active')) {
            loginSidePanel.classList.remove('active');
        }
        if (overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    }

    if (searchIcon && searchPanel && closeSearchPanelButton) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const isSearchOpen = searchPanel.classList.contains('active');
            closeAllPanels();
            if (!isSearchOpen) {
                searchPanel.classList.add('active');
            }
        });

        closeSearchPanelButton.addEventListener('click', (e) => {
            e.preventDefault();
            searchPanel.classList.remove('active');
        });
    }

    if (bagIcon && loginSidePanel && closeLoginPanelButton && overlay) {
        bagIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const isLoginOpen = loginSidePanel.classList.contains('active');
            closeAllPanels();
            if (!isLoginOpen) {
                loginSidePanel.classList.add('active');
                overlay.classList.add('active');
            }
        });

        if (closeLoginPanelButton) { // Adicionar verificação, pois o botão está no componente
            closeLoginPanelButton.addEventListener('click', (e) => {
                e.preventDefault();
                closeAllPanels();
            });
        }

        if (overlay) { // Adicionar verificação
            overlay.addEventListener('click', () => {
                if (loginSidePanel.classList.contains('active')) {
                   closeAllPanels();
                }
            });
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            closeAllPanels();
        }
    });
}

// Espera o evento 'componentsLoaded' disparado por component-loader.js
document.addEventListener('componentsLoaded', initializeMainScripts);

// Fallback caso os componentes carreguem antes do listener ser adicionado
// ou se component-loader.js não for usado em alguma página.
// Se o DOM já estiver pronto e os componentes (hipoteticamente) já carregados.
if (document.readyState !== 'loading' && !window.componentsAreBeingLoaded) {
    // Este fallback é mais complexo de gerenciar. O ideal é sempre usar o component-loader.
    // Para simplificar, vamos confiar no 'componentsLoaded'.
    // Mas se o evento já disparou, podemos tentar executar.
    // Para isso, o component-loader poderia setar uma flag global.
    // Ex: window.componentsLoadedFired = true;
    // if (window.componentsLoadedFired) initializeMainScripts();
}