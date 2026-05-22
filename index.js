document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. CONTROLE DO MENU DROPDOWN (CABEÇALHO)
    // ==========================================
    const linkDropdown = document.querySelector('.link-dropdown');
    const submenu = document.querySelector('.submenu');

    if (linkDropdown && submenu) {
        linkDropdown.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation(); 
            
            submenu.classList.toggle('mostrar');
            
            const iconeSeta = this.querySelector('.icone-seta');
            if(iconeSeta) {
                iconeSeta.style.transform = submenu.classList.contains('mostrar') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (submenu && submenu.classList.contains('mostrar') && !e.target.closest('.dropdown')) {
            submenu.classList.remove('mostrar');
            const iconeSeta = linkDropdown.querySelector('.icone-seta');
            if(iconeSeta) iconeSeta.style.transform = 'rotate(0deg)';
        }
    });

    const linksSubmenu = document.querySelectorAll('.submenu a');
    linksSubmenu.forEach(link => {
        link.addEventListener('click', () => {
            if (submenu) {
                submenu.classList.remove('mostrar');
                const iconeSeta = linkDropdown.querySelector('.icone-seta');
                if(iconeSeta) iconeSeta.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // ==========================================
    // 1. SISTEMA DINÂMICO DE WHATSAPP
    // ==========================================
    const NUMERO_WHATSAPP = "551124797811";
    const botoesWhatsapp = document.querySelectorAll('.btn-wa');
    
    botoesWhatsapp.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            const mensagemBruta = this.getAttribute('data-message') || "Olá! Gostaria de mais informações sobre a Autoescola.";
            const mensagemCodificada = encodeURIComponent(mensagemBruta);
            const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
            
            if (this.getAttribute('data-track') && window.dataLayer) {
                window.dataLayer.push({
                    'event': this.getAttribute('data-track'),
                    'button_location': 'Website Geração Colibri'
                });
            }
            
            window.open(linkWhatsApp, '_blank');
        });
    });

    // ==========================================
    // 2. ALTERNÂNCIA DE MODO ESCURO (DARK MODE)
    // ==========================================
    const btnDark = document.getElementById('btn-dark');
    if (btnDark) {
        btnDark.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('temaEscuro', isDark);
            
            const icone = btnDark.querySelector('i');
            if (isDark) {
                icone.classList.remove('ph-moon');
                icone.classList.add('ph-sun');
            } else {
                icone.classList.remove('ph-sun');
                icone.classList.add('ph-moon');
            }
        });
        
        if (localStorage.getItem('temaEscuro') === 'true') {
            document.body.classList.add('dark-mode');
            const icone = btnDark.querySelector('i');
            if(icone) {
                icone.classList.remove('ph-moon');
                icone.classList.add('ph-sun');
            }
        }
    }

    // ==========================================
    // 3. LÓGICA DO ACCORDION (FAQ)
    // ==========================================
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');
    
    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const itemAtual = pergunta.parentElement;
            const estaAberto = itemAtual.classList.contains('ativo');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('ativo');
            });
            
            if (!estaAberto) {
                itemAtual.classList.add('ativo');
            }
        });
    });

    // ==========================================
    // 4. CARROSSEL DE AVALIAÇÕES (Drag Livre + Loop Infinito)
    // ==========================================
    const slider = document.getElementById('carrossel-avaliacoes');
    const trackReview = slider ? slider.querySelector('.carrossel-track') : null;

    if (slider && trackReview) {
        
        const cardsHTML = trackReview.innerHTML;
        trackReview.innerHTML = cardsHTML + cardsHTML + cardsHTML;

        setTimeout(() => {
            slider.scrollLeft = slider.scrollWidth / 3;
        }, 100);

        slider.addEventListener('scroll', () => {
            const umTerco = slider.scrollWidth / 3;
            if (slider.scrollLeft === 0) {
                slider.scrollLeft = umTerco;
            } else if (slider.scrollLeft >= umTerco * 2) {
                slider.scrollLeft = umTerco + (slider.scrollLeft - umTerco * 2); 
            }
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => { isDown = false; });
        slider.addEventListener('mouseup', () => { isDown = false; });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5; 
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // ==========================================
    // 5. ANIMAÇÕES NO SCROLL (INTERSECTION OBSERVER)
    // ==========================================
    const elementosAnimar = document.querySelectorAll('.animar-fade');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null, 
        rootMargin: '0px',
        threshold: 0.10
    });

    elementosAnimar.forEach(elemento => {
        observer.observe(elemento);
    });

    // ==========================================
    // 6. MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    const btnMobile = document.querySelector('.menu-mobile-btn');
    const menuPrincipal = document.querySelector('.menu-principal');
    
    if (btnMobile && menuPrincipal) {
        const iconeMenu = btnMobile.querySelector('i');

        btnMobile.addEventListener('click', () => {
            // Abre ou fecha o menu
            menuPrincipal.classList.toggle('ativo');
            
            // Troca o ícone (Barrinhas <-> X)
            if (menuPrincipal.classList.contains('ativo')) {
                iconeMenu.classList.remove('ph-list');
                iconeMenu.classList.add('ph-x');
            } else {
                iconeMenu.classList.remove('ph-x');
                iconeMenu.classList.add('ph-list');
            }
        });
        
        // Fecha o menu automaticamente quando o usuário clica em qualquer link
        const linksMenu = menuPrincipal.querySelectorAll('a:not(.link-dropdown)');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                menuPrincipal.classList.remove('ativo');
                if(iconeMenu) {
                    iconeMenu.classList.remove('ph-x');
                    iconeMenu.classList.add('ph-list');
                }
            });
        });
    }
});