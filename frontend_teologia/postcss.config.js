/**
 * postcss.config.js
 */
import nesting from 'tailwindcss/nesting/index.js'
import tailwindcss  from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const config = {
  plugins: [
    nesting(),
    tailwindcss(),
    autoprefixer(),
  ],
}

export default config
if (typeof module !== 'undefined') module.exports = config
