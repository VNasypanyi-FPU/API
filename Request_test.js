const request = require('request');
const assert = require('chai').assert
const assertArrays = require('chai-arrays');
const fs = require("fs");
var axios = require("axios").default;
// const file1 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_templates/Get_template_1.json')
// const options = JSON.parse(file1)
// const file2 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_templates/Get_template_2.json')
// const options_noMovie = JSON.parse(file2)
// const file3 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_templates/Get_template_3.json')
// const opt_res_restriction = JSON.parse(file3)
// let file4 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_models/GET_model_1.json')
// let test = JSON.parse(file4)

const expStatusCode = 200;
const expStatusMessage = 'OK'
const bodyExp_title = 'Maximum Overdrive'
const bodyExp_year = '2009'
const bodyExp_imdbID = 'tt15691914'
const bodyExp_type = 'movie'
const bodyExp_poster = 'https://m.media-amazon.com/images/M/MV5BZGU5NzUzZmUtOTRiYS00OGZkLThmZmEtN2Q1ZmQyMTgxMzM4XkEyXkFqcGdeQXVyOTM3NzY0Nw@@._V1_SX300.jpg'
const expBodyPropAmountCorrect = 3
const expTotalResults = 1
const expResponceKey = 'True'
const expBodyPropAmount = 3;
const bodyExpPropAmFalse = 2;
const bodyExprespKeyFalse = "False";
const bodyExpError_noMovie = "Movie not found!";
const bodyExpError_TooManyRes = "Too many results.";

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
        let file4 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_models/GET_model_1.json')
        let expObject = JSON.parse(file4)
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
        let file4 = fs.readFileSync('C:/Users/vnasypanyi/IdeaProjects/IMDB_api/data_models/GET_model_1.json')
        let test = JSON.parse(file4)
        const expStatusMessage = 'OK'
        const expStatusCode = 200;
        const bodyExpPropAmFalse = 2;
        const bodyExprespKeyFalse = "False";

        const body = response.data
        const bodyPropAmountFalse = Object.keys(response.data).length;
        const body_respKeyFalse = response.data['Response'];
        const body_Error_noMovie = response.data['Error'];
        const respCode = response.status;
        const respMessage = response.statusText;
        const bodyExpError_noMovie = "Movie not found!";

        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(bodyExpPropAmFalse, bodyPropAmountFalse);
        assert.equal(bodyExprespKeyFalse, body_respKeyFalse);
        assert.equal(bodyExpError_noMovie, body_Error_noMovie);
    });

    it("Expected: 'Too many results!' for value that exceed amount restriction",  async function () {

        let response = await axios.request(opt_res_restriction);

        const bodyPropAmountFalse = Object.keys(response.data).length;
        const body_respKeyFalse = response.data['Response'];
        const body_Error_TooManyRes = response.data['Error'];
        const respCode = response.status;
        const respMessage = response.statusText;
        assert.equal(expStatusMessage, respMessage);
        assert.equal(expStatusCode, respCode);
        assert.equal(bodyExpPropAmFalse, bodyPropAmountFalse);
        assert.equal(bodyExprespKeyFalse, body_respKeyFalse);
        assert.equal(bodyExpError_TooManyRes, body_Error_TooManyRes);
    });

});
