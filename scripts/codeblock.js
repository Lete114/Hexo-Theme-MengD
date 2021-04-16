/**
 * Created by Lete on 2020/12/31.
 */

hexo.extend.filter.register('after_post_render', function (data) {
    while (/<figure class="highlight ([a-zA-Z\+\-\/\#]+)">.*?<\/figure>/.test(data.content)) {
        data.content = data.content.replace(/<figure class="highlight ([a-zA-Z\+\-\/\#]+)">.*?<\/figure>/, function () {
            var language = RegExp.$1 || 'code'
            var lastMatch = RegExp.lastMatch
            if (language=='plain'){
                language='code';
            }
            lastMatch = lastMatch.replace(/<figure class="highlight /, '<figure class="iseeu highlight ')
            return '<div class="highlight-wrap" data-rel="'
                + language.replace(language[0],language[0].toUpperCase()) + '"><span class="clipboard"><i class="fa fa-clipboard"></i></span>' + lastMatch + '</div>'
        })
    }
    return data
})
