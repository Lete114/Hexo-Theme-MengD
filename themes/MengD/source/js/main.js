!(() => {
  document.addEventListener('DOMContentLoaded', function () {
    codeBlockCopy()
    imageLazyLoad()
  })
})()

function codeBlockCopy() {
  const page = document.querySelector('.page')
  if (page) {
    page.addEventListener('click', (event) => {
      const target = event.target
      if (!target.classList.contains('copy-code')) return
      const table = target.parentElement.nextElementSibling
      if (table.tagName === 'TABLE') {
        const code = table.querySelector('.code')
        const selection = window.getSelection()
        selection.selectAllChildren(code)
        navigator.clipboard ? navigator.clipboard.writeText(selection.toString()) : document.execCommand('copy')
        selection.removeAllRanges()
        target.innerText = 'COPIED'
        setTimeout(function () {
          target.innerText = 'COPY'
        }, 2000)
      }
    })
  }
}

function imageLazyLoad() {
  /**
   * @type { IntersectionObserverInit  }
   */
  const options = {
    rootMargin: '10%'
  }

  const observer = new IntersectionObserver(callback, options)

  document.querySelectorAll('img[data-src]').forEach((/** @type { HTMLImageElement } */ image) => {
    observer.observe(image)
  })

  /**
   * @param { IntersectionObserverEntry[] } entries
   * @param { IntersectionObserver } observer
   */
  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        loadImages(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }

  /**
   * @param { HTMLImageElement } image
   */
  function loadImages(image) {
    const src = image.getAttribute('data-src')
    image.setAttribute('src', src)
    image.removeAttribute('data-src')
  }
}
