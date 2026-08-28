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
    // 1. SISTEMA DINÂMICO DE WHATSAPP + RASTREAMENTO
    // ==========================================
    const NUMERO_WHATSAPP = "551124797811";
    const botoesWhatsapp = document.querySelectorAll('.btn-wa');
    
    botoesWhatsapp.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            const mensagemBruta = this.getAttribute('data-message') || "Olá! Gostaria de mais informações sobre a Autoescola.";
            const mensagemCodificada = encodeURIComponent(mensagemBruta);
            const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
            
            // Disparo para o dataLayer (Personalizado)
            if (this.getAttribute('data-track') && window.dataLayer) {
                window.dataLayer.push({
                    'event': this.getAttribute('data-track'),
                    'button_location': 'Website Geração Colibri'
                });
            }

            // Disparo de Conversão Oficial do Google Ads
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-620881332/W8NKCPyQouccELTLh6gC'
                });
            }
            
            // Abre o WhatsApp em nova guia
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
    // 4. CARROSSEL SUAVE E CONTÍNUO (INFINITE MARQUEE)
    // ==========================================
    function iniciarCarrosselInfinito() {
        const trilho = document.getElementById('trilho-depoimentos');
        if (!trilho) return; 

        const cards = Array.from(trilho.children);

        cards.forEach(card => {
            const clone = card.cloneNode(true);
            trilho.appendChild(clone);
        });
    }
    
    iniciarCarrosselInfinito();

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
            menuPrincipal.classList.toggle('ativo');
            
            if (menuPrincipal.classList.contains('ativo')) {
                iconeMenu.classList.remove('ph-list');
                iconeMenu.classList.add('ph-x');
            } else {
                iconeMenu.classList.remove('ph-x');
                iconeMenu.classList.add('ph-list');
            }
        });
        
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

// ==========================================
    // 7. CONTROLE DO BANNER DE COOKIES
    // ==========================================
    document.addEventListener("DOMContentLoaded", function() {
        const cookieBanner = document.getElementById('cookie-banner');
        const btnAceitarCookies = document.getElementById('btn-aceitar-cookies');

        // DICA DE TESTE: Descomente a linha abaixo (tire as //) se quiser forçar o banner a aparecer SEMPRE enquanto você programa.
        // localStorage.removeItem('cookiesAceitos');

        if (cookieBanner && !localStorage.getItem('cookiesAceitos')) {
            setTimeout(() => {
                cookieBanner.classList.add('mostrar');
            }, 1000);
        }

        if (btnAceitarCookies) {
            btnAceitarCookies.addEventListener('click', () => {
                localStorage.setItem('cookiesAceitos', 'true');
                cookieBanner.classList.remove('mostrar');
            });
        }
    });

    document.addEventListener('DOMContentLoaded', async () => {
                const containerFeed = document.getElementById('meu-feed-instagram');
                // ID atualizado fornecido pelo usuário
                const urlBehold = 'https://feeds.behold.so/UFos3tzBcaYIXUHYTJpl';

                try {
                    const resposta = await fetch(urlBehold);
                    const dados = await resposta.json();
                    const posts = dados.posts || [];
                    const ultimosPosts = posts.slice(0, 6);

                    ultimosPosts.forEach(post => {
                        const card = document.createElement('a');
                        card.href = post.permalink;
                        card.target = '_blank';
                        card.className = 'insta-card';
                        card.setAttribute('aria-label', 'Ver post no Instagram');

                        const isVideo = post.mediaType === 'VIDEO' && post.mediaUrl;

                        if (isVideo) {
                            const video = document.createElement('video');
                            video.src = post.mediaUrl;
                            video.poster = post.thumbnailUrl || (post.sizes && post.sizes.medium ? post.sizes.medium.mediaUrl : '');
                            video.muted = true;
                            video.loop = true;
                            video.playsInline = true;
                            video.style.width = '100%';
                            video.style.height = '100%';
                            video.style.objectFit = 'cover';

                            card.addEventListener('mouseenter', () => {
                                video.play().catch(e => console.log("Reprodução impedida pelo navegador", e));
                            });

                            card.addEventListener('mouseleave', () => {
                                video.pause();
                                video.currentTime = 0;
                            });

                            card.appendChild(video);
                        } else {
                            const imagem = document.createElement('img');
                            if (post.sizes && post.sizes.medium && post.sizes.medium.mediaUrl) {
                                imagem.src = post.sizes.medium.mediaUrl;
                            } else {
                                imagem.src = post.thumbnailUrl ? post.thumbnailUrl : post.mediaUrl;
                            }
                            imagem.alt = post.prunedCaption ? post.prunedCaption.substring(0, 50) + '...' : 'Post do Instagram da Geração Colibri';
                            imagem.loading = 'lazy';

                            card.appendChild(imagem);
                        }

                        containerFeed.appendChild(card);
                    });
                } catch (erro) {
                    console.error('Erro ao carregar o feed do Instagram:', erro);
                    containerFeed.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--cor-texto);">Não foi possível carregar as fotos no momento. Visite nosso perfil no Instagram!</p>';
                }
            });