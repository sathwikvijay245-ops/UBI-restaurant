document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. LIGHT / DARK THEME TOGGLE (CREAM THEME)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('ubi_theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('ubi_theme', isLight ? 'light' : 'dark');
        });
    }


    /* ==========================================
       1. STICKY NAVBAR ON SCROLL
       ========================================== */
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on page load


    /* ==========================================
       2. MOBILE MENU DRAWER
       ========================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Lock body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when resizing screen beyond mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });


    /* ==========================================
       3. INTERACTIVE MENU TABS
       ========================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.menu-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 1. Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Hide all contents with a quick fade-out, then display selected content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });


    /* ==========================================
       4. PREMIUM SCROLL REVEAL (IntersectionObserver)
       ========================================== */
    // Create elements list to animate
    const revealElements = [
        document.querySelector('.about-text-wrapper'),
        document.querySelector('.about-image-wrapper'),
        document.querySelector('.menu-header'),
        document.querySelector('.menu-tabs'),
        document.querySelector('.menu-container'),
        document.querySelector('.contact-card'),
        document.querySelector('.map-card-wrapper')
    ].filter(el => el !== null); // Ensure they exist

    // Add initial CSS for reveal animations inline to avoid layouts jumping before JS loads
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // offset to reveal slightly before element enters screen
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
