!(async () => {
  /**
   * @param { string } Selector
   * @param { Element } el
   * @returns { Element }
   */
  const $ = (Selector, el) => (el || document).querySelector(Selector)

  const currentScript = document.currentScript
  const path = currentScript.getAttribute('path')
  const input = $('.search-input')
  const history = $('.search-history')
  const history_list = $('.search-history-list')
  const clear = $('.search-history-clear')
  const result = $('.search-result')
  const storage = JSON.parse(localStorage.getItem('search-history') || '[]').reverse()

  // clear search history
  clear.addEventListener('click', () => {
    localStorage.setItem('search-history', '[]')
    storage.length = 0
    history_list.innerHTML = ''
    history.style = ''
  })

  // gnerate search history
  const history_list_cdf = document.createDocumentFragment()
  storage.forEach((history_item) => {
    const item = document.createElement('div')
    item.className = 'search-history-item'
    item.innerText = history_item
    item.addEventListener('click', () => {
      input.value = history_item
      input.dispatchEvent(new Event('input'))
    })
    history_list_cdf.appendChild(item)
  })
  history_list.appendChild(history_list_cdf)

  const response = await fetch(path)
  const datas = (await response.json()).map((item) => {
    item.content = ZLStringDecompress(item.content)
    return item
  })

  input.addEventListener('input', () => {
    const value = input.value.trim()
    var keywords = value.split(/[\s\-]+/)

    // Saving performance
    result.innerHTML = ''
    const cdf = document.createDocumentFragment()
    const ul = document.createElement('ul')
    ul.className = 'search-result-list'
    cdf.appendChild(ul)

    if (!value.length) return

    // local searching
    datas.forEach((data) => {
      var isMatch = true
      if (!data.title) data.title = 'No Title'

      var dataTitle = data.title.trim()
      var dataContent = data.content
        .trim()
        .replace(/<[^>]+>/g, '')
        .toLowerCase()
      var dataUrl = data.url.startsWith('/') ? data.url : '/' + data.url
      var indexTitle = -1
      var indexContent = -1
      var firstOccur = -1
      // only match artiles with not empty contents
      if (dataContent) {
        keywords.forEach(function (keyword, i) {
          indexTitle = dataTitle.indexOf(keyword)
          indexContent = dataContent.indexOf(keyword)

          if (indexTitle < 0 && indexContent < 0) {
            isMatch = false
          } else {
            if (indexContent < 0) indexContent = 0
            if (i == 0) firstOccur = indexContent
          }
        })
      } else {
        isMatch = false
      }
      // show search results
      if (isMatch) {
        var content = data.content.trim().replace(/<[^>]+>/g, '')
        if (firstOccur >= 0) {
          // cut out 100 characters
          var start = firstOccur - 20
          var end = firstOccur + 80
          if (start < 0) start = 0
          if (start == 0) end = 100
          if (end > content.length) end = content.length
          var matchContent = content.substring(start, end)

          // highlight all keywords
          keywords.forEach((keyword) => {
            const reg = new RegExp(`(${keyword})`, 'gi')
            const key = '<span class="search-keyword">$1</span>'
            matchContent = matchContent.replace(reg, key)
            dataTitle = dataTitle.replace(reg, key)
          })
          const li = document.createElement('li')
          const a = document.createElement('a')
          const p = document.createElement('p')
          a.href = dataUrl
          a.className = 'search-result-title'
          a.innerHTML = dataTitle

          // save search history
          a.addEventListener('click', () => {
            const value = input.value
            if (!storage.includes(value)) storage.push(value)
            localStorage.setItem('search-history', JSON.stringify(storage))
          })

          p.className = 'search-abstract'
          p.innerHTML = matchContent + '...'
          li.appendChild(a)
          li.appendChild(p)
          ul.appendChild(li)
        }
      }
    })

    result.appendChild(cdf)
  })

  function ZLStringDecompress(compressed) {
    const f = String.fromCharCode
    const length = compressed.length
    const resetValue = 32768
    if (!compressed) return ''
    var dictionary = [],
      enlargeIn = 4,
      dictSize = 4,
      numBits = 3,
      entry = '',
      result = [],
      i,
      w,
      bits,
      resb,
      maxpower,
      power,
      c,
      data = { val: compressed.charCodeAt(0), position: resetValue, index: 1 }

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i
    }

    bits = 0
    maxpower = Math.pow(2, 2)
    power = 1
    while (power != maxpower) {
      resb = data.val & data.position
      data.position >>= 1
      if (data.position == 0) {
        data.position = resetValue
        data.val = compressed.charCodeAt(data.index++)
      }
      bits |= (resb > 0 ? 1 : 0) * power
      power <<= 1
    }

    switch ((next = bits)) {
      case 0:
        bits = 0
        maxpower = Math.pow(2, 8)
        power = 1
        while (power != maxpower) {
          resb = data.val & data.position
          data.position >>= 1
          if (data.position == 0) {
            data.position = resetValue
            data.val = compressed.charCodeAt(data.index++)
          }
          bits |= (resb > 0 ? 1 : 0) * power
          power <<= 1
        }
        c = f(bits)
        break
      case 1:
        bits = 0
        maxpower = Math.pow(2, 16)
        power = 1
        while (power != maxpower) {
          resb = data.val & data.position
          data.position >>= 1
          if (data.position == 0) {
            data.position = resetValue
            data.val = compressed.charCodeAt(data.index++)
          }
          bits |= (resb > 0 ? 1 : 0) * power
          power <<= 1
        }
        c = f(bits)
        break
      case 2:
        return ''
    }
    dictionary[3] = c
    w = c
    result.push(c)
    while (true) {
      if (data.index > length) {
        return ''
      }

      bits = 0
      maxpower = Math.pow(2, numBits)
      power = 1
      while (power != maxpower) {
        resb = data.val & data.position
        data.position >>= 1
        if (data.position == 0) {
          data.position = resetValue
          data.val = compressed.charCodeAt(data.index++)
        }
        bits |= (resb > 0 ? 1 : 0) * power
        power <<= 1
      }

      switch ((c = bits)) {
        case 0:
          bits = 0
          maxpower = Math.pow(2, 8)
          power = 1
          while (power != maxpower) {
            resb = data.val & data.position
            data.position >>= 1
            if (data.position == 0) {
              data.position = resetValue
              data.val = compressed.charCodeAt(data.index++)
            }
            bits |= (resb > 0 ? 1 : 0) * power
            power <<= 1
          }

          dictionary[dictSize++] = f(bits)
          c = dictSize - 1
          enlargeIn--
          break
        case 1:
          bits = 0
          maxpower = Math.pow(2, 16)
          power = 1
          while (power != maxpower) {
            resb = data.val & data.position
            data.position >>= 1
            if (data.position == 0) {
              data.position = resetValue
              data.val = compressed.charCodeAt(data.index++)
            }
            bits |= (resb > 0 ? 1 : 0) * power
            power <<= 1
          }
          dictionary[dictSize++] = f(bits)
          c = dictSize - 1
          enlargeIn--
          break
        case 2:
          return result.join('')
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits)
        numBits++
      }

      if (dictionary[c]) {
        entry = dictionary[c]
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0)
        } else {
          return null
        }
      }
      result.push(entry)

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0)
      enlargeIn--

      w = entry

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits)
        numBits++
      }
    }
  }
})()
