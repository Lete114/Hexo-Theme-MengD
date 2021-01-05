/**
 * hexo cnagfig mengd
 */
'use strict'

hexo.on('generateBefore', function () {
  var config = hexo.config;
  var theme = hexo.theme.config;
  
  config.stylus={compress:true};

  config.index_generator.per_page = theme.page_count;

  config.search.path = theme.search.path;
  config.search.field = theme.search.field;
})