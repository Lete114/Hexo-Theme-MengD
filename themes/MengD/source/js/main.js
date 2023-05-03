!(() => {
  codeBlockCopy()
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
