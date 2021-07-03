var local_search = document.getElementById("local_search");
var html = document.querySelector("html")
var mask = document.getElementById("mask")
var is_load = false // 处理资源是否被加载

/**
 * 本地搜索
 * 来源于hexo-butterfly
 * 由Lete乐特进行小型改动
 * @param {*} path 文件路径
 * @param {*} search_id 搜索输入框
 * @param {*} content_id 搜索结果展示
 */
var search = function (path, search_id, content_id) {
    is_load = true
    fetch(path)
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(function (data) {
            var datas = [...data.querySelectorAll('entry')].map(function (item) {
                return {
                    title: item.querySelector('title').textContent,
                    content: item.querySelector('content').textContent,
                    url: item.querySelector('url').textContent
                }
            })
            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);
            $input.addEventListener('input', function () {
                var str = '<ul class=\"search_result_list\">';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) return;
                // perform local searching
                datas.forEach(function (data) {
                    var isMatch = true;
                    if (!data.title || data.title.trim() === '') data.title = "Untitled";
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var data_url = data.url.startsWith('/') ? data.url : "/" + data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty contents
                    if (data_content !== '') {
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);

                            if (index_title < 0 && index_content < 0) isMatch = false;
                            else {
                                if (index_content < 0) index_content = 0;
                                if (i == 0) first_occur = index_content;
                            }
                        });
                    } else isMatch = false;
                    // show search results
                    if (isMatch) {
                        var content = data.content.trim().replace(/<[^>]+>/g, "");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 20;
                            var end = first_occur + 80;
                            if (start < 0) start = 0;
                            if (start == 0) end = 100;
                            if (end > content.length) end = content.length;
                            var match_content = content.substring(start, end);

                            // highlight all keywords
                            keywords.forEach(function (keyword) {
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<span class=\"search_keyword\">" + keyword + "</span>");
                                data_title = data_title.replace(regS, "<span class=\"search_keyword\">" + keyword + "</span>");
                            });
                            str += "<li><a href='" + data_url + "' class='search_result_title'>" + data_title + "</a>";
                            str += "<p class=\"search_result\">" + match_content + "...</p>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                $resultContent.innerHTML = str;
                window.pjax && window.pjax.refresh($resultContent)
            });
        })
}


// 显示搜索框
document.getElementsByClassName('search_btn')[0].onclick = function () {
    if (!is_load) search($config.search_file, 'local_search_input', 'local_search_result')
    mask.className = "mask"
    if (!local_search.style.display) {
        local_search.style.display = "block"
        html.style.overflow = "hidden";
        local_search.classList.remove("search_animation_min")
        local_search.classList.add("search_animation_max")
        document.getElementById("local_search_input").focus()
    }
}

// 关闭搜索框
document.querySelector(".search_close_button").onclick = function () {
    local_search.classList.remove("search_animation_max")
    local_search.classList.add("search_animation_min")
    mask.classList.remove("mask")
    html.style.overflow = "auto";
    setTimeout(function () {
        local_search.style.display = ""
    }, 500)
}

window.addEventListener('pjax:complete', function () {
    local_search.style.display === 'none' ? mask.className = "" : ""
})
