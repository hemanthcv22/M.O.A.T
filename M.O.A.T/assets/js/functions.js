let songs = [];
let currentSongIndex = 0;

function PlayAudio(audio_url, song_id) {
  var audio = document.getElementById("player");
  var source = document.getElementById("audioSource");
  source.src = audio_url;
  var name = document.getElementById(song_id + "-n").textContent;
  var album = document.getElementById(song_id + "-a").textContent;
  var image = document.getElementById(song_id + "-i").getAttribute("src");

  document.title = name + " - " + album;
  var bitrate = document.getElementById("moat-bitrate");
  var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
  var quality = bitrate_i == 4 ? 320 : 160;

  document.getElementById("player-name").innerHTML = name;
  document.getElementById("player-album").innerHTML = album;
  document.getElementById("player-image").setAttribute("src", image);

  var promise = audio.load();
  if (promise) {
    promise.catch(function (error) {
      console.error(error);
    });
  }
  audio.play();

  // Update the current song index
  currentSongIndex = songs.findIndex((song) => song.id === song_id);
}

function searchSong(search_term) {
  document.getElementById("search-box").value = search_term;
  var goButton = document.getElementById("search-trigger");
  goButton.click();
}

function togglePlayPause() {
  var audio = document.getElementById("player");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function playCurrentSong() {
  const currentSong = songs[currentSongIndex];
  PlayAudio(currentSong.downloadUrl, currentSong.id);
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playCurrentSong();
}

function playPrevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playCurrentSong();
}

document.getElementById("player").addEventListener("ended", playNextSong);
