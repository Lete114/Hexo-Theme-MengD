
/**
 * 动态添加JavaScript
 * @param {*} url 资源地址
 * @param {*} callback 回调方法
 */
function getScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            console.log(script.onreadystatechange);
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else {
            script.onload = function () {
                callback();
            }
        }
    }
    script.src = url;
    document.body.appendChild(script);
}
/**
 * 创建外围标签
 * @param {*} selectNode 被选择中的元素(标签)
 * @param {*} eleType 需要创建的元素(标签)
 * @param {*} id 创建元素id
 * @param {*} cn 创建元素className
 */
 function wrap(selectNode, eleType, id = '', cn = '') {
    const creatEle = document.createElement(eleType)
    if(id)creatEle.id = id
    if(cn)creatEle.className = cn
    selectNode.parentNode.insertBefore(creatEle, selectNode)
    creatEle.appendChild(selectNode)
}

/**
 * 封装ajax请求
 * @param {*} obj 请求参数
 */
function ajax(obj) {
    //指定提交方式的默认值
    obj.type = obj.type || "get";
    //设置是否异步，默认为true(异步)
    obj.async = obj.async || true;
    //设置数据的默认值
    obj.data = obj.data || null;

    if (window.XMLHttpRequest) var ajax = new XMLHttpRequest();//非ie
    else var ajax = new ActiveXObject("Microsoft.XMLHTTP");//ie

    //区分get和post
    if (obj.type == "post") {
        ajax.open(obj.type, obj.url, obj.async);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send(obj.data);
    } else {
        ajax.open(obj.type, obj.url, obj.async);
        ajax.send();
    }

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status >= 200 && ajax.status < 300 || ajax.status == 304) {
                if (obj.success) {
                    obj.success(ajax.responseText);
                }
            } else {
                if (obj.error) {
                    obj.error(ajax.status);
                }
            }
        }
    }
}
/**
 * 获取指定代码块的基本信息
 * @scrollTop 滚动条纵坐标位置
 * @scrollLeft 滚动条横坐标位置
 * @param {*} node 元素(标签)
 * @returns 当前元素(标签) top|right|bottom|left 距离顶部的距离
 * 
 * nodePos: top|bottom 当前元素在可视区域的上方时获取到的是负数，反之正数
 * nodePos: right|left 当前元素距离视区域left的距离，right视区域距离
 * 
 */
function getNodePosition(node) {
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var nodePos = node.getBoundingClientRect(); //获取元素(标签)的参数信息
    return {top:nodePos.top + scrollTop, right:nodePos.right + scrollLeft, bottom:nodePos.bottom + scrollTop, left:nodePos.left + scrollLeft }
}
