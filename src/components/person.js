import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Person() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    // Récupérer les infos de la personne
    fetch(`https://api.tvmaze.com/people/${id}`)
      .then(res => res.json())
      .then(data => {
        setPerson(data);
        // Ensuite, récupérer ses rôles avec les séries
        return fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`);
      })
      .then(res => res.json())
      .then(data => setCredits(data))
      .catch(err => console.error("Erreur lors du chargement :", err));
  }, [id]);

  if (!person) return <div>Chargement...</div>;

  return (
    <div className="person-details">
      
      <h1>{person.name}</h1>
      <img
        src={person.image?.medium || 'https://via.placeholder.com/210x295'}
        alt={person.name}
        style={{ maxWidth: '300px', borderRadius: '8px' }}
      />
      <p><strong>Date de naissance :</strong> {person.birthday || 'Inconnue'}</p>
      <p><strong>Genre :</strong> {person.gender || 'Inconnu'}</p>
      <p><strong>Pays :</strong> {person.country?.name || 'Inconnu'}</p>

      <h2>Séries ou films joués</h2>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            {credit._embedded?.show?.name ? (
              <Link to={`/serie/${credit._embedded.show.id}`}>
                {credit._embedded.show.name}
              </Link>
            ) : (
              'Projet inconnu'
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Person;
