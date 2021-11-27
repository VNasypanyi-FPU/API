var axios = require("axios").default;
const fs = require('fs');


var options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: 'Avengers', r: 'xml', y: '2000', page: '1'},
    headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': '0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea'
    }
};

axios.request(options).then(function (response) {
    // const body1 = response.data['Search'][0];
    // const body2 = body1['Title'];
    console.log(response.data);

//     const body1 = response.data;
//     const body2 = body1['Title'];
}).catch(function (error) {
    console.error(error.response);
});





