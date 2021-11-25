const request = require('request');
const {assert} = require("chai");
var expect = require('chai').expect
const {options} = require("./variables");


  request(options,

    function(error, response, body) {
        if (error) throw new Error(error);


      const expStatusCode = 2000;
      const expStatusMsg = 'OK';
      const respCode = response.statusCode;


       console.log(respCode); //200
       //console.log(response.statusMessage); //OK

    });


module.exports = {request};




