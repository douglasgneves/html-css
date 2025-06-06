document.addEventListener('DOMContentLoaded', function() {
    // ... (outros códigos como modal de tratamentos, que podem vir antes) ...

    // -------------------------------------------------------------------
    // --- LÓGICA PARA DROPDOWN MENUS (MÍDIAS, LOJA) ---
    // -------------------------------------------------------------------

    // Seleciona todos os botões que abrem os dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Função para fechar todos os dropdowns abertos
    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            // No mobile, o JS controla a exibição. No desktop, é o CSS via :hover.
            // Esta linha garante que o estado do JS seja resetado.
            menu.style.display = 'none';
        });
    };

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link (que era navegar para javascript:void(0);)
            event.preventDefault();
            // Impede que o clique no link propague para o window e feche o menu imediatamente
            event.stopPropagation();

            // Encontra o menu dropdown irmão deste botão
            const dropdownMenu = this.nextElementSibling;
            const isMenuOpen = dropdownMenu.style.display === 'block';

            // Primeiro, fecha todos os outros menus para garantir que apenas um esteja aberto
            closeAllDropdowns();

            // Se o menu clicado não estava aberto, abre-o
            if (!isMenuOpen) {
                dropdownMenu.style.display = 'block';
            }
        });
    });

    // Fecha os dropdowns se o usuário clicar fora deles
    // Isso é útil principalmente no desktop se o usuário clicar em vez de usar hover
    window.addEventListener('click', function(event) {
        // Se o clique não foi em um elemento de toggle, fechamos todos os dropdowns
        if (!event.target.matches('.dropdown-toggle')) {
            closeAllDropdowns();
        }
    });


    // -------------------------------------------------------------------
    // --- MENU MOBILE TOGGLE ---
    // -------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
            const isExpanded = navUl.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.innerHTML = isExpanded ? '×' : '☰';

            // Se fechar o menu principal, garanta que os submenus também fechem
            if (!isExpanded) {
                closeAllDropdowns();
            }
        });

        // Modificação: Fechar o menu principal APENAS se clicar em um link que NÃO tem dropdown
        navUl.querySelectorAll('a').forEach(link => {
            // Verifica se o link clicado NÃO é um que abre dropdown
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', () => {
                    if (navUl.classList.contains('active')) {
                        navUl.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.innerHTML = '☰';
                    }
                });
            }
        });
    }

    // -------------------------------------------------------------------
    // --- MODAL DE TRATAMENTOS ---
    // -------------------------------------------------------------------
    const btnsAbrirModalTratamento = document.querySelectorAll('.open-tratamento-modal');
    const modalTratamento = document.getElementById('tratamentoModal');
    const modalTratamentoInfoContainer = document.getElementById('modalTratamentoInfo');
    const btnFecharModalTratamento = modalTratamento ? modalTratamento.querySelector('.close-tratamento-modal') : null;

    // Dados dos Tratamentos (simulados)
    const tratamentosData = {
        'estetica': {
            titulo: "Odontologia Estética Avançada",
            imagem: "https://via.placeholder.com/400x250/253951/EDEDEE?text=Estética+Detalhe",
            descricao: "Transforme seu sorriso com as mais modernas técnicas de odontologia estética. Realizamos um planejamento individualizado para alcançar a harmonia facial e a beleza natural do seu sorriso. Nossos tratamentos incluem clareamento dental a laser, facetas de porcelana ou resina, lentes de contato dental, e restaurações estéticas que mimetizam perfeitamente a cor e forma dos seus dentes naturais.",
            beneficios: ["Sorriso mais branco e atraente.", "Correção de imperfeições (cor, forma, tamanho).", "Aumento da autoestima e confiança.", "Resultados duradouros com os devidos cuidados."],
            ctaLink: "#contato"
        },
        'implantes': {
            titulo: "Implantes Dentários: Recupere seu Sorriso",
            imagem: "https://via.placeholder.com/400x250/A67955/EDEDEE?text=Implante+Detalhe",
            descricao: "Os implantes dentários são a solução mais moderna e eficaz para a reposição de dentes perdidos. Consistem em pinos de titânio biocompatíveis que são cirurgicamente inseridos no osso maxilar ou mandibular, funcionando como raízes artificiais sobre as quais são fixadas as próteses (coroas). Este tratamento restaura a função mastigatória, a fonética e a estética do sorriso, proporcionando conforto e segurança.",
            beneficios: ["Solução fixa e de aparência natural.", "Melhora da capacidade de mastigação e fala.", "Preservação da estrutura óssea facial.", "Não desgasta dentes vizinhos (como em pontes tradicionais)."],
            ctaLink: "#contato"
        },
        'ortodontia': {
            titulo: "Ortodontia Moderna para Todas as Idades",
            imagem: "https://via.placeholder.com/400x250/8D8D8D/EDEDEE?text=Orto+Detalhe",
            descricao: "Corrija o alinhamento dos seus dentes e a sua mordida com nossos tratamentos ortodônticos. Oferecemos desde os aparelhos metálicos convencionais até as opções mais discretas e confortáveis, como os alinhadores invisíveis (Invisalign® ou similar) e aparelhos estéticos de safira ou porcelana. Um sorriso alinhado não é apenas estética, mas também saúde, facilitando a higienização e prevenindo problemas futuros.",
            beneficios: ["Dentes alinhados e sorriso harmonioso.", "Melhora da oclusão (mordida).", "Facilidade na higienização bucal.", "Prevenção de desgastes dentários e problemas na ATM."],
            ctaLink: "#contato"
        }
    };

    if (btnsAbrirModalTratamento.length > 0 && modalTratamento && modalTratamentoInfoContainer) {
        btnsAbrirModalTratamento.forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                const tratamentoId = this.dataset.tratamentoId;
                const data = tratamentosData[tratamentoId];

                if (data) {
                    let beneficiosHtml = '';
                    if (data.beneficios && data.beneficios.length > 0) {
                        beneficiosHtml = '<h4>Principais Benefícios:</h4><ul>';
                        data.beneficios.forEach(beneficio => {
                            beneficiosHtml += `<li>${beneficio}</li>`;
                        });
                        beneficiosHtml += '</ul>';
                    }

                    modalTratamentoInfoContainer.innerHTML = `
                        ${data.imagem ? `<img src="${data.imagem}" alt="${data.titulo}" class="modal-tratamento-imagem">` : ''}
                        <h3 class="modal-tratamento-titulo">${data.titulo}</h3>
                        <p class="modal-tratamento-descricao">${data.descricao}</p>
                        ${beneficiosHtml}
                        <a href="${data.ctaLink || '#contato'}" class="cta-button modal-cta">Agendar Avaliação</a>
                    `;
                    modalTratamento.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    console.warn("Dados não encontrados para o tratamento ID:", tratamentoId);
                }
            });
        });

        if (btnFecharModalTratamento) {
            btnFecharModalTratamento.addEventListener('click', function() {
                modalTratamento.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        modalTratamento.addEventListener('click', function(event) {
            if (event.target === modalTratamento) {
                modalTratamento.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && modalTratamento.classList.contains('active')) {
                modalTratamento.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

    }

    // -------------------------------------------------------------------
    // --- INICIALIZAÇÃO DE CARROSSÉIS (SWIPER) ---
    // -------------------------------------------------------------------
    if (document.querySelector('.main-swiper')) {
        const mainSwiper = new Swiper('.main-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    if (document.querySelector('.depoimentos-swiper')) {
        const depoimentosSwiper = new Swiper('.depoimentos-swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.depoimentos-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                }
            }
        });
    }

    // -------------------------------------------------------------------
  // -------------------------------------------------------------------
// -------------------------------------------------------------------
// --- MODAL DE PROFISSIONAIS ---
// -------------------------------------------------------------------

// 1. Base de dados com as informações de cada profissional
const profissionaisData = {
    'dr-masioli': {
        nome: "Dr. Prof. PhD Marco A. Masioli",
        cro: "CRO 2344 ES",
        especialidades: "Dentística",
        foto: "images/dr-masioli-nova-mini.jpg",
        fotoAlta: "images/dr-masioli-nova-alta.jpg",
        // A MUDANÇA ESTÁ AQUI: trocamos as aspas " por crases `
        descricao: `Doutor em Clínica Odontológica pela Universidade Federal do Rio de Janeiro - UFRJ. 
                    Mestre em Dentística pela Universidade do Estado do Rio de Janeiro - UERJ. 
                    Professor Titular Coordenador das disciplinas de Fotografia Odontológica e Odontologia Restauradora Laboratorial da Universidade Federal do Espírito Santo - UFES. 
                    Professor do Curso de especialização em Dentística e atualização em Odontologia Estética da Associação Brasileira de Odontologia - ABO. 
                    Diretor acadêmico do Programa de Atualização em Odontologia Estética Pro-odonto Estética ArtMed-GrupoA 2006-2016. 
                    Autor e editor do livro Fotografia Odontológica ArtMed 2005. 
                    Autor do livro Odontologia Restauradora de A-Z - Editora Ponto 2012. 
                    Autor do livro Anatomia Dental de A a Z - Editora ponto 2015. 
                    Dezenas de cursos ministrados em diversos países. 
                    Dezenas de artigos publicados no Brasil e no Exterior.`
    },
    'dra-bianca': {
        nome: "Dra. Profª PhD Bianca M. Vimercati",
        cro: "CRO 3882 ES",
        especialidades: "Dentística",
        foto: "images/dra-bianca-nova-mini.jpg",
        fotoAlta: "images/dra-bianca-nova-alta.jpg",
        descricao: "Mestre em Dentística pela UERJ. Doutora em Clínica Odontológica pela UFRJ. Especialista em Harmonização Orofacial. Professora Adjunta IV de Odontologia Restauradora Laboratorial da UFES."
    },
    'dra-hindra': {
        nome: "Dra. Hindra Colodetti Masioli",
        cro: "CRO 5551 ES",
        especialidades: "Dentística",
        foto: "images/dr-hindra-nova-mini.jpg",
        fotoAlta: "images/dr-hindra-nova-alta.jpg",
        descricao: "Especialista em Dentística. Pós-graduada em Odontologia Estética. Invisalign Doctor."
    },
    // ... e assim por diante para todos os outros profissionais ...
    // (O resto do objeto permanece o mesmo)
    'dra-quezia': {
        nome: "Dra. Quezia Godinho de Oliveira",
        cro: "CRO 5653 ES",
        especialidades: "Dentística",
        foto: "images/miniatura_0000_Dra-Quezia-Godinho.jpg",
        fotoAlta: "images/Dra-Quezia-Godinho_web.jpg",
        descricao: "Especialista em Dentística. Mestranda em Odontologia."
    },
    'dra-deise': {
        nome: "Dra. Deise Lima Cunha",
        cro: "CRO 3908 ES",
        especialidades: "Ortodontia",
        foto: "images/dra-deise-nova-mini.png",
        fotoAlta: "images/dra-deise-nova-alta.png",
        descricao: "Especialista em Ortodontia. Mestre em Ortodontia."
    },
    'dr-kleber': {
        nome: "Dr. Kleber Borgo Kill",
        cro: "CRO 2349 ES",
        especialidades: "Endodontia",
        foto: "images/miniatura_0007_Dr-Kleber-Borgo-Kill.jpg",
        fotoAlta: "images/Dr.-Kleber-Borgo-Kil-2_web.jpg",
        descricao: "Especialista em Endodontia."
    },
    'dra-ana-carolina': {
        nome: "Dra. Ana Carolina Capetini",
        cro: "CRO 11423 ES",
        especialidades: "Clínico Geral",
        foto: "images/dra-carol-nova-mini.jpg",
        fotoAlta: "images/dra-carol-nova-alta.jpg",
        descricao: "Pós-graduada em Cirurgia Oral Menor. Pós-graduada em Harmonização Orofacial."
    },
    'dr-douglas': {
        nome: "Dr. Douglas Neves",
        cro: "CRO 8209 ES",
        especialidades: "Dentística",
        foto: "images/dr-douglas-nova-mini.jpg",
        fotoAlta: "images/dr-douglas-nova-alta.jpg",
        descricao: "Pós-graduado em Odontologia Estética."
    },
    'dra-thalita': {
        nome: "Dra. Thalita Zardo Januth",
        cro: "CRO 11467 ES",
        especialidades: "Clínica Geral",
        foto: "images/dra-thalita-nova-mini.jpg",
        fotoAlta: "images/dra-thalita-nova-alta.jpg",
        descricao: "Especialista em Ortodontia."
    },
    'dra-gabriela': {
        nome: "Dra. Gabriela Furlan Furtado",
        cro: "CRO 5773 ES",
        especialidades: "Odontopediatra",
        foto: "images/dra-gabriela-nova-mini.jpg",
        fotoAlta: "images/dra-gabriela-nova-alta.jpg",
        descricao: "Especialista em Odontopediatria."
    }
};

// 2. Elementos do DOM para o modal
const profissionalCards = document.querySelectorAll('.profissional-card');
const modal = document.getElementById('profissionalModal');
const modalInfoContainer = document.getElementById('modalProfissionalInfo');
const closeModalButton = document.querySelector('#profissionalModal .close-modal');

// 3. Mapeamento para corrigir os IDs repetidos no HTML
const idMap = {
    'dr-masioli': 'dr-masioli',
    'dra-bianca-nova-mini.jpg': 'dra-bianca',
    'dr-hindra-nova-mini.jpg': 'dra-hindra',
    'miniatura_0000_Dra-Quezia-Godinho.jpg': 'dra-quezia',
    'dra-deise-nova-mini.png': 'dra-deise',
    'miniatura_0007_Dr-Kleber-Borgo-Kill.jpg': 'dr-kleber',
    'dra-carol-nova-mini.jpg': 'dra-ana-carolina',
    'dr-douglas-nova-mini.jpg': 'dr-douglas',
    'dra-thalita-nova-mini.jpg': 'dra-thalita',
    'dra-gabriela-nova-mini.jpg': 'dra-gabriela'
};

// 4. Lógica para abrir e preencher o modal
profissionalCards.forEach(card => {
    card.addEventListener('click', function() {
        let originalId = this.dataset.profissionalId;
        let profissionalKey;

        if (originalId === 'dr-associado1') {
            const imgSrc = this.querySelector('img').src;
            const imgName = imgSrc.split('/').pop();
            profissionalKey = idMap[imgName];
        } else {
            profissionalKey = idMap[originalId];
        }

        const data = profissionaisData[profissionalKey];

        if (data && modal && modalInfoContainer) {
            let descricaoHtml;

            if (data.descricao.includes('.')) {
                const titulosArray = data.descricao.split('.').filter(frase => frase.trim() !== '').map(frase => `<li>${frase.trim()}.</li>`);
                descricaoHtml = `<ul class="lista-titulos-modal">${titulosArray.join('')}</ul>`;
            } else {
                descricaoHtml = `<p>${data.descricao}</p>`;
            }

            // AJUSTE PRINCIPAL: envolvido o texto em uma div
            modalInfoContainer.innerHTML = `
                <img src="${data.fotoAlta}" alt="${data.nome}">
                <div class="texto-profissional">
                    <h3>${data.nome}</h3>
                    <h4>${data.cro}</h4>
                    <p><strong>Especialidade:</strong> ${data.especialidades}</p>
                    ${descricaoHtml}
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            console.warn(`Dados não encontrados para o profissional com a chave: ${profissionalKey}`);
        }
    });
});

// 5. Lógica para fechar o modal de profissionais
function closeProfissionalModal() {
    if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', closeProfissionalModal);
}
if (modal) {
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeProfissionalModal();
        }
    });
}
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeProfissionalModal();
    }
});
    // -------------------------------------------------------------------
    // --- UTILITÁRIOS (FORMULÁRIOS, ANO, ANIMAÇÕES) ---
    // -------------------------------------------------------------------
    
    // Atualizar ano no rodapé
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Função genérica para lidar com submissão de formulário
    function handleFormSubmit(formId, successMessagePrefix) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const nomeInput = form.querySelector('input[name="nome"]');
                const nome = nomeInput ? nomeInput.value : "Usuário";
                alert(`${successMessagePrefix}: Obrigado, ${nome}! Sua mensagem foi enviada. (Simulação)`);
                form.reset();
            });
        }
    }

    handleFormSubmit('contactForm', 'Formulário Index');
    handleFormSubmit('contactFormPage', 'Formulário Página Contato');

    // Animação de fade-in ao rolar
    const animatedElements = document.querySelectorAll('section > .container > *:not(.section-title), .section-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });

    console.log("Masioli Odontologia - Site V2 Carregado e Scripts Prontos!");
});

    // -------------------------------------------------------------------
    // --- LÓGICA PARA O ACORDEÃO (MÍDIAS) ---
    // -------------------------------------------------------------------
    const accordions = document.querySelectorAll('.collapsible-toggle');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            // Fecha todos os outros acordeões abertos
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== this) {
                    otherAccordion.classList.remove('active');
                    const otherContent = otherAccordion.nextElementSibling;
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }
                }
            });

            // Abre ou fecha o acordeão clicado
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Fecha o acordeão
            } else {
                // Abre o acordeão definindo a altura máxima para o tamanho do seu conteúdo
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });