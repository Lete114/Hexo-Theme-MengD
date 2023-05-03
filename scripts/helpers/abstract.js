/**
 * @author Lete114
 * @description Get page content abstract
 */

const { stripHTML, truncate } = require('hexo-util')

hexo.extend.helper.register('getAbstract', function (post, length = 200) {
  let abstract =
    post.abstract ||
    // Remove extra spaces and line breaks, as well as the line numbers of the code blocks
    post.content.replace(/\<td class=\"gutter\">\<pre>(.*?)\<\/pre>\<\/td>/gim, '').replace(/[\n]|[\r\n]/gim, '')

  // Remove html tags
  abstract = stripHTML(abstract)

  // Get the content of the specified length
  return truncate(abstract, { length }).trim()
})
