import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Episode() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [cast, setCast] = useState([]);
  const [showId, setShowId] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/episodes/${id}?embed=show`)
      .then(res => res.json())
      .then(data => {
        setEpisode(data);
        const sId = data._embedded.show.id;
        setShowId(sId);
        return fetch(`https://api.tvmaze.com/shows/${sId}/cast`);
      })
      .then(res => res.json())
      .then(data => setCast(data))
      .catch(err => console.error('Erreur chargement épisode ou cast :', err));
  }, [id]);

  if (!episode || !showId) return <div>Chargement de l’épisode...</div>;

  return (
    <div className="episode-details">
      <h1>{episode.name}</h1>
      <img
        src={episode.image?.original || episode.image?.medium}
        alt={episode.name}
        style={{ maxWidth: '300px' }}
      />
      <p dangerouslySetInnerHTML={{ __html: episode.summary }}></p>
      <p><strong>Saison :</strong> {episode.season}</p>
      <p><strong>Épisode :</strong> {episode.number}</p>
      <p><strong>Date :</strong> {episode.airdate}</p>

      <h2>Personnages principaux</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {cast.map(({ person, character }) => (
          <div key={character.id} style={{ width: '150px', textAlign: 'center' }}>
            <img
              src={person.image?.medium || "https://via.placeholder.com/150"}
              alt={person.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p>
              <Link to={`/character/${showId}/${character.id}`}>
                <strong>{character.name}</strong>
              </Link>
            </p>
            <p>
              <Link to={`/person/${person.id}`}>
                <em>{person.name}</em>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Episode;
