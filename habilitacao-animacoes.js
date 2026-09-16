/* ==========================================================
   HABILITAÇÃO — CAMADA DE ANIMAÇÕES E SCROLLYTELLING
   Este arquivo é exclusivo da página habilitacao.html.
   Não altera header, footer, menu, rastreamento (GA/Pixel)
   nem o index.js compartilhado do site — tudo aqui é
   adicionado dinamicamente via JS, escopado à classe
   "fx-habilitacao" no <body>.
   ========================================================== */
(function () {
    'use strict';

    // Marca a página para que as regras de CSS (em style.css)
    // só se apliquem aqui, nunca nas outras páginas do site.
    document.body.classList.add('fx-habilitacao');

    var prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var temMouseFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    document.addEventListener('DOMContentLoaded', function () {

        // ==========================================
        // 1. BARRA DE PROGRESSO DE LEITURA
        // ==========================================
        var barra = document.createElement('div');
        barra.className = 'fx-barra-progresso';
        var preenchimento = document.createElement('div');
        preenchimento.className = 'fx-barra-progresso-preenchimento';
        barra.appendChild(preenchimento);
        document.body.appendChild(barra);

        function atualizarBarraProgresso() {
            var alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
            var progresso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
            preenchimento.style.width = progresso + '%';
        }

        // ==========================================
        // 2. PARALLAX SUTIL NO HERO DE ATALHOS
        // ==========================================
        var hero = document.getElementById('atalhos-habilitacao');

        function atualizarParallaxHero() {
            if (!hero || prefereMenosMovimento) return;
            var rect = hero.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            var deslocamento = window.scrollY * 0.2;
            hero.style.backgroundPositionY = 'calc(50% + ' + deslocamento + 'px)';
        }

        // ==========================================
        // 3. SCROLLYTELLING — "COMO FUNCIONA O PROCESSO"
        // Uma linha que se preenche conforme o scroll avança
        // pelas 9 etapas, acendendo cada marcador na hora certa.
        // ==========================================
        var timeline = document.querySelector('#processo .timeline-jornada');
        var linhaProgresso = null;
        var passos = [];

        if (timeline) {
            linhaProgresso = document.createElement('div');
            linhaProgresso.className = 'fx-linha-progresso-timeline';
            timeline.insertBefore(linhaProgresso, timeline.firstChild);
            passos = Array.prototype.slice.call(timeline.querySelectorAll('.passo-jornada'));
        }

        function atualizarTimeline() {
            if (!timeline || !linhaProgresso || prefereMenosMovimento) return;
            var rect = timeline.getBoundingClientRect();
            var alturaJanela = window.innerHeight;

            var inicio = alturaJanela * 0.8;
            var fim = alturaJanela * 0.3;
            var percorrido = inicio - rect.top;
            var distanciaTotal = (rect.height + (inicio - fim)) || 1;
            var progresso = Math.max(0, Math.min(1, percorrido / distanciaTotal));

            linhaProgresso.style.height = (progresso * 100) + '%';

            passos.forEach(function (passo, i) {
                var pontoAtivacao = (i + 0.5) / passos.length;
                if (progresso >= pontoAtivacao) {
                    passo.classList.add('fx-ativo');
                } else {
                    passo.classList.remove('fx-ativo');
                }
            });
        }

        // ==========================================
        // 4. REVEAL EM CASCATA (STAGGER) PARA GRIDS DE CARDS
        // Aplicado inteiramente via JS — nenhuma classe nova
        // precisa existir no HTML de antemão.
        // ==========================================
        var gruposParaCascata = [
            '#atalhos-habilitacao .container > div > a',
            '.grid-servicos',
            '#adicao-mudanca .grid-2',
            '.planos-grid',
            '.faq-container'
        ];

        var elementosStagger = [];

        gruposParaCascata.forEach(function (seletor) {
            var alvo = document.querySelector(seletor) || document;
            var filhos;
            if (seletor.indexOf(' > a') > -1) {
                filhos = Array.prototype.slice.call(document.querySelectorAll(seletor));
            } else {
                var container = document.querySelector(seletor);
                filhos = container ? Array.prototype.slice.call(container.children) : [];
            }
            filhos.forEach(function (el, i) {
                el.classList.add('fx-stagger');
                el.style.transitionDelay = Math.min(i * 90, 450) + 'ms';
                elementosStagger.push(el);
            });
        });

        if ('IntersectionObserver' in window) {
            var observerStagger = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('fx-visivel');
                        observerStagger.unobserve(entrada.target);
                    }
                });
            }, { threshold: 0.15 });
            elementosStagger.forEach(function (el) { observerStagger.observe(el); });
        } else {
            elementosStagger.forEach(function (el) { el.classList.add('fx-visivel'); });
        }

        // ==========================================
        // 5. TILT 3D SUTIL NOS CARDS (SÓ DESKTOP COM MOUSE)
        // ==========================================
        if (temMouseFino && !prefereMenosMovimento) {
            var elementosTilt = document.querySelectorAll('.card-servico, .card-taxa, .card-depoimento');
            elementosTilt.forEach(function (card) {
                card.classList.add('fx-tilt');
                card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    var rotX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
                    var rotY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
                    card.style.transform = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px)';
                });
                card.addEventListener('mouseleave', function () {
                    card.style.transform = '';
                });
            });
        }

        // ==========================================
        // 6. CONTADOR ANIMADO NOS PREÇOS EM DESTAQUE
        // ==========================================
        var contadores = document.querySelectorAll('.contador-preco');
        if ('IntersectionObserver' in window && contadores.length) {
            var observerContador = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (!entrada.isIntersecting) return;
                    observerContador.unobserve(entrada.target);
                    var el = entrada.target;
                    var alvo = parseInt(el.getAttribute('data-valor'), 10) || 0;

                    if (prefereMenosMovimento) {
                        el.textContent = 'R$ ' + alvo;
                        return;
                    }

                    var inicio = null;
                    var duracao = 1100;
                    function passoAnimacao(timestamp) {
                        if (!inicio) inicio = timestamp;
                        var decorrido = timestamp - inicio;
                        var progresso = Math.min(decorrido / duracao, 1);
                        var facilitado = 1 - Math.pow(1 - progresso, 3);
                        el.textContent = 'R$ ' + Math.floor(facilitado * alvo);
                        if (progresso < 1) {
                            requestAnimationFrame(passoAnimacao);
                        } else {
                            el.textContent = 'R$ ' + alvo;
                        }
                    }
                    requestAnimationFrame(passoAnimacao);
                });
            }, { threshold: 0.6 });
            contadores.forEach(function (el) { observerContador.observe(el); });
        }

        // ==========================================
        // LOOP DE SCROLL, COM THROTTLE VIA requestAnimationFrame
        // ==========================================
        var tarefaPendente = false;
        function aoRolarOuRedimensionar() {
            if (tarefaPendente) return;
            tarefaPendente = true;
            requestAnimationFrame(function () {
                atualizarBarraProgresso();
                atualizarParallaxHero();
                atualizarTimeline();
                tarefaPendente = false;
            });
        }

        window.addEventListener('scroll', aoRolarOuRedimensionar, { passive: true });
        window.addEventListener('resize', aoRolarOuRedimensionar);
        aoRolarOuRedimensionar();

        // Libera as transições (evita "flash" de estado inicial em navegadores lentos)
        requestAnimationFrame(function () {
            document.body.classList.add('fx-pronto');
        });
    });
})();