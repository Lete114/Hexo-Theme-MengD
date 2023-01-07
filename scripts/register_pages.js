/**
 *
 * Create New Pages
 * Hexo-Theme-MengD
 *
 */

// 404页面
hexo.extend.generator.register('register 404', (locals) => {
  if(!hexo.theme.config.error.enable) return
  return {
    path: '404.html',
    data: locals,
    layout: ['404']
  }
})

// artitalk页面
hexo.extend.generator.register('artitalk', () => {
  let theme = hexo.theme.config
  if (!theme.artitalk.enable) return
  let title = theme.artitalk.title // 标题
  // 判断是否使用了option选项
  let option = theme.artitalk.option ? `initData = Object.assign(initData, ${JSON.stringify(theme.artitalk.option)})` : ''
  // 内容
  let content = `
        <div id="artitalk_main"></div>
        <script>
        mengd.getScript("${theme.artitalk.source}",function(){
                let initData = {
                    appId: '${theme.artitalk.appid}',
                    appKey: '${theme.artitalk.appkey}',
                    atEmoji: ${JSON.stringify(theme.artitalk.atEmoji)},
                }
                ${option}
                new Artitalk(initData)
            })
        </script>
        `
  return {
    path: theme.artitalk.path,
    data: { type: 'artitalk', content, title },
    comments: false,
    layout: ['page']
  }
})

