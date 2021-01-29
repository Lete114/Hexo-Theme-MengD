
/**
 * hexo-minify
 * hexo-theme-MengD(萌典)
 * 静态资源简单压缩
 */

'use strict'

hexo.extend.filter.register('after_render:html', function(str, data){
    var theme = hexo.theme.config;
    if(theme.minify.html){
        var result = str.replace(/<!--(.*?)-->/g,"");
        result = result.replace(/\  /g,'');
        result = result.replace(/\n\n\n/g,'');
        return result;
    }
  return str;
});
hexo.extend.filter.register('after_render:js', function(str, data){
    var theme = hexo.theme.config;
    if(theme.minify.js){
        var result = str.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g,function(word) { 
            return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
        });
        result = result.replace(/\  /g,'');
        return result;
    }
  return str;
});

hexo.on('generateBefore', function () {
    var config = hexo.config;
    var theme = hexo.theme.config;
    if(theme.minify.css){
        config.stylus={compress:theme.minify.css};
    }
});