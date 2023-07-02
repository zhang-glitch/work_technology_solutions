## 定制化、高可用前台样式处理方案

企业级项目下 css 处理痛点

- 统一的变量维护困难。
- 大量的 className 负担。
- HTML, CSS 分离造成的编写负担。
- 响应式，主题切换实现复杂。

更多痛点，请看 [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

针对上述问题，我们可以通过 [tailwindcss](https://www.tailwindcss.cn/) 来进行解决。下面我们来看其具体用法。

安装

```js
yarn add tailwindcss postcss autoprefixer -D
```

初始化`tailwindcss.config.js`配置文件，并且也会创建`postcss.config.js`文件。

```js
 // -p 表示创建一个基础的配置文件
 npx tailwindcss init -p
```

```js
// tailwindcss.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // tailwindcss 应用的文件范围
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

将加载 Tailwind 的指令添加到你的 CSS 文件中

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

在元素上使用内置类名

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c79098e5199643daa5d0032fa7fb4bf2~tplv-k3u1fbpfcp-watermark.image?)

tailwindcss 官方介绍为无需离开 HTML 即可快速构建现代网站。具体来说就是 tailwind 提供了很多类名，都定义了特定的 css，直接在编写 HTML 的时候加上对应的类名即可快速搭建网站。

### tailwindcss 的设计理念

首先我们先来看下 css 颗粒度设计形式

- 行内样式。自由度最高，可定制化最强。但是不方便样式的复用。

```html
<div style="color: red; font-size: 20px">zh-llm</div>
```

- 原子化 css,每个类名都代表着一类 css 样式。自由度依旧很强，可定制化也很高，并且可以样式复用。但是会编写大量无意义的类名。**其中 tailwindcss 就是这种设计。**

```html
<div class="text-sky-400">zh-llm</div>
```

- 传统形式，通过一个或几个具有语义化的 class 来描述一段 css 属性，封装性，语义化强，自由度和可定制性一般（大多类名都是编写对应元素整套 css 属性）。但是有大量的语义化 class，编写时需要 HTML 和 CSS 来回切换。

```html
<div class="container clear"></div>
```

- 组件形式，在当前组件中直接定义好结构和样式。封装性极强，语义化强。但是自由度和可定制性比较差。并且风格固定，比较适合后台项目。比如 element-plus 等等。

```html
<my-component />
```

对比四种设计方式，可以看出原子化 css 是自由度，可定制化，复用性都挺好，只有编写大量无意义类名缺点，对比他的优点，缺点也是可以忽略的。但是对于维护项目的人来说，如果不了解 tailwindcss 中定义的类名，那可能是非常头疼的一件事了。

对于高个性化，高交互性，高定制化前台项目样式解决方案，还是原子化 css 形式更合适。

在使用 vscode 开发时，我们可以安装一个`Tailwind CSS IntelliSense`插件，提示类名，来帮助我们更好的开发。

## VueUse Vue 组合式 API 的实用工具集

[VueUse](http://www.vueusejs.com/), 基于 Vue 组合式 API 的实用工具集。

`useWindowSize` api，响应式的获取窗口尺寸。当窗口尺寸发生变化时，实时获取。来判断是移动端 UI 还是 pc 端 UI。

```js
import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
/**
 * 是否是移动端设备； 判断依据： 屏幕宽度小于 PC_DEVICE_WIDTH
 * @returns
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
```

## vite 开发配置

### [配置路径别名](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  }
})
```

### [开发环境解决跨域](https://cn.vitejs.dev/config/server-options.html#server-proxy)

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  server: {
    proxy: {
      // 代理所有 /api请求
      '/api': {
        target: '目标origin',
        // 改变请求的origin为target的值
        changeOrigin: true
      }
    }
  }
})
```

### [配置环境变量](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

企业级项目，都会区分很多环境，供我们测试试用。不能让我们的测试数据去污染线上的数据。所以 vite 也提供了我们环境配置文件的方式，让我们很轻松的去通过一些环境选择对应的接口地址等等。

**`.env.[mode]`的格式可以在不同模加载加载不同的内容。**

> 环境加载优先级
>
> - 一份用于指定模式的文件（例如  `.env.production`）会比通用形式的优先级更高（例如  `.env`）。
>
> - **另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被  `.env`  类文件覆盖。例如当运行  `VITE_SOME_KEY=123 vite build`  的时候。**
>
> - `.env`  类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。

我们可以在源码中通过`import.meta.env.*`的方式获取以`VITE_`开头的已加载的环境变量。

```js
// .env.development
VITE_BASE_API = '/api'
```

```json
// package.json
"scripts": {
    "dev": "VITE_BASE_API=/oop vite",
}
```

执行`yarn dev`后，我们可以发现，`import.meta.env.VITE_BASE_API`是命令行中指定的参数。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecf4f747620748cfa9eebdfff5cc596b~tplv-k3u1fbpfcp-watermark.image?)

### 通用组件自动注册

[vite 的 Glob](https://vitejs.cn/guide/features.html#glob-import) 导入功能:该功能可以帮助我们在文件系统中导入多个模块

```js
const modules = import.meta.glob('./dir/*.js')
// 以上将会被转译为下面的样子：
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}
```

然后再通过 vue 提供的注册异步组件的方式进行引入，vue 的 [defineAsyncComponent](https://cn.vuejs.org/guide/components/async.html)方法:该方法可以创建一个按需加载的异步组件 基于以上两个方法,实现组件自动注册。

```js
// import SvgIcon from './svg-icon/index.vue'
// import HmPopup from './popup/index.vue'

import { defineAsyncComponent } from 'vue'

// const components = [SvgIcon, HmPopup]

export default {
  install(app) {
    // components.forEach((element) => {
    //   app.component(element.name, element)
    // })
    // 获取当前路径下所有文件夹下的index.vue
    const components = import.meta.glob('./*/index.vue')
    // 遍历获取到的组件模块
    for (let [key, component] of Object.entries(components)) {
      const componentName = 'hm-' + key.replace('./', '').split('/')[0]
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(component))
    }
  }
}
```

**其实如果组件都提供了 name 属性，我们可以直接手动引入各组件模块，然后实现半自动注册。组件提供 name 的好处是，在 vue-devtools 中调试时方便查找各个组件。**

[在 vue 官网中](https://cn.vuejs.org/api/options-misc.html#name)，**在 3.2.34 或以上的版本中，使用  `<script setup>`  的单文件组件会自动根据文件名生成对应的  `name`  选项，即使是在配合  `<KeepAlive>`  使用时也无需再手动声明。** 但是对于我们文件名都为 index.vue 的开发者来说，就没办法了。

## 使用 svg 图标作为 icon 图标

首先我们需要封装一个通用的 svg 组件，来使用 svg 图标。

```js
<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" :fillClass="fillClass" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 图标名称
  name: {
    type: String,
    required: true
  },
  // 颜色
  color: {
    type: String
  },
  // 类名
  fillClass: {
    type: String
  }
})

