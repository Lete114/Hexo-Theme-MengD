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
    content = stripHTML(content)
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
    tmp.content = LZStringCompress(content)
    data.push(tmp)
  })
  return {
    path,
    data: JSON.stringify(data)
  }
}

function LZStringCompress(uncompressed) {
  const f = String.fromCharCode
  const bitsPerChar = 16
  if (!uncompressed) return ''
  var i,
    value,
    context_dictionary = {},
    context_dictionaryToCreate = {},
    context_c = '',
    context_wc = '',
    context_w = '',
    context_enlargeIn = 2, // Compensate for the first entry which should not count
    context_dictSize = 3,
    context_numBits = 2,
    context_data = [],
    context_data_val = 0,
    context_data_position = 0,
    ii

  for (ii = 0; ii < uncompressed.length; ii += 1) {
    context_c = uncompressed.charAt(ii)
    if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
      context_dictionary[context_c] = context_dictSize++
      context_dictionaryToCreate[context_c] = true
    }

    context_wc = context_w + context_c
    if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
      context_w = context_wc
    } else {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
        if (context_w.charCodeAt(0) < 256) {
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0
              context_data.push(f(context_data_val))
              context_data_val = 0
            } else {
              context_data_position++
            }
          }
          value = context_w.charCodeAt(0)
          for (i = 0; i < 8; i++) {
            context_data_val = (context_data_val << 1) | (value & 1)
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0
              context_data.push(f(context_data_val))
              context_data_val = 0
            } else {
              context_data_position++
            }
            value = value >> 1
          }
        } else {
          value = 1
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | value
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0
              context_data.push(f(context_data_val))
              context_data_val = 0
            } else {
              context_data_position++
            }
            value = 0
          }
          value = context_w.charCodeAt(0)
          for (i = 0; i < 16; i++) {
            context_data_val = (context_data_val << 1) | (value & 1)
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0
              context_data.push(f(context_data_val))
              context_data_val = 0
            } else {
              context_data_position++
            }
            value = value >> 1
          }
        }
        context_enlargeIn--
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits)
          context_numBits++
        }
        delete context_dictionaryToCreate[context_w]
      } else {
        value = context_dictionary[context_w]
        for (i = 0; i < context_numBits; i++) {
          context_data_val = (context_data_val << 1) | (value & 1)
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0
            context_data.push(f(context_data_val))
            context_data_val = 0
          } else {
            context_data_position++
          }
          value = value >> 1
        }
      }
      context_enlargeIn--
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits)
        context_numBits++
      }
      // Add wc to the dictionary.
      context_dictionary[context_wc] = context_dictSize++
      context_w = String(context_c)
    }
  }

  // Output the code for w.
  if (context_w !== '') {
    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
      if (context_w.charCodeAt(0) < 256) {
        for (i = 0; i < context_numBits; i++) {
          context_data_val = context_data_val << 1
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0
            context_data.push(f(context_data_val))
            context_data_val = 0
          } else {
            context_data_position++
          }
        }
        value = context_w.charCodeAt(0)
        for (i = 0; i < 8; i++) {
          context_data_val = (context_data_val << 1) | (value & 1)
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0
            context_data.push(f(context_data_val))
            context_data_val = 0
          } else {
            context_data_position++
          }
          value = value >> 1
        }
      } else {
        value = 1
        for (i = 0; i < context_numBits; i++) {
          context_data_val = (context_data_val << 1) | value
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0
            context_data.push(f(context_data_val))
            context_data_val = 0
          } else {
            context_data_position++
          }
          value = 0
        }
        value = context_w.charCodeAt(0)
        for (i = 0; i < 16; i++) {
          context_data_val = (context_data_val << 1) | (value & 1)
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0
            context_data.push(f(context_data_val))
            context_data_val = 0
          } else {
            context_data_position++
          }
          value = value >> 1
        }
      }
      context_enlargeIn--
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits)
        context_numBits++
      }
      delete context_dictionaryToCreate[context_w]
    } else {
      value = context_dictionary[context_w]
      for (i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1)
        if (context_data_position == bitsPerChar - 1) {
          context_data_position = 0
          context_data.push(f(context_data_val))
          context_data_val = 0
        } else {
          context_data_position++
        }
        value = value >> 1
      }
    }
    context_enlargeIn--
    if (context_enlargeIn == 0) {
      context_enlargeIn = Math.pow(2, context_numBits)
      context_numBits++
    }
  }

  // Mark the end of the stream
  value = 2
  for (i = 0; i < context_numBits; i++) {
    context_data_val = (context_data_val << 1) | (value & 1)
    if (context_data_position == bitsPerChar - 1) {
      context_data_position = 0
      context_data.push(f(context_data_val))
      context_data_val = 0
    } else {
      context_data_position++
    }
    value = value >> 1
  }

  // Flush the last char
  while (true) {
    context_data_val = context_data_val << 1
    if (context_data_position == bitsPerChar - 1) {
      context_data.push(f(context_data_val))
      break
    } else context_data_position++
  }
  return context_data.join('')
}
