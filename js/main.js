jQuery(document).ready(function ($) {
  
  

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  /*
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });*/

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // custom code
  var draw = false;
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyZ') {
      draw = true;
    }
  });

  document.addEventListener('keyup', function(event) {    
      draw = false;    
  });

  var currentMousePos = { x: -1, y: -1 };
  $(document).mousemove(function(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
  });

  $("#about").hover(function(){
    //console.log('abouthover');
    $('#singleimg').css('display', 'none');
  });

  $("#contact").hover(function(){
    //console.log('abouthover');
    $('#singleimg').css('display', 'none');
  });

  $("#future").hover(function(){
    //console.log('abouthover');
    $('#singleimg').css('display', 'none');
  });
/*
  $('#questionnaireBtn').click(function(){
    $('#questionnaire').show();
  });*/
/*
  var count = 0;
  $('#questionnaire').hover(function () {
    if(count >= 2)
      return;
    
      count++;
    if(count == 1){
      var text = "-=50";
    }else{
      var text = "+=50";
    }
    
    $('#questionnaire').animate({
      paddingTop: "+=50"
    }, 500, 'easeInOutExpo');
    return false;
  });*/

  createImgBlock();

  var initialSingle = false;
  var singleimgWidth = 0;
  var singleimgHeight = 0;

  $("#imgfall .pic img").hover(function(){

    //console.log('hover');    

    // 設定獨力顯示照片框與照片牆的長框一樣，在乘上一個倍數
    
    /*if(initialSingle == false){
      initialSingle = true;
      var width = $(this).css('width');
      singleimgWidth = parseInt(width.replace('px','')) * 12;
      var height = $(this).css('height');
      singleimgHeight = parseInt(height.replace('px','')) * 12;
      $('#singleimg').css('width', singleimgWidth);
      $('#singleimg').css('height', singleimgHeight);     
    }*/

    var img = new Image;
    //var path = $(this).css('background-image').match(/^url\(["']?(.+?)["']?\)$/);
    //img.src = path[1];
    img.src = $(this).attr('src');
    var bgImgWidth = img.width;
    var bgImgHeight = img.height;

    var maxWidth = $(window).width();

    //var finalHeight = 0;
    if(bgImgHeight > bgImgWidth){

      if(maxWidth >= 512){
        singleimgHeight = 512;
        singleimgWidth = 400;
      }else{
        singleimgHeight = 356;
        singleimgWidth = 256;
      }
      
      //var height = $(this).css('height');
      //finalHeight = parseInt(height.replace('px','')) * 16;
    }else{
      //finalHeight = singleimgHeight;  
      if(maxWidth >= 512){
        singleimgHeight = 400;
        singleimgWidth = 512;
      }else{
        singleimgHeight = 256;
        singleimgWidth = 356;
      }    
      
    }

    $('#singleimg').css('height', singleimgHeight);  
    $('#singleimg').css('width', singleimgWidth);   

    //$('#singleimg').css('width', bgImgWidth);
    //$('#singleimg').css('height', bgImgHeight);
        
    // 設定與照片牆一樣的照片
    //var imgUrl = $(this).css('background-image');
    var imgUrl = $(this).attr('src');
    $('#singleimg').css('background-image', 'url('+imgUrl+')');

    // 設定位置
    var position = $(this).position();

    

    $('#singleimg').css('left', position.left+'px');      
        
    if(singleimgWidth + position.left > maxWidth){
      var left = maxWidth - singleimgWidth;
      $('#singleimg').css('left', left+'px');
      
    }else{
      $('#singleimg').css('left', position.left+'px');      
    }
    
    //console.log(event.clientY)
    //$('#singleimg').css('top', topPosition+'px');

    //var topPosition = event.pageY; 
    if(event.clientY < singleimgHeight) { //mouse is under 1/2 window  
      var height = position.top + $(this).height();
      $('#singleimg').css('background-position', 'left top');
    } else{
      var height = position.top - singleimgHeight;
      $('#singleimg').css('background-position', 'left bottom');
    }
    
    //var height = position.top;
    $('#singleimg').css('top', height+'px');
    $('#singleimg').css('display', 'block');
    
  });
});

var lines = 0
var max = 0
var x_center;
var y_center;
var timer;

function createImgBlock(){

  var width = $('#standard').outerWidth();
  var height = Math.floor($('#standard').outerHeight());

  $('#imgfall .row').empty();

  var totalwidth = $('#imgfall .row').width();

  var eachLineNum = parseInt(totalwidth / width);

  //console.log('eachLineNum : ' + eachLineNum);

  var margin = (totalwidth - eachLineNum * width) / 2;
  // add margin
  $('#imgfall .row').css('margin-left',margin + 'px');
  $('#imgfall .row').css('margin-right',margin + 'px');

  lines = eachLineNum;
  max = lines*2;
  
  //console.log('lines : ' + lines);

  x_center = parseInt(eachLineNum / 2);
  y_center = parseInt(lines / 2);

  //console.log('center : ' + x_center + '-' + y_center);

  //console.log('max :' +max);


  for (var i = 0; i < lines; i++) { 
    for (var j = 0; j < eachLineNum; j++) { 
      var id = j+'-'+i;
      $("#imgfall .row").append('<div id="'+id+'" class="pic wow flipInX"><img id="'+id+'-img"></div>')
      var x = j-x_center;
      var y = y_center - i;
     
      if(Math.pow(x,2) + Math.pow(y - Math.cbrt(Math.pow(x, 2)), 2) <= max){      
        $('#'+id+'-img').attr("src", getRandomPicture('top'));
        //$('#'+id+'').css("background-image", getRandomPicture('top'));
        $('#'+id+'-img').addClass('lovepop');
        //counttt = counttt + 1      
        //$('#'+id+'').css("background-image", 'url(img/low/3.jpg)');
      }
      else{        
        $('#'+id+'-img').attr("src", getRandomPicture('low'));
        //$('#'+id+'').css("background-image", getRandomPicture('low'));
        //$('#'+id+'').css("background-image", 'url(img/low/2.jpg)');
      } 
      //setTimeout(xxx, 6000);
    }        
  }

  //timer = window.setInterval(setBackgroundImage, 200);

}

//var topNums = [];
//var mid = [];
//var lowNums = [];

//var counttt = 0;

function getRandomPicture(level){

  //console.log(level)

  //var arr = topNums;
  var max = 148; // 圖片數量
  if(level == 'mid'){
    //arr = mid;
  }
  else if(level == 'low'){
    //arr = lowNums;
    max = 224
  }

  var num = Math.floor((Math.random() * max) + 1);

  //.log('max : ' + max);

  /*do{
    var num = Math.floor((Math.random() * max) + 1);
  }while(arr.indexOf(num) > -1);  
    
  if(level == 'top'){
    counttt = counttt + 1;
    console.log('counttt : ' + counttt);
  }*/
  
  //arr.push(num);

  //return 'url(img/'+level+'/'+num+'.jpg)';
  return 'img/'+level+'/'+num+'.jpg';
}