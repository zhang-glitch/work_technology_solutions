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
[以前写过主题替换的demo](https://juejin.cn/post/7153893557344927751#heading-3)

原理： **通过类名的切换使得html元素在不同类名下展示不同的样式**

**实现思路**：（此方案基于[tailwindcss插件](https://www.tailwindcss.cn/docs/dark-mode)）

tailwind.config.js配置文件需要加上
```js
  darkMode: 'class'
```

-  将当前主题类型存储在vuex中
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
-  当切换主题时修改vuex中的主题类型
```js
const handleHeaderTheme = (item) => {
  store.commit('theme/setThemeType', item.type)
}
```
-  监听主题类型的变化： theme-light 、 theme-dark、theme-system、给html标签动态设置class的属性值。他就是在切换时，给html元素添加到对应主题css前缀。从而达到切换主题的效果
```html
    <html lang="en" class="dark">
        <!-- 添加暗黑模式css样式，前面加上dark前缀即可 -->
        <div class="bg-zinc-300 dark:bg-zinc-900" ></div>
    </html>
```
-  html的class属性值变化后会匹配到对应主题的class、从而展示出来对应的主题的颜色
-  给标签设置两套的类名：白色一套、暗色一套
```html
   <div class="bg-zinc-300 dark:bg-zinc-900" ></div>
```
其中跟随系统的主题变化，需要用到 [Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)，该方法接收一个mediaQueryString（媒体查询解析的字符串），该字符串我们可以传递[prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme),即 `window.matchMedia('(prefers-color-scheme: dark)')`方法即可返回一个[`MediaQueryList`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList) 对象。
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