const assert = require('chai').assert
const fs = require("fs");
const axios = require("axios").default;
var expect = require('chai').expect


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
    it(" Validate DEFAULT valid response and json schema",  async () => {
        const response = await axios.request(config);
        const jsonImp = fs.readFileSync('./data_models/Search_Valid_Model.json')
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

    it(" 'Movie not found!' error if request contains invalid movie title",  async () => {
        config['params']['s'] = "F8745628465"
        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/Search_Error_Model.json')
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

    it("'Too many results!' error if response body exceeds amount restriction",  async () => {
        config['params']['s'] = "F"
        const jsonImp = fs.readFileSync('./data_models/Search_Error_Model.json')
        const expObject = JSON.parse(jsonImp)
        expObject ['Error'] = 'Too many results.'
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

    it("'Incorrect IMDb ID.' error if request doesn't contain title",  async () => {
        config['params']['s'] = ""
        const jsonImp = fs.readFileSync('./data_models/Search_Error_Model.json')
        const expObject = JSON.parse(jsonImp)
        expObject ['Error'] = 'Incorrect IMDb ID.'
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

    it("Search by no default YEAR parameter ",  async () => {
        config['params']['s'] = "Avengers"
        config['params']['y'] = "2000"

        const response = await axios.request(config)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const respCode = response.status;
        const respMessage = response.statusText;
        const containsYear = response.data['Search'].every(x=>x['Year'].includes('2000'));//return "true" if all array elements == 'series'

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(containsYear, true)
    });

    it("Search by no default TYPE parameter",  async () => {
        config['params']['s'] = "Avengers"
        config['params']['y'] = "2010"
        config['params']['type'] = "series"

        const response = await axios.request(config)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const respCode = response.status;
        const respMessage = response.statusText;
        const containsTypeNumber = response.data['Search'].filter(x => x['Type'].includes('series')).length
        const allTypes = response.data['Search'].length

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(allTypes, containsTypeNumber)

    });

    it("Search with single TITLE parameter (other params are empty)",  async () => { //check whether we have only 1 required parameter as expected
        config['params']['s'] = "Avengers"
        config['params']['y'] = ""
        config['params']['r'] = ""
        config['params']['type'] = ""

        const response = await axios.request(config)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const respCode = response.status;
        const respMessage = response.statusText;
        const containsTitleNumber = response.data['Search'].filter(x => x['Title'].includes('Avengers')).length
        const allTitles = response.data['Search'].length

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(allTitles, containsTitleNumber)
    });

    it("Search by no default PAGE parameter",  async () => {
        config['params']['s'] = "Avengers"
        config['params']['y'] = "2018"
        config['params']['page'] = "2"

        const response = await axios.request(config)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;
        const expItemsAmount = 6

        const respCode = response.status;
        const respMessage = response.statusText;
        const itemAmount = response.data['Search'].length


        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(expItemsAmount, itemAmount);

    });

    it("Search by no default DATA TYPE parameter (xml) ",  async () => {
        config['params']['s'] = "Maximum Overdrive"
        config['params']['y'] = "2009"
        config['params']['page'] = "1"
        config['params']['r'] = "xml"
        const response = await axios.request(config)
        const jsonImp = fs.readFileSync('./data_models/Search_Valid_XML_model.json')
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

    it("'400 Bad Request' error for corrupted api host",  async () => {
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

    it("'403 Forbidden' error for corrupted api key",  async function () {
        config['headers']['x-rapidapi-host'] = "movie-database-imdb-alternative.p.rapidapi.com"
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

});
