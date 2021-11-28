const assert = require('chai').assert
const fs = require("fs");
const axios = require("axios").default;

const baseUrl = "https://movie-database-imdb-alternative.p.rapidapi.com/"
const baseHeaders = {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": "0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea"
}
const file1 = fs.readFileSync('./data_templates/Get_template_1.json')
const templBody = JSON.parse(file1)
let config = {
    method: 'get',
    url: baseUrl,
    headers: baseHeaders,
    params: templBody
}

describe("GET request by Search", function() {
    it("Validate valid response and json schema is ok",  async function () {
        const response = await axios.request(config);
        const jsonImp = fs.readFileSync('./data_models/GET_model_1.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const respCode = response.status;
        const respMessage = response.statusText;
        const body = response.data

        assert.deepEqual(body, expObject)
        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
    });

    it("Validate valid response and json schema for 'Movie not found!' scenario",  async function () {
        config['params']['s'] = "F8745628465"
        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/GET_model_2.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate valid response and json schema for 'Too many results!' scenario",  async function () {
        config['params']['s'] = "F"
        const jsonImp = fs.readFileSync('./data_models/GET_model_3.json')
        const expObject = JSON.parse(jsonImp)
        const response = await axios.request(config)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate valid response and json schema for empty required parameter",  async function () {
        config['params']['s'] = ""
        const jsonImp = fs.readFileSync('./data_models/GET_model_4.json')
        const expObject = JSON.parse(jsonImp)
        const response = await axios.request(config)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate search by year (optional parameter) ",  async function () {
        config['params']['s'] = "Avengers"
        config['params']['y'] = "2000"

        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/GET_model_6.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate search by type (optional parameter) ",  async function () {
        config['params']['s'] = "Avengers"
        config['params']['y'] = "2010"
        config['params']['type'] = "series"

        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/GET_model_7.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate search by page (only required parameter) ",  async function () {
        config['params']['s'] = "Avengers"
        config['params']['y'] = ""
        config['params']['r'] = ""
        config['params']['type'] = ""

        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/GET_model_9.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate search by page (optional parameter) ",  async function () {
        config['params']['s'] = "Avengers"
        config['params']['y'] = "2018"
        config['params']['page'] = "2"

        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/GET_model_8.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Validate xml body response",  async function () {
        config['params']['s'] = "Maximum Overdrive"
        config['params']['y'] = "2009"
        config['params']['page'] = "1"
        config['params']['r'] = "xml"
        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/GET_model_5.json')
        const expObject = JSON.parse(jsonImp)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(body, expObject)
    });

    it("Validate valid error for corrupted api host",  async function () {
        config['headers']['x-rapidapi-host'] = "555"
        await axios.request(config).catch(function (error) {
        const errorCodeExp = 400
        const errorMsgExp = 'Bad Request'

        const errorCodeActual  = error.response['status']
        const errorMsgActual = error.response['statusText']

        assert.equal(errorCodeActual, errorCodeExp);
        assert.equal(errorMsgActual, errorMsgExp);
        });
    });

    it("Validate valid error for corrupted api-key",  async function () {
        config['headers']['x-rapidapi-host'] = "movie-database-imdb-alternative.p.rapidapi.com" //need to set new value due to overwritting by previous test
        config['headers']['x-rapidapi-key'] = "555"
        await axios.request(config).catch(function (error) {
        const errorCodeExp = 403
        const errorMsgExp = 'Forbidden'

        const errorCodeActual  = error.response['status']
        const errorMsgActual = error.response['statusText']

        assert.equal(errorCodeActual, errorCodeExp);
        assert.equal(errorMsgActual, errorMsgExp);
        });
    });

    it("Validate valid error for corrupted URL",  async function () {
        config['url'] = 'https://movie-database-imdb-alternative.p.rapidapi.com555/'
        await axios.request(config).catch(function (error) {
        const errorCodeExp = -3008
        const errorMsgExp = 'ENOTFOUND'

        const errorCodeActual  = error.errno
        const errorMsgActual = error.code

        assert.equal(errorCodeActual, errorCodeExp);
        assert.equal(errorMsgActual, errorMsgExp);
        });
    });

});
