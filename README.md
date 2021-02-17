<h1 align="center"><a href="https://github.com/lete114/hexo-theme-MengD" target="_blank">MengD(萌典)</a></h1>

<img src="https://cdn.jsdelivr.net/gh/lete114/CDN/MengD/Home.png" alt="MengD(萌典)">


## hexo-theme-MengD

一个简约优雅，及美观漂亮的主题

把注意力集中到内容上

Docs: [MengD(萌典)](https://mengd.lete114.top/)

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
# 一个简约优雅，及美观漂亮的主题
#--------------------------------------------------------

# 导航栏菜单
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
language: zh-CN
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
  enable: true # 是否开启404页面
  text: 404！页面君找不到这个网页！！ # 自定义内容
  sec: 10 # 多少秒后返回首页
  background: https://cdn.jsdelivr.net/gh/lete114/CDN2/img/wei_er_li_te/3.jpg # 404页面背景颜色，默认白色

# 自动截取
post_content:
  line: 3 # 显示多少行后出现省略号(...)
  length: 500 # 截取多少字 

## 代码块样式
highlight_theme: mac # default / darker / pale night / light / ocean / mac / mac light

# 图标
social:
  fab fa-github: https://github.com/lete114
  fa fa-envelope: mailto:lete@lete114.top

## 主题颜色
theme_color:  
  main: '#e58a8a' # 主色
  fan: '#00c4b6' # 小风车
  progress: '#06c5d8' # toc进度条颜色
  scrollbar: '#e58a8a' # 滚动条颜色
  body-a: '#00c4b6' # 全局a标签颜色
  author-name: '#ff7242' # 博主昵称

# 通过issues申请友情链接(目前只支持gitee)
link:
  issues:
    enable: false # 是否开启
    title: Gitee友链 # 主标题
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
    - facebook
    - qq
    - weibo
    - wechat
    - twitter

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
comment: waline # twikoo / waline / valine

# valine
## https://valine.js.org/
valine:
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
  envId: xxxxxxxx # 你的环境id
  region: ap-shanghai # 环境地域，ap-shanghai / ap-guangzhou
  path: window.location.pathname  # 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
  option: 

## 说说

# Artitalk
## https://artitalk.js.org/settings.html
artitalk:
  enable: false # 是否开启
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
    url: http://www.beian.miit.gov.cn/
  cdn:
    enable: false
    text: 提供加速服务
    icon: https://cdn.jsdelivr.net/gh/lete114/CDN/upyun/05.png
    url: https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral
    


# 百度统计
analytics:
  baidu: 
  google: 

# 自定义引入外部css、js
import:
  head: 
    - 
  botton:
    - 
  # 例如： 
  # - <link rel="stylesheet" href="/css/index.css">
  # - <link rel="stylesheet" href="/css/index.css">
  # - '<style>body{color: red}</style>' ## 注意由于css的‘{}’是关键符号所以需要(单/双)引号''
  # - <script>alert(1)</script>

# 主题的css与js引入
## 无特殊要求请勿更改  
CDN:
  index_css: /css/index.css
  index_js: /js/main.js
  article_css: /css/article.css
  search: /js/search.js
  upj: https://cdn.jsdelivr.net/gh/lete114/CDN/Use/up.gif

  # pjax
  pjax: https://cdn.jsdelivr.net/npm/pjax/pjax.js
  # 图片展示
  fancybox_css: https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
  fancybox_js: https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
  # 分享
  share_css: https://cdn.jsdelivr.net/npm/social-share.js/dist/css/share.min.css
  share_js: https://cdn.jsdelivr.net/npm/social-share.js/dist/js/social-share.min.js
  # 评论
  valine: https://cdn.jsdelivr.net/gh/lete114/CDN2/js/Valine-Lete3.2.js ## 原版: //unpkg.com/valine/dist/Valine.min.js
  waline: //cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js
  twikoo: https://cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js
  
  # 说说
  # Artitalk
  artitalk: https://cdn.jsdelivr.net/npm/artitalk
  # hpp_talk
  hpp_talk_js: https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@9bf1085/talk_user.js
  hpp_talk_css: https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@9bf1085/talk.css
  
  # yml转json
  js_yaml: https://cdn.jsdelivr.net/npm/js-yaml@latest/dist/js-yaml.min.js
  # clipboard
  clipboard: https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js
  # math
  mathjax: https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
```


## 更新日志

[更新日志](https://mengd.lete114.top/article/ChangeLog.html)

