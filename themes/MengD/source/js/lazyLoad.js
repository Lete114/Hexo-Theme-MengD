
function imgLazyLoad(selectNode,dataImg){
    // 获取 指定的img
    var imgLazyLoad = document.querySelectorAll(selectNode)
    var timer,
        len = imgLazyLoad.length;
    
    // 加载
    function loading(){
        timer && clearTimeout(timer); // 清除延迟
        timer = setTimeout(function(){ // 设置延迟
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            winHeight = document.documentElement.clientHeight;
            // 遍历所有的img
            for(var i = 0;i < imgLazyLoad.length;i++){
                var nodePos = getNodePosition(imgLazyLoad[i]),
                    winTop = winHeight+scrollTop;
                if((nodePos.top > scrollTop && nodePos.top <  winTop) || (nodePos.bottom > scrollTop && nodePos.bottom < winTop)){
                    imgLazyLoad[i].src = imgLazyLoad[i].getAttribute(dataImg);
                }
            }
        },100);
    }
    if(!len) return; // 没有img元素则结束
    loading();
    document.addEventListener('scroll', function(){
        if(!len) return;
        else loading();
    })
}
imgLazyLoad("body img[data-img]","data-img")
