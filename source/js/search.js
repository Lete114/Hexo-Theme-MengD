var local_search = document.getElementById("local-search");
var html = document.querySelector("html")
var search_mask = document.getElementById("search-mask")

var searchFunc = function (path, search_id, content_id) {
    fetch(path)
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(function (data) {
            const datas = [...data.querySelectorAll('entry')].map(function (item) {
                return {
                    title: item.querySelector('title').textContent,
                    content: item.querySelector('content').textContent,
                    url: item.querySelector('url').textContent
                }
            })
            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);
            $input.addEventListener('input', function () {
                var str = '<ul class=\"search-result-list\">';
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
                                match_content = match_content.replace(regS, "<span class=\"search-keyword\">" + keyword + "</span>");
                                data_title = data_title.replace(regS, "<span class=\"search-keyword\">" + keyword + "</span>");
                            });
                            str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                            str += "<p class=\"search-result\">" + match_content + "...</p>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                $resultContent.innerHTML = str;
                window.pjax && window.pjax.refresh($resultContent)
            });
            // })
        })
}
searchFunc($config.search.path, 'local-search-input', 'local-search-result')


// 显示搜索框
document.querySelectorAll(".search-btn").forEach(function (item) {
    item.onclick = function () {
        search_mask.className = "mask"
        if (local_search.style.display == "none") {
            local_search.style.display = "block"
            html.style.overflow = "hidden";
            local_search.classList.remove("search-animation-min")
            local_search.classList.add("search-animation-max")
            document.getElementById("local-search-input").focus()
        }
    }
})

// 关闭搜索框
document.querySelector(".search-close-button").onclick = function () {
    local_search.classList.remove("search-animation-max")
    local_search.classList.add("search-animation-min")
    search_mask.classList.remove("mask")
    html.style.overflow = "auto";
    setTimeout(function () {
        local_search.style.display = "none"
    }, 500)
}


// 关闭所有正在打开的弹窗
search_mask.onclick = function () {
    local_search.classList.remove("search-animation-max")
    local_search.classList.add("search-animation-min")
    html.style.overflow = "auto";
    search_mask.className = ""
    setTimeout(function () {
        local_search.style.display = "none"
    }, 500)
}

window.addEventListener('pjax:complete', function () {
    local_search.style.display === 'none' ? search_mask.className = "" : ""
})
