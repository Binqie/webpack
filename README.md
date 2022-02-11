# Быстрый старт Webpack

## Инициализация

```bash
npm init
```
после чего создастся файл -- package.json --, который мы также должны настроить.

"npm install" то же самое что и "npm i".


```json
{
  "name": "*project name*",
  "version": "1.0.0",
  "description": "*project description*",
  "private": true, 
  "scripts": {                                     // Скрипты для сборки вашего проекта. В консоли запустить эти команды:
    "dev": "webpack --mode development",           // npm run dev
    "build": "webpack --mode production",          // npm run build
    "watch": "webpack --mode development --watch"  // npm run watch
  },
  "author": "*author*",
  "license": "ISC",                                
  "devDependencies": {                             // Плагины и лоадеры для комфортной работы (устанавливаем по желанию)
    "clean-webpack-plugin": "^4.0.0",              // npm i -D clean-webpack-plugin
    "css-loader": "^6.6.0",                        // npm i -D css-loader
    "csv-loader": "^3.0.3",                        // npm i -D csv-loader
    "file-loader": "^6.2.0",                       // npm i -D file-loader
    "html-webpack-plugin": "^5.5.0",               // npm i -D html-webpack-plugin
    "papaparse": "^5.3.1",                         // npm i -D papaparse
    "style-loader": "^3.3.1",                      // npm i -D style-loader
    "webpack": "^5.68.0",                          // npm i -D webpack
    "webpack-cli": "^4.9.2",                       // npm i -D webpack-cli
    "xml-loader": "^1.2.1"                         // npm i -D xml-loader
  },
  "dependencies": {                                // 
    "jquery": "^3.6.0",                            // npm i -D jquery
    "normalize.css": "^8.0.1"                      // npm i -D normalize.css
  }
}
```
## Установка webpack

Обязательные команды для установки:

```bash
npm i -D webpack

npm i -D webpack-cli
```
или
```bash
npm i -D webpack webpack-cli
```
webpack-cli нужен для использования команд в терминале.

## Конфигурационный файл webpack
Создаем файл c названием webpack.config.js и настраиваем его:

```javascript
const path = require('path');  // Для более легкого использования путей
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),          // Так как папка "src" используется по умолчанию для хранения наших рабочих файлов, мы можем привязать контекст на эту папку что-бы не писать в конфигурации каждый раз путь ./src  
    mode: 'development',                              // Сборка проекта по умолчанию в режиме разработки (можно не писать если в package.json есть скрипты на сборку)
    entry: {                                          // Входные точки
        main: './index.js',                           // main - обычно главный скрипт
        fileName: './folderName/scriptName.js',       // Добавляем сколько угодно файлов которые нужно собрать в проект. Результат вывода ниже в "output".
    },
    output: {                                         // Вывод файлов
        filename: '[name].[contenthash].js',          // [name], [id], [contenthash] и другие паттерны используются для создания уникальных имен файлов 
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.css'],           // Далее можно не дописывать расширения в скрипте, webpack сам все поймет
        alias: {                                                // Создаем абсолютные пути вместо относительных (что-бы не прописывать каждый раз ../../../ и тд.)
            '@': path.resolve(__dirname, 'src'),           
            '@models': path.resolve(__dirname, 'src/models'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },
    plugins: [                                 // Добавляем плагины
        new HTMLWebpackPlugin({                // Плагин который позволяет работать с HTML
            template: './index.html'
        }),
        new CleanWebpackPlugin()               // Плагин который чистит dist от ненужных(старых) файлов
    ],
    module: {            // Добавляем лоадеры
        rules: [         // Правила:
            {
                test: /\.css$/,                       // Если файл с расширением .css -
                use: ['style-loader', 'css-loader']   // то используй эти лоадеры справа налево и тд.
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'                // В Webpack 5 в место --- use: ['file-loader'] --- нужно использовать --- type: 'asset/resource' ---
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
```

## Импорт и использование наших файлов в скриптах

```javascript

import * as $ from 'jquery';                               // Импортируем наши файлы
import someFunction from '@models/someScript';
import Post from '@models/Post';
import xml from '@assets/data.xml'
import csv from '@assets/data.csv'
import '@styles/styles';
import json from '@assets/json.json';
import WebpackLogo from '@assets/webpack-logo'

let counter = 0;
const someVar = someFunction;                              // Используем наши файлы
const post = new Post('webpack Post title', WebpackLogo)

window.addEventListener('click', clicksCounter);

$('pre').html(post.toString());

function clicksCounter() {
    counter++;
    console.log(counter)
    console.log(someVar);
    console.log(json);
    console.log(`img: ${WebpackLogo}`);
    console.log(post.toString());
    console.log(xml)
    console.log(csv)
}

```

## Импорт и использование наших файлов в CSS

```css

@import "~normalize.css";  /* ~ позволяет выбирать файлы из папки node_modules, так как мы установили normalize.css как пакет*/
@import 'roboto.css';

body {
    font-family: 'Roboto', sans-serif;
}

.container {
    margin-top: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

h1 {
    text-align: center;
}

.logo {
    background-image: url('@assets/webpack-logo.png');  /* Пример использования абсолютных путей ( вместо ./src/assets/webpack-logo.png ) */
    background-size: cover;
    height: 200px;
    width: 200px;
    margin: 0 auto;
}

```

### Markdown file was made by Binqie™
Информация будет дополняться по мере необходимости.