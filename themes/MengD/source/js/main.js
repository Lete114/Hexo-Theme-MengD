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


$(document).on('click', '.rightside-toc', function () {
    if ($("#toc").css("display") == "none") {
        $("#toc").css("display", "block")
        $("#toc").addClass('search-animation-max');
    } else {
        $("#toc").css("display", "none")
        $("#toc").removeClass('search-animation-max');
        
    }
})

// 当鼠标移动到代码块上时执行
CopyContent()
function CopyContent(){
    // 当鼠标移动到代码块上时执行
    $(".highlight-wrap").hover(
        function() {
            // 移除其他代码块的 CopyContent 属性
            $("[CopyContent]").removeAttr("CopyContent");
            // 在当前鼠标所在的元素下的 .code 元素上添加 CopyContent属性
            $(this).find(".code").attr("CopyContent", "");
        }
    );
}
// 代码块复制
var clipboard = new ClipboardJS('.clipboard', {
    target: function() {
        // 返回 CopyContent 属性下的内容
        return document.querySelector("[CopyContent]");
    }
});
//  复制成功
clipboard.on('success', function(event) {
    event.trigger.innerHTML = "<i class='fa fa-check' style='color:green'></i>";
    setTimeout(function () {
        event.trigger.innerHTML = "<i class='fa fa-clipboard'></i>"
    }, 2000)
    event.clearSelection();
});
// 复制失败
clipboard.on('error', function(event) {
    event.trigger.innerHTML = "<i class='fa fa-times' style='color:red'></i>";
    setTimeout(function () {
        event.trigger.innerHTML = "<i class='fa fa-clipboard'></i>"
    }, 2000)
});

// 深色模式
DarkMode()
function DarkMode(){
    // 深色模式
    if(localStorage.isDark=="dark"){
        $("body").addClass("dark")
        $("#darkmode i").attr("class","fas fa-sun")
    }else{
        $("body").removeClass("dark")
        $("#darkmode i").attr("class","fas fa-moon")
    }
    // 点击 开/关
    $('#darkmode').click(function () {
        if($('#darkmode i').attr("class")=="fas fa-moon"){
            localStorage.isDark = "dark";
            $("body").css("transition","all .3s linear")
            $("body").addClass("dark")
            $("#darkmode i").attr("class","fas fa-sun")
        }else{
            localStorage.isDark = "";
            $("body").css("transition","all .3s linear")
            $("body").removeClass("dark")
            $("#darkmode i").attr("class","fas fa-moon")
        }
    })
}
if($config.CodeBlock.enable){
    // 代码块折叠
    CodeBlock()
    function CodeBlock(){
        // 代码块折叠
        var CodeBlock = $("figure.highlight")
        // 定义高度
        var height = $config.CodeBlock.height
        // 获取当前页面的所有的代码块 循环判断符合条件的折叠
        for(var i = 0;i<CodeBlock.length;i++){
            if(CodeBlock.eq(i).height()>height){
                CodeBlock.eq(i).css("max-height",height+"px")
                CodeBlock.eq(i).append('<div class="show-btn"><i class="fas fa-angle-down"></i></div>')
            }
        }
        // 点击 展开 / 关闭
        $(".show-btn").click(function(){
            var $this = $(this);
            if($this.children("i").attr("class")=="fas fa-angle-down"){
                $this.children("i").removeClass("fas fa-angle-down")
                $this.children("i").addClass("fas fa-angle-up")
                $this.closest(".highlight").removeAttr("style")
                $this.prev().css("margin-bottom","20px")
            }else{
                $this.prev().removeAttr("style")
                $this.children("i").removeClass("fas fa-angle-up")
                $this.children("i").addClass("fas fa-angle-down")
                $this.closest(".highlight").css("max-height","400px")
                var thisCodeBlock = $this.closest(".highlight").offset();
                $("html,body").animate({
                    scrollTop: thisCodeBlock.top-$config.CodeBlock.scrollTop
                }, 0);
            }
        })
    }
}
// fancybox
FancyboxFn()
function FancyboxFn(){
    $.getScript($config.CDN.fancybox_js,function(){
        $(".post-content img").each(function () {
            var element = document.createElement("a");
            $(element).attr("data-fancybox", "images");
            if($config.lazyload.enable){
                $(element).attr("href", $(this).attr("data-img"));
            }else{
                $(element).attr("href", $(this).attr("src"));
            }
            $(this).wrap(element);
        });
        $().fancybox({
            selector: '[data-fancybox="images"]',
            loop: true,
            transitionEffect: 'slide',
            protect: true,
            buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
            hash: false
        });
        $("head").append("<link>");
        fancybox_css =$("head").children(":last");
            fancybox_css.attr({
            rel: "stylesheet",
            type: "text/css",
            href: $config.CDN.fancybox_css
        });
    })
}
if($config.search.enable){
    // local-search
    $.getScript($config.CDN.search, function () {
        searchFunc($config.search.path,'local-search-input','local-search-result')
    })
}

//当浏览器大小变化时
$(window).resize(function(){
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

        // 向下滚动时右侧栏淡出
        var rightside = $(window).scrollTop();
        if (rightside > 100) {
            $('#rightside').fadeIn(300);
        } else {
            $('#rightside').fadeOut(300);
        }
    });
});
