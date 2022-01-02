/**
 * 创建外围标签
 * @param {*} selectNode 被选择中的元素(标签)
 * @param {*} eleType 需要创建的元素(标签)
 * @param {*} id 创建元素id
 * @param {*} cn 创建元素className
 */
function wrap(selectNode, eleType, id = '', cn = '') {
  var creatEle = document.createElement(eleType)
  if (id) creatEle.id = id
  if (cn) creatEle.className = cn
  selectNode.parentNode.insertBefore(creatEle, selectNode)
  creatEle.appendChild(selectNode)
}

/**
 * 根据元素id获取dom
 * @param {String} id 元素id属性值
 * @returns {Document}
 */
function $id(id) {
  return document.getElementById(id)
}

/**
 * 根据元素属性获取dom
 * @param {String} flag 元素标识符
 * @returns {Document}
 */
function $query(flag) {
  return document.querySelector(flag)
}

/**
 * 根据元素属性获取dom
 * @param {String} flag 元素标识符
 * @returns {Array and Document}
 */
function $queryAll(flag) {
  return document.querySelectorAll(flag)
}

/**
 * 动态添加JavaScript
 * @param {*} url 资源地址
 * @param {*} callback 回调方法
 */
function getScript(url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  if (typeof callback != 'undefined') {
    if (script.readyState) {
      console.log(script.onreadystatechange)
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = function () {
        callback()
      }
    }
  }
  script.src = url
  document.body.appendChild(script)
}

/**
 * 封装ajax请求
 * @param {*} obj 请求参数
 */
function ajax(obj) {
  //指定提交方式的默认值
  obj.type = obj.type || 'get'
  //设置是否异步，默认为true(异步)
  obj.async = obj.async || true
  //设置数据的默认值
  obj.data = obj.data || null

  if (window.XMLHttpRequest) var xhr = new XMLHttpRequest()
  //非ie
  else var xhr = new ActiveXObject('Microsoft.XMLHTTP') //ie

  //区分get和post
  if (obj.type == 'post') {
    xhr.open(obj.type, obj.url, obj.async)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(obj.data)
  } else {
    xhr.open(obj.type, obj.url, obj.async)
    xhr.send()
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        if (obj.success) obj.success(xhr.responseText)
      } else {
        if (obj.error) obj.error(xhr.status)
      }
    }
  }
}
