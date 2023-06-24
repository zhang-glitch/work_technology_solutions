/**
 * 获取所有item中img元素
 */

export function getImgElements(itemElements) {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 获取所有图片路径
 */

export function getAllImgSrc(imgElements) {
  const allImgSrc = []
  imgElements.forEach((item) => {
    allImgSrc.push(item.getAttribute('src'))
  })
  return allImgSrc
}

/**
 * 图片预加载， 返回promise
 */

export function allImgComplete(allImgSrc) {
  // 存放所有图片加载的promise对象
  const promises = []
  // 循环allImgSrc
  allImgSrc.forEach((imgSrc, index) => {
    promises.push(
      new Promise((resolve) => {
        const imgObj = new Image()
        imgObj.src = imgSrc
        imgObj.onload = () => {
          resolve({
            imgSrc,
            index
          })
        }
      })
    )
  })
  return Promise.all(promises)
}

/**
 * 获取最小高度
 */

export function getMinHeight(columnHeightObj) {
  const columnHeightValue = Object.values(columnHeightObj)
  return Math.min(...columnHeightValue)
}

/**
 * 获取最小高度的column
 */

export function getMinHeightColumn(columnHeightObj) {
  // 获取最小高度
  const minHeight = getMinHeight(columnHeightObj)
  const columns = Object.keys(columnHeightObj)
  const minHeightColumn = columns.find((col) => {
    return columnHeightObj[col] === minHeight
  })
  return minHeightColumn
}

/**
 * 获取最大高度
 */

export function getMaxHeight(columnHeightObj) {
  const columnHeightValue = Object.values(columnHeightObj)
  return Math.max(...columnHeightValue)
}
