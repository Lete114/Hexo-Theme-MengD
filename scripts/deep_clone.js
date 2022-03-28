hexo.extend.helper.register('deep_clone', function (json = {}) {
  try {
    return JSON.parse(JSON.stringify(json))
  } catch (error) {
    hexo.log.e('Clone failure:',error)
    return {}
  }
})
