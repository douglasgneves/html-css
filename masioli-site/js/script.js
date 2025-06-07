document.addEventListener('DOMContentLoaded', function() {
    // ... (código do menu, carrosséis, modal de profissionais) ...

    // Modal de Tratamentos
    const btnsAbrirModalTratamento = document.querySelectorAll('.open-tratamento-modal');
    const modalTratamento = document.getElementById('tratamentoModal');
    const modalTratamentoInfoContainer = document.getElementById('modalTratamentoInfo');
    const btnFecharModalTratamento = modalTratamento ? modalTratamento.querySelector('.close-tratamento-modal') : null;

    // Dados dos Tratamentos (simulados - idealmente viriam de um CMS ou JSON)
    const tratamentosData = {
        'estetica': {
            titulo: "Odontologia Estética Avançada",
            imagem: "https://via.placeholder.com/400x250/253951/EDEDEE?text=Estética+Detalhe", // Substitua pela imagem real
            descricao: "Transforme seu sorriso com as mais modernas técnicas de odontologia estética. Realizamos um planejamento individualizado para alcançar a harmonia facial e a beleza natural do seu sorriso. Nossos tratamentos incluem clareamento dental a laser, facetas de porcelana ou resina, lentes de contato dental, e restaurações estéticas que mimetizam perfeitamente a cor e forma dos seus dentes naturais.",
            beneficios: [
                "Sorriso mais branco e atraente.",
                "Correção de imperfeições (cor, forma, tamanho).",
                "Aumento da autoestima e confiança.",
                "Resultados duradouros com os devidos cuidados."
            ],
            ctaLink: "#contato" // Link para agendamento específico, se houver
        },
        'implantes': {
            titulo: "Implantes Dentários: Recupere seu Sorriso",
            imagem: "https://via.placeholder.com/400x250/A67955/EDEDEE?text=Implante+Detalhe", // Substitua pela imagem real
            descricao: "Os implantes dentários são a solução mais moderna e eficaz para a reposição de dentes perdidos. Consistem em pinos de titânio biocompatíveis que são cirurgicamente inseridos no osso maxilar ou mandibular, funcionando como raízes artificiais sobre as quais são fixadas as próteses (coroas). Este tratamento restaura a função mastigatória, a fonética e a estética do sorriso, proporcionando conforto e segurança.",
            beneficios: [
                "Solução fixa e de aparência natural.",
                "Melhora da capacidade de mastigação e fala.",
                "Preservação da estrutura óssea facial.",
                "Não desgasta dentes vizinhos (como em pontes tradicionais)."
            ],
            ctaLink: "#contato"
        },
        'ortodontia': {
            titulo: "Ortodontia Moderna para Todas as Idades",
            imagem: "https://via.placeholder.com/400x250/8D8D8D/EDEDEE?text=Orto+Detalhe", // Substitua pela imagem real
            descricao: "Corrija o alinhamento dos seus dentes e a sua mordida com nossos tratamentos ortodônticos. Oferecemos desde os aparelhos metálicos convencionais até as opções mais discretas e confortáveis, como os alinhadores invisíveis (Invisalign® ou similar) e aparelhos estéticos de safira ou porcelana. Um sorriso alinhado não é apenas estética, mas também saúde, facilitando a higienização e prevenindo problemas futuros.",
            beneficios: [
                "Dentes alinhados e sorriso harmonioso.",
                "Melhora da oclusão (mordida).",
                "Facilidade na higienização bucal.",
                "Prevenção de desgastes dentários e problemas na ATM."
            ],
            ctaLink: "#contato"
        }
        // Adicione dados para outros tratamentos aqui
    };

    if (btnsAbrirModalTratamento.length > 0 && modalTratamento && modalTratamentoInfoContainer) {
        btnsAbrirModalTratamento.forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.preventDefault(); // Impede que o link "#" mude a URL
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
                    document.body.style.overflow = 'hidden'; // Impede scroll do body
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

        // Fechar modal clicando fora dele (compartilhado com outros modais, se houver)
        modalTratamento.addEventListener('click', function(event) {
            if (event.target === modalTratamento) {
                modalTratamento.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Fechar modal com a tecla ESC (reutiliza a lógica do modal de profissionais se já existir)
        // Se não, adicione:
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && modalTratamento.classList.contains('active')) {
                modalTratamento.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

    } else {
        if (btnsAbrirModalTratamento.length === 0) console.warn("Nenhum botão '.open-tratamento-modal' encontrado.");
        if (!modalTratamento) console.warn("Elemento '#tratamentoModal' não encontrado.");
        if (!modalTratamentoInfoContainer) console.warn("Elemento '#modalTratamentoInfo' não encontrado.");
    }

    // ... (restante do seu script.js, como formulário de contato e ano atual) ...
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
            const isExpanded = navUl.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.innerHTML = isExpanded ? '×' : '☰';
        });

        // Fechar menu ao clicar em um link (para SPAs ou navegação na mesma página)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '☰';
                }
            });
        });
    }

    // Inicializar Carrossel Principal (Hero)
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
            effect: 'fade', // Efeito de fade entre slides
            fadeEffect: {
                crossFade: true
            },
        });
    }

    // Inicializar Carrossel de Depoimentos
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

    // Modal de Profissionais
    const profissionalCards = document.querySelectorAll('.profissional-card');
    const modal = document.getElementById('profissionalModal');
    const modalInfoContainer = document.getElementById('modalProfissionalInfo');
    const closeModalButton = document.querySelector('.close-modal');

    // Dados dos profissionais (simulados - em um app real, viriam de um CMS ou BD)
    const profissionaisData = {
        'dra-masioli': {
            nome: "Dra. Nome Sobrenome Masioli",
            cro: "CRO UF XXXXX",
            especialidades: "Clínica Geral, Estética Dental, Harmonização Orofacial",
            foto: "https://via.placeholder.com/150x150/A67955/FFFFFF?text=Dra.+M", // Substitua pela foto real
            descricao: "Com vasta experiência e paixão pela odontologia, a Dra. Masioli dedica-se a transformar sorrisos e melhorar a qualidade de vida de seus pacientes. Especialista em tratamentos estéticos e reabilitadores, busca sempre as técnicas mais inovadoras e os melhores resultados, com um atendimento humanizado e focado nas necessidades individuais de cada um."
        },
        'dr-associado1': {
            nome: "Dr. Nome Sobrenome Associado",
            cro: "CRO UF YYYYY",
            especialidades: "Implantodontia, Cirurgia Oral Menor",
            foto: "https://via.placeholder.com/150x150/253951/FFFFFF?text=Dr.+A", // Substitua pela foto real
            descricao: "O Dr. Associado é especialista em reabilitações orais complexas utilizando implantes dentários, devolvendo função e estética com precisão. Sua abordagem é focada na segurança do paciente e na durabilidade dos tratamentos, utilizando materiais de alta qualidade e planejamento digital."
        }
        // Adicione mais profissionais aqui
    };

    profissionalCards.forEach(card => {
        card.addEventListener('click', function() {
            const profissionalId = this.dataset.profissionalId;
            const data = profissionaisData[profissionalId];

            if (data && modal && modalInfoContainer) {
                modalInfoContainer.innerHTML = `
                    <img src="${data.foto}" alt="${data.nome}">
                    <h3>${data.nome}</h3>
                    <h4>${data.cro}</h4>
                    <p><strong>Especialidades:</strong> ${data.especialidades}</p>
                    <p>${data.descricao}</p>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Impede scroll do body
            }
        });
    });

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Fechar modal clicando fora dele
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) { // Se o clique foi no fundo do modal
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


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
            const nomeInput = form.querySelector('input[name="nome"]'); // Supõe que haja um campo nome
            const nome = nomeInput ? nomeInput.value : "Usuário";
            alert(`${successMessagePrefix}: Obrigado, ${nome}! Sua mensagem foi enviada. (Simulação)`);
            form.reset();
        });
    }
}

// Chamar para formulários diferentes
handleFormSubmit('contactForm', 'Formulário Index'); // Se você mantiver um na index
handleFormSubmit('contactFormPage', 'Formulário Página Contato');

    // Animação de fade-in ao rolar (simples)
    const animatedElements = document.querySelectorAll('section > .container > *:not(.section-title), .section-title'); // Anima elementos dentro de seções
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // 10% visível

    animatedElements.forEach(el => {
        el.classList.add('fade-in-hidden'); // Começa escondido
        observer.observe(el);
    });


    console.log("Masioli Odontologia - Site V2 Carregado e Scripts Prontos!");
});