'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_post_render', function(data) {
  if (!hexo.theme.config.lazyload.enable) return
  data.content = data.content.replace(/(<img.*? src=)/ig, `$1 "${urlFor(hexo.theme.config.lazyload.loadimg)}" data-img=`)
  data.content = data.content.replace(/<img(.*?)>/ig,'<img $1 >')
  return data
})