import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Season() {
  const { id } = useParams();
  const [season, setSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/seasons/${id}`)
      .then(res => res.json())
      .then(data => {
        setSeason(data);

        return fetch(`https://api.tvmaze.com/seasons/${id}/episodes`);
      })
      .then(res => res.json())
      .then(data => setEpisodes(data))
      .catch(err => console.error("Erreur lors du chargement de la saison :", err));
  }, [id]);

  if (!season) return <div>Chargement de la saison...</div>;

  return (
    <div className="season-details">
      <h1>Saison {season.number}</h1>
      {season.image && (
        <img
          src={season.image.original || season.image.medium}
          alt={`Saison ${season.number}`}
          style={{ maxWidth: '300px' }}
        />
      )}
      {season.summary && (
        <p dangerouslySetInnerHTML={{ __html: season.summary }}></p>
      )}

      <h2>Épisodes</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <Link to={`/episode/${episode.id}`}>
              {episode.number}. {episode.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Season;
