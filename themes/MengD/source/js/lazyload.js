/**
 * 图片懒加载
 * @param {*} img 需要懒加载的img元素(标签)
 * @param {*} attr 图片的真实url地址
 */
function ImgLazyLoad(img, attr) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      setTimeout(function () {
        if (isIntersecting) {
          const src = target.getAttribute(attr)
          target.setAttribute('src', src)
          observer.unobserve(target)
        }
      }, 500)
    })
  })

  mengd.$queryAll(img).forEach((target) => {
    observer.observe(target)
  })
}
ImgLazyLoad('body img[data-src]', 'data-src')
