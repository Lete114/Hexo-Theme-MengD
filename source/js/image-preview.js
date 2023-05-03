!(() => {
  const mask = document.createElement('div')
  mask.style =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:3;visibility:hidden;backdrop-filter: blur(10px);background:rgba(0, 0, 0, 0.7)'
  document.body.appendChild(mask)

  const cloneImageStyle =
    'visibility:visible;position:absolute;left:50%;top:0px;width:80%;height:100%;transition:all .3s;transform:translateX(-50%);object-fit:contain'

  const page = document.querySelector('.page')
  if (page) {
    page.addEventListener('click', function (event) {
      const target = event.target
      if (target.tagName !== 'IMG') return
      mask.style.visibility = 'visible'
      // Clone the image
      const cloneImg = target.cloneNode()
      const bounding = target.getBoundingClientRect()
      // Set clone image initial position
      const style = `position:absolute;top:${bounding.top}px;left:${bounding.left}px;width:${bounding.width}px;height:${bounding.height}px`
      cloneImg.style = style
      target.style.visibility = 'hidden'
      mask.appendChild(cloneImg)

      // Use setTimeout to wait for the over-animation to complete
      // requestAnimationFrame(() => {
      setTimeout(() => {
        cloneImg.style = cloneImageStyle
      })

      // Close the preview image
      mask.addEventListener('click', function () {
        // Preview image back to original position
        cloneImg.style.left = `${bounding.left}px`
        cloneImg.style.top = `${bounding.top}px`
        cloneImg.style.width = `${bounding.width}px`
        cloneImg.style.height = `${bounding.height}px`
        cloneImg.style.transform = 'none'

        // Hide the mask at the end of the transition and show the original image and delete the cloned image
        cloneImg.addEventListener(
          'transitionend',
          function () {
            mask.style.visibility = 'hidden'
            target.style.visibility = 'visible'
            cloneImg.remove()
          },
          { once: true } // only execute once
        )
      })
    })
  }
})()
