document.addEventListener('DOMContentLoaded', function () {
    // Ano atual no rodapé da landing page
    if (document.getElementById('current-year-cursos')) {
        document.getElementById('current-year-cursos').textContent = new Date().getFullYear();
    }

    // Menu Mobile para Cursos
    const mobileMenuButtonCursos = document.querySelector('.mobile-menu-button-cursos');
    const cursosHeader = document.querySelector('.cursos-header'); // Alterado para o header dos cursos
    const cursosNavLinks = document.querySelector('.cursos-header .cursos-nav-links');

    if (mobileMenuButtonCursos && cursosNavLinks && cursosHeader) {
        mobileMenuButtonCursos.addEventListener('click', () => {
            const isExpanded = mobileMenuButtonCursos.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButtonCursos.setAttribute('aria-expanded', !isExpanded);
            // cursosNavLinks.classList.toggle('active'); // Usaremos a classe no header para ter mais controle
            cursosHeader.classList.toggle('active'); // Adiciona/remove 'active' no header
            
            // Alternar ícone (opcional, mas bom para UX)
            const icon = mobileMenuButtonCursos.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        questionButton.addEventListener('click', () => {
            // Fecha outros itens abertos (opcional)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.classList.contains('active')) {
            //         otherItem.classList.remove('active');
            //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
            //     }
            // });

            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Inicialização do Swiper (se você descomentar os links no HTML)
    // Swiper para Instrutores (exemplo)
    if (document.querySelector('.instrutoresSwiper')) {
        var instrutoresSwiper = new Swiper(".instrutoresSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".instrutores-pagination",
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20, },
                768: { slidesPerView: 3, spaceBetween: 30, },
                1024: { slidesPerView: 4, spaceBetween: 30, },
            }
        });
    }

    // Swiper para Depoimentos (exemplo)
    if (document.querySelector('.depoimentosSwiper')) {
        var depoimentosSwiper = new Swiper(".depoimentosSwiper", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: { delay: 5000, disableOnInteraction: false, },
            pagination: { el: ".depoimentos-pagination", clickable: true, },
             breakpoints: {
                768: { slidesPerView: 2, }
            }
        });
    }

});