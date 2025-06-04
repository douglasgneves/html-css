document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) {
        console.log("Nenhum elemento com a classe 'animate-on-scroll' encontrado.");
        return;
    }

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Pega o delay do data attribute ou usa 0 se não definido
                const delay = parseInt(element.dataset.animationDelay) || 0;

                setTimeout(() => {
                    element.classList.add('is-visible');
                }, delay);

                // Para de observar o elemento após a animação ser disparada uma vez
                observer.unobserve(element);
            }
        });
    };

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // Observa intersecções em relação à viewport
        rootMargin: '0px 0px -50px 0px', // Dispara a animação 50px antes do elemento entrar completamente na viewport pelo fundo
        threshold: 0.1  // Pelo menos 10% do elemento precisa estar visível
        // threshold: 0 significa que dispara assim que 1 pixel entra na área de rootMargin
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    console.log(`Observando ${animatedElements.length} elementos para animação.`);
});