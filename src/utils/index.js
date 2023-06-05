import md5 from 'md5'
import { ref } from 'vue'

export const getSecret = () => {
  const codetype = Number.parseInt(Date.now() / Math.pow(10, 3))
  const icode = md5(`${codetype}LGD_Sunday-1991-12-30`)
  return { codetype, icode }
}

export const scrollTransition = () => {
  let timer = null
  return function exec({
    el = document.body,
    position = 0,
    direction = 'v',
    time = 150
  } = options) {
    clearInterval(timer)
    // 每步的时间 ms
    const TIME_EVERY_STEP = 5
    // 最大滚动距离
    const maxScrollSize = el.scrollWidth - el.offsetWidth
    // 限定position的有效滚动范围
    position = Math.max(Math.min(position, maxScrollSize), 0)
    // 可以分为多少步
    let steps = Math.ceil(time / TIME_EVERY_STEP)
    const stepSize = (position - el.scrollLeft) / steps // 每步的长度

    timer = setInterval(() => {
      // console.log(el.scrollLeft , position)
      if (el.scrollLeft !== Number.parseInt(position) && position >= 0) {
        if (stepSize >= 0) {
          let scrollX =
            el.scrollLeft + stepSize >= position
              ? position
              : el.scrollLeft + stepSize
          el.scrollLeft = scrollX
        } else {
          let scrollX =
            el.scrollLeft + stepSize <= position
              ? position
              : el.scrollLeft + stepSize
          el.scrollLeft = scrollX
        }
      } else {
        clearInterval(timer)
      }
    }, TIME_EVERY_STEP)
  }
}

/**
 * 创建随机颜色
 * @returns
 */
export const createRandomColor = () => {
  const randomNum = () => Math.floor(Math.random() * 256)
  return `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`
}

/**
 * 防抖函数
 * @param {*} cb
 * @param {*} time
 * @returns
 */
export const debounce = (cb, time) => {
  let timer = null
  return (...aug) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb && cb.apply(this, aug)
    }, time)
  }
}

/**
 * 可控定时器
 * @param {*} time
 * @param {*} cb
 * @returns
 */
export const contralTimeout = (time, cb) => {
  // 是否正在启动
  const isStart = ref(false)
  const isFinish = ref(false)
  let relTime = 0
  let timer = setInterval(() => {
    if (isStart.value) {
      relTime += 5
    }
    if (relTime >= time) {
      clearInterval(timer)
      isFinish.value = true
      cb && cb()
    }
  }, 5)
  const stop = () => {
    isStart.value = false
  }
  const start = () => {
    isStart.value = true
  }

  return {
    stop,
    start,
    isStart,
    isFinish
  }
}


export const useMobileScroll = (el) => {
  var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
      var top = el.scrollTop
        , totalScroll = el.scrollHeight
        , currentScroll = top + el.offsetHeight;
      if(top === 0) {
        el.scrollTop = 1;
      } else if(currentScroll === totalScroll) {
        el.scrollTop = top - 1;
      }
    });
    el.addEventListener('touchmove', function(evt) {
      if(el.offsetHeight < el.scrollHeight)
        evt._isScroller = true;
    });
  }
  overscroll(el);
}