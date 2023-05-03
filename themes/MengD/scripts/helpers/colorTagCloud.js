/**
 * @author Lete114
 * @description Generate random color and font size tags
 */

hexo.extend.helper.register('color_tag_cloud', function () {
  const getRandomFontSize = () => Math.random() * 2 + 'rem'
  const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

  return `color:${getRandomColor()};font-size:${getRandomFontSize()}`
})
