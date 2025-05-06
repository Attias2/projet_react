import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Character() {
  const { characterId, showId } = useParams();
  const [character, setCharacter] = useState(null);
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodesBySeason, setEpisodesBySeason] = useState({});

  useEffect(() => {
    // Récupérer les infos du personnage
    fetch(`https://api.tvmaze.com/characters/${characterId}`)
      .then(res => res.json())
      .then(data => setCharacter(data))
      .catch(err => console.error('Erreur chargement personnage :', err));

    // Récupérer les infos de la série
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then(res => res.json())
      .then(data => setShow(data))
      .catch(err => console.error('Erreur chargement série :', err));

    // Récupérer les saisons
    fetch(`https://api.tvmaze.com/shows/${showId}/seasons`)
      .then(res => res.json())
      .then(seasonsData => {
        setSeasons(seasonsData);
        // Récupérer tous les épisodes par saison
        return Promise.all(
          seasonsData.map(season =>
            fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`)
              .then(res => res.json())
              .then(episodes => ({ seasonId: season.id, episodes }))
          )
        );
      })
      .then(results => {
        const map = {};
        results.forEach(({ seasonId, episodes }) => {
          map[seasonId] = episodes;
        });
        setEpisodesBySeason(map);
      })
      .catch(err => console.error('Erreur chargement saisons/épisodes :', err));
  }, [characterId, showId]);

  if (!character || !show) return <div>Chargement...</div>;

  return (
    <div className="character-details" style={{ padding: '20px' }}>
      <Link to={`/serie/${showId}`}>← Retour à la série</Link>

      <h1>{character.name}</h1>

      <img
        src={character.image?.medium || 'https://via.placeholder.com/210x295'}
        alt={character.name}
        style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '20px' }}
      />

      {character.description && (
        <div>
          <h2>Description</h2>
          <p>{character.description}</p>
        </div>
      )}
      

      <h2>Série associée</h2>
      <p><strong>Titre :</strong> {show.name}</p>
      <p><strong>Langue :</strong> {show.language}</p>
      <p><strong>Genres :</strong> {show.genres?.join(', ')}</p>

      <h2>Saisons & Épisodes</h2>
      {seasons.map(season => (
        <div key={season.id}>
          <h3>Saison {season.number}</h3>
          <ul>
            {episodesBySeason[season.id]?.map(episode => (
              <li key={episode.id}>
                
                <strong>Épisode {episode.number} :</strong>
                <Link to={`/episode/${episode.id}`}>
                    {episode.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Character;
