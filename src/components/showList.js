import React, { useEffect, useState } from 'react';
import '../styles/showList.css';
import { Link } from 'react-router-dom';

function ShowList() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then(res => res.json())
      .then(data => setShows(data))
      .catch(err => console.error('Erreur lors du chargement des séries :', err));
  }, [page]);

  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="show-list">
      <h1>Séries - Page {page}</h1>
      <div className="grid">
        {shows.map(show => (
          <div key={show.id} className="card">
            <Link to={`/serie/${show.id}`}>
              <img src={show.image?.medium} alt={show.name} />
            </Link>
            <h3>{show.name}</h3>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 0}>Précédent</button>
        <button onClick={handleNext}>Suivant</button>
      </div>
    </div>
  );
}

export default ShowList;
