var html
var mask
var mobileNav
var navbar

// 头部导航栏滚动事件
document.addEventListener('DOMContentLoaded', function () {
  var windowTop = 0 // 定义初始位置
  navbar = mengd.$query('.navbar')
  if (!navbar) return
  function navScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop

    if (scrollTop > windowTop) {
      navbar.style.transform = 'translateY(-60px)'
      windowTop = scrollTop
    } else {
      navbar.style = ''
      windowTop = scrollTop
    }
  }
  window.addEventListener('scroll', mengd.throttle(navScroll, 100))
})

// table wrap
function tableWrap() {
  var table = mengd.$queryAll('.post-content>table,.content>table')
  table.forEach(function (item) {
    mengd.wrap(item, 'div', null, 'table-wrap')
  })
}

// 打开侧边导航栏
function openMobile() {
  var openNav = mengd.$query('.open-nav')
  if (!openNav) return
  openNav.onclick = function () {
    var isOpen = mobileNav.classList.contains('open-mobile')
    if (!isOpen) {
      mobileNav.className = 'open-mobile'
      mask.className = 'mask'
    }
  }
}

// 关闭所有正在打开的弹窗(搜索框、侧边栏)
function closeAll() {
  // 搜索框缩放样式
  var localSearch = mengd.$id('local-search')
  if (localSearch) {
    localSearch.classList.remove('search-animation-max')
    localSearch.classList.add('search-animation-min')
    setTimeout(function () {
      // 延迟0.5秒隐藏
      localSearch.style.display = ''
    }, 500)
  }
  html.style.overflow = 'auto' // 解除滚动条禁止滚动
  // 侧边栏
  if (mobileNav) {
    mobileNav.classList.remove('open-mobile')
    mobileNav.style.opacity = ''
  }
  mask.className = '' // 关闭遮罩
}

// 深色模式
function DarkMode() {
  if (!mengd.$id('darkmode')) return
  var body = document.getElementsByTagName('body')[0]
  var darkBtn = mengd.$id('darkmode')
  var darkIco = mengd.$query('#darkmode i')

  if (localStorage.isDark === 'true') {
    html.setAttribute('theme', 'dark')
    darkIco.classList.remove('fa-moon')
    darkIco.classList.add('fa-sun')
  } else {
    html.removeAttribute('theme')
    darkIco.classList.remove('fa-sun')
    darkIco.classList.add('fa-moon')
  }

  darkBtn.onclick = function () {
    if (localStorage.isDark !== 'true') {
      localStorage.isDark = 'true'
      body.style = 'transition: all .3s linear'
      html.setAttribute('theme', 'dark')
      darkIco.classList.remove('fa-moon')
      darkIco.classList.add('fa-sun')
    } else {
      localStorage.isDark = 'false'
      body.style = 'transition: all .3s linear'
      html.removeAttribute('theme')
      darkIco.classList.remove('fa-sun')
      darkIco.classList.add('fa-moon')
    }
  }
}

