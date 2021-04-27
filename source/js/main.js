// 获取元素
var html = document.getElementsByTagName("html")[0]
var mask = document.getElementById("mask")
var mobileNav = document.getElementById("mobileNav");
var toc = document.getElementById("toc");
/**
 * 展开菜单栏
 * 获取所有id为openNav的标签，点击当前标签执行方法
 */ 
document.querySelectorAll("#openNav").forEach(function(item){
    item.onclick=function(){
        if(mobileNav.style.opacity==0){
            mobileNav.style.opacity=1;
            mobileNav.className="open";
            mask.className="mask";
        }
        else mobileNav.style.opacity=0;
    }
})

// 关闭所有正在打开的弹窗
mask.onclick=function(){
    mask.className=""
    mobileNav.classList.remove("open")
    mobileNav.style.opacity=0
    html.style.overflow="auto";
}

// 显示目录
if(document.getElementsByClassName("rightside-toc")[0]!=null){
    document.getElementsByClassName("rightside-toc")[0].onclick=function(){
        if(toc.style.display==""||toc.style.display=="none"){
            toc.style.display="block"
            toc.classList.remove("search-animation-min")
            toc.classList.add("search-animation-max")
        }else{
            toc.classList.remove("search-animation-max")
            toc.classList.add("search-animation-min")
            toc.style.opacity=0
            setTimeout(function(){
                toc.style.display="none"
                toc.style.opacity=""
            },500)
        }
    }
}

// 代码块复制
CodeCopy()
function CodeCopy(){
    document.querySelectorAll(".highlight-wrap").forEach(function (item) {
        item.firstChild.onclick = function () {
            const selection = window.getSelection()
            selection.selectAllChildren(item.querySelector(".code"))
            document.execCommand("Copy");
            selection.removeAllRanges()
            item.firstChild.innerHTML = "<i class='fa fa-check' style='color:green'></i>";
            setTimeout(function () {
                item.firstChild.innerHTML = "<i class='fa fa-clipboard'></i>"
            }, 2000)
        }
    })
}

// 深色模式
DarkMode()
function DarkMode(){
    if(document.querySelector("#darkmode")==null) return
    var darkClass = document.getElementsByTagName("body")[0]
    var darkBtn = document.querySelector("#darkmode")
    var darkIco = document.querySelector("#darkmode i")
    // 深色模式
    if(localStorage.isDark=="dark"){
        darkClass.classList.add("dark")
        darkIco.classList.remove("fa-moon")
        darkIco.classList.add("fa-sun")
    }else{
        darkClass.classList.remove("dark")
        darkIco.classList.remove("fa-sun")
        darkIco.classList.add("fa-moon")
    }

    darkBtn.onclick=function(){
        if(darkIco.classList[1]=="fa-moon"){
            localStorage.isDark = "dark";
            darkClass.style="transition: all .3s linear"
            darkClass.classList.add("dark")
            darkIco.classList.remove("fa-moon")
            darkIco.classList.add("fa-sun")
        }else{
            localStorage.isDark = "";
            darkClass.style="transition: all .3s linear"
            darkClass.classList.remove("dark")
            darkIco.classList.remove("fa-sun")
            darkIco.classList.add("fa-moon")
        }
    }
}
if($config.CodeBlock.enable){
    // 代码块折叠
    CodeBlock()
    function CodeBlock(){
        var CodeBlock = document.querySelectorAll("figure.highlight")
        // 定义高度
        var height = $config.CodeBlock.height
        // 获取当前页面的所有的代码块 循环判断符合条件的折叠
        for(var i = 0;i<CodeBlock.length;i++){
            if(CodeBlock[i].clientHeight>height){
                CodeBlock[i].style="max-height: "+height+"px"
                /**
                 * 插入html元素
                 * beforeBegin：插入到标签开始前
                 * afterBegin:插入到标签开始标记之后
                 * beforeEnd:插入到标签结束标记前
                 * afterEnd:插入到标签结束标记后
                 */
                CodeBlock[i].insertAdjacentHTML("beforeend", '<div class="show-btn"><i class="fas fa-angle-down"></i></div>');
            }
        }
        // 展开
        document.querySelectorAll(".show-btn").forEach(function(item){
            item.onclick=function(){
                var child = item.childNodes[0] // 获取子节点
                if(child.className=="fas fa-angle-down"){
                    child.classList.remove("fa-angle-down")
                    child.classList.add("fa-angle-up")
                    item.parentNode.style="" //清除父节点的样式
                    item.previousElementSibling.style="margin-bottom: 20px" // 设置上一个节点样式
                }else{
                    child.classList.remove("fa-angle-up")
                    child.classList.add("fa-angle-down")
                    item.parentNode.style="max-height: "+height+"px"
                    item.previousElementSibling.style=""
                    var CodeBlockBottom = getNodePosition(item).bottom // 当前代码块底部距离顶部距离
                        CodeBlockHeight = $config.CodeBlock.height,
                        CodeBlockScrollTop = $config.CodeBlock.scrollTop;
                        window.scrollTo(0,CodeBlockBottom-CodeBlockHeight-CodeBlockScrollTop)
                }
            }
        })
    }
}


