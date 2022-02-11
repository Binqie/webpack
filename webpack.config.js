const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',  // Сборка проекта по умолчанию в режиме разработки (можно не писать если в package.json есть скрипты на сборку)
    entry: {  // Входные точки
        main: './index.js',
    },
    output: {  // Вывод файлов
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.css'],  // Далее можно не дописывать расширения в скрипте, webpack сам все поймет
        alias: {  // Создаем абсолютные пути вместо относительных
            '@': path.resolve(__dirname, 'src'),           
            '@models': path.resolve(__dirname, 'src/models'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },
    plugins: [  // Добавляем плагины
        new HTMLWebpackPlugin({   // Плагин который позволяет работать в HTML
            template: './index.html'
        }),
        new CleanWebpackPlugin()  // Плагин который чистит dist от ненужных файлов
    ],
    module: {  // Добавляем лоадеры
        rules: [  // Правила:
            {
                test: /\.css$/,  // Если файл с расширением .css -
                use: ['style-loader', 'css-loader']  // то используй эти лоадеры справа налево и тд.
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'  // В Webpack 5 в место --- use: ['file-loader'] --- нужно использовать --- type: 'asset/resource' ---
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
        ]
    }
}