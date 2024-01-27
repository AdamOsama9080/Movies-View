import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() { 

  const [gettrendingmovies, setgettrendingmovies] = useState([]);
  const [activePage, setActivePage] = useState(1); // Initialize activePage with 1

  let arr = new Array(13).fill(1).map((ele , i) => i +1);

  async function getpagesmovie(pagenumber){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cc554613edbb232c706fafc64914d707&include_adult=false&include_video=false&language=en-US&page=${pagenumber}&sort_by=popularity.desc`)
    setgettrendingmovies(data.results);
    setActivePage(pagenumber); // Set the active page here
  }

  useEffect(() => {
    getpagesmovie(1)
  }, [])
  
  let x = {backgroundColor:"red" ,color :"blue"};
  return (
    <div>
      {/* <div style={{backgroundColor:"red" ,color :"blue"}}><h2>style</h2></div> */}
      {/* <div style={x}><h2>style</h2></div> */}
      {gettrendingmovies ? (
        <div className='row justify-content-center'>
          {gettrendingmovies.map((movie , i) => (
            <div className='col-md-2' key={i}>
              <div className='movie'>
                <Link className='text-decoration-none text-light' to={`/moviedetails/${movie.id}`}>
                  <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt='##movie-poster'/>
                  <h3 className='h6'>{movie.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>
      )}

      <nav aria-label="py-5" className="mt-5 text-center">
        <ul className="pagination pagination-sm d-inline-flex">
          {arr.map((page , i) => (
            <li key={i} onClick={() => getpagesmovie(page)} className={`page-item list-page ${activePage === page ? 'active' : ''}`}>
              <a className="page-link text-white bg-transparent">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
