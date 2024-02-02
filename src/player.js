import React, { useState, useEffect } from 'react';

function MusicPlayer() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
    }

    const lastTrackIndex = parseInt(localStorage.getItem('currentTrackIndex'));
    if (!isNaN(lastTrackIndex)) {
      setCurrentTrackIndex(lastTrackIndex);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
  }, [playlist, currentTrackIndex]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newPlaylist = [...playlist, file];
    setPlaylist(newPlaylist);

    if (currentTrackIndex === null) {
      setCurrentTrackIndex(0);
    }
  };

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
    const audio = document.getElementById('audioPlayer');
    if (audio) {
      audio.load();
      audio.addEventListener('canplaythrough', () => {
        audio.play();
      }, { once: true });
    }
  };
  

  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className='container'>
      <div className='upload'>
      <h1>Music Player</h1>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      </div>
      
      <div id='playlist'>
        <h2>Playlist</h2>
        <ul>
          {playlist.map((track, index) => (
            <li key={index} onClick={() => handleTrackClick(index)}>
              {track.name}
            </li>
          ))}
        </ul>
      </div>
      {currentTrack && (
        <div>
          <h2>Now Playing</h2>
          <audio id="audioPlayer" controls src={URL.createObjectURL(currentTrack)} onEnded={handleEnded} />
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
