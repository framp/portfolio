var book = $('.bk-book');
var bookPage = book.children('div.bk-page');
var viewBookLink = book.find('.bk-bookview');
var viewBackLink = book.find('.bk-bookback');
var changeColorLink = book.find('.change-color');
var colorContainers = book.find('.color-container');

book.data({ opened : false, flip : false });

viewBackLink.on('click', function(){
  if(book.data('flip')){
    book.data({ opened : false, flip : false })
        .removeClass('bk-viewback')
        .addClass('bk-bookdefault');
  }else{
    book.data({ opened : false, flip : true })
        .removeClass('bk-viewinside bk-bookdefault')
        .addClass('bk-viewback');
  }
  return false;
});

viewBookLink.on('click', function(){
  if( book.data('opened')){
    book.data({ opened : false, flip : false })
        .removeClass( 'bk-viewinside')
        .addClass('bk-bookdefault');
  }else{
    book.data({ opened : true, flip : false })
        .removeClass('bk-viewback bk-bookdefault')
        .addClass( 'bk-viewinside');
  }
  return false;
});

//Detect click outside book
$('html').on( 'click', function(event) {
  if ($(event.target).parents('.bk-book').length == 0){
    book.data({ opened : false, flip : false })
        .removeClass('bk-viewback bk-viewinside')
        .addClass('bk-bookdefault');
    if (!colorContainers.hasClass('hidden'))
      changeColorLink.click();
  }
  return false;
});

//Change color
var colorLabel = (function(){
  var labels = ['Change Color', '❤ this color']
  return function(){
    labels.push(labels.shift());
    return labels[0];
  }
})();
changeColorLink.click(function(){
  colorContainers.toggleClass('hidden');
  $(this).text(colorLabel());
});

var css = $("<style type='text/css'></style>").appendTo('head');

colorContainers.find('.color-square').click(function(){
  var color = $(this).attr('class').match(/background-color-([a-f0-9]{6})/i)[1];
  css.text('.highlight { color: #' + color + '; }');
});

//Bookblock clone and setup
var bookBlock = $('.bb-bookblock');
var backCover = bookBlock.parents('.bk-book').find('.bk-cover-back');
var backCoverBookBlock = bookBlock.clone();
backCoverBookBlock.appendTo(backCover);

bookBlock.children().add(backCoverBookBlock.children()).on({
  'swipeleft': function(event) {
    bookBlock.bookblock('next');
    backCoverBookBlock.bookblock('next');
    return false;
  },
  'swiperight': function(event) {
    bookBlock.bookblock('prev');
    backCoverBookBlock.bookblock('prev');
    return false;
  },
  'click': function(event){
    var direction = 'prev';
    if ($(event.target).parents('.bk-cover-back').length == 0)
      direction = 'next';
    bookBlock.bookblock(direction);
    backCoverBookBlock.bookblock(direction);
    return false;
  }
});

bookBlock.bookblock( {
  speed : 800,
  shadow : false,
});
backCoverBookBlock.bookblock( {
  speed : 800,
  shadow : false,
});

$(document).keydown( function(e) {
  var keyCode = e.keyCode || e.which,
    arrow = {
      left : 37,
      up : 38,
      right : 39,
      down : 40
    };

  switch (keyCode) {
    case arrow.left:
      bookBlock.bookblock('prev');
      backCoverBookBlock.bookblock('prev');
      break;
    case arrow.right:
      if(!book.data('opened'))
        book.data({ opened : true, flip : false })
            .removeClass('bk-viewback bk-bookdefault')
            .addClass( 'bk-viewinside');
      bookBlock.bookblock('next');
      backCoverBookBlock.bookblock('next');
      break;
  }
} );
