import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // Infos générales
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(res => res.json())
      .then(data => setSerie(data))
      .catch(err => console.error('Erreur série :', err));

    // Saisons
    fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then(res => res.json())
      .then(data => setSeasons(data))
      .catch(err => console.error('Erreur saisons :', err));

    // Épisodes
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(res => res.json())
      .then(data => setEpisodes(data))
      .catch(err => console.error('Erreur épisodes :', err));

    // Cast
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then(res => res.json())
      .then(data => setCast(data))
      .catch(err => console.error('Erreur cast :', err));
  }, [id]);

  if (!serie) return <div>Chargement...</div>;

  return (
    <div className="serie-details">
      <h1>{serie.name}</h1>
      <img src={serie.image?.original} alt={serie.name} style={{ maxWidth: "300px" }} />
      <p dangerouslySetInnerHTML={{ __html: serie.summary }}></p>
      <p><strong>Genres :</strong> {serie.genres.join(', ')}</p>
      <p><strong>Première diffusion :</strong> {serie.premiered}</p>
      <p><strong>Note :</strong> {serie.rating.average || 'Non notée'}</p>

      <h2>Saisons</h2>
      <ul>
        {seasons.map(season => (
          <li key={season.id}>
            Saison {season.number} ({season.episodeOrder || "?"} épisodes) – {season.premiereDate} à {season.endDate}
          </li>
        ))}
      </ul>

      <h2>Épisodes</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            S{episode.season}E{episode.number} – 
              <Link to={`/episode/${episode.id}`}>
                {episode.name}
              </Link>
          </li>
        ))}
      </ul>

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
              <Link to={`/character/${serie.id}/${character.id}`}>
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

export default Serie;
