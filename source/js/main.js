$('#openNav').click(function () {
    if ($("#mobileNav").css("display") == "none") {
        $("#mask").addClass("mask")
        $("#mobileNav").css("display", "block")
    } else {
        $("#mobileNav").css("display", "none")
    }
})
$('#mask').click(function () {
    $("#mobileNav").css("display", "none")
    $("#mask").removeClass("mask")
})
$(window).resize( function  () {           //当浏览器大小变化时
    if(document.body.clientWidth > 600){
        $("#mobileNav").css("display", "none")
        $("#mask").removeClass("mask")
    }
});

// 修复代码块显示bug
$(".post-content ol li figure.highlight").css({"margin-bottom":"1.2rem","margin-top":"1.2rem"})
$(".post-content ol li div.highlight-wrap figure.highlight").css({"margin-bottom":"0","margin-top":"36px"})

