/**
 * cloudTags.js
 * transplant from hexo-theme-butterfly
 */

'use strict'

hexo.extend.helper.register('cloud_tags', function (options = {}) {
  const env = this
  let source = options.source
  const minfontsize = options.minfontsize
  const maxfontsize = options.maxfontsize
  const limit = options.limit
  const unit = options.unit || 'px'

  let result = ''
  if (limit > 0) {
    source = source.limit(limit)
  }

  const sizes = []
  source.sort('length').forEach((tag) => {
    const { length } = tag
    if (sizes.includes(length)) return
    sizes.push(length)
  })

  const length = sizes.length - 1
  source.forEach((tag) => {
    const ratio = length ? sizes.indexOf(tag.length) / length : 0
    const size = minfontsize + (maxfontsize - minfontsize) * ratio
    let style = `font-size: ${parseFloat(size.toFixed(1))}${unit};`
    const color = 'rgb(' + Math.floor(Math.random() * 201) + ', ' + Math.floor(Math.random() * 201) + ', ' + Math.floor(Math.random() * 201) + ')' // 0,0,0 -> 200,200,200
    style += ` color: ${color}`
    result += `<a href="${env.url_for(tag.path)}" style="${style}">${tag.name}</a>`
  })
  return result
})
