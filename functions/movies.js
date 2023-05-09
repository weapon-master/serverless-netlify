require('dotenv').config();
const movies = require('../data/movies.json');

exports.handler = async () => {
  const api = new URL('http://www.omdbapi.com/');
  api.searchParams.set('apikey', process.env.OMDB_API_KEY);
  const moviesWithScore = await Promise.all(
    movies.map((movie) => {
      api.searchParams.set('i', movie.id);
      return fetch(api)
        .then((resp) => resp.json())
        .then((data) => ({
          ...movie,
          scores: data.Ratings,
        }));
    }),
  );
  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithScore),
  };
};
