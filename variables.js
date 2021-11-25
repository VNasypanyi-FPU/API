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

const body =
    {
        Title: 'Maximum Overdrive',
        Year: '2009',
        imdbID: 'tt15691914',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZGU5NzUzZmUtOTRiYS00OGZkLThmZmEtN2Q1ZmQyMTgxMzM4XkEyXkFqcGdeQXVyOTM3NzY0Nw@@._V1_SX300.jpg'
    }





module.exports = {options,body} ;

