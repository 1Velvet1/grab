const {fetchData} = require('./API.js');
const {logData} = require('./log.js');
const {parse} = require('./parse.js');
const {readData} = require('./read.js');
const {download} = require('./download.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let prompt = '';
let hash = 0;
let removePrompt = false;
let removeFlag = false;
let abundantTags = '';
let count = 1;

async function invoke(OutputFolder){

readData('./searchInfo.json', (err, search) => {

    if(!err){
        
        const searchInfo = JSON.parse(search);
        prompt = searchInfo.prompt;
        removePrompt = searchInfo.abundantTags.includes('prompt');
        removeFlag = searchInfo.abundantTags != '';
        abundantTags = searchInfo.abundantTags;
        abundantTags = removeFlag ? abundantTags.split('prompt').reverse().pop() : abundantTags;
        count = searchInfo.count;
        hash = fetchData(searchInfo.prompt, searchInfo.limit, searchInfo.page);
        
    }

})

await sleep(3000);

readData(`./data/data_${hash}.json`, (err, data) => {

    if(!err && data != ''){       

        const Images = JSON.parse(data);

        Images.post.forEach((image) => {                      
                        
            const tags = parse(image.tags, removePrompt ? prompt.split(' ') + abundantTags.split(' ') : abundantTags.split(' '), prompt.split(' ').reverse().pop(), removeFlag);

            logData(tags, `${OutputFolder}/${count}.txt`, false);
            download(image.file_url, `${OutputFolder}/${count}.${image.file_url.split('.').pop()}`);
            count++;

          });

    }

})

}

module.exports = {invoke};