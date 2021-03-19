'use strict'

// 404页面
hexo.extend.generator.register('404', function (locals) {
    if (hexo.theme.config.error_404.enable){
        return {
            path: '404.html',
            data: locals.posts,
            layout: ["404"]
        }
    } 
    return
})

// artitalk页面
hexo.extend.generator.register('artitalk', function (locals) {
    if (hexo.theme.config.artitalk.enable){
        return {
            path: hexo.theme.config.artitalk.path,
            data: locals.posts,
            comments: false,
            layout: ["artitalk"]
        }
    } 
    return
})

// HPP_talk页面
hexo.extend.generator.register('hpp_talk', function (locals) {
    if (hexo.theme.config.hpp_talk.enable){
        return {
            path: hexo.theme.config.hpp_talk.path,
            data: locals.posts,
            comments: false,
            layout: ["hpp_talk"]
        }
    } 
    return
})
