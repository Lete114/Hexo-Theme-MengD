/**
 * hexo-theme-MengD(萌典)-config
 * author: Lete114
 */
'use strict'

// 主题配置
hexo.on('generateBefore', function () {
  var config = hexo.config
  var theme = hexo.theme.config

  /* 默认自动css压缩 */
  config.stylus = { compress: theme.minify.css }

  /* 首页显示的文章数 */
  config.index_generator.per_page = theme.page_count

  /* 本地搜索设置 */
  config.search = theme.search

  /* 资源压缩 */
  config.minify = theme.minify
})
