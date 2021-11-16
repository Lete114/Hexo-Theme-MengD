/**
 *
 * Create New Pages
 * Hexo-Theme-MengD
 *
 */

const url_for = require('hexo-util').url_for.bind(hexo)

hexo.extend.generator.register('register tags', (locals) => {
  if(!hexo.theme.config.pages.tags) return
  return {
    path: 'tags/index.html',
    data: locals,
    layout: ['tags']
  }
})

hexo.extend.generator.register('register categories', (locals) => {
  if(!hexo.theme.config.pages.categories) return
  return {
    path: 'categories/index.html',
    data: locals,
    layout: ['categories']
  }
})

// 404页面
hexo.extend.generator.register('register 404', (locals) => {
  if(!hexo.theme.config.pages.error.enable) return
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
            getScript("${theme.artitalk.source}",function(){
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

// HPPTalk页面
hexo.extend.generator.register('hppTalk', () => {
  let theme = hexo.theme.config
  if (!theme.hppTalk.enable) return
  let title = theme.hppTalk.title // 标题
  // 判断是否使用了option选项
  let option = theme.hppTalk.option ? `initData = Object.assign(initData, ${JSON.stringify(theme.hppTalk.option)})` : ''
  // 内容
  let content = `
    <div id="hppTalk"></div>
    <link rel="stylesheet" href="${theme.hppTalk.sourceCss}" /> 
    <script>
        getScript("${theme.hppTalk.sourceJs}",function(){
            let initData = {
                id:"hppTalk",
                domain: "${theme.hppTalk.domain}",
                limit: ${theme.hppTalk.limit},
                start: ${theme.hppTalk.start}
            }
            ${option}
            new hpp_talk(initData)
        })
    </script>
    `
  return {
    path: theme.hppTalk.path,
    data: { type: 'hppTalk', content, title },
    comments: false,
    layout: ['page']
  }
})
