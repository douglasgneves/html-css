document.addEventListener('DOMContentLoaded', function () {
    // Ano atual no rodapé da sidebar (se houver)
    if (document.getElementById('current-year-sidebar')) {
        document.getElementById('current-year-sidebar').textContent = new Date().getFullYear();
    }

    // Toggle da Sidebar (Área de Membros e Player)
    const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar'); // Para área de membros
    const playerSidebar = document.querySelector('.player-sidebar'); // Para página do player
    
    // Função genérica para toggle da sidebar
    function toggleSidebar(sidebar) {
        if (sidebar) {
            sidebar.classList.toggle('open');
            // Opcional: Adicionar um overlay para fechar ao clicar fora
            // criarOuRemoverOverlay(sidebar.classList.contains('open'));
        }
    }

    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', () => {
            if (dashboardSidebar) toggleSidebar(dashboardSidebar);
            if (playerSidebar) toggleSidebar(playerSidebar); // Se o botão for usado na página do player também
        });
    }
    
    // Acordeão para Módulos e Aulas na Página do Player
    const moduleTitles = document.querySelectorAll('.player-sidebar .module-title');
    moduleTitles.forEach(title => {
        title.addEventListener('click', () => {
            const moduleItem = title.parentElement;
            const lessonsList = moduleItem.querySelector('.lessons-list');
            
            moduleItem.classList.toggle('open');
            
            if (moduleItem.classList.contains('open')) {
                lessonsList.style.display = 'block';
                // Opcional: Animar a altura para uma transição suave
                // lessonsList.style.maxHeight = lessonsList.scrollHeight + "px";
            } else {
                lessonsList.style.display = 'none';
                // lessonsList.style.maxHeight = null;
            }
        });
    });

    // Navegação por Abas na Página do Player (Descrição, Arquivos, Comentários)
    const tabButtons = document.querySelectorAll('.player-main-content .tab-button');
    const tabPanes = document.querySelectorAll('.player-main-content .tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabPanes.forEach(pane => {
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // Simulação de carregamento de nome do aluno e avatar (BACK-END FARIA ISSO)
    const alunoNomeElement = document.querySelector('.dashboard-header h2');
    const alunoAvatarElement = document.querySelector('.user-avatar img');
    if (alunoNomeElement) {
        // No mundo real, isso viria de uma API após o login
        const nomeAluno = localStorage.getItem('alunoNome') || "Aluno(a)"; // Exemplo com localStorage
        alunoNomeElement.textContent = `Bem-vindo(a) de volta, ${nomeAluno}!`;
        if(alunoAvatarElement && nomeAluno !== "Aluno(a)") {
            alunoAvatarElement.alt = nomeAluno;
            alunoAvatarElement.src = `https://via.placeholder.com/40x40/0052CC/FFFFFF?text=${nomeAluno.substring(0,1).toUpperCase()}`;
        }
    }

    // Simulação de navegação para player (BACK-END CONTROLARIA O ACESSO)
    // Adicionar este código se quiser que os botões "Continuar Aprendendo" funcionem
    const courseLinks = document.querySelectorAll('.curso-inscrito-card a[href^="player-curso.html"]');
    courseLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // event.preventDefault(); // Remova se quiser que o link funcione normalmente
            // const cursoId = this.href.split('=')[1];
            // console.log(`Acessando curso: ${cursoId}`);
            // window.location.href = this.href; // Ou lógica de carregamento dinâmico da aula
        });
    });

});