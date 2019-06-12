
const express = require('express');
const router = express.Router();
const http = require('http');
const Q = require('q');
const VerEx = require('verbal-expressions');
const varExp = VerEx()
    .find('var')
    .whitespace()
    .oneOrMore()
    .beginCapture()
    .word()
    .endCapture()
    .find('=');

/* GET funds list. */
router.get('/list', function (req, res, next) {
    getVarsFromJS('http://fund.eastmoney.com/js/fundcode_search.js').then((vars) => {
        let funds = [];
        vars.r.forEach(element => {
            funds.push(
                {
                    id: element[0],
                    name: element[2]
                }
            )
        });
        res.send(funds);
    });
});

/* GET the list of funds. */
router.get('/detail/:fundCode', function (req, res, next) {
    getVarsFromJS('http://fund.eastmoney.com/pingzhongdata/' + req.params.fundCode + '.js').then((vars) => {
        res.send(vars);
    });
});

/**
 * Get all variables from a remote JS file
 * @param {*} jsURL the URL of the JS file. 
 */
function getVarsFromJS(jsURL) {
    var deffered = Q.defer();
    http.get(jsURL, (backendRes) => {
        let rawData = '';
        backendRes.on('data', (chunk) => {
            rawData += chunk;
        });
        backendRes.on('end', () => {
            deffered.resolve(parseAllVars(rawData));
        });
    });
    return deffered.promise;
}

/**
 * Parse all variables from the provided JS code.
 * @param {*} jsCode the JS code to be parsed.
 */
function parseAllVars(jsCode) {
    let exp = /var\s+([\w]+)\s?=/g;
    var match = exp.exec(jsCode);
    let varNames = [];
    while (match != null) {
        varNames.push(match[1]);
        match = exp.exec(jsCode);
    }
    let returnJSON = '{';
    varNames.forEach((varName) => {
        returnJSON += (varNames.indexOf(varName) == 0 ? '' : ',')
            + '"' + varName + '":' + varName;
    });
    returnJSON += '}';
    let parseRes = eval('(() =>{' + jsCode + ' return ' + returnJSON + '; })()');
    return parseRes;
}


module.exports = router;
