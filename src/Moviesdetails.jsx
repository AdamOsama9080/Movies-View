import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  axios  from 'axios';



export default function Moviesdetails() {

    let param = useParams()
    // console.log(param.id)

    const [movieinfo, setmovieinfo] = useState({});

    async function getmovieinfo(id){
        // console.log(id);
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cc554613edbb232c706fafc64914d707`)
        setmovieinfo(data);
        // console.log(movieinfo)
        // console.log(movieinfo.title)
    }
    console.log(movieinfo)
    
    useEffect(() => {
     getmovieinfo(param.id)
    }, [])
    

  return (
    // <div><h2>{movieinfo.title}</h2></div>
    // {movieinfo?}
    <>
    {movieinfo?<div className='row'>
        <div className='d-flex align-items-center justify-content-center'></div>
        <div className='col-md-3'>
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+movieinfo.poster_path} alt='##' />
        </div>
        <div className='col-md-9'>
            <h2 className=''>
                {movieinfo.title}
            </h2>
            <h5 className='py-3 fs-6 overview'>
                {movieinfo.overview}
            </h5>
            <ul>
                <li className='mb-3 fs-5'>Vote Count: <span className='text-danger'>{movieinfo.vote_count}</span></li>
                <li className='mb-3 fs-5'>Vote_AVG: <span className='text-danger'>{movieinfo.vote_average}</span></li>
                <li className='mb-3 fs-5'>budget: <span className='text-danger'>${movieinfo.budget}</span></li>
                <li className='mb-3 fs-5'>popularity: <span className='text-danger'>{movieinfo.popularity}</span></li>
                <li className='mb-3 fs-5'>release_date: <span className='text-danger'>{movieinfo.release_date}</span></li>
            </ul>
        </div>
    </div>:
    <div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
    </div>}
    </>
  )
}

