document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contactForm');
    const loadingSpinner = document.getElementById('loading');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const navLinks = document.querySelectorAll('#navMenu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]'); // Assumindo que seções principais têm IDs
    const currentYearSpan = document.getElementById('currentYear');

    // --- Configurações ---
    const SCROLL_THRESHOLD_HEADER = 50;
    const SCROLL_THRESHOLD_BACK_TO_TOP = 200;

    // --- Update Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            const isExpanded = navMenu.classList.contains('active');
            
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded.toString());
            icon.classList.toggle('fa-bars', !isExpanded);
            icon.classList.toggle('fa-times', isExpanded);
            // Travar scroll do body quando menu estiver aberto (opcional)
            // document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link inside it
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
                // document.body.style.overflow = '';
            }
        });
    }

    // --- Smooth Scrolling & Active Link Highlighting ---
    // O `scroll-padding-top` no CSS html {} já cuida do offset do header para o scroll.
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Para fechar o menu mobile se estiver aberto e um link for clicado
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            // Não precisa de e.preventDefault() se o scroll-behavior:smooth e scroll-padding-top estiverem no CSS
        });
    });
    
    function updateActiveLink() {
        let currentSectionId = '';
        const headerHeight = header ? header.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Ajuste para considerar a altura do header e um pequeno buffer
            if (window.pageYOffset >= sectionTop - headerHeight - 20) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Verifica se o href do link (removendo o '#') é igual ao ID da seção atual
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active-link');
            }
        });
    }


    // --- Header Style Change & Back to Top Button Visibility on Scroll ---
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header style change
        if (header) {
            header.classList.toggle('scrolled', scrollTop > SCROLL_THRESHOLD_HEADER);
        }

        // Back to Top Button
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('show', scrollTop > SCROLL_THRESHOLD_BACK_TO_TOP);
        }
        
        // Update active link in navigation
        updateActiveLink();
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // --- Back to Top Button Functionality ---
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Initial Page Load Animations (for Hero) ---
    const elementsToAnimateOnLoad = document.querySelectorAll('.animate-on-load');
    elementsToAnimateOnLoad.forEach((el, index) => {
        // Um pequeno timeout para escalonar a animação se não houver classes de delay específicas
        // A classe de delay no CSS é mais robusta
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100); // Ou use os delay-N do CSS
    });
    

    // --- Scroll Reveal Animation (using Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0 && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animar apenas uma vez
                }
            });
        }, {
            root: null,
            threshold: 0.15, // 15% do elemento visível para disparar
            // rootMargin: "0px 0px -50px 0px" // Disparar um pouco antes do elemento estar totalmente visível
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: Simplesmente mostra os elementos se IntersectionObserver não for suportado
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // --- Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (loadingSpinner) loadingSpinner.classList.add('show');

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries()); // Converte para objeto se necessário

            // SIMULAÇÃO DE ENVIO: Substitua pela sua lógica de envio real (fetch, Formspree, etc.)
            console.log('Dados do formulário:', data);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay da rede

            if (loadingSpinner) loadingSpinner.classList.remove('show');
            
            // Exemplo de mensagem de sucesso/erro
            // Você pode substituir alert por uma notificação mais elegante
            alert(`Obrigado, ${data.name || 'Visitante'}! Sua mensagem foi "enviada".`);
            contactForm.reset();
            
            // Resetar os labels flutuantes (se eles não voltarem sozinhos)
            // Isso pode ser necessário se o :not(:placeholder-shown) não for suficiente após o reset.
            contactForm.querySelectorAll('.form-group label').forEach(label => {
                label.style.top = ''; // Reset inline styles if any were applied by JS
                label.style.fontSize = '';
                // Ou force a classe inicial se tiver uma
            });
        });
    }
});