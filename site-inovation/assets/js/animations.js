// assets/js/animations.js

function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.animationDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay));
                    // observer.unobserve(entry.target); // Para animar apenas uma vez
                } else {
                    // entry.target.classList.remove('is-visible'); // Para reverter animação
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Espera o evento 'componentsLoaded' disparado por component-loader.js
document.addEventListener('componentsLoaded', initializeAnimations);

// Fallback (similar ao main.js)
// if (document.readyState !== 'loading' && !window.componentsAreBeingLoaded && window.componentsLoadedFired) {
//    initializeAnimations();
// }