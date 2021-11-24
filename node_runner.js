const request = require('request');
const {assert} = require("chai");
var expect = require('chai').expect
const {options} = require("./variables");

  request(options,

    function(error, response, body) {
        if (error) throw new Error(error);

        console.log(response.statusCode); //200
        console.log(response.statusMessage); //OK
    });







