const plus = document.querySelector("div.tool.plus");
const minus = document.querySelector("div.tool.minus");
const refreshbtn = document.querySelector(".refresh")
const map = document.querySelector(".map_img");
const printContainer = document.querySelector('.pin-container');

let ratio = 0.322;
//modal
const modal = document.querySelector(".modal");


// pins.forEach((item) => {
//     item.addEventListener("mouseover", function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         let x = e.clientX - e.target.offsetLeft;
//         let y = e.clientY - e.target.offsetTop - 50;
//         const first = this.querySelector("span .first").innerText;
//         const second = this.querySelector("span .second").innerText;
//         modal.querySelector(".first-p").innerText = first;
//         modal.querySelector(".second-p").innerText = second
//         modal.style.display = "block";
//         modal.style.top = `${y}px`
//         modal.style.left = `${e.clientX - 60}px`

//     })
//     item.addEventListener("mouseout", function (e) {
//         modal.style.display = "none";
//     })
// })


function zoomIn() {
    plus.addEventListener("click", function (e) {
        e.preventDefault();
       let imgOffsetLeft = $('.map_img').css('left');
       let imgOffsetTop = $('.map_img').css('top');
       if (ratio < 1.6) {
          ratio += 0.12
       } else {
           ratio = 1.6;
       }
        setOriginalResidenceMarker(imgOffsetLeft, imgOffsetTop, ratio, true)
        needToRedraw();
    })
}
zoomIn()

function zoomOut() {
    minus.addEventListener("click", function (e) {
        e.preventDefault();
        if (ratio > 0.33) {
            ratio -= 0.12;

        } else {
            ratio = 0.322;
        }
        let imgOffsetLeft = $('.map_img').css('left');
        let imgOffsetTop = $('.map_img').css('top');
        setOriginalResidenceMarker(imgOffsetLeft, imgOffsetTop, ratio, true)
        needToRedraw();
    })
}
zoomOut()

function refresh() {
    refreshbtn.addEventListener("click", function (e) {
        e.preventDefault();
        ratio = 0.322;
        setOriginalResidenceMarker(0, 0, ratio, false)
        needToRedraw();
    })
}
refresh()




$( function() {
    $( ".map_img" ).draggable();
  } );

  $( function() {
    $( ".map_img" ).draggable({
      start: function() {
        $('.pin').fadeOut(200);
      },
      stop: function() {
        needToRedraw();
      }
    });
 
  } );

  function createPins(data) {
    pinDiv = document.createElement("div");
    pinDiv.classList.add('pin');

        $(pinDiv).attr("native-left", data.coordinateX);
        $(pinDiv).attr("native-top", data.coordinateY);
        pinDiv.innrHtml = `
        <span>
            <p>${data.title}</p> <br/>
            <p>${data.description}</p>
        </span>
        `   
        var ratio = 880 / 2732;
        var newLeft = ((data.coordinateX * +ratio.toFixed(3)) - 22);
        var newTop = ((data.coordinateY * +ratio.toFixed(3)) - 65) + 11;
        $(pinDiv).css({
            'top': (newTop) + 'px',
            'left': (newLeft) + 'px'
        })
        printContainer.append(pinDiv)

  }
  Data.poiData.forEach(createPins)
  

  function setOriginalResidenceMarker(refX, refY, ratio, refresh) {
    ratio =  +ratio.toFixed(3)
    console.log(ratio)
    var x = parseInt(refX);
    var y = parseInt(refY);
    var deltaWidth = 0;
    var deltaHeight = 0;
    var oldWidth = $('.map_img').width();
    var oldHeight = $('.map_img').height();
    var newWidth = 2732 * ratio;
    var newHeight = 1536 * ratio;

    if (refresh) {
        deltaWidth = (oldWidth - newWidth) / 2;
        deltaHeight = (oldHeight - newHeight) / 2;
    }
    $('.map_img').width(newWidth);
    var offsetLeft = x + deltaWidth;
    var offsetTop = y + deltaHeight;
    $('.map_img').css({
        "top": offsetTop,
        "left": offsetLeft
    });
    $('.pin').each(function() {
        var residenceMarker = $(this);
        var addTop = 65;
        var addLeft = 22;
        if (residenceMarker.hasClass('marker_poi')) {
            var addTop = 56;
            var addLeft = 21;
        }
    
        var originalLeft = (residenceMarker.attr('native-left') * ratio) + deltaWidth - addLeft + x;
        var originalTop = (residenceMarker.attr('native-top') * ratio) + deltaHeight - addTop + y;
        residenceMarker.css({
            'top': (originalTop) + 'px',
            'left': (originalLeft) + 'px'
        });
    });
}

function needToRedraw() {
    imgOffsetLeft = $('.map_img').css("left");
    imgOffsetTop = $('.map_img').css("top");
    var x = parseInt(imgOffsetLeft);
    var y = parseInt(imgOffsetTop);
    var cadreWidth = parseInt($('.map_wrapper').width());
    var imgWidth = parseInt($('.map_img').width());
    var deltaX = imgWidth - cadreWidth + x;
    var cadreHeight = parseInt($('.map_wrapper').height());
    var imgHeight = parseInt($('.map_img').height());
    var deltaY = imgHeight - cadreHeight + y;
    var newX = x;
    var newY = y;
    if (x > 0 || y > 0 || deltaX < 0 || deltaY < 0) {
        if (x > 0) {
            newX = 0;
        }
        if (y > 0) {
            newY = 0;
        }
        if (deltaX < 0) {
            newX = cadreWidth - imgWidth;
        }
        if (deltaY < 0) {
            newY = cadreHeight - imgHeight;
        }
        $('.map_img').css('z-index', 4);
        $('.map_img').animate({
            top: newY,
            left: newX
        }, {
            queue: false,
            duration: 0,
            complete: function() {
                imgOffsetLeft = newX;
                imgOffsetTop = newY;
                setOriginalResidenceMarker(imgOffsetLeft, imgOffsetTop, ratio, true);
                $('.pin').fadeIn(200);
                $('.pin').css({
                    'display': ''
                });
            }
        });
    } else {
        setOriginalResidenceMarker(imgOffsetLeft, imgOffsetTop, ratio, true);
        $('.pin').fadeIn(200);
    }
    $('.pin').css({
        'display': ''
    });
}

