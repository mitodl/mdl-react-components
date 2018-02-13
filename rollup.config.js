import babel from 'rollup-plugin-babel'

const babelConfig = {
  presets: [
    ["env", {"modules": false }],
    "react"
  ],
  plugins: [
    "transform-flow-strip-types",
    "transform-object-rest-spread",
    "transform-class-properties",
    "syntax-dynamic-import",
    'external-helpers',
    'transform-runtime'
  ],
  babelrc: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true
}

const externals = [
  '@material'
]

const sources = [
  'index.js',
  'Button.js',
  'Dialog.js',
  'Radio.js',
]

const config = sources.map((source) => ({
  entry: `src/${source}`,
  format: 'cjs',
  dest: `lib/${source}`,
  plugins: [
    babel(babelConfig)
  ],
  external: externals
}))

export default config
