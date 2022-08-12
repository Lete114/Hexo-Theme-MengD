const mengd = {
  /**
   * 创建外围标签
   * @param {*} selectNode 被选择中的元素(标签)
   * @param {*} eleType 需要创建的元素(标签)
   * @param {*} id 创建元素id
   * @param {*} cn 创建元素className
   */
  wrap(selectNode, eleType, id = '', cn = '') {
    var creatEle = document.createElement(eleType)
    if (id) creatEle.id = id
    if (cn) creatEle.className = cn
    selectNode.parentNode.insertBefore(creatEle, selectNode)
    creatEle.appendChild(selectNode)
  },
  /**
   * 根据元素id获取dom
   * @param {String} id 元素id属性值
   * @returns {Document}
   */
  $id(id) {
    return document.getElementById(id)
  },
  /**
   * 根据元素属性获取dom
   * @param {String} flag 元素标识符
   * @returns {Document}
   */
  $query(flag) {
    return document.querySelector(flag)
  },
  /**
   * 根据元素属性获取dom
   * @param {String} flag 元素标识符
   * @returns {Array and Document}
   */
  $queryAll(flag) {
    return document.querySelectorAll(flag)
  },
  /**
   * 动态添加JavaScript
   * @param {*} url 资源地址
   * @param {*} callback 回调方法
   */
  getScript(url, callback) {
    // 防止重复获取(暂时不启用)
    // if (Array.isArray(this.isGetScript)) {
    //   if (this.isGetScript.includes(url)) return callback()
    //   this.isGetScript.push(url)
    // } else {
    //   this.isGetScript = []
    //   this.isGetScript.push(url)
    // }
    var script = document.createElement('script')
    script.src = url

    if (typeof callback != 'undefined') {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == 'loaded' || script.readyState == 'complete') {
            script.onreadystatechange = null
            callback()
          }
        }
      } else {
        script.onload = function () {
          script.onload = null
          callback()
        }
      }
    }
    document.body.appendChild(script)
  },

  /**
   * 防抖节流(闭包)
   * @param callback 事件触发的操作
   * @param wait 在多少毫秒内连续触发事件，重新计数
   * @returns {Function}
   */
  throttle(callback, wait) {
    var pre = 0
    return function () {
      var now = new Date()
      if (now - pre > wait) {
        callback.apply(this, arguments)
        pre = now
      }
    }
  },

  getDaysDiffBetweenDates(date) {
    return parseInt((new Date() - new Date(date)) / (1000 * 3600 * 24))
  }
}
