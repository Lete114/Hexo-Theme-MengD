const cdn = {
  gh: {
    jsdelivr: 'https://cdn.jsdelivr.net/gh',
    fastly: 'https://fastly.jsdelivr.net/gh',
    gcore: 'https://gcore.jsdelivr.net/gh',
    testingcf: 'https://testingcf.jsdelivr.net/gh',
    test1: 'https://test1.jsdelivr.net/gh',
    tianli: 'https://cdn1.tianli0.top/gh'
  },
  combine: {
    jsdelivr: 'https://cdn.jsdelivr.net/combine',
    fastly: 'https://fastly.jsdelivr.net/combine',
    gcore: 'https://gcore.jsdelivr.net/combine',
    testingcf: 'https://testingcf.jsdelivr.net/combine',
    test1: 'https://test1.jsdelivr.net/combine',
    tianli: 'https://cdn1.tianli0.top/combine'
  },
  npm: {
    jsdelivr: 'https://cdn.jsdelivr.net/npm',
    fastly: 'https://fastly.jsdelivr.net/npm',
    gcore: 'https://gcore.jsdelivr.net/npm',
    testingcf: 'https://testingcf.jsdelivr.net/npm',
    test1: 'https://test1.jsdelivr.net/npm',
    eleme: 'https://npm.elemecdn.com',
    unpkg: 'https://unpkg.com',
    tianli: 'https://cdn1.tianli0.top/npm'
  }
}

self.addEventListener('install', async () => {
  await self.skipWaiting()
})

self.addEventListener('activate', async () => {
  await self.clients.claim()
})

self.addEventListener('fetch', async (event) => {
  try {
    // 如果用户当前网速慢，或是开启了省流模式，则不使用sw处理请求
    const nav = navigator
    const { saveData, effectiveType } = nav.connection || nav.mozConnection || nav.webkitConnection || {}
    if (saveData || /2g/.test(effectiveType)) return

    // 劫持请求
    event.respondWith(handleRequest(event.request))
    // eslint-disable-next-line
  } catch (e) {}
})

// 返回响应
async function progress(res) {
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: res.headers
  })
}

function handleRequest(req) {
  const urls = []
  const urlStr = req.url
  let urlObj = new URL(urlStr)
  // 为了获取 cdn 类型
  // 例如获取gh (https://cdn.jsdelivr.net/gh)
  const path = urlObj.pathname.split('/')[1]

  // 匹配 cdn
  for (const type in cdn) {
    if (type === path) {
      for (const key in cdn[type]) {
        const url = cdn[type][key] + urlObj.pathname.replace('/' + path, '')
        urls.push(url)
      }
    }
  }

  // 如果上方 cdn 遍历 匹配到 cdn 则直接统一发送请求
  if (urls.length) return fetchAny(urls)
  throw new Error('failure')
}

// Promise.any 的 polyfill
function createPromiseAny() {
  Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : []
      let len = promises.length
      let errs = []
      if (len === 0) return reject(new AggregateError('All promises were rejected'))
      promises.forEach((p) => {
        if (p instanceof Promise) {
          p.then(
            (res) => resolve(res),
            (err) => {
              len--
              errs.push(err)
              if (len === 0) reject(new AggregateError(errs))
            }
          )
        } else {
          reject(p)
        }
      })
    })
  }
}

// 发送所有请求
function fetchAny(urls) {
  // 中断一个或多个请求
  const controller = new AbortController()
  const signal = controller.signal

  // 遍历将所有的请求地址转换为promise
  const PromiseAll = urls.map((url) => {
    return new Promise((resolve, reject) => {
      fetch(url, { signal })
        .then(progress)
        .then((res) => {
          const r = res.clone()
          if (r.status !== 200) reject(null)
          controller.abort() // 中断
          resolve(r)
        })
        .catch(() => reject(null))
    })
  })

  // 判断浏览器是否支持 Promise.any
  if (!Promise.any) createPromiseAny()

  // 谁先返回"成功状态"则返回谁的内容，如果都返回"失败状态"则返回null
  return Promise.any(PromiseAll)
    .then((res) => res)
    .catch(() => null)
}
