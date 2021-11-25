const request = require('request');
const assert = require('chai').assert
const assertArrays = require('chai-arrays');
//const {options,body} = require("./variables");
var axios = require("axios").default;



const options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: 'Maximum Overdrive', r: 'json', y: '2009', page: '1'},
    headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': '0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea'
    }
};

const options_noMovie = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: 'F8745628465', r: 'json', y: '2009', page: '1'},
    headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': '0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea'
    }
};

const opt_res_restriction = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: 'F', r: 'json', y: '2009', page: '1'},
    headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': '0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea'
    }
};

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



describe("GET request with valid data ", function() {
    it("Expected: Correct status code and message",  async function () {

            let response = await axios.request(options);

            const respCode = response.status;
            const respMessage = response.statusText;
            assert.equal(expStatusMessage, respMessage);
            assert.equal(expStatusCode, respCode);
    });

    it("Expected: Correct body data structure and content",  async function () {

            let response = await axios.request(options);

            const body_title = response.data['Search'][0]['Title'];
            const body_year = response.data['Search'][0]['Year'];
            const body_imdbID = response.data['Search'][0]['imdbID'];
            const body_type = response.data['Search'][0]['Type'];
            const body_poster = response.data['Search'][0]['Poster'];
            const total_results = response.data['totalResults'];
            const body_respKey = response.data['Response'];
            const bodyPropAmountCorrect = Object.keys(response.data).length;

            assert.equal(body_title,bodyExp_title);
            assert.equal(body_year,bodyExp_year);
            assert.equal(body_imdbID,bodyExp_imdbID);
            assert.equal(body_type,bodyExp_type);
            assert.equal(body_poster,bodyExp_poster);
            assert.equal(total_results,expTotalResults);
            assert.equal(body_respKey,expResponceKey);
            assert.equal(bodyPropAmountCorrect,expBodyPropAmount);

    });

    it("Expected: 'Movie not found!' if no movie exist + correct Status Code/Message",  async function () {

        let response = await axios.request(options_noMovie);


        const bodyPropAmountFalse = Object.keys(response.data).length;
        const body_respKeyFalse = response.data['Response'];
        const body_Error_noMovie = response.data['Error'];
        const respCode = response.status;
        const respMessage = response.statusText;
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
