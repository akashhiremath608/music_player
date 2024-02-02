import Player from './player'

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPlaylist = [...playlist, URL.createObjectURL(file)];
      setPlaylist(newPlaylist);
      setCurrentTrackIndex(newPlaylist.length - 1); // Start playing the newly added track
    }
  };
  