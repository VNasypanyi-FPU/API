const request = require('request');
const assert = require('chai').assert
const {options} = require("./variables");


describe("GET request by Search", function() {
    it("test", function () {

        request(options,

         function(error, response, body) {
        if (error) throw new Error(error);
        const expStatusCode = 2000;
        const expStatusMsg = 'OK';
        const respCode = response.statusCode;
        const respMessage = response.statusMessage;

        assert.equal(expStatusCode, respCode);
        assert.equal(expStatusMsg, respMessage);
        });

    });

    it("test", function () {

        request(options,

            function(error, response, body) {
                if (error) throw new Error(error);
                const expStatusCode = 2000;
                const expStatusMsg = 'OK';
                const respCode = response.statusCode;
                const respMessage = response.statusMessage;

                assert.equal(expStatusCode, respCode);
                assert.equal(expStatusMsg, respMessage);
            });

    });
});

