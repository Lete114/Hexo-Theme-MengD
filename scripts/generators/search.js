/**
 * @author Lete114
 * @description generator local search json file
 * Compared to the hexo-generator-search plugin, the generated files are smaller in size and do not leak markdown source code, raising the threshold for stealing article content
 * Reference: https://github.com/wzpan/hexo-generator-search
 */

const { stripHTML } = require('hexo-util')

hexo.extend.generator.register('generator_local_search_json', generator_local_search_json)

function generator_local_search_json(locals) {
  const { enable, path } = this.theme.config.search
  const { root } = this.config
  const posts = locals.posts.sort('-date')
  if (!enable || !posts) return
  const data = []
  
  posts.each(function (post) {
    if (post.indexing === false) return
    const tmp = {}
    tmp.title = post.title || 'No Title'
    tmp.url = root + post.path

    let content = post.content.replace(/\<td class=\"gutter\">\<pre>(.*?)\<\/pre>\<\/td>/gim, '')
    tmp.content = stripHTML(content)
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
    data.push(tmp)
  })
  return {
    path,
    data: JSON.stringify(data)
  }
}
