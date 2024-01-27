import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Tv() {
  const [trendingTvShow, settrendingTvShow] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 20; // Number of TV shows to display per page
  const totalPageCount = 13; // Total number of pages

  async function getTrendingTv(perpose, pageNum) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${perpose}/day?api_key=cc554613edbb232c706fafc64914d707&page=${pageNum}`
      );
      settrendingTvShow(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTrendingTv('tv', activePage);
  }, [activePage]);

  return (
    <div>
      {trendingTvShow.length > 0 ? (
        <div>
          <div className="row justify-content-center">
            {trendingTvShow.map((movie) => (
              <div key={movie.id} className="col-md-2">
                <div>
                  <img
                    className="py-4"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.name}
                  />
                </div>
                <h6 className="Tvname">{movie.name}</h6>
              </div>
            ))}
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPageCount }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${activePage === index + 1 ? 'active' : ''} p-2`}
                >
                  <a
                    className="page-link text-white bg-transparent"
                    onClick={() => setActivePage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
    </div>
  );
}
