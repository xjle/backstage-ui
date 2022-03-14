// 不使用
export const fun = function (doc: Document, win: Window & typeof globalThis):void {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    // 这里是假设在1920px宽度设计稿的情况下，1rem = 20px
    // 可以根据实际需要修改
    docEl.style.fontSize = 20 * (clientWidth / 1920) + 'px'
    // docEl.style.fontSize = 100 * (clientWidth / 1440) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}