// 生成图标唯一id #icon-xxx
const symbolId = computed(() => `#icon-${props.name}`)
</script>
```

然后全局注册该 svg 通用组件，这里我们使用插件的方式

```js
import SvgIcon from './svg-icon/index.vue'

export default {
  install(app) {
    app.component('SvgIcon', SvgIcon)
  }
}
```

main.js 中直接通过 use 注册后，即可使用。

```js
<svg-icon name="back"></svg-icon>
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6be876bc2e1a4c449ed700e096428151~tplv-k3u1fbpfcp-watermark.image?)

但是这样项目中并不能知道 svg 图标的路径，我们需要使用`vite-plugin-svg-icons`插件来指定查找路径。

在 vite.config.js 中配置 svg 相关内容

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [join(__dirname, '/src/assets/icons')],
      // 指定symbolId格式，就是svg.use使用的href
      symbolId: 'icon-[name]'
    })
  ]
})
```

在 main.js 中导入并注册 svg-icons，他会把指定文件夹下的 svg 图片都注册在首页。

```js
// 注册 svg-icons
import 'virtual:svg-icons-register'
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92ce56211b3d499683c0ca00a79c2ac0~tplv-k3u1fbpfcp-watermark.image?)

## 持久化状态数据 vuex-persistedstate

[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)， 作为 vuex 的一个插件，可以持久化 store 中的数据，防止因页面刷新等操作，数据丢失。

```js
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  // ...
  plugins: [
    createPersistedState({
      key: 'categoryList', // 缓存的key,
      paths: ['category'] // 用于部分持久化状态的任何路径的数组。如果没有给出路径，完整的状态会被持久化。如果给定一个空数组，则不会保留任何状态。必须使用点表示法指定路径。如果使用模块，请包含模块名称。例如：“auth.user” 默认为undefined.
    })
  ]
})
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbd5e52112cf4f889ae5ac4dc54638bf~tplv-k3u1fbpfcp-watermark.image?)

## 主题切换实现

[以前写过主题替换的 demo](https://juejin.cn/post/7153893557344927751#heading-3)

原理： **通过类名的切换使得 html 元素在不同类名下展示不同的样式**

**实现思路**：（此方案基于[tailwindcss 插件](https://www.tailwindcss.cn/docs/dark-mode)）

tailwind.config.js 配置文件需要加上

```js
darkMode: 'class'
```

- 将当前主题类型存储在 vuex 中

```js
// 当前主题模式
import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_LIGHT
  }),
  mutations: {
    setThemeType(state, theme) {
      state.themeType = theme
    }
  }
}
```

- 当切换主题时修改 vuex 中的主题类型

```js
const handleHeaderTheme = (item) => {
  store.commit('theme/setThemeType', item.type)
}
```

- 监听主题类型的变化： theme-light 、 theme-dark、theme-system、给 html 标签动态设置 class 的属性值。他就是在切换时，给 html 元素添加到对应主题 css 前缀。从而达到切换主题的效果

```html
<html lang="en" class="dark">
  <!-- 添加暗黑模式css样式，前面加上dark前缀即可 -->
  <div class="bg-zinc-300 dark:bg-zinc-900"></div>
