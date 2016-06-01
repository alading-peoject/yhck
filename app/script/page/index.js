var $ = require('../jquery.js'),
    Slider = require('../module/slider.js');

var slide = new Slider({
    dom: document.getElementById('slide'),
    data: imgList,
    isAutoplay: true,
    isLooping: true,
    isAutoScale: true,
    isVertical: false,
    isDestroyCon: false,
    type: 'pic',
    animateType: 'default',
    duration: 5000,
    onSlideChange: function (page) {
        var liList = document.querySelectorAll('#slide ol li'),
            liLength = liList.length;
        for (var i = 0; i < liLength; i++) {
            liList[i].classList.remove('on');
        }
        liList[page].classList.add('on');
    },
    onSlideInto: function () {
        var imgLength = imgList.length,
            slideBox = document.getElementById('slide'),
            noneOl = null,
            nodeLi = null;
        if (imgLength > 1) {
            noneOl = document.createElement("ol");
            slideBox.appendChild(noneOl);
            for (var i = 0; i < imgLength; i++) {
                nodeLi = document.createElement("li");
                nodeLi.appendChild(document.createTextNode(i));
                noneOl.appendChild(nodeLi);
            }
            noneOl.querySelectorAll('li')[0].classList.add('on');
        }
    },
    onDestroy: function () {
        if (document.querySelector('#slide ol')) {
            document.querySelector('#slide ol').remove();
        }
    }
});