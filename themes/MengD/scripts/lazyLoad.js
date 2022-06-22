/**
 * Hexo-Theme-MengD
 * Article image lazy loading processor
 */

'use strict'

const url_for = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_render:html', (data) => {
  if (!hexo.theme.config.lazyload.enable) return
  const loadimg = url_for(hexo.theme.config.lazyload.loadimg)
  data = data.replace(/(<img.*?src=)/gi, `$1"${loadimg}" data-src=`)
  return data
})