</html>
```

- html 的 class 属性值变化后会匹配到对应主题的 class、从而展示出来对应的主题的颜色
- 给标签设置两套的类名：白色一套、暗色一套

```html
<div class="bg-zinc-300 dark:bg-zinc-900"></div>
```

其中跟随系统的主题变化，需要用到 [Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)，该方法接收一个 mediaQueryString（媒体查询解析的字符串），该字符串我们可以传递[prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme),即 `window.matchMedia('(prefers-color-scheme: dark)')`方法即可返回一个[`MediaQueryList`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList)  对象。

- 该对象存在一个[`change`事件](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList/change_event)，可以监听系统主题发生变更。
- 事件对象[`matches`属性](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList/matches)可以判断为啥主题。（true: 深色主题，false: 浅色主题）。

主题修改工具函数

```js
import { watch } from 'vue'
import store from '../store'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '../constants'

/**
 * 监听系统主题变化
 */
let matchMedia = ''
function changeSystemTheme() {
  // 仅需初始化一次即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

  // 这里也是监听主题切换，然后调用修改html class
  matchMedia.addEventListener('change', (event) => {
    changeTheme(THEME_SYSTEM)
  })
}

/**
 * 主题匹配函数
 * @param val {*} 主题标记
 */
const changeTheme = (val) => {
  let htmlClass = ''
  if (val === THEME_LIGHT) {
    // 浅色主题
    htmlClass = THEME_LIGHT
  } else if (val === THEME_DARK) {
    // 深色主题
    htmlClass = THEME_DARK
  } else {
    // 跟随系统
    changeSystemTheme()
    // true是深色模式， false是浅色主题
    htmlClass = matchMedia.matches ? THEME_DARK : THEME_LIGHT
  }
  document.querySelector('html').className = htmlClass
}

/**
 * 初始化主题
 */
export default () => {
  // 监听主题切换，修改html class的值
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}
```

## 实现瀑布流布局

整个瀑布流组件的构建大体需要分成几部分

1. 通过 props 传递关键数据

   - data：数据源

   - nodeKey：唯一标识

   - column：渲染的列数

   - columnSpacing：列间距
   - rowSpacing：行间距
   - picturePreReading：是否需要图片预渲染

2. 瀑布流渲染机制：通过 absolute 配合 relative 完成布局，布局逻辑为：每个 item 应该横向排列，第二行的 item 顺序连接到当前最短的列中。

3. 通过作用域插槽 将每个 item 中涉及到的关键数据，传递到 item 视图中。

### 计算每列宽度

计算大体方法就是，拿到容器宽度(不包括 margin,padding,border)，

```js
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value =
    containerRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}
```

并且获取容器中每个 item 元素的总间距。

```js
// 列间距总大小 (column - 1) * columnSpacing
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
```

然后用当前容器减去总间距，再除以列数。

```js
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidth()
  // 获取列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
