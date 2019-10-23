const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const glob = require('glob')

const isDev = process.argv.indexOf('--develop') >= 0
const isWatch = process.argv.indexOf('--watch') >= 0
const demoSrc = path.resolve(__dirname, './demo')
const demoDist = path.resolve(__dirname, '../miniprogram_dev')
const src = path.resolve(__dirname, '../src')
// const dev = path.join(demoDist, 'components')
const dev = demoDist
const dist = path.resolve(__dirname, '../miniprogram_dist')

const getEntry = () => {
    const globPath = 'src/components/**/*.json' // 匹配src目录下的所有文件夹中的html文件
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    /* eslint-disable no-useless-escape */
    const pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)' // 路径为src目录下的所有文件夹
    const files = glob.sync(globPath)
    const entries = []
    const reg = new RegExp('^' + pathDir)
    for (let i = 0; i < files.length; i++) {
        // entries.push(files[i].replace(reg, '$`').replace('.json', ''))
        entries.push(files[i].replace(reg, 'components/').replace('.json', ''))
    }
    return entries

}

const getCopyEntry = () => {
    const globPath = 'src/components/**/assets/*.*' // 匹配src目录下的所有文件夹中的html文件
    const pathDir = 'src/components/' // 路径为src目录下的所有文件夹
    const files = glob.sync(globPath)
    const entries = []
    const reg = new RegExp('^' + pathDir)
    for (let i = 0; i < files.length; i++) {
        entries.push(files[i].replace(reg, './components/'))
    }

    console.log(">>>>>>>>>>>>>>>>>>>>>>>");

    console.log(files);
    console.log(entries);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>");

    return entries
}


getCopyEntry()



module.exports = {
    //   entry: ['index'],
    entry: getEntry(),

    isDev,
    isWatch,
    srcPath: src, // 源目录
    distPath: isDev ? dev : dist, // 目标目录

    demoSrc, // demo 源目录
    demoDist, // demo 目标目录

    wxss: {
        less: false, // 使用 less 来编写 wxss
        sourcemap: false, // 生成 less sourcemap
    },

    js: {
        webpack: true, // 使用 webpack 来构建 js
    },

    webpack: {
        mode: 'production',
        output: {
            filename: '[name].js',
            libraryTarget: 'commonjs2',
        },
        target: 'node',
        externals: [nodeExternals()], // 忽略 node_modules
        module: {
            rules: [{
                test: /\.js$/i,
                use: [
                    'babel-loader',
                    // 'eslint-loader'
                ],
                exclude: /node_modules/
            }],
        },
        resolve: {
            modules: [src, 'node_modules'],
            extensions: ['.js', '.json'],
        },
        plugins: [
            new webpack.DefinePlugin({}),
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        ],
        optimization: {
            minimize: false,
        },
        // devtool: 'nosources-source-map', // 生成 js sourcemap
        performance: {
            hints: 'warning',
            assetFilter: assetFilename => assetFilename.endsWith('.js')
        }
    },

    copy: ['./utils', ...getCopyEntry()], // 将会复制到目标目录
}
