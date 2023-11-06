const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
 
 module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Medico asistente",
        appId: "com.example.app",
        win: {
          "target": [
            "nsis"
          ],
          icon: 'src/icon.png',
        },
        publish: ['github'],
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
}
