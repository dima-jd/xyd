

// Вспомогательные функции //
    const lineEq = (y2, y1, x2, x1, currentVal) => {
        // y = mx + b 
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    };
    const lerp = (a,b,n) => (1 - n) * a + n * b;  
    const distance = (x1,x2,y1,y2) => {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.hypot(a,b);
    };    
    const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    };
    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
    const body = document.body;
    const bodyColor = getComputedStyle(body).getPropertyValue('--color-bg').trim() || 'white';

    // From https://davidwalsh.name/javascript-debounce-function.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

// Конец вспомогательных функций //

// Размеры окна
    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
// Пересчет размеров окна при масштабировании.
    window.addEventListener('resize', calcWinsize);

// Пользовательский курсор 
    class CursorFx {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
            this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
            this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
            this.scale = 1;
            this.opacity = 1;
            this.mousePos = {x:0, y:0};
            this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
            this.lastScale = 1;
            this.lastOpacity = 1;
            
            this.initEvents();
            requestAnimationFrame(() => this.render());
        }
        initEvents() {
            window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
        }
        render() {
            this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
            this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
            this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
            this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
            this.lastScale = lerp(this.lastScale, this.scale, 0.15);
            this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
            this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
            this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
            this.DOM.circle.style.opacity = this.lastOpacity
            requestAnimationFrame(() => this.render());
        }
        enter() {
            cursor.scale = 2.7;
        }
        leave() {
            cursor.scale = 1;
        }
        click() {
            this.lastScale = 1;
            this.lastOpacity = 0;
        }
    };


const cursor = new CursorFx(document.querySelector('.cursor'));

//Деформация пользовательского курсора при наведении на эллементы с 'data-hover'.
    [...document.querySelectorAll('[data-hover]')].forEach((link) => {
        link.addEventListener('mouseenter', () => cursor.enter() );
        link.addEventListener('mouseleave', () => cursor.leave() );
        link.addEventListener('click', () => cursor.click() );
    });

// // // Preload all the images in the page.
//     imagesLoaded(document.querySelectorAll('.start-page'), {background: true}, () => body.classList.remove('loading'));




