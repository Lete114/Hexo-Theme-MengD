/**
 * 图片懒加载
 * @param {*} img 需要懒加载的img元素(标签)
 * @param {*} attr 图片的真实url地址
 */
function ImgLazyLoad(img, attr) {
  var imgLazyLoad = $queryAll(img)
  function LazyLoad(target) {
    const io = new IntersectionObserver((entries, Observer) => {
      entries.forEach((entry) => {
        setTimeout(function () {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = img.getAttribute(attr)
            img.setAttribute('src', src)
            Observer.disconnect()
          }
        }, 500)
      })
    })
    io.observe(target)
  }
  imgLazyLoad.forEach(LazyLoad)
}
ImgLazyLoad('body img[data-img]', 'data-img')
