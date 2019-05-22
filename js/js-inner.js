
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

    function extend( a, b ) {
        for( var key in b ) { 
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }
    // Random number.
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
// Конец вспомогательных функций //
// Preload all the images in the page.
    imagesLoaded(document.querySelectorAll('.xyd'), {background: true}, () => body.classList.remove('loading'));

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

// class XYD {
//     constructor (el) {
//         this.DOM = {el: el};
//         this.DOM.body = document.body;
//         this.DOM.loading = document.querySelector('.loading');
//         this.DOM.switchCtrls = document.querySelector('.switch');
//         this.DOM.switchModeCtrls = {
//             'lab-works' : this.DOM.switchCtrls.firstElementChild,
//             'print' : this.DOM.switchCtrls.lastElementChild
//         };
//         this.DOM.menuCtrl = document.querySelector('.btn--menu');
//         this.DOM.menu = {
//             'labworks' : {
//                 'wrapper': document.querySelector('.menu'),
//                 'items': document.querySelector('.menu').firstElementChild.querySelectorAll('.menu__inner a')
//             },
//             'print' : {
//                 'wrapper': document.querySelector('.menu--print'),
//                 'items': document.querySelectorAll('.menu--print > .menu__inner a')
//             }
//         };
//         // The current mode.
//         let mode = 'labworks', isAnimating;
//     }
//     init() {
//         imagesLoaded(this.DOM.body, { background: true }, function() {
//             // Remove page loader.
//             this.DOM.loading.classList.add('loading--hide');
//             // Init/Bind events
//             initEvents();
//         });
//     }
//     initEvents() {
//         this.DOM.switchModeCtrls.LabWorks.addEventListener('click', switchMode);
//         this.DOM.switchModeCtrls.print.addEventListener('click', switchMode);
//     }
//     switchMode(ev) {
//         ev.preventDefault();

//         if( isAnimating ) {
//             return false;
//         }
//         isAnimating = true;
        
//         // mode: LabWorks||print.
//         mode = ev.target === this.DOM.switchModeCtrls.print ? 'print' : 'labworks';

//         switchOverlay();

//         if( mode === 'print' ) {
//             disablePageFx = true;
//             pm.removeTilt();
//             pm.stopLoopFx();
//             gfx.stopGlitch();
//         }
        
//         // Change current class on the LabWorkser/printr links.
//         this.DOM.switchModeCtrls[mode === 'print' ? 'labworks' : 'print'].classList.remove('switch__item--current');
//         this.DOM.switchModeCtrls[mode].classList.add('switch__item--current');
        
//         // Switch the page content.
//         switchContent();
        
//     }
//     switchContent() {
//         // Change switchCtrls mode.
//         this.DOM.switchCtrls.classList.remove('mode--' + (mode === 'print' ? 'labworks' : 'print'));
//         this.DOM.switchCtrls.classList.add('mode--' + mode);

//         if( mode === 'print' ) {
//             switchToPrint();
//         }
//         else {
//             switchToLabWorks();   
//         }
//     }
//     switchToPrint() {
//         const hideLabWorks = function(target, callback) {
//                     let animeOpts = {};

//                     if( typeof target === 'string' ) {
//                         animeOpts.targets = this.DOM[target].el || this.DOM[target];
//                         animeOpts.duration = 400;
//                         animeOpts.easing = 'easeInQuint';
//                         animeOpts.scale = 0.3;
//                     }
//                     else {
//                         animeOpts.targets = target;
//                         animeOpts.duration = 100;
//                         animeOpts.delay = function(t,i) {
//                             return i*100;
//                         };
//                         animeOpts.easing = 'easeInQuad';
//                         animeOpts.translateY = '-75%';
//                     }

//                     animeOpts.opacity = {value: 0, easing: 'linear'};
//                     animeOpts.complete = callback;

//                     anime.remove(animeOpts.targets);
//                     anime(animeOpts);
//               },
//               showPrint = function(target) {
//                     const el = this.DOM[target].el || this.DOM[target];

//                     if( target === 'title' || target === 'contact' || target === 'menuCtrl' ) {
//                         el.classList.remove('mode--labworks');
//                         el.classList.add('mode--print');
//                     }
//                     if( this.DOM[target].letters ) {
//                         animateLetters(this.DOM[target].letters, 'in', {
//                             begin: function() {
//                                 this.DOM[target].el.style.opacity = 1;
//                                 this.DOM[target].el.style.transform = 'none';
//                             }
//                         });
//                     }
//                     else {
//                         el.style.opacity = 1;
//                         el.style.transform = 'none';
//                     }
//               };

//         // Animate the title, contact, menu ctrl and menu items out and show the print mode version of these elements.
//         // Title:
//         hideLabWorks('title', function() {
//             showprint('title');
//         });
//         // Contact:
//         hideLabWorks('contact', function() {
//             showprint('contact');
//         });
//         // Menu ctrl:
//         hideLabWorks('menuCtrl', function() {
//             showprint('menuCtrl');
//         });
//         // Menu links:
//         hideLabWorks(this.DOM.menu['labworks'].items, function() {
//             this.DOM.menu['labworks'].wrapper.style.display = 'none';
                
//             animateLetters(this.DOM.menuprintItemLetters, 'in', {
//                 delay: function(t,i) {
//                     return i*30
//                 },
//                 begin: function() {
//                     this.DOM.menu['print'].wrapper.style.display = 'block';
//                 }
//             });
//         });
//     }
//     switchToLabWorks() {
//         const showLabWorks = function(target) {
//                     let animeOpts = {};

//                     if( typeof target === 'string' ) {
//                         let el = this.DOM[target].el || this.DOM[target]
                        
//                         el.classList.remove('mode--print');
//                         el.classList.add('mode--labworks');

//                         animeOpts.targets = el;
//                         animeOpts.duration = 400;
//                         animeOpts.easing = 'easeOutQuint';
//                         animeOpts.scale = [0.3,1];

//                         animeOpts.begin = function() {
//                             if( this.DOM[target].letters !== undefined ) {
//                                 this.DOM[target].letters.forEach(function(letter) {
//                                     letter.style.opacity = 1;
//                                 });
//                             }
//                         }
//                     }
//                     else {
//                         animeOpts.targets = target;
//                         animeOpts.duration = 600;
//                         animeOpts.delay = function(t,i,c) {
//                             return (c-i-1)*100;
//                         };
//                         animeOpts.easing = 'easeOutExpo';
//                         animeOpts.translateY = ['-75%','0%']
//                     }

//                     animeOpts.opacity = {value: [0,1], easing: 'linear'};
                    
//                     anime.remove(animeOpts.targets);
//                     anime(animeOpts);
//               };


//         // Animate the title, contact, menu ctrl and menu items out and show the LabWorks mode version of these elements.
//         // Title:
//         animateLetters(this.DOM.title.letters, 'out', {
//             complete: function() {
//                 showLabWorks('title');
//             }
//         });
//         // Contact:
//         animateLetters(this.DOM.contact.letters, 'out', {
//             complete: function() {
//                 showLabWorks('contact');
//             }
//         });
//         // Menu ctrl:
//         this.DOM.menuCtrl.style.opacity = 0;
//         showLabWorks('menuCtrl');
//         // Menu links:
//         animateLetters(this.DOM.menuprintItemLetters, 'out', {
//             delay: function(t,i,c) {
//                 return (c-i-1)*10;
//             },
//             duration: 20,
//             complete: function() {
//                 this.DOM.menu['print'].wrapper.style.display = 'none';
//                 this.DOM.menu['labworks'].wrapper.style.display = 'block';
//                 showLabWorks(this.DOM.menu['labworks'].items);
//             }
//         });
//     }

// };

// const xyd = new XYD(document.querySelector('.xyd'));
const cursor = new CursorFx(document.querySelector('.cursor'));
[...document.querySelectorAll('[data-hover]')].forEach((link) => {
link.addEventListener('mouseenter', () => cursor.enter() );
link.addEventListener('mouseleave', () => cursor.leave() );
link.addEventListener('click', () => cursor.click() );

});

