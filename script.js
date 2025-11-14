document.addEventListener('DOMContentLoaded', function () {

    feather.replace();

    const menuToggle = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('nav-menu-list');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.getAttribute('data-feather') === 'menu') {
            icon.setAttribute('data-feather', 'x');
        } else {
            icon.setAttribute('data-feather', 'menu');
        }
        feather.replace(); 
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').setAttribute('data-feather', 'menu');
                feather.replace();
            }
        });
    });


    const typewriterElement = document.getElementById('typewriter');
    const roles = ['Developer', 'Designer', 'Freelancer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenRoles = 2000;

    function type() {
        if (!typewriterElement) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); 
            } else {
                setTimeout(type, erasingSpeed);
            }
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, delayBetweenRoles);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }
    if (typewriterElement) {
        setTimeout(type, 500);
    }

    const allNavLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; 
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentSection = sections[sections.length - 1].getAttribute('id');
        }

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        if (currentSection === '') {
            document.querySelector('.nav-menu a[href="#home"]').classList.add('active');
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
});