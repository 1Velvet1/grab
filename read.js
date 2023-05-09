const fs = require('fs');
const {logError} = require('./log.js');

function readData(File, callback) {

    fs.readFile(File, (err, data) => {

      if (err) {

        logError(err);

        return callback(err);

      }

      callback(null, data);

    });

  }

module.exports = {readData};