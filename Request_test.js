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


describe("GET request with valid data ", function() {
    it("Validate response and json schema is ok",  async function () {
        const response = await axios.request(config);
        const file4 = fs.readFileSync('./data_models/GET_model_1.json')
        const expObject = JSON.parse(file4)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const respCode = response.status;
        const respMessage = response.statusText;
        const body = response.data

        assert.deepEqual(body, expObject)
        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
    });

    it("Expected: 'Movie not found!' if no movie exist + correct Status Code/Message",  async function () {
        config['params']['s'] = "F8745628465"
        const response = await axios.request(config)
        const file4 = fs.readFileSync('./data_models/GET_model_2.json')
        const expObject = JSON.parse(file4)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;

        const body = response.data
        const respCode = response.status;
        const respMessage = response.statusText;

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.deepEqual(body, expObject)
    });

    it("Expected: 'Too many results!' for value that exceed amount restriction",  async function () {
        config['params']['s'] = "F"
        const file4 = fs.readFileSync('./data_models/GET_model_3.json')
        const expObject = JSON.parse(file4)
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

    it("Empty required parameter",  async function () {
        config['params']['s'] = ""
        const file4 = fs.readFileSync('./data_models/GET_model_3.json')
        const expObject = JSON.parse(file4)
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
