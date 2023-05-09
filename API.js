//&api_key=eb268c1a76ec1484b27465744dc40c400033fabfb60a40f0453455eb2e2c0a34&user_id=1238647
const crypto = require('crypto');
const { logData, logError } = require('./log.js');

const API_KEY = 'eb268c1a76ec1484b27465744dc40c400033fabfb60a40f0453455eb2e2c0a34';
const USER_ID = 1238647;


function fetchData(tags, limit, page) {

    const hash = crypto.createHash('sha256');
    hash.update(tags);
    let dataHash = hash.digest('hex') + page + limit;
    
    fetch(`https://gelbooru.com/index.php?page=dapi&s=post&tags=${'sort:score ' + tags}&q=index&limit=${limit}&pid=${page}&json=1&api_key=${API_KEY}&user_id=${USER_ID}`)
        .then(Response => Response.json())
        .then(data => logData(data, `./data/data_${dataHash}.json`, true))
        .catch(error => logError(error) );

    return dataHash;

}

module.exports = {fetchData};