```

### 获取每个元素的高度

图片是否定义了高度，如果定义高度，可以直接计算出每个 item 的高度

```js
const useItemHeight = () => {
  // 初始化item高度列表
  itemsHeight = []
  // 获取 item 元素
  const itemElements = [...document.getElementsByClassName('hm-waterfall-item')]
  // 获取item高度
  itemElements.forEach((itemEl) => {
    itemsHeight.push(itemEl.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}
```

如果未定义高度，我们需要在图片加载完成后，才能计算高度。

- 获取 item 元素
- 获取 itm 元素中图片路径

```js
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
```

- 通过 image 对象的 load 事件来判断图片是否加载完毕，然后计算高度。

```js
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
```

```js
const waitImgComplete = () => {
  // 初始化item高度列表
  itemsHeight = []
  // 获取 item 元素
  const itemElements = [...document.getElementsByClassName('hm-waterfall-item')]
  // 获取所有元素的 img 标签
  const imgElements = getImgElements(itemElements)
  // 获取所有 img 图片路径
  const allImgSrc = getAllImgSrc(imgElements)
  // 计算图片预加载，然后计算高度
  allImgComplete(allImgSrc).then(() => {
    itemElements.forEach((itemEl) => {
      itemsHeight.push(itemEl.offsetHeight)
    })
  })
  // 渲染位置
  useItemLocation()
}
```

### 计算每个元素的偏移量

**都是通过获取列最小高度基础上计算的一些值。**

需要先将每列高度初始化为 0，使用该对象作为容器，key 为列下标，值为列高度。

```js
// 容器的总高度
const containerHeight = ref(0)
// 记录每列高度的容器。key：所在列  val：列高
const columnHeightObj = ref({})
/**
 * 构建记录各列的高度的对象。初始化都为0
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
```

获取 left 偏移量时，我们需要拿到最小高度列。

```js
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
```

获取最小高度列后，直接乘以列宽和加上间距就行

```js
/**
 * 计算当前元素的left偏移量
 */
const getItemLeft = () => {
  // 获取最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  // 计算left
  return (
    (columnWidth.value + props.columnSpacing) * column + containerLeft.value
  )
}
```

top 偏移量的计算，我们可以直接拿到最小高度列高就行

```js
/**
 * 计算当前元素的top偏移量
 */
const getItemTop = () => {
  // 获取列最小高度
  const minHeight = getMinHeight(columnHeightObj.value)
  return minHeight
}
```

**需要注意的是，我们在完成每次元素偏移量赋值的时候，都需要将最小高度列重新计算高度。**

```js
/**
 * 重新计算最小高度列高度
 */
const increasingHeight = (index) => {
  // 获取最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  // 该列高度重新计算
  columnHeightObj.value[column] =
    columnHeightObj.value[column] + itemsHeight[index] + props.rowSpacing
}
```

最后将最大高度列高度赋值给容器高度即可。

```js
// 渲染位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return

    // 拿到最小高度，计算_style中的left， top
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    // 每次设置完偏移量时，都需要更改最短列的高度。
    increasingHeight(index)
  })

  // 当所有item设置好偏移量时，将容器高度设置为列最高的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/waterfall-component)

## 长列表加载组件

主要是通过监听底部 dom 是否出现在可视区域，然后做数据请求，处理一些特殊情况。使用到了
[usevue 的 useIntersectionObserver api](http://www.vueusejs.com/core/useIntersectionObserver/) ，它就是简单了对 [IntersectionObserver api](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)进行了封装，让我们更轻易地实现可见区域交叉监听。

这个 IntersectionObserver 以前写过一篇文章 [《如何判断元素是否在可视区域内呢？然后搞一些事情》](https://juejin.cn/post/7006521586836570126)介绍过，可以看看。

主要提供`isLoading`展示加载更多动态图标， `isFinished`判断数据是否请求完毕， `load`事件请求数据 props 即可。

```js
<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})

// 定义loading绑定事件，加载更多事件
const emits = defineEmits(['update:isLoading', 'load'])

const loading = useVModel(props, 'isLoading', emits)
// 加载更多
const loadingRef = ref(null)
// 第一次加载，可见区域就是true，数据加载完成可见区域变成false
// 如果可见区域不是交替可见，那么回调不会执行

// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  // console.log(isIntersecting, props.isFinished, loading.value)
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

const emitLoad = () => {
  // 出现底部区域，数据未加载完成，loading为false时，请求数据
  if (targetIsIntersecting.value && !props.isFinished && !loading.value) {
    loading.value = true
    emits('load')
  }
}

/**
 * 处理首次数据加载为盛满全屏时，可见区域判断回调只执行一次的bug
 *
 * 监听loading变化，重新触发执行
 */
let timer = null
watch(loading, () => {
  // false => true（延迟请求数据，等上一次请求完毕后，在执行）=> false
  // 触发 load，延迟处理，等待 渲染（虽然数据请求回来，但是ui为渲染，所以targetIsIntersecting依旧为true）和 useIntersectionObserver 的再次触发
  // 当一次加载数据可以盛满容器，那么当loading发生变化时，不让其加载数据。因为targetIsIntersecting为false。这个延时的时间要大于targetIsIntersecting改变后的时间

  // 但是对于一次加载数据不可以盛满容器的情况。targetIsIntersecting始终未true，就可以在首屏加载两次了。等下一次watch执行，刚好延迟让targetIsIntersecting改变为false后，在触发emitLoad。这时刚好阻止请求了
  timer = setTimeout(() => {
    emitLoad()
  }, 500)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>
```

这里有一个容易出现的 bug，当我们数据量一次返回过少时，底部区域一直在可是区域内，我们将不能再次调用`useIntersectionObserver`传入的回调，也就不能再次请求数据，加载更多了。

所以我们需要监听 loading 的变化，再次触发数据请求。但是这样又有一个问题了。当我们数据一次性加载过多时，我们依旧请求多次数据，这是因为虽然第一次请求的数据回来了，但是界面还没有渲染，这是底部区域依旧在可是区域内，导致数据再一次被请求。所以我们手动延迟数据在 watch 监听中的请求。

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/infinite-list-component)

## 自定义懒加载指令

也是需要用到[usevue 的 useIntersectionObserver api](http://www.vueusejs.com/core/useIntersectionObserver/)，首先将 src 置空，当进入可视区域，我们就将 src 赋值回去。

```js
import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted(el) {
    // 保存图片路径
    const imgSrc = el.getAttribute('src')
    // 将图片src置空
    el.setAttribute('src', '')

    // 监听图片的可见
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.setAttribute('src', imgSrc)
        // 停止监听
        stop()
      }
    })
  }
}
```

通过[vite 的 Glob](https://vitejs.cn/guide/features.html#glob-import) 的另一个方法来做到指令自动注册。使用  `import.meta.globEager`，直接引入所有的模块。

```js
export default {
  install(app) {
    // 获取到所有指令模块对象
    const modules = import.meta.globEager('./modules/*.js')
    for (let [key, value] of Object.entries(modules)) {
      const directiveName = key.replace('./modules/', '').split('.')[0]
      app.directive(directiveName, value.default)
    }
  }
}
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/infinite-list-component)

## confirm 组件

`confirm` 组件的实现思路:

1. 创建一个`confirm`组件
2. 创建一个函数组件，并且返回一个 `promise`

3. 同时利用 h 函数生成`confirm`组件的`vnode`
4. 最后利用`render`函数，渲染`vnode`到 `body`中

了解了组件的设计思路，我们就需要分析它应该具有的 props

```js
const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  // 按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消和确认时触发事件, 例如移除dom
  closeAfter: {
    type: Function
  },
  /**
   * 主要是区分点击了取消还是确定
   */
  // 点击确定触发事件
  handleConfirmClick: {
    type: Function
  },
  // 点击取消触发事件
  handleCancelClick: {
    type: Function
  }
})
```

对于 confirm 组件来说，我们通过一个响应式数据来控制显示和隐藏实现的动画。

- 在弹出框出现时，我们需要监听挂载的时刻，然后控 mask 和弹框的显示，不然动画会失效。

- 再点击关闭弹出框时，我们不能立刻让组件卸载，不然动画也会立刻消失，所以我们延时卸载。

```js
// 动画时间 状态驱动的动态css
const actionDuration = '0.5s'

// 控制confirm显隐
const isVisible = ref(false)

// 组件挂载就让弹框显示，通过函数组件控制组件挂载卸载
// 通过mounted， 让其挂载时有动画效果
onMounted(() => {
  isVisible.value = true
})

/**
 * 关闭弹窗
 * 通过定时器，让动画完成后在移除dom
 */
const handleClose = () => {
  // 当隐藏时才会出现动画
  isVisible.value = false
  setTimeout(() => {
    // 卸载confirm组件
    props.closeAfter()
  }, actionDuration.replace('0.', '').replace('s', '') * 100)
}
```

函数组件的封装，主要使用`h, render`函数操作。

- `closeAfter`：主要就是在点击任何地方关闭弹框时，卸载组件。
- `handleConfirmClick`: 主要是点击确认按钮时，让 promise 状态为 fulfilled，让外界使用函数组件时，在 then 中可以操作确认后的事情。
- `handleCancelClick`: 主要是点击取消按钮时，让 promise 状态为 rejected，让外界使用函数组件时，在 catch 中可以操作取消后的事情。

**后两个函数主要就是为了区分点击了取消还是确认。**

```js
import { h, render } from 'vue'
import Confirm from './index.vue'

export default function createConfirm({
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
}) {
  return new Promise((resolve, reject) => {
    /**
     * 移除confirm
     */
    const closeAfter = () => {
      render(null, document.body)
    }

    /**
     * 点击确定按钮，回调
     */
    const handleConfirmClick = resolve

    /**
     * 点击取消按钮，回调
     */
    const handleCancelClick = reject

    // 生成vnode，并传入props
    const vnode = h(Confirm, {
      title,
      content,
      cancelText,
      confirmText,
      closeAfter,
      handleConfirmClick,
      handleCancelClick
    })
    // 渲染组件到body中
    render(vnode, document.body)
  })
}
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/confirm-component)

## message 组件

message 组件的实现和 confirm 非常类似。

props 需要指定弹框时间和类型

```js
const props = defineProps({
  // message 类型
  type: {
    type: String,
    required: true,
    validate(val) {
      if (types.includes(val)) {
        return true
      } else {
        throw new Error('请传入正确的类型值(error, warn, success)')
      }
    }
  },
  // message 内容
  content: {
    type: String,
    required: true
  },
  // 消息回调，在动画完成后，卸载message
  closeAfter: {
    type: Function
  },
  // 延时多久删除
  delay: {
    type: Number,
    default: 3000
  }
})
```

主要就是弹框的隐藏时机不同。message 中，是通过外界传入的时间控制隐藏的。

```js
const isVisible = ref(false)

/**
 * 为了保证出现时动画展示，我们需要在组件挂载后在显示对应的内容
 */
onMounted(() => {
  isVisible.value = true

  setTimeout(() => {
    isVisible.value = false
  }, props.delay)
})

// 在动画完成后，通过transition组件的after-leave钩子触发组件卸载。
```

函数组件实现

```js
import { h, render } from 'vue'
import Message from './index.vue'

export function createMessage({ type, content, delay = 3000 }) {
  /**
   * 动画结束时的回调
   */
  const closeAfter = () => {
    // message 销毁
    render(null, document.body)
  }

  // 生成vnode
  const vnode = h(Message, {
    type,
    content,
    delay,
    closeAfter
  })
  // 渲染组件
  render(vnode, document.body)
}
```

## 文件下载

文件下载相关的库

- 小文件下载:[file-saver](https://github.com/eligrey/FileSaver.js)
- 大文件下载: [streamsaver](https://github.com/jimmywarting/StreamSaver.js)

直接使用 api，传入下载路径即可

```js
import { saveAs } from 'file-saver'

const handleDownload = (downloadPath) => {
  saveAs(downloadPath)
}
```

## 全屏展示

我们知道在原生`dom`上，提供了一些方法来供我们开启或关闭全屏：

- [`Element.requestFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)
- [`Document.exitFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen)
- [`Document.fullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreen) 返回一个布尔值，表明当前文档是否处于全屏模式。**已弃用**
- [`Document.fullscreenElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenElement) 返回当前文档中正在以全屏模式显示的`Element`节点,没有就返回 null。

#### 一般浏览器

使用`requestFullscreen()`和`exitFullscreen()`来实现

#### 早期版本 Chrome 浏览器

基于 WebKit 内核的浏览器需要添加`webkit`前缀，使用`webkitRequestFullScreen()`和`webkitCancelFullScreen()`来实现。

#### 早期版本 IE 浏览器

基于 Trident 内核的浏览器需要添加`ms`前缀，使用`msRequestFullscreen()`和`msExitFullscreen()`来实现，注意方法里的 screen 的 s 为小写形式。

#### 早期版本火狐浏览器

基于 Gecko 内核的浏览器需要添加`moz`前缀，使用`mozRequestFullScreen()`和`mozCancelFullScreen()`来实现。

#### 早期版本 Opera 浏览器

Opera 浏览器需要添加`o`前缀，使用`oRequestFullScreen()`和`oCancelFullScreen()`来实现。

考虑到兼容性，我们可以使用`usevue`提供的[`useFullscreen` api](http://www.vueusejs.com/core/useFullscreen/)

```js
import { useFullscreen } from '@vueuse/core'

const imgRef = ref(null)
const { isFullscreen, enter, exit, toggle } = useFullscreen(imgRef)
const handleFullScreen = () => {
  imgRef.value.style.backgroundColor = 'transparent'
  enter()
}
```

## 功能引导实现

我们可以通过[`driver.js` 库](https://driver.employleague.cn/guide/)实现。

定义好对应的引导步骤。

```js
export default [
  {
    // 在哪个元素中高亮
    element: '.guide-home',
    // 配置对象
    popover: {
      // 标题
      title: 'logo',
      // 描述
      description: '点击可返回首页'
    }
  },
  {
    element: '.guide-search',
    popover: {
      title: '搜索',
      description: '搜索您期望的图片'
    }
  },
  {
    element: '.guide-theme',
    popover: {
      title: '风格',
      description: '选择一个您喜欢的风格',
      // 弹出的位置
      position: 'left'
    }
  },
  {
    element: '.guide-my',
    popover: {
      title: '账户',
      description: '这里标记了您的账户信息',
      position: 'left'
    }
  },
  {
    element: '.guide-start',
    popover: {
      title: '引导',
      description: '这里可再次查看引导信息',
      position: 'left'
    }
  },
  {
    element: '.guide-feedback',
    popover: {
      title: '反馈',
      description: '您的任何不满都可以在这里告诉我们',
      position: 'left'
    }
  }
]
```

然后调用 driver 库提供的 api 即可

```js
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { onMounted } from 'vue'
/**
 * 引导页处理
 */
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个'
  })
})

/**
 * 开始引导
 */
const handleGuideClick = () => {
  // 定义引导步骤
  driver.defineSteps(steps)
  driver.start()
}
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/use-driver)

## 表单验证

第三方表单校验库： [vee-validate](https://vee-validate.logaretm.com/v4/tutorials/dynamic-form-generator/)。

该库中，提供了三个重要的组件。分别为我们处理表单组件和表单验证错误提示。

```js
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
```

每个表单项，可以通过`rules`props 绑定验证规则。message 与 field 中的 name 是相对应的。

```html
<vee-form @submit="handleLogin">
    <vee-field
      class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
      name="username"
      :rules="validateUsername"
      type="text"
      placeholder="用户名"
      autocomplete="on"
      v-model="loginForm.username"
    />
    <vee-error-message
      class="text-sm text-red-600 block mt-0.5 text-left"
      name="username"
    >
</vee-form>
```

**需要注意的是：验证函数，true 表示表单验证通过， String 表示表单验证未通过，给出的提示文本。**

```js
/**
 * 用户名的表单校验
 */
export const validateUsername = (value) => {
  if (!value) {
    return '用户名为必填的'
  }

  if (value.length < 3 || value.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}
```

对于需要依赖别的表单值进行关联验证的，我们需要通过`defineRule`来定义规则。例如：确认密码输入框验证。

```js
/**
 * 确认密码的表单校验
 *
 * 参数二：表示关联表单值的数组
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}

/**
 * 定义关联规则， 例如确认密码
 */
defineRule('validateConfirmPassword', validateConfirmPassword)
```

rule 规则`rules="validateConfirmPassword:@password"`

```html
<!-- 密码 -->
<vee-field
  class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
  name="password"
  type="password"
  placeholder="密码"
  autocomplete="on"
  :rules="validatePassword"
  v-model="regForm.password"
/>
<vee-error-message
  class="text-sm text-red-600 block mt-0.5 text-left"
  name="password"
>
</vee-error-message>
<!-- 确认密码 -->
<vee-field
  class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
  name="confirmPassword"
  type="password"
  placeholder="确认密码"
  autocomplete="on"
  rules="validateConfirmPassword:@password"
  v-model="regForm.confirmPassword"
/>
<vee-error-message
  class="text-sm text-red-600 block mt-0.5 text-left"
  name="confirmPassword"
>
</vee-error-message>
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/form-verify-and-slider-captcha)

## 人类行为验证

目的：明确当前操作是人完成的，而非机器。

### 原理是什么？

[人机验证是什么？如何实现人机验证？](https://dun.163.com/news/p/d1abbda1d2c8438a90d19a70f2b056ce)

人机验证通过对用户的行为数据、设备特征与网络数据构建多维度数据分析，采用完整的可信前端安全方案保证数据采集的真实性、有效性。

**滑动验证码实现原理是什么？**

滑动验证码是服务端随机生成滑块和带有滑块阴影的背景图片，然后将其随机的滑块位置坐标保存。前端实现互动的交互，将滑块把图拼上，获取用户的相关行为值。然后服务端进行相应值的校验。**其背后的逻辑是使用机器学习中的深度学习，根据鼠标滑动轨迹，坐标位置，计算拖动速度，重试次数等多维度来判断是否人为操作。**

滑动验证码对机器的判断，不只是完成拼图，前端用户看不见的是——验证码后台针对用户产生的行为轨迹数据进行机器学习建模，结合访问频率、地理位置、历史记录等多个维度信息，快速、准确的返回人机判定结果，故而机器识别+模拟不易通过。滑动验证码也不是万无一失，但对滑动行为的模拟需要比较强的破解能力，毕竟还是大幅提升了攻击成本，而且技术也会在攻防转换中不断进步。

### 目前实现的方案有哪些？

分为两种： 一种是收费的、另一种是开源的

**收费的代表有**：

- 1、[网易网盾](https://dun.163.com/)
- 2、[数美](https://www.ishumei.com/new/product/tw/code?utm_medium=%E6%97%B6%E4%BB%A31-%E9%AA%8C%E8%AF%81%E7%A0%81&utm_campaign=%E9%AA%8C%E8%AF%81%E7%A0%81%E8%AF%8D&utm_content=%E4%BA%BA%E6%9C%BA%E9%AA%8C%E8%AF%81&utm_term=%7Bpa_mt_id%7D&utm_source=bdss1&e_matchtype=2&e_creative=53625341357&e_adposition=cl1&e_pagenum=1&e_keywordid=394337781220&e_keywordid2=376336362893&sdclkid=AL2N15F_15qR15Az&bd_vid=7116999343080641981)
- 3、[极验](http://www.geetest.com/)

**开源的有**：

- [slideCaptcha](https://gitee.com/LongbowEnterprise/SliderCaptcha?_from=gitee_search)

毫无疑问，就我们学习来说，开源的就是最好的。

该库主要是通过三个方法来进行验证回调操作的。

```js
let captcha = null

onMounted(() => {
  captcha = sliderCaptcha({
    // 绑定的dom元素id名
    id: 'captcha',
    // 验证成功的回调 arr滑块移动轨迹
    async onSuccess(arr) {
      // 这里将行为轨迹发送到服务端进行验证。
      const res = await getCaptcha({
        behavior: arr
      })
      // 验证成功发出事件
      if (res) emits('verifySuccess')
    },
    // 验证失败回调
    onFail() {
      console.error('人类行为验证失败')
    },
    // 默认的验证方法，咱们不在此处进行验证，而是选择在用户拼图成功之后进行验证，所以此处永远返回为 true
    verify() {
      return true
    }
  })
})
```

并且内部提供`reset`方法来修改拼图图片。
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd25187d9dd0447ea956c2b46e8a5bbb~tplv-k3u1fbpfcp-watermark.image?)
[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/form-verify-and-slider-captcha)

## 图片裁剪

想要学习图片裁剪，我们需要获取图片并展示。在我们点击上传图片如何预览呢？我们来简单介绍一下。

### 图片预览

[以前在学习大文件上传时，介绍过相关的 api](https://juejin.cn/post/7133610879286771742)

- [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL) 静态方法会创建一个 `DOMString`，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 `document` 绑定。这个新的`URL` 对象表示指定的 `File` 对象或 `Blob` 对象。通过`URL.createObjectURL(blob)`可以获取当前文件的一个内存 URL。

- [`FileReader.readAsDataURL(file)`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)，通过`FileReader.readAsDataURL(file)`可以获取一段`data:base64`的字符串。

执行时机：

- `createObjectURL`**是同步执行（立即的）**
- `FileReader.readAsDataURL**是异步执行（过一段时间）**

内存使用：

- `createObjectURL`返回一段带`hash`的`url`，并且一直存储在内存中，直到`document`触发了`unload`事件（例如：`document close`）或者执行`revokeObjectURL`来释放。

- `FileReader.readAsDataURL`则返回包含很多字符的`base64`，并会比`blob url`消耗更多内存，但是在不用的时候会自动从内存中清除（通过垃圾回收机制） **兼容性方面两个属性都兼容 ie10 以上的浏览器。**

优劣对比：

使用`createObjectURL`可以节省性能并更快速，只不过需要在不使用的情况下手动释放内存 如果不太在意设备性能问题，并想获取图片的`base64`，则推荐使用`FileReader.readAsDataURL`。

### cropperjs 库剪切图片

[cropperjs](https://github.com/fengyuanchen/cropperjs)是一个非常强大的图片裁剪工具，它可以适用于：原生 js，vue，react 等等。而且操作也非常简单、只需要简单几步即可完成图片的裁剪工作。

```js
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}

/**
 * 图片裁剪处理
 */
const imageRef = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageRef.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})
```

然后我们可以通过`cropper.getCroppedCanvas().toBlob`拿到裁剪后的文件对象。

```js
// 获取裁剪后的图片
cropper.getCroppedCanvas().toBlob((blob) => {
  // 裁剪后的 blob 对象
  console.log(blob)
})
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/upload-file-use-cropper-and-ali-oss)

## 图片上传到阿里的 oss 存储

免费获取渠道

- [腾讯云 cos](https://cloud.tencent.com/act/pro/cos?fromSource=gwzcw.7195963.7195963.7195963&utm_medium=cpc&utm_id=gwzcw.7195963.7195963.7195963&bd_vid=10186065120983657886)

- [阿里云 oss](https://free.aliyun.com/?crowd=personal&pipCode=oss&spm=5176.7933691.J_5253785160.4.2e392c47r1jltT)

以阿里云 oss 为例，安装[`ali-oss`](https://help.aliyun.com/document_detail/64041.htm?spm=a2c4g.11186623.0.0.235d24cbqRW0xl#concept-64041-zh)
封装创建 oss 对象实例方法

```js
import OSS from 'ali-oss'
import { REGION, BUCKET } from '@/constants'
import { getSts } from '@/api/sys'

export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: REGION,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: res.Credentials.SecurityToken,
    // 填写Bucket名称。
    bucket: BUCKET,
    // 刷新 token，在 token 过期后自动调用（但是并不生效，可能会在后续的版本中修复）
    refreshSTSToken: async () => {
      // 向您搭建的STS服务获取临时访问凭证。
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 5 * 1000
  })
}
```

```js
/**
 * 上传图片到oss
 */
const store = useStore()
const putObjectToOSS = async (file) => {
  // 创建oss对象实例
  const ossClient = await getOSSClient()
  try {
    // 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx 。否则你将得到一个 《AccessDeniedError: You have no right to access this object because of bucket acl.》 的错误
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.nickname}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 文件存放路径，文件。上传文件对象。并返回对应的图片路径
    const res = await ossClient.put(`images/${fileName}`, file)
    // 通知父元素更改图片地址
    emits('updateImgUrl', res.url)
    createMessage({
      type: 'success',
      content: '图片上传成功'
    })
  } catch (e) {
    createMessage({
      type: 'error',
      content: '图片上传失败'
    })
  } finally {
    // 关闭动画
    loading.value = false
    // 关闭弹窗
    handleClose()
  }
}
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/upload-file-use-cropper-and-ali-oss)

## 让 h5 页面跳转和原生 app 页面跳转一样流畅

一般情况下，我们在移动端切换路由时，为了让 h5 页面跳转可以与原生 app 媲美，都会使用 vue 提供的[过度动效](https://router.vuejs.org/zh/guide/advanced/transitions.html)来实现。

主要实现逻辑就是，先定义进入和离开页面的动画，通过路由跳转动态改变 transition 动画名称。在跳转的时候动态改变缓存组件栈的组件，从而达到组件切换缓存效果。

```js
<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <!-- 缓存组件 -->
      <!-- :key="$route.fullPath" 防止动态路由间跳转有缓存 -->
      <keep-alive :include="virtualTaskStack">
        <component
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :is="Component"
          :key="$route.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
const ROUTER_TYPE_NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
</script>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  // 跳转类型。pc端不进行跳转动画 为none
  routerType: {
    type: String,
    default: ROUTER_TYPE_NONE,
    validate(val) {
      if (
        val == ROUTER_TYPE_BACK ||
        val == ROUTER_TYPE_NONE ||
        val == ROUTER_TYPE_PUSH
      ) {
        return true
      } else {
        console.error(
          `请传入${ROUTER_TYPE_NONE}、${ROUTER_TYPE_BACK}、${ROUTER_TYPE_PUSH}类型之一`
        )
        return false
      }
    }
  },
  // 首页的组件名称，对应任务栈中的第一个组件
  mainComponentName: {
    type: String,
    required: true
  }
})
// 缓存的组件
const virtualTaskStack = ref([props.mainComponentName])

/**
 * 监听跳转类型，然后确定动画名称
 */
const transitionName = ref('')
watch(
  () => props.routerType,
  (val) => {
    transitionName.value = val
  }
)

/**
 * 每次路由切换，改变缓存组件数组。
 */
const router = useRouter()
router.beforeEach((to, from) => {
  // // 定义当前动画名称
  // transitionName.value = props.routerType

  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 出栈
    virtualTaskStack.value.pop()
  }

  // 进入首页默认清空栈
  if (to.name === props.mainComponentName) {
    clearTask()
  }
})

/**
 * 动画开始
 */
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}

/**
 * 动画结束
 */
const afterLeave = () => {
  isAnimation.value = false
}

/**
 * 清空栈
 */
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.6s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.6s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.6s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.6s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
```

[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/page-router-animation)

## 用户反馈功能

可以通过第三方平台 [兔小巢](https://txc.qq.com/)进行接入。

登录成功后，就可以创建产品。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd3b7e75837344ef976216a5c4cab816~tplv-k3u1fbpfcp-watermark.image?)

创建完成后，就会生成一个返回网址。将其接入网站即可。
