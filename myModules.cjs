const { log } = require('console');
const moment = require('moment');
const { parse } = require('url');
const fs = require('fs');
const querystring = require('querystring');

function datatime() {
    const formatdate = moment().format('HH:mm:ss');
    return formatdate;
}

function queryParams(req) {
    const url = parse(req.url, true).query;
    console.log("URL", url)
    var text = url.year + " " + url.month
    return text
}

function getCall(res, req) {
    const data = '';
    return data;
}

function readFile(callback) {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
}

function postCall(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        const payload = querystring.parse(data);
        console.log(payload);
        data = JSON.stringify(payload);
        res.end(data);
    });
}

function append(res) {
    fs.appendFile('index.html', '<h1>Sanjai i am Appended!</h1>', function (err) {
        if (err) {
            res.end("You got errror sanjai!" + err)
        }
        res.end("Appended now check it!")
    });
}

function urlAccess(req, res) {
    const decodeUrl = parse(req.url, true);
    console.log("Host", decodeUrl.host)
    console.log("pathname", decodeUrl.pathname)
    console.log("search", decodeUrl.search)
}

module.exports = { datatime, queryParams, readFile, postCall, append, urlAccess, getCall };
