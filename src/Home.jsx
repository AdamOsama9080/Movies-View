// import axios from 'axios';
// import React, { useState ,useEffect } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {movieContext} from './Store'
// import moviesdetails from './Moviesdetails';
export default function Home() {
  let {trendingmovie , trendingTvshow , trendingperson} = useContext(movieContext)

//   const [trendingmovie, settrendingmovie] = useState([]);

//   const [trendingTvshow, settrendingTvshow] = useState([]);

//   const [trendingperson, settrendingperson] = useState([]);

// async function getTrending(type ,callback){
//     // console.log("this is trending movies");
//     let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=cc554613edbb232c706fafc64914d707`);
//     callback(data.results.slice(0,10));
//     // console.log(data.results);
//   }
//   // getTrending(); 

//  useEffect(() => {
//   getTrending("movie",settrendingmovie);
//   getTrending("tv",settrendingTvshow);
//   getTrending("person",settrendingperson);
// }, [])



  return (
    // <div>Home</div>
    <div className='d-flex flex-column'>
      <div className='row'>
        <div className='col-md-4 d-flex  align-items-center '>
          <div className=''>
            <div className='w-25 the-line mb-4'></div>
              <div className=''>
                <h2 className='h4'>Trending <br/>Movies<br/>To Watch Right Now !</h2>
                <p className='text- text-danger'>Top Trending Movies By Day</p>
              </div>
              <div className='the-line mt-4'></div>
          </div>
        </div>
        

        {trendingmovie.map((movie , i)=><div className='col-md-2 ' key={i} movieinfo={movie}>
          <div className='movie'>
            <Link className='text-decoration-none text-light' to={`/moviedetails/${movie.id}`}>
              <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt='##movie-poster'/>
              <h3 className='h6'>{movie.title}</h3>
            </Link>
          </div>
        </div>)}
      </div>

      <div className='row'>
      <div className='col-md-4 d-flex  align-items-center'>
          <div className=''>
            <div className='w-25 the-line mb-4'></div>
              <div className=''>
                <h2 className='h4'>Trending <br/>Tv Show<br/>To Watch Right Now !</h2>
                <p className='text- text-danger'>Top Trending Movies By Day</p>
              </div>
              <div className='the-line mt-4'></div>
          </div>
        </div>
        

        {trendingTvshow.map((tv , i)=><div className='col-md-2 ' key={i} movieinfo={tv}>
          <div className='movie'>
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+tv.poster_path} alt='##movie-poster'/>
            <h3 className='h6'>{tv.original_name}</h3>
            {/* <p></p>/ */}
          </div>
        </div>)}
      </div>

      <div className='row'>
      <div className='col-md-4 d-flex  align-items-center'>
          <div className=''>
            <div className='w-25 the-line mb-4'></div>
              <div className=''>
                <h2 className='h4'>Trending <br/>People<br/>To Watch Right Now !</h2>
                <p className='text- text-danger'>Top Trending Movies By Day</p>
              </div>
              <div className='the-line mt-4'></div>
          </div>
        </div>
        

        {trendingperson.map((person , i)=><div className='col-md-2 ' key={i} movieinfo={person}>
          <div className='movie'>
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+person.profile_path} alt='##movie-poster'/>
            <h3 className='h6'>{person.original_name}</h3>
            {/* <p></p>/ */}
          </div>
        </div>)}
      </div>
    </div>
  )
}
