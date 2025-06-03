// assets/js/component-loader.js
async function loadComponent(element) {
    const filePath = element.getAttribute('data-include');
    if (!filePath) return;

    // Resolve o caminho relativo ao documento que está carregando o componente.
    // Se o filePath já for absoluto (começar com / ou http), não faz nada.
    // Se for relativo, e o elemento estiver dentro de um componente já carregado,
    // precisamos construir o caminho a partir do caminho do componente pai.

    let fetchPath = filePath;
    // Se o elemento tem um "baseURI" do componente pai (adicionado por nós)
    const parentComponentBase = element.closest('[data-component-base]')?.dataset.componentBase;

    if (!filePath.startsWith('/') && !filePath.startsWith('http') && parentComponentBase) {
        // Constrói o caminho relativo ao componente pai
        // Ex: pai está em ../components/header.html, filePath é navigation-main.html
        // parentComponentBase será ../components/
        // fetchPath será ../components/navigation-main.html
        const basePath = parentComponentBase.substring(0, parentComponentBase.lastIndexOf('/') + 1);
        fetchPath = basePath + filePath;
    }


    try {
        const response = await fetch(fetchPath);
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status} ao carregar ${fetchPath} (original: ${filePath})`);
        }
        const data = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Marcar os elementos filhos com a base do componente que os carregou,
        // para que os data-includes dentro deles saibam de onde resolver seus próprios caminhos.
        Array.from(tempDiv.children).forEach(child => {
            child.dataset.componentBase = fetchPath; // O caminho completo do arquivo que foi carregado
        });

        // Substitui o placeholder pelo conteúdo carregado (ou insere se o placeholder deve ser mantido)
        // Para uma substituição completa do placeholder:
        // element.replaceWith(...tempDiv.childNodes);

        // Para inserir dentro do placeholder (e manter o placeholder se ele tiver estilos/estrutura):
        element.innerHTML = ''; // Limpa o placeholder
        element.append(...tempDiv.childNodes); // Adiciona os nós carregados


        // Após inserir o HTML, procure por novos data-includes dentro do conteúdo carregado
        const nestedIncludes = element.querySelectorAll('[data-include]');
        if (nestedIncludes.length > 0) {
            await loadAllComponents(nestedIncludes); // Processa os aninhados
        }

        // Re-executar scripts (abordagem simples, pode precisar de ajustes se houver dependências complexas)
        const scripts = Array.from(element.querySelectorAll('script'));
        for (const oldScript of scripts) {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            if (oldScript.src) {
                 let scriptSrc = oldScript.getAttribute('src'); // Usar getAttribute para o valor original
                 if (!scriptSrc.startsWith('/') && !scriptSrc.startsWith('http') && parentComponentBase) {
                     const basePath = parentComponentBase.substring(0, parentComponentBase.lastIndexOf('/') + 1);
                     newScript.src = basePath + scriptSrc;
                 } else {
                     newScript.src = scriptSrc;
                 }

                if(oldScript.type === 'module') newScript.type = 'module';
            } else {
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            }
            oldScript.parentNode.replaceChild(newScript, oldScript);
        }

    } catch (error) {
        console.error(`Falha ao carregar componente ${fetchPath} (original: ${filePath}):`, error);
        element.innerHTML = `<p style="color:red; font-size:12px; border:1px dashed red; padding:5px;">Erro: ${filePath} não carregado. Veja console.</p>`;
    }
}

async function loadAllComponents(elements) {
    const promises = Array.from(elements).map(el => loadComponent(el));
    await Promise.all(promises);
}

document.addEventListener('DOMContentLoaded', () => {
    const initialIncludes = document.querySelectorAll('[data-include]');
    if (initialIncludes.length > 0) {
        loadAllComponents(initialIncludes);
    }
});