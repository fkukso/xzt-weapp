const path = require('path')
const glob = require('glob')


const getEntry = () => {
    const globPath = '../src/components/**/assets/*.*' // 匹配src目录下的所有文件夹中的html文件

    console.log(globPath);


    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    /* eslint-disable no-useless-escape */
    const pathDir = '../src/components/' // 路径为src目录下的所有文件夹
    const files = glob.sync(globPath)
    const entries = []
    const reg = new RegExp('^' + pathDir)

    console.log(files);


    for (let i = 0; i < files.length; i++) {
        // entries.push(files[i].replace(reg, '$`').replace('.json', ''))
        entries.push(files[i].replace(reg, 'components/').replace('.json', ''))
    }

    console.log(entries);

    return entries
}


getEntry()