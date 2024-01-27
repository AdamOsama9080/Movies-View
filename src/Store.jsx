import React, { createContext, useState, useEffect } from 'react'; // Importing createContext and useEffect
import  axios  from 'axios';

export const movieContext = createContext(0);

export default function MoviesContextProvider(props) {

    const [trendingmovie, setTrendingmovie] = useState([]);
    const [trendingTvshow, setTrendingTvshow] = useState([]);
    const [trendingperson, setTrendingperson] = useState([]);

    async function getTrending(type, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=cc554613edbb232c706fafc64914d707`);
        callback(data.results.slice(0, 10));
    }

    useEffect(() => {
        getTrending("movie", setTrendingmovie);
        getTrending("tv", setTrendingTvshow);
        getTrending("person", setTrendingperson);
    }, [])

    return (
        <movieContext.Provider value={{ trendingmovie, trendingTvshow, trendingperson }}>
            {props.children}
        </movieContext.Provider>
    )
}