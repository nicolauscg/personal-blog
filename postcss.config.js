const partialProcess = require("postcss-partial-process")
const prependSelector = require("postcss-prepend-selector")

module.exports = () => ({
  plugins: [
    require("tailwindcss"),
    partialProcess({
      plugins: [prependSelector({ selector: "#tw " })],
    }),
  ],
})
