
var html = document.getElementsByTagName("html")[0]
var mask = document.getElementById("mask")

// 代码框
function add_code_block() {
    var code_block = document.querySelectorAll("figure.highlight")
    code_block.forEach(function (item) {
        var lang = item.classList[1]
        lang = lang == 'plaintext' ? 'code' : lang
        var ele = `<div class="code_block" lang="${lang}">
            <span class="clipboard"><i class="fa fa-clipboard"></i></span>
        </div>`
        item.insertAdjacentHTML('afterbegin', ele)
    })
}

// table wrap
function table_wrap() {
    var table = document.querySelectorAll(".post_content>table,.content>table")
    table.forEach(function (item) {
        wrap(item, "div", null, "table_wrap")
    });
}

// 代码块折叠
function code_block_expand() {
    if (!$config.code_block_expand||!$config.code_block_expand.enable) return
    var CodeBlock = document.querySelectorAll("figure.highlight")
    // 定义高度
    var height = $config.code_block_expand.height
    // 获取当前页面的所有的代码块 循环判断符合条件的折叠
    for (var i = 0; i < CodeBlock.length; i++) {
        if (CodeBlock[i].clientHeight > height) {
            CodeBlock[i].style = "max-height: " + height + "px"
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
    document.querySelectorAll(".show-btn").forEach(function (item) {
        item.onclick = function () {
            var child = item.childNodes[0] // 获取子节点
            if (child.className == "fas fa-angle-down") {
                child.classList.remove("fa-angle-down")
                child.classList.add("fa-angle-up")
                item.parentNode.style = "" //清除父节点的样式
            } else {
                child.classList.remove("fa-angle-up")
                child.classList.add("fa-angle-down")
                item.parentNode.style = "max-height: " + height + "px"
                item.previousElementSibling.style = ""
                // 获取当前页面滚动条纵坐标的位置
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var node_bottom = item.getBoundingClientRect().bottom // 获取当前元素底部距离可见部分的距离
                var CodeBlockBottom = node_bottom + scrollTop, // 当前代码块底部距离顶部距离
                    CodeBlockHeight = $config.code_block_expand.height,// 获取代码块超过多少数值折叠代码块
                    CodeBlockScrollTop = $config.code_block_expand.scrollTop; // 获取代码块关闭折叠后滚动返回代码块顶部的距离
                window.scrollTo(0, CodeBlockBottom - CodeBlockHeight - CodeBlockScrollTop)
            }
        }
    })
}

// 打开侧边导航栏
function open_mobile() {
    var mobile_nav = document.getElementById("mobile_nav");
    var open_nav = document.getElementsByClassName('open_nav')[0]
    open_nav.onclick = function () {
        var is_open = mobile_nav.classList.contains("open_mobile")
        if (!is_open) {
            mobile_nav.className = "open_mobile";
            mask.className = "mask";
        }
    }
}

// 打开目录
function show_toc() {
    var open_toc = document.getElementById("open_toc")
    var toc = document.getElementById("toc")
    if (!toc) return
    open_toc.onclick = function () {
        var is_open = toc.classList.contains("open_toc")
        if (!is_open) {
            toc.classList.add("open_toc")
            mask.className = "mask";
        }
        else toc.classList.remove("open_toc")
    }
}

// 显示右侧栏隐藏域
function rightside_show() {
    var settings = document.getElementById("settings")
    if (!settings) return
    settings.onclick = function () {
        var btn = document.getElementsByClassName("rightside_btn")[0]
        var is_show = btn.classList.contains("rightside_show")
        if (!is_show) btn.classList.add("rightside_show")
        else btn.classList.remove("rightside_show")
    }
}

// 关闭所有正在打开的弹窗(搜索框、侧边栏)
function close_all() {
    // 搜索框缩放样式
    var local_search = document.getElementById("local_search");
    if(local_search){
        local_search.classList.remove("search_animation_max")
        local_search.classList.add("search_animation_min")
        setTimeout(function () {// 延迟0.5秒隐藏
            local_search.style.display = ""
        }, 500)
    }
    html.style.overflow = "auto";// 解除滚动条禁止滚动
    // 目录
    var toc = document.querySelector(".open_toc")
    if (toc) toc.classList.remove("open_toc")
    // 侧边栏
    mobile_nav.classList.remove("open_mobile")
    mobile_nav.style.opacity = "";
    mask.className = "" // 关闭遮罩
}

// 深色模式
function DarkMode() {
    if (!document.getElementById("darkmode")) return
    var body = document.getElementsByTagName("body")[0]
    var darkBtn = document.getElementById("darkmode")
    var darkIco = document.querySelector("#darkmode i")

    if (localStorage.isDark) {
        html.setAttribute("data-theme", "dark")
        darkIco.classList.remove("fa-moon")
        darkIco.classList.add("fa-sun")
    } else {
        html.removeAttribute("data-theme")
        darkIco.classList.remove("fa-sun")
        darkIco.classList.add("fa-moon")
    }

    darkBtn.onclick = function () {
        if (darkIco.classList[1] == "fa-moon") {
            localStorage.isDark = "dark";
            body.style = "transition: all .3s linear"
            html.setAttribute("data-theme", "dark")
            darkIco.classList.remove("fa-moon")
            darkIco.classList.add("fa-sun")
        } else {
            localStorage.isDark = "";
            body.style = "transition: all .3s linear"
            html.removeAttribute("data-theme")
            darkIco.classList.remove("fa-sun")
            darkIco.classList.add("fa-moon")
        }
    }
}

// 滚动事件
function scroll() {
    // 监听 scroll 
    var windowTop = 0; // 定义初始位置
    window.addEventListener('scroll', function () {
        var winHeight = document.documentElement.clientHeight
        var scrollTop = window.scrollY || document.documentElement.scrollTop

        // 头部导航栏
        var navbar = document.querySelector(".navbar")
        if (scrollTop > windowTop) {
            navbar.style.opacity = 0
            navbar.style.transform = "translateY(-60px)"
            windowTop = scrollTop;
        } else {
            navbar.style.opacity = 1
            navbar.style.transform = ""
            windowTop = scrollTop;
        }

        // toc目录百分比
        var article = document.querySelector(".post_content")
        var num = document.querySelector(".num")
        if (article && num) {
            var headerHeight = article.offsetTop
            var docHeight = article.clientHeight

            var contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : (document.documentElement.scrollHeight - winHeight)
            var scrollPercent = (scrollTop - headerHeight) / (contentMath)
            var scrollPercentRounded = Math.round(scrollPercent * 100)
            var percentage = (scrollPercentRounded > 100) ? 100 : (scrollPercentRounded <= 0) ? 0 : scrollPercentRounded

            num.innerText = percentage + "%"
            document.querySelector(".progress").value = percentage
        }
    })
}

// 代码块复制
function code_copy() {
    document.querySelectorAll("figure.highlight").forEach(function (item) { // 获取所有代码块
        // firstChild: 获取代码块中的第一个子元素
        // childNodes: 返回当前元素的所有子元素(包括:before和:after)
        var clipboard = item.firstChild.childNodes[1]
        clipboard.onclick = function () {
            var selection = window.getSelection()
            selection.selectAllChildren(item.querySelector(".code"))
            document.execCommand("copy");
            selection.removeAllRanges()
            clipboard.innerHTML = "<i class='fa fa-check' style='color:green'></i>";
            setTimeout(function () {
                clipboard.innerHTML = "<i class='fa fa-clipboard'></i>"
            }, 2000)
        }
    })
}

// 执行所有函数
function exe_all_fn() {
    add_code_block() // 添加代码框
    table_wrap() // 添加table外围
    code_block_expand() // 代码块折叠
    open_mobile() // 打开手机端导航栏
    show_toc() // 打开目录
    rightside_show() // 显示侧边栏隐藏部分
    close_all() // 关闭所有弹窗
    DarkMode() // 深色模式
    scroll() // 滚动事件
    code_copy() // 代码块复杂
}
; (function () { exe_all_fn() })()
