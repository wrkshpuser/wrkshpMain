const fs = require('fs')

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, vm) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.vm == vm)
        if (!row) {
            reject({
                message: 'VM is not good',
                status: 404
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function isInArray(array, vm) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.vm == vm)
        resolve(row)
    })
}


function getProductsByQuery(file, query){
    console.log('iN hELPER');
    const products = require('../data/'+file+'.json');
    const rawdata = JSON.stringify(products);
    const jsonDataProducts = JSON.parse(rawdata);
    const jp = require('jsonpath');
    console.log(query);
    const queryOutput = jp.query(jsonDataProducts, query);
    return queryOutput;
  }
  

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    isInArray,
    getProductsByQuery
}