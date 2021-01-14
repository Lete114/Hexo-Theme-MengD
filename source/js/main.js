$('#openNav').click(function () {
    if ($("#mobileNav").css("opacity") == "0") {
        $("#mobileNav").addClass("open");
        $("#mask").addClass("mask")
        $("html").css("overflow", "hidden")
        $("#mobileNav").css("opacity", "1")
        $("#toc").css("display", "none")
        

    } else {
        $("#mobileNav").css("opacity", "0")
        $("#mobileNav").removeClass("open")
    }
})


$('#mask').click(function () {
    $("#mobileNav").removeClass("open")
    $("#mobileNav").css("opacity", "0")
    $("#local-search").css("display", "none")
    $("html").css("overflow", "auto")
    $("#mask").removeClass("mask")
})

$('.search-btn').click(function () {
    if ($("#local-search").css("display") == "none") {
        $("#mask").addClass("mask")
        $("html").css("overflow", "hidden")
        $("#local-search").removeClass('search-animation-min')
        $("#local-search").addClass('search-animation-max');
        $("#local-search").css("display", "block")
        $("#toc").css("display", "none")
        $('#local-search-input').focus();
    } else {
        $("#local-search").removeClass('search-animation-max')
        $("#local-search").css("display", "none")
        
    }
})



$('.search-close-button').click(function () {
    $("html").css("overflow", "auto")
    $("#mask").removeClass("mask")

    $("#local-search").css("display", "none")
})



$('.rightside-toc').click(function () {
    if ($("#toc").css("display") == "none") {
        $("#toc").css("display", "block")
        $("#toc").addClass('search-animation-max');
        $("#up").css("display", "none")
    } else {
        $("#toc").css("display", "none")
        $("#toc").removeClass('search-animation-max');
        $("#up").css("display", "block")
        
    }
})
$(window).resize( function  () {           //当浏览器大小变化时
    if(document.body.clientWidth > 1000){
        $("#toc").css("display", "block")
    }else{
        $("#toc").css("display", "none")
    }

    if(document.body.clientWidth > 800){
        $("#local-search").css("display", "none")
    }

    if(document.body.clientWidth > 600){
        $("#mask").removeClass("mask")
        $("html").css("overflow", "auto")
        $("#mobileNav").css("opacity", "0")
        $("#mobileNav").removeClass("open")
    }
});


$(function() {
    var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
        var num = parseInt((wintop/(docheight-winheight))*100)+1;
        
        if(num==1)num=0
        if(num>100)num=100
        $("#progress").val(num);
        $("#num").text(num+"%");
    $(window).scroll(function() {
        var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
        var num = parseInt((wintop/(docheight-winheight))*100)+1;
        
        if(num==1)num=0
        if(num>100)num=100
        $("#progress").val(num);
        $("#num").text(num+"%");

        var up = $(window).scrollTop();
        if (up > 300) {
            $('#up').fadeIn(600);
        } else {
            $('#up').fadeOut(600);
        }
    });
    $("#up").click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 0);
    });
});

// 修复代码块显示bug
$(".post-content ol li figure.highlight").css({"margin-bottom":"1.2rem","margin-top":"1.2rem"})
$(".post-content ol li div.highlight-wrap figure.highlight").css({"margin-bottom":"0","margin-top":"36px"})