// 只有文章页才会执行
function articlePage() {
  if (!mengd.$id('post')) return
  ;(function () {
    // 过时提醒
    const obsolete = mengd.$query('.post-obsolete')
    if (!obsolete) return
    const limit_day = +obsolete.getAttribute('limit_day')
    const created = mengd.getDaysDiffBetweenDates(obsolete.getAttribute('created'))
    const updated = mengd.getDaysDiffBetweenDates(obsolete.getAttribute('updated'))
    if (updated >= limit_day) {
      obsolete.innerHTML = obsolete.innerHTML.replace('${created}', created).replace('${updated}', updated)
      obsolete.classList.remove('display-none')
    }
  })()
  ;(function () {
    // 代码框
    var codeBlock = mengd.$queryAll('figure.highlight')
    codeBlock.forEach(function (item) {
      var lang = item.classList[1]
      lang = lang == 'plaintext' ? 'code' : lang
      var ele = `<div class='code-block' lang='${lang}'>
                  <span class='clipboard'><i class='fa fa-clipboard'></i></span>
                 </div>`
      item.insertAdjacentHTML('afterbegin', ele)
    })
  })()
  ;(function () {
    // fancybox
    mengd.getScript($config.CDN.fancyboxJs, function () {
      const imgAll = mengd.$queryAll('.post-content img')
      imgAll.forEach((ele) => ele.setAttribute('data-fancybox', ''))
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = $config.CDN.fancyboxCss
      document.head.appendChild(link)
    })
  })()
  ;(function () {
    // 代码块折叠
    if (!$config.codeBlockExpand || !$config.codeBlockExpand.enable) return
    var CodeBlock = mengd.$queryAll('figure.highlight')
    // 定义高度
    var height = $config.codeBlockExpand.height
    // 获取当前页面的所有的代码块 循环判断符合条件的折叠
    for (var i = 0; i < CodeBlock.length; i++) {
      if (CodeBlock[i].clientHeight > height) {
        CodeBlock[i].style = 'max-height: ' + height + 'px'
        /**
         * 插入html元素
         * beforeBegin：插入到标签开始前
         * afterBegin:插入到标签开始标记之后
         * beforeEnd:插入到标签结束标记前
         * afterEnd:插入到标签结束标记后
         */
        CodeBlock[i].insertAdjacentHTML('beforeend', '<div class="show-btn"><i class="fas fa-angle-down"></i></div>')
      }
    }
    // 展开
    mengd.$queryAll('.show-btn').forEach(function (item) {
      item.onclick = function () {
        var child = item.childNodes[0] // 获取子节点
        if (child.className == 'fas fa-angle-down') {
          child.classList.remove('fa-angle-down')
          child.classList.add('fa-angle-up')
          item.parentNode.style = '' //清除父节点的样式
        } else {
          child.classList.remove('fa-angle-up')
          child.classList.add('fa-angle-down')
          item.parentNode.style = 'max-height: ' + height + 'px'
          item.previousElementSibling.style = ''
          // 获取当前页面滚动条纵坐标的位置
          scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          var nodeBottom = item.getBoundingClientRect().bottom // 获取当前元素底部距离可见部分的距离
          var CodeBlockBottom = nodeBottom + scrollTop, // 当前代码块底部距离顶部距离
            CodeBlockHeight = $config.codeBlockExpand.height, // 获取代码块超过多少数值折叠代码块
            CodeBlockScrollTop = $config.codeBlockExpand.scrollTop // 获取代码块关闭折叠后滚动返回代码块顶部的距离
          window.scrollTo(0, CodeBlockBottom - CodeBlockHeight - CodeBlockScrollTop)
        }
      }
    })
  })()
  ;(function () {
    // 打开目录
    var openToc = mengd.$id('open-toc')
    var toc = mengd.$id('toc-wrap')
    if (!openToc || !toc) return
    openToc.onclick = function () {
      if (parseInt(toc.style.opacity)) {
        // 关闭
        toc.style.animation = 'toc-close .3s'
        setTimeout(function () {
          toc.style = "opacity:0;animation:'';right: ''"
        }, 150)
      } else {
        // 打开
        toc.style = 'opacity:1;right:30px;animation: toc-open .3s'
      }
    }
  })()
  ;(function () {
    // toc目录百分比
    var article = mengd.$query('.post-content')
    var num = mengd.$query('.num')
    var progress = mengd.$query('.progress')
    function tocScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop
      var winHeight = document.documentElement.clientHeight
      if (article && num) {
        var headerHeight = article.offsetTop
        var docHeight = article.clientHeight

        var contentMath = docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight
        var scrollPercent = (scrollTop - headerHeight) / contentMath
        var scrollPercentRounded = Math.round(scrollPercent * 100)
        var percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded

        num.innerText = percentage + '%'
        progress.value = percentage
      }
    }
    window.addEventListener('scroll', mengd.throttle(tocScroll, 10))
  })()
  ;(function () {
    // 代码块复制
    mengd.$queryAll('figure.highlight').forEach(function (item) {
      // 获取所有代码块
      // firstChild: 获取代码块中的第一个子元素
      // childNodes: 返回当前元素的所有子元素(包括:before和:after)
      var copy = item.firstChild.childNodes[1]
      copy.onclick = function () {
        var selection = window.getSelection()
        selection.selectAllChildren(item.querySelector('.code'))
        navigator.clipboard ? navigator.clipboard.writeText(selection.toString()) : document.execCommand('copy')
        selection.removeAllRanges()
        copy.innerHTML = '<i class="fa fa-check" style="color:green"></i>'
        setTimeout(function () {
          copy.innerHTML = '<i class="fa fa-clipboard"></i>'
        }, 2000)
      }
    })
  })()
}

// 执行所有函数
function exeAllFn() {
  html = document.getElementsByTagName('html')[0]
  mask = mengd.$id('mask')
  mobileNav = mengd.$id('mobile-nav')
  navbar = mengd.$query('.navbar')
  if (navbar) {
    navbar.style = '' // 每次触发exeAllFn函数都将显示导航栏
  }
  articlePage() // 只有文章页才会执行
  tableWrap() // 添加table外围
  openMobile() // 打开手机端导航栏
  closeAll() // 关闭所有弹窗
  DarkMode() // 深色模式
}
document.addEventListener('DOMContentLoaded', exeAllFn)
