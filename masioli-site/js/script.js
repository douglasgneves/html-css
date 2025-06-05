document.addEventListener('DOMContentLoaded', function() {

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

    // Simulação de envio de formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            // Adicionar mais validações se necessário
            alert(`Obrigado, ${nome}! Sua solicitação de agendamento foi enviada. (Simulação)`);
            contactForm.reset();
        });
    }

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