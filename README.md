<h1 align="center"><a href="https://github.com/lete114/hexo-theme-MengD" target="_blank">MengD(萌典)</a></h1>

<img src="https://cdn.jsdelivr.net/gh/lete114/CDN/MengD/Home.png" alt="MengD(萌典)">


## hexo-theme-MengD
一个崇尚简约优雅，以及极致的性能

把注意力集中到内容上

口号：禁止花里胡哨

## 快速开始

安装
``` powershell
git clone https://github.com/lete114/hexo-theme-MengD.git themes/MengD
```

打开根目录下的`_config.yml`修改`theme: MengD`

## 配置

``` yml
# 导航栏菜单
menu:
  首页: /
  标签: /tags
  关于我: /about
  
## 个人信息配置  
title: Lete乐特's Blog
author: Lete乐特
mail: lete@lete114.top
avatar: https://www.lete114.top/img/avatar.png
description: 人生只有一次，大胆的生活！！

## 信息图标
social:
  fab fa-github: https://github.com/lete114
  fa fa-envelope: mailto:lete@lete114.top

# 是否开启版权声明 
copytight: true  

# 页脚
footer:
  custom_text: 我相信我可以，但我一直在路上，所以我有无限的可能！！  
  since: 2020

# 自动截取
post_content:
  line: 3 # 内容超过多少行后出现省略号(...)
  length: 500 # 截取字数

## 代码块样式
highlight_theme: mac # default / darker / pale night / light / ocean / mac / mac light
```

