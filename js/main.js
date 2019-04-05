// Stick menu
  $(".menu").sticky({topSpacing:0});

// Menu Scroll to content and Active menu
  var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+145,
    topMenuItems = topMenu.find("a"),
    scrollItems = topMenuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('a[href*=#]').bind('click', function(e) {
    e.preventDefault();
       
    var target = $(this).attr("href");
            

    $('html, body').stop().animate({ scrollTop: $(target).offset().top-10}, 1000, function() {

    });
            
    return false;
   });

  $(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });

   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       topMenuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
  });  
  

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    $(".footer").css( "position", "relative" );
    $(".contact").css( "marginBottom", "0" );

}
else 
{

  // FadeTo elements
  if ( $(window).width() > 1023) {  

    tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .form, .contact .content .contact-text ").fadeTo(0, 0);

    $(window).scroll(function(d,h) {
      tiles.each(function(i) {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) $(this).fadeTo(1000,1);
      });
    });

  }

}



  //Menu mobile click
  $( ".icon" ).click(function() {
    $( " ul.menu-click" ).slideToggle( "slow", function() {
    // Animation complete.
    });
  });



$(window).load(function(){

$(".preloader").delay(1000).fadeOut("slow")

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }
  
  // Parallax
  if ($('.parallax-background-partners').length) {
    $(".parallax-background-partners").parallax();
  }  

});

const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

const lineEq = (y2, y1, x2, x1, currentVal) => {
        // y = mx + b 
        var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
        return m * currentVal + b;
    };

const body = document.body;

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
    }
    

 


{
    // the settings for each one of the slides uncover instances.
    const uncoverOpts = [
        {
            // total number of slices.
            slicesTotal: 5,
            // slices color.
            slicesColor: '#FAEC28',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'top', hide: 'top'}
        },
        {
            slicesTotal: 8, 
            slicesColor: '#FAEC28', 
            orientation: 'horizontal', 
            slicesOrigin: {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 11,
            slicesColor: '#FAEC28',
            orientation: 'horizontal',
            slicesOrigin: {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 3,
            slicesColor: '#FAEC28',
            orientation: 'vertical',
            slicesOrigin: {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 16,
            slicesColor: '#FAEC28',
            orientation: 'vertical',
            slicesOrigin: {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 4,
            slicesColor: '#FAEC28',
            orientation: 'horizontal',
            slicesOrigin: {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 10,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: {show: 'top', hide: 'top'}
        },
        {
            slicesTotal: 8,
            slicesColor: '#FAEC28',
            orientation: 'horizontal',
            slicesOrigin: {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 6,
            slicesColor: '#FAEC28',
            orientation: 'vertical',
            slicesOrigin: {show: 'top', hide: 'top'}
        }
    ];

    const uncoverAnimation = [
        {
            show: {
                slices: {duration: 600, delay: (_,i,t) => (t-i-1)*100, easing: 'easeInOutCirc'},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 600, delay: (_,i,t) => (t-i-1)*100, easing: 'easeInOutCirc'}
            }
        },
        {
            show: {
                slices: {duration: 600, delay: (_,i,t) => Math.abs(t/2-i)*80, easing: 'easeInOutCirc'},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 300, delay: (_,i,t) => Math.abs(t/2-i)*40, easing: 'easeInOutCirc'}
            }
        },
        {
            show: {
                slices: {delay: (_,i,t) => anime.random(0,t)*50},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 300, delay: (_,i,t) => anime.random(0,t)*50}
            }
        },
        {
            show: {
                slices: {duration: 1200, delay: (_,i) => i*150, easing: 'easeOutExpo'},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }

            },
            hide: {
                slices: {duration: 500, delay: (_,i) => i*150, easing: 'easeInOutExpo'}
            }
        },
        {
            show: {
                slices: {duration: 600, delay: (_,i,t) => Math.abs(t/2-i)*80, easing: 'easeInOutCirc'},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 600, delay: (_,i,t) => Math.abs(t/2-i)*80, easing: 'easeInOutCirc'}
            }
        },
        {
            show: {
                slices: {duration: 400, delay: (_,i,t) => (t-i-1)*150, easing: 'easeInOutQuad'},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 400, delay: (_,i,t) => (t-i-1)*30, easing: 'easeInOutQuad'}
            }
        },
        {
            show: {
                slices: {duration: 400, delay: (_,i,t) => Math.abs(t/4-i)*40, easing: 'easeInOutSine'},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 400, delay: (_,i,t) => Math.abs(t/4-i)*40, easing: 'easeInOutSine'}
            }
        },
        {
            show: {
                slices: {duration: 600, easing: 'easeInOutCirc', delay: (_,i) => i*50},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 300, easing: 'easeInOutCirc', delay: (_,i) => i*30}
            }
        },
        {
            show: {
                slices: {duration: 600, easing: 'easeInOutCirc', delay: (_,i) => i*100},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 300, easing: 'easeInOutCirc', delay: (_,i) => i*40}
            }
        }
    ];

    const items = Array.from(document.querySelectorAll('.grid > .grid__item'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if ( entry.intersectionRatio > 0.5 ) {
                uncoverArr[items.indexOf(entry.target)].show(true, uncoverAnimation[items.indexOf(entry.target)].show);
            }
            else {
                uncoverArr[items.indexOf(entry.target)].hide(true, uncoverAnimation[items.indexOf(entry.target)].hide);
            }
        });
    }, { threshold: 0.5 });
    
    let uncoverArr = [];

    imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
        document.body.classList.remove('loading');

        items.forEach((item, pos) => {
            uncoverArr.push(new Uncover(item.querySelector('.scroll-img'), uncoverOpts[pos]));
            observer.observe(item);
        });
    });
}