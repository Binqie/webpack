import * as $ from 'jquery';
import someFunction from '@models/someScript';
import Post from '@models/Post';
import xml from '@assets/data.xml'
import csv from '@assets/data.csv'
import '@styles/styles';
import json from '@assets/json.json';
import WebpackLogo from '@assets/webpack-logo'

let counter = 0;
const someVar = someFunction;
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
