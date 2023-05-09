const fs = require('fs');

function logTime(){

    const date = new Date();
    const CurrentTime = date.getFullYear() + '.' + date.getDay() + '.' + date.getMonth() + 'UTC' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds();

    return CurrentTime;

};

function logError(ErrorMessage){

    const jsonData = JSON.stringify(ErrorMessage);    
    
    fs.writeFile(`./log/log${logTime()}.txt`, jsonData, error => {

        console.log(error);
        process.exit(-1);
        
    });

};

function logData(Data, Path, Stringify){
          
    let jsonData = '';
    
    if(Stringify){

    jsonData = JSON.stringify(Data);

    }
    else{

    jsonData = Data.toString();

    }
    

    fs.writeFile(Path, jsonData, error => {

        if(error){

        logError(error)

        }
        return null;

    });

    return 1;

};

module.exports = { logData, logError };