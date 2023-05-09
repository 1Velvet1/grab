const https = require('https');
const fs = require('fs');

function download(Link, Path){

    const file = fs.createWriteStream(Path);

    https.get(Link, (response) => {

        response.pipe(file);

    });

}

module.exports = {download};