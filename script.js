document.addEventListener('DOMContentLoaded', () => {
    const animate = (element, delay = 0) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    };

    animate(document.querySelector('h1'), 300);

    document.querySelectorAll('.hero-tags span').forEach((tag, index) => {
        animate(tag, 500 + (index * 100));
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById(e.target.getAttribute('href').substring(1))
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const observeElements = (elements, callback, threshold = 0.1) => {
        const observer = new IntersectionObserver(entries => 
            entries.forEach(entry => entry.isIntersecting && callback(entry.target)),
            { threshold }
        );
        elements.forEach(element => observer.observe(element));
    };

    observeElements(document.querySelectorAll('.progress-bar'), bar => {
        bar.style.setProperty('--progress', `${bar.getAttribute('data-progress')}%`);
    }, 0.5);

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });

    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        alert('Hvala na poruci! Javit ću vam se uskoro.');
        contactForm.reset();
    });

    observeElements(document.querySelectorAll('.section'), 
        section => section.classList.add('visible')
    );
});

window.addEventListener('scroll', () => 
    document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 0)
);
