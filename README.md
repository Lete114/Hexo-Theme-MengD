<h1 align="center"><a href="https://github.com/lete114/hexo-theme-MengD" target="_blank">MengD(萌典)</a></h1>

<img src="https://cdn.jsdelivr.net/gh/lete114/CDN/MengD/Home.png" alt="MengD(萌典)">


## hexo-theme-MengD

一个简约优雅，及美观漂亮的主题

把注意力集中到内容上

Docs: [MengD(萌典)](https://mengd.lete114.top/)

更新日志: [更新日志](https://mengd.lete114.top/article/ChangeLog.html)

布局参考自[菩提树下](https://blog.caicai.me/)非常感谢

部分样式模仿自[hexo-theme-Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)非常感谢

交流群：[812028613](https://jq.qq.com/?_wv=1027&k=s3PT4WT2)

## 快速开始

安装

稳定[推荐]
``` powershell
git clone -b master https://github.com/lete114/hexo-theme-MengD.git themes/MengD
```

开发
``` powershell
git clone -b dev https://github.com/lete114/hexo-theme-MengD.git themes/MengD
```

打开根目录下的`_config.yml`修改`theme: MengD`



## 配置

``` yml
#--------------------------------------------------------
# Hexo-MengD(萌典)
# 项目地址：https://github.com/lete114/hexo-theme-MengD
# 主题文档：https://mengd.lete114.top/
# 一个简约优雅，及美观漂亮的Hexo主题
#--------------------------------------------------------

# 导航栏菜单
navbar: true # 悬浮导航栏
# menu:
#   首页: /
#   标签: /tags
#   分类: /categories
#   归档: /archives
#   友情链接: /link
#   关于我: /about
  
# 基本设置(会覆盖hexo的配置)
title: Hexo-Theme-MengD(萌典) #Lete乐特's Blog
author: MengD(萌典)
mail: lete@lete114.top
favicon: /img/favicon.png
avatar: /img/logo.gif
language: zh-CN # 如果需要更换全局语言，请到hexo配置文件内设置(此处设置无效)
keywords: 
description: 一个简约优雅，及美观漂亮的主题!!
body_width: 800px # 页面主体大小
cover: true # 是否开启主页文章cover(首图) 
# 是否开启版权(文章内可以设置copyright: false 属性单独关闭某个文章的版权)
copyright: true  
page_count: 5 # 首页显示的文章数

# 需安装插件: npm install hexo-generator-search --save
search: 
  enable: true
  path: /search.xml
  field: post
  
# https://github.com/lete114/hexo-minify
# 需要更全面的压缩请安装插件: npm install hexo-minify --save
minify:
  js: false
  css: true 
  html: false

## 404页面
error_404:
  enable: true
  background: '#00c4b6'

# 自动截取
post_content:
  line: 3 # 显示多少行后出现省略号(...)
  length: 500 # 截取多少字 

lazyload:
  enable: true
  loadimg: /img/load.gif

## 代码块样式
highlight_theme: mac # default / darker / pale night / light / ocean / mac / mac light
CodeBlock: # 是否开启代码块折叠
  enable: true
  height: 400 # 代码块高度超过400折叠 单位px
  scrollTop: 200 # 展开后,再次(手动点击)点击折叠滚动到代码块开始的距离 单位px


# 图标
social:
  # fab fa-github: https://github.com/lete114
  # fa fa-envelope: mailto:lete@lete114.top

# 有趣的标题切换
amusing_title:
  enable: true
  leave_title: '(つェ⊂) 我藏好了哦~ '
  return_title: '(*´∇｀*) 被你发现啦~ '

## 主题颜色
theme_color:  
  main: '#e58a8a' # 主色
  fan: '#00c4b6' # 小风车
  progress: '#06c5d8' # toc进度条颜色
  scrollbar: '#e58a8a' # 滚动条颜色
  body-a: '#00c4b6' # 全局a标签颜色
  author-name: '#ff7242' # 博主昵称

## 自定义侧边栏按钮
## 使用 || 分割
rightside:
  - harf="javascript:(0)"id="darkmode"||深色/浅色||fas fa-moon #渲染结果： <a harf="javascript:(0)" id="darkmode" title="深色/浅色"> <i class="fas fa-moon"></i> </a>
  

# 通过issues申请友情链接(目前只支持gitee)
link:
  issues:
    enable: false # 是否开启
    subtitle: Gitee友链 # 副标题
    owner: lete114 # 仓库拥有者
    repo: link # 仓库昵称
    show_position: later # 显示的位置  前(before) / 后(later)
  repo_pr:  
    enable: true # 是否开启
    yml_url: https://cdn.jsdelivr.net/gh/lete114/CDN@latest/link.yml # 友链yml文件
    show_position: later # 显示的位置  前(before) / 后(later)

## share分享
## https://github.com/overtrue/share.js/
share:
  sites:
    # - facebook
    # - qq
    # - weibo
    # - wechat
    # - twitter

## 打赏
reward:
  enable: true
  alipay: https://cdn.jsdelivr.net/gh/lete114/CDN@2.0/Use/zfb.png
  wechat: https://cdn.jsdelivr.net/gh/lete114/CDN@2.0/Use/wzf.png

## pjax
## https://github.com/MoOx/pjax
pjax: true

## MathJax
## https://github.com/mathjax/MathJax
MathJax: false

# 评论
## 注意大小写
comments: waline # twikoo / waline / valine

# valine
## https://valine.js.org/
valine:
  source: https://cdn.jsdelivr.net/gh/lete114/CDN2/js/Valine-Lete3.2.min.js ## 原版: https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js
  appid: qvkfxxxxxxxxxxxxxxxxxxxxxbMMI # 你的 leancloud app id 
  appkey: WOURxxxxxxxxxxxxxxxxxWJrog # 你的 leancloud app key 
  master: 2a776xxxxxxxxxxxxxxxxxd7f4442e2 # (原版valine不支持)你的邮箱md5加密(百度搜索md5在线加密)
  friends: ed5bb69dfxxxxxxxxxxxxxxe6893b,d24719e3bxxxxxxxxxxxxxxbac991457 # (原版valine不支持)你的小伙伴的md5邮箱加密
  placeholder: 快来评论吧!! #评论框占位符
  avatar: '' # gravatar style https://valine.js.org/#/avatar
  meta: ['nick','mail','link'] # 评论者相关属性
  pageSize: 5 # comment list page size
  lang: zh-CN # i18n: zh-CN/zh-TW/en/ja
  emojiCDN:    # emoji CDN
  emojiMaps:  # 自定义表情包
  enableQQ: true  # enable the Nickname box to automatically get QQ Nickname and QQ Avatar
  option: # 自定义添加 https://valine.js.org/configuration.html

# waline
## https://waline.js.org
waline:
  source: //cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js
  serverURL: https://waline.vercel.app/ # 服务端地址
  placeholder: 快来评论吧!! #评论框占位符
  avatar: '' # gravatar style https://valine.js.org/#/avatar
  meta: ['nick','mail','link'] # 评论者相关属性
  pageSize: 5 # comment list page size
  lang: zh-CN # i18n: zh-CN/zh-TW/en/ja
  requiredFields: ['nick','mail','link'] # 评论人必填项
  emojiCDN:    # emoji CDN
  emojiMaps:  # 自定义表情包
  option: # 自定义添加 https://waline.js.org/client/basic.html

# twikoo
## https://twikoo.js.org/
twikoo:
  source: https://cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js
  envId: xxxxxxxx # 你的环境id
  region: ap-shanghai # 环境地域，ap-shanghai / ap-guangzhou
  path: window.location.pathname  # 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
  option: 

## 说说

# Artitalk
## https://artitalk.js.org/settings.html
artitalk:
  enable: false # 是否开启
  source: https://cdn.jsdelivr.net/npm/artitalk
  title: Artitalk # 标题
  path: artitalk/index.html # 路径
  appid: WhOxxxxxxxxxxxxxMMI #  LeanCloud appId
  appkey: M9Pxxxxxxxxxxxxxxx3Kvs # LeanCloud appKey
  serverURL: # 如果你是国内版 LeanCloud 用户，此项必填
  lang:  # 语言设置 默认中文 zh / en / es
  atEmoji: # 自定义表情包
  option:  

# HPP_talk
## https://hexoplusplus.js.org/
hpp_talk:
  enable: false # 是否开启
  source_css: https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@9bf1085/talk.css
  source_js: https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@9bf1085/talk_user.js
  title: HPP_talk # 标题
  path: hpp_talk/index.html # 路径
  domain: blog.lete114.workers.dev # 您的HexoPlusPlus域名
  limit: 10 # 单次获取的最多条数
  start: 0 # 从第几条开始
  option: 

# toc目录
toc:
  enable: true
  scrollbar: true ## 是否隐藏toc滚动条

# 页脚
footer:
  since: 2020
  custom_text: 我相信我可以，但我一直在路上，所以我有无限的可能！！  
  icp:
    enable: false
    text: 
    icon: /img/icp.png
    url: https://beian.miit.gov.cn/
  cdn:
    enable: false
    text: 提供加速服务
    icon: https://cdn.jsdelivr.net/gh/lete114/CDN/upyun/05.png
    url: https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral

## 滚动顶部 / 滚动底部 按钮
updown:
  enable: false
  # left: # A默认显示 B鼠标悬浮 如果没有第二张图片 设置A/B一样 否则错误
  #   - /img/leimuA.png
  #   - /img/leimuB.png
  # rgiht: 
  #   - /img/lamuA.png
  #   - /img/lamuB.png


# 统计(分析)
analytics:
  baidu: 
  google: 
# 域名验证
verify:
  # 例如：- <meta name="google-site-verification" content="uPApgr9zH7JO36gqOf48_UpfbFRRJ6zCf4cQd-s80eA" />

# 设置字体
font:
  # 全局字体
  html: '"PingFang SC","Microsoft YaHei",Helvetica,Arial,Menlo,Monaco,monospace,sans-serif'
  # 代码块字体
  code: '"PingFang SC","Microsoft YaHei",Helvetica,Arial,Menlo,Monaco,monospace,sans-serif'

# 自定义引入外部css、js
import:
  head: # 引入到</head>之前
    - 
  top: # 引入到<body>之后
    - 
  bottom: # 引入到</body>之前
    - 
  # 例如： 
  # - <link rel="stylesheet" href="/css/index.css">
  # - '<style>body{color: red}</style>' ## 注意由于css的‘{}’是关键符号所以需要(单/双)引号''
  # - <script>alert(1)</script>

# 主题的css与js引入
## 无特殊要求请勿更改  
CDN:
  index_css: /css/index.css
  index_js: /js/main.js
  utlis: /js/utlis.js
  search: /js/search.js
  lazyload: /js/lazyLoad.js
  fortawesome: https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css
  pixi: https://cdnjs.cloudflare.com/ajax/libs/pixi.js/2.2.5/pixi.js

  # pjax
  pjax: https://cdn.jsdelivr.net/npm/pjax/pjax.min.js
  # 分享
  share_css: https://cdn.jsdelivr.net/npm/social-share.js/dist/css/share.min.css
  share_js: https://cdn.jsdelivr.net/npm/social-share.js/dist/js/social-share.min.js
  
  # yml转json
  js_yaml: https://cdn.jsdelivr.net/npm/js-yaml@latest/dist/js-yaml.min.js
  # math
  mathjax: https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
```



