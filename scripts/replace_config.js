/**
 * hexo-theme-MengD-config
 * author: Lete114
 */
'use strict'

// 主题配置
hexo.on('generateBefore', function () {
  var config = hexo.config
  var theme = hexo.theme.config

  /* 首页显示的文章数 */
  config.index_generator.per_page = theme.pageCount
})
