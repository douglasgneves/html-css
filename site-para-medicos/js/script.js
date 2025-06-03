document.addEventListener('DOMContentLoaded', function() {

    // Menu Hamburguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Ícone X
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Ícone Barras
            }
        });
    }

    // Fechar menu ao clicar em um link (para SPAs)
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Atualizar ano no rodapé
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll Spy simples para marcar link ativo no menu (opcional)
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajuste de 60px para o header fixo
            if (pageYOffset >= (sectionTop - sectionHeight / 3 - 60)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });


    // Formulário de Contato (Apenas exemplo de captura, não envia dados)
    // Para enviar, você precisará de um backend (PHP, Node.js, Python etc.) ou um serviço como Formspree, Netlify Forms.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário
            
            // Coletar dados (exemplo)
            const name = this.name.value;
            const email = this.email.value;
            const message = this.message.value;

            console.log('Formulário enviado (simulação):');
            console.log('Nome:', name);
            console.log('Email:', email);
            console.log('Mensagem:', message);

            alert('Obrigado pelo seu contato! (Esta é uma simulação, o formulário não foi enviado para um servidor.)');
            this.reset(); // Limpa o formulário
        });
    }

});