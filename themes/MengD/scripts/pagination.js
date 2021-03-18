var pagination = require('hexo-pagination');

hexo.extend.generator.register('archive', function(locals){
  return pagination('archives', locals.posts, {
    perPage: 10,
    type: ['archive', 'index'],
    layout: ['archive', 'index'],
    data: {}
  });
});