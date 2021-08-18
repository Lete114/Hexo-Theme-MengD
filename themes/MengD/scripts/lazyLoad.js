/**
 * Hexo-Theme-MengD
 * Article image lazy loading processor
 */

'use strict'

const url_for = require('hexo-util').url_for.bind(hexo)
const { extname } = require('path')

hexo.extend.filter.register('after_post_render', (data) => {
  if (extname(data.path) != '.html') return
  if (!hexo.theme.config.lazyload.enable) return
  const loadimg = url_for(hexo.theme.config.lazyload.loadimg)
  data.content = data.content.replace(/(<img.*?src=)/gi, `$1"${loadimg}" data-img=`)
  return data
})
