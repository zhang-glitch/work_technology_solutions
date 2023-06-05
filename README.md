## 定制化、高可用前台样式处理方案
企业级项目下css处理痛点
- 统一的变量维护困难。
- 大量的 className 负担。
- HTML, CSS分离造成的编写负担。
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
    extend: {},
  },
  plugins: [],
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

tailwindcss 官方介绍为无需离开HTML即可快速构建现代网站。具体来说就是tailwind提供了很多类名，都定义了特定的css，直接在编写HTML的时候加上对应的类名即可快速搭建网站。
### tailwindcss的设计理念
首先我们先来看下css颗粒度设计形式
- 行内样式。自由度最高，可定制化最强。但是不方便样式的复用。
```html
  <div style="color: red; font-size: 20px">zh-llm</div>
```

- 原子化css,每个类名都代表着一类css样式。自由度依旧很强，可定制化也很高，并且可以样式复用。但是会编写大量无意义的类名。**其中tailwindcss就是这种设计。**
```html
  <div class="text-sky-400">zh-llm</div>
```
- 传统形式，通过一个或几个具有语义化的class来描述一段css属性，封装性，语义化强，自由度和可定制性一般（大多类名都是编写对应元素整套css属性）。但是有大量的语义化class，编写时需要HTML和CSS来回切换。
```html
 <div class="container clear"></div>
```
- 组件形式，在当前组件中直接定义好结构和样式。封装性极强，语义化强。但是自由度和可定制性比较差。并且风格固定，比较适合后台项目。比如element-plus等等。
```html
  <my-component />
```

对比四种设计方式，可以看出原子化css是自由度，可定制化，复用性都挺好，只有编写大量无意义类名缺点，对比他的优点，缺点也是可以忽略的。但是对于维护项目的人来说，如果不了解tailwindcss中定义的类名，那可能是非常头疼的一件事了。

对于高个性化，高交互性，高定制化前台项目样式解决方案，还是原子化css形式更合适。

在使用vscode开发时，我们可以安装一个`Tailwind CSS IntelliSense`插件，提示类名，来帮助我们更好的开发。
## VueUse Vue组合式API的实用工具集
[VueUse](http://www.vueusejs.com/), 基于Vue组合式API的实用工具集。

`useWindowSize` api，响应式的获取窗口尺寸。当窗口尺寸发生变化时，实时获取。来判断是移动端UI还是pc端UI。

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
[案例代码](https://github.com/zhang-glitch/work_technology_solutions/tree/use-vueuse)
## vite开发配置
### [配置路径别名](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)
```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": join(__dirname, "/src")
    }
  }
})
```
### [开发环境解决跨域](https://cn.vitejs.dev/config/server-options.html#server-proxy)
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": join(__dirname, "/src")
    }
  },
  server: {
    proxy: {
      // 代理所有 /api请求
      "/api": {
        target: "目标origin",
        // 改变请求的origin为target的值
        changeOrigin: true,
      }
    }
  }
})
```
### [配置环境变量](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)
企业级项目，都会区分很多环境，供我们测试试用。不能让我们的测试数据去污染线上的数据。所以vite也提供了我们环境配置文件的方式，让我们很轻松的去通过一些环境选择对应的接口地址等等。

**`.env.[mode]`的格式可以在不同模加载加载不同的内容。**
> 环境加载优先级
>
> - 一份用于指定模式的文件（例如 `.env.production`）会比通用形式的优先级更高（例如 `.env`）。
>
> - **另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 `.env` 类文件覆盖。例如当运行 `VITE_SOME_KEY=123 vite build` 的时候。**
>
> - `.env` 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。

我们可以在源码中通过`import.meta.env.*`的方式获取以`VITE_`开头的已加载的环境变量。

```js
// .env.development
VITE_BASE_API = "/api"
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
[vite的Glob](https://vitejs.cn/guide/features.html#glob-import) 导入功能:该功能可以帮助我们在文件系统中导入多个模块
```js
const modules = import.meta.glob('./dir/*.js')
// 以上将会被转译为下面的样子：
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}
```
然后再通过vue提供的注册异步组件的方式进行引入，vue的 [defineAsyncComponent](https://cn.vuejs.org/guide/components/async.html)方法:该方法可以创建一个按需加载的异步组件 基于以上两个方法,实现组件自动注册。
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
**其实如果组件都提供了name属性，我们可以直接手动引入各组件模块，然后实现半自动注册。组件提供name的好处是，在vue-devtools中调试时方便查找各个组件。**

[在vue官网中](https://cn.vuejs.org/api/options-misc.html#name)，**在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，即使是在配合 `<KeepAlive>` 使用时也无需再手动声明。** 但是对于我们文件名都为index.vue的开发者来说，就没办法了。