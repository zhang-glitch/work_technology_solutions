export default {
  install(app) {
    // 获取到所有指令
    const modules = import.meta.globEager('./modules/*.js')
    for (let [key, value] of Object.entries(modules)) {
      const directiveName = key.replace('./modules/', '').split('.')[0]
      app.directive(directiveName, value.default)
    }
  }
}
