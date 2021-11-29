var axios = require("axios").default;
const fs = require('fs');
const {expect} = require("chai");


var options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: 'Avengers', r: 'json', y: '2018', page: '2'},
    headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': '0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea'
    }
};

axios.request(options).then(function (response) {
    // const body1 = response.data
    // const body2 = body1['Title'];
    //console.log(response.data['Search'][0]['Title']);
    /*const test = (Object.values(response.data['Search'][0]))
    console.log (test[0])

    for (let i = 0; i < 3; i++) { // выведет 0, затем 1, затем 2
        alert(i);
    }*/

    const test = response.data['Search'].length
    //console.log(test)
    // const terst = response.data['Search'].filter(x => x['Year']).length
    //     console.log(terst)
     //
     // test.forEach(myFunction)
     // function myFunction() {
     //
     //     console.log(Search.['Title']);
     //      //expect(test[0]).to.contain('Avengers');
     //  }

    //console.log(myFunction)


//     const body1 = response.data;
//     const body2 = body1['Title'];
}).catch(function (error) {
    console.error(error.response);
});

let bob = a => a + 100;

const atds = bob (5)





