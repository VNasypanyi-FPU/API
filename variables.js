const
    options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        qs: {s: 'Avengers Endgame', r: 'json', page: '1'},
        headers: {
            'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
            'x-rapidapi-key': '0e8998a58bmsh1f691b3feebcb01p1b4eebjsn566ab1848fea',
            useQueryString: true
        }
    };


module.exports = {options} ;