// 滚动事件
scroll()
function scroll(){
    var windowTop=0; // 定义初始位置

    // 监听 scroll 
    window.addEventListener('scroll', function(){
        var winHeight = document.documentElement.clientHeight
        var scrollTop = window.scrollY || document.documentElement.scrollTop
        // toc目录百分比
        if(document.querySelector(".post-content")!=null&&document.getElementById("num")!=null){
            var article = document.querySelector(".post-content")
            var headerHeight = article.offsetTop
            var docHeight = article.clientHeight
            
            var contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : (document.documentElement.scrollHeight - winHeight)
            var scrollPercent = (scrollTop - headerHeight) / (contentMath)
            var scrollPercentRounded = Math.round(scrollPercent * 100)
            var percentage = (scrollPercentRounded > 100) ? 100 : (scrollPercentRounded <= 0) ? 0 : scrollPercentRounded
            
            document.getElementById("num").innerText= percentage+"%"
            document.getElementById("progress").value = percentage
        }
        
        // 侧边栏
        var rightside = document.querySelector("#rightside")
        if(scrollTop>100){
            rightside.classList.remove("fadeout")
            rightside.classList.add("fadein")
            rightside.style.opacity=1
            rightside.style.transform=""
        
        }else{
            rightside.classList.remove("fadein")
            rightside.classList.add("fadeout")
            rightside.style.opacity=0
            rightside.style.transform="translateX(38px)"
        }

        if($config.navbar){
            // 头部导航栏
            var navbar = document.querySelector("navbar")
            if(scrollTop>windowTop){
                navbar.style.opacity=0
                navbar.style.transform="translateY(-60px)"
                windowTop=scrollTop;
            }else{
                navbar.style.opacity=1
                navbar.style.transform=""
                windowTop=scrollTop;
            }
            if(scrollTop==0)navbar.style.transform="translateY(-60px)";
        }
    })
}

// 创建表格外围标签
TableWrap()
function TableWrap(){
    const $table = document.querySelectorAll(':not(.highlight) > table')
    if ($table.length) {
        $table.forEach(function(item){
            wrap(item, 'div', '', 'table-wrap')
        })
    }
}

// 显示右侧栏隐藏域
rightsideShow()
function rightsideShow(){
    var settings = document.querySelector("#rightside-item #settings")
    if(settings==null) return
    settings.onclick=function(){
        var btn = document.getElementById("rightside-btn")
        var show = btn.getAttribute("class")
        if(show!="rightside-shwo")btn.setAttribute("class","rightside-shwo")
        else btn.removeAttribute("class")
    }
}






   
   
