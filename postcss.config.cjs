// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'), // Add this line
    require('autoprefixer'),
    // other plugins
  ],
}
