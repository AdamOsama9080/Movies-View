// import axios from 'axios';
import React, { useContext } from 'react';
// import { useEffect, useState } from 'react';
import {movieContext} from './Store'




export default function People() {
  let {trendingperson} = useContext( movieContext );

  // const [trendingpeople, settrendingpeople] = useState([]);

  // async function gettrendungpeople(mediaType, setterFunction){
  //   let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=cc554613edbb232c706fafc64914d707`);
  //   setterFunction(data.results.slice(0,10))
  // }

  // useEffect(() => {
  //   gettrendungpeople(`person` , settrendingpeople)
  // }, [])
  
  // console.log(trendingpeople)

  return (
    <>
     {trendingperson?<div className="row justify-content-center">
            {trendingperson.map(person => (
              <div key={person.id} className="col-md-3">
                <div>
                  <img className='py-4' src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} />
                </div>
                <h6 className="personname">
                  {person.name}
                </h6>
              </div>
            ))}
        </div>:
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
    }
    </>
  )
}
