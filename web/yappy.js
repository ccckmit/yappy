var ya = {}

ya.menu = {
  items: [
    {title: '人', link: 'people'},
    {title: '事', link: 'event'},
    {title: '時', link: 'time'},
    {title: '地', link: 'place'},
    {title: '物', link: 'object'},
    {title: '書', link: 'book'},
    {title: '文', link: 'article'},
    {title: '圖', link: 'image'},
  ]
}

ya.menuList = function (menu) {
  let list = []
  for (let item of menu.items) {
    list.push(`<li class="pure-menu-item"><a href="#${item.link}" class="pure-menu-link">${item.title}</a></li>`)
  }
  return list.join('\n')
}

ya.html2dom = function (html) {
  var wrapper= document.createElement('div')
  wrapper.innerHTML= html
  return wrapper.firstChild;
}

ya.messageHtml = function (message) {
  return `<div class="message"><div>by:${message.by} id:${message.id}</div><div>${message.content}</div></div>`
}

ya.messageList = function (messages) {
  let list = []
  for (let message of messages) {
    list.push(ya.messageHtml(message))
  }
  return list.join('\n')
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#menuList').innerHTML = ya.menuList(ya.menu)
  document.querySelector('#message').innerHTML = ya.messageList(ya.messages)
  infiniteScroll(ya.messageScrollOptions)
  // ============== Initialize ====================
  purecssLoad(window, window.document)
  hljs.initHighlightingOnLoad()
})

// ============== purecss ui.js ====================
function purecssLoad (window, document) {
  var layout = document.getElementById('layout')
  var menu = document.getElementById('menu')
  var menuLink = document.getElementById('menuLink')
  var content = document.getElementById('main')

  function toggleClass (element, className) {
    var classes = element.className.split(/\s+/)
    var length = classes.length
    var i = 0

    for (; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1)
        break
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className)
    }

    element.className = classes.join(' ')
  }

  function toggleAll (e) {
    var active = 'active'

    e.preventDefault()
    toggleClass(layout, active)
    toggleClass(menu, active)
    toggleClass(menuLink, active)
  }

  menuLink.onclick = function (e) {
    toggleAll(e)
  }

  content.onclick = function (e) {
    if (menu.className.indexOf('active') !== -1) {
      toggleAll(e)
    }
  }
}
// ============== messages ======================

ya.messages = [
  { id:'1', by:'中國時報', content: '台灣高教面臨改革關頭，曾志朗認為，台大新校長必須擁有整合人才與募款的能力，不要再依賴教育部的有限資源，才能走出困境邁向國際。真的！'},
  { id:'2', by:'Google', content: 'All you need to do is choose an RSS reader that best fits your style and use it to subscribe to the RSS feeds of the sites you love reading. '},
  { id:'3', by:'ccc', content: '想把之前的 《機率統計、微積分、工程數學、 線性代數、離散數學、數值分析》 全部整合到《科學計算》這門課裏面， 一門課 搞定所有可以計算的數學。'},
  { id:'4', by:'曹齊平', content: '工作室半年前製作的"電子製冷與溫差發電"教學展示架，雖然可以成功做實驗，但是一直覺得應該有更好的方法。\n是否可簡化製作程序? 如何讓機構簡單又牢固?\n今晚要好好想個更好的製作方法。'},
]

ya.messageNode = document.getElementById('message')
ya.messageScrollOptions = {
  distance: 50,
  callback: function(done) {
    let id = ya.messages.length
    let message = { id:id, by:'ccc', content:ya.messages[id%4].content }
    ya.messages.push(message)
    let node = ya.html2dom(ya.messageHtml(message))
    ya.messageNode.appendChild(node)
    done();
  }
}
