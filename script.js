var data = {
  "img": [
    {"src": '0.jpg'},
    {"src": '1.jpg'},
    {"src": '2.jpg'},
    {"src": '3.jpg'},
    {"src": '4.jpg'},
    {"src": '5.jpg'},
    {"src": '6.jpg'},
    {"src": '7.jpg'},
    {"src": '8.jpg'},
    {"src": '9.jpg'},
    {"src": '10.jpg'},
    {"src": '11.jpg'},
    {"src": '12.jpg'},
    {"src": '13.jpg'},
    {"src": '14.jpg'},
    {"src": '15.jpg'},
    {"src": '16.jpg'},
    {"src": '17.jpg'},
    {"src": '18.jpg'},
  ]
};

$(window).on('load', function () {
  function render() {
    $.each(data.img, function (key, value) {
      var oBox = $('<div>').addClass('box').appendTo($('#main'));
      var oPic = $('<div>').addClass('pic').appendTo($(oBox));
      var oImg = $('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(oPic));
    });
  }

  render();
  waterfall();

  $(window).on('scroll', function () {
    if (checkScrollSlide()) {
      render();
      waterfall();
    }
  });
});

$(window).on('resize', function () {
  waterfall();
})

function waterfall() {
  var $boxes = $('#main>div');
  var w = $boxes.eq(0).outerWidth();
  var cols = Math.floor($(window).width()/w);
  $('#main').width(w*cols).css('margin','0 auto');
  var hArr = [];
  $boxes.each(function (index, value) {
    if (index < cols) {
      var h = $(value).outerHeight();
      hArr.push(h);
    }else {
      var minH = Math.min.apply(null, hArr);
      var minHIndex = $.inArray(minH, hArr);
      $(value).css({
        'position': 'absolute',
        'top': minH + 'px',
        'left': minHIndex*w + 'px'
      });
      hArr[minHIndex] += $(value).outerHeight();
    }
  });
}


function checkScrollSlide() {
  var $lastBox = $('#main>div').last();
  var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
  var scrollTop = $(window).scrollTop();
  var documentH = $(window).height();
  return (lastBoxDis < scrollTop + documentH) ? true : false;
}
