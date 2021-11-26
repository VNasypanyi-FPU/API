const assert = require('chai').assert
const fs = require("fs");
var axios = require("axios").default;

const baseUrl = "https://movie-database-imdb-alternative.p.rapidapi.com/"
const baseHeaders = {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": "0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea"
}
const file1 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_templates/Get_template_1.json')
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

});
