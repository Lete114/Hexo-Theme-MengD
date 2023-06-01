/**
 * @author Lete114
 * @description image lazy loading
 */

const url_for = hexo.extend.helper.get('url_for').bind(hexo)

const reg = /<img([^>]+)>/g
const min1px = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACAD'

hexo.extend.filter.register('after_render:html', function (data, local) {
  const { enable, loding } = hexo.theme.config.lazyload
  if (!enable) return

  return data.replace(reg, function (match, $1) {
    const dataSrc = $1.replace(/src=/, 'data-src=')
    return `<img${dataSrc} src=${url_for(loding || min1px)}>`
  })
})
