import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css'

const renderer = {
  heading(text, level) {
    const size = {
      1: 'font-bold text-2xl my-6',
      2: 'font-bold text-xl my-5',
      3: 'font-bold text-lg my-4',
      4: 'font-bold my-3',
      5: 'font-medium my-2',
      6: 'font-medium text-gray-500 my-2'
    }
    return `<h${level} class="${size[level]}">${text}</h${level}>`
  },
  paragraph(text) {
    return `<p class="my-2">${text}</p>`
  },
  blockquote(text) {
    // 引用样式
    return `<div class="my-2 py-1 pl-2 border-l-4 border-sky-200 text-gray-500 bg-sky-50 rounded">${text}</div>`
  },
  image(href, title, text) {
    return `<div class="flex flex-col justify-center items-center text-sm"><img class="max-w-[500px] text-center" src="${href}" alt="${text}" /><div>${title}</div></div>`
  },
  link(href, title, text) {
    return `<a class="my-2 text-blue-500" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  },
  list(body, ordered) {
    if (ordered) {
      return `<ol class="ordered-list">${body}</ol>`
    } else {
      return `<ul class="unordered-list">${body}</ul>`
    }
  }
}

marked.use({ renderer: renderer })

marked.use(
  markedHighlight({
    langPrefix: 'rounded-md hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'shell'
      return `${hljs.highlight(code, { language }).value}`
    }
  })
)

function markdown2html(content) {
  return marked.parse(content)
}

export { markdown2html }
