import React, { useEffect, useState } from 'react';
import '../styles/showList.css';
import { Link } from 'react-router-dom';

function LstPerson() {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/people?page=${page}`)
      .then(res => res.json())
      .then(data => setPersons(data))
      .catch(err => console.error('Erreur lors du chargement des personnes :', err));
  }, [page]);

  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="show-list">
      <h1>Acteurs - Page {page}</h1>
      <div className="grid">
        {persons.map(person => (
          <div key={person.id} className="card">
            <Link to={`/person/${person.id}`}>
              <img
                src={person.image?.medium || "https://via.placeholder.com/210x295?text=No+Image"}
                alt={person.name}
              />
            </Link>
            <h3>{person.name}</h3>
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

export default LstPerson;
