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
  const storage = JSON.parse(localStorage.getItem('search-history') || '[]')

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
  let datas = await response.json()

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
            const key ='<span class="search-keyword">$1</span>'
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
})()